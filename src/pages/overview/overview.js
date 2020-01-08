import React from 'react';
import './overview.less';
import nprogressHoc from '../../components/nprogress/nprogress';
import * as d3 from 'd3';
import data from '../../locales/miserables.json';
import tags from '../../locales/tags.json';
class Overview extends React.Component {
    moveAnimation;
    mcList = []; // 云标签各项的大小及相对位置信息
    tagCategory = ['人', '事', '地', '物', '组织'];
    drawChart() {
        var width = Math.max(960, window.innerWidth),
            height = Math.max(500, window.innerHeight);
        var i = 0;
        var svg = d3.select("#viz").append("svg")
            .attr("width", width)
            .attr("height", height);
        svg.append("rect")
            .attr("width", width)
            .attr("height", height)
            .on("ontouchstart" in document ? "touchmove" : "mousemove", particle);
        function particle() {
            var m = d3.mouse(this);
            svg.insert("circle", "rect")
                .attr("cx", m[0])
                .attr("cy", m[1])
                .attr("r", 1e-6)
                .style("stroke", d3.hsl((i = (i + 1) % 360), 1, .5))
                .style("stroke-opacity", 1)
                .transition()
                .duration(2000)
                .ease(Math.sqrt)
                .attr("r", 100)
                .style("stroke-opacity", 1e-6)
                .remove();

            d3.event.preventDefault();
        }
    }

    // 力导图
    drawForce() {
        const width = 600;
        const height = 600;
        const links = data.links;
        const nodes = data.nodes;
        const drag = simulation => {
            function dragstarted(d) {
                if (!d3.event.active) simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            }
            function dragged(d) {
                d.fx = d3.event.x;
                d.fy = d3.event.y;
            }
            function dragended(d) {
                if (!d3.event.active) simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            }
            return d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended);
        }

        var color = d3.scaleOrdinal(d3.schemeCategory10);

        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id(d => d.id))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(width / 2, height / 2));

        const svg = d3.select('#viz').append("svg")
            .attr("viewBox", [0, 0, width, height]);

        const link = svg.append("g")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6)
            .selectAll("line")
            .data(links)
            .join("line")
            .attr("stroke-width", d => Math.sqrt(d.value));
        const node = svg.append("g")
            .attr("stroke", "#fff")
            .attr("stroke-width", 1.5)
            .selectAll("circle")
            .data(nodes)
            .join("circle")
            .attr("r", 5)
            .attr("fill", d => color(d.group))
            .on('mouseover', function(d, i) {
                d3.select(this)
                .transition()
                .duration(250)
                .attr("r", 5+3)
            })
            .on('mouseout', function(d, i) {
                d3.select(this)
                .transition()
                .duration(250)
                .attr("r", 5)
            })
            .call(drag(simulation));

        node.append("title")
            .text(d => d.id);

        simulation.on("tick", () => {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            node
                .attr("cx", d => d.x)
                .attr("cy", d => d.y);
        });

        // invalidation.then(() => simulation.stop());
    }

    sineCosine(a, b, c, dtr) {
        const sa = Math.sin(a * dtr); // 正弦
        const ca = Math.cos(a * dtr); // 余弦
        const sb = Math.sin(b * dtr);
        const cb = Math.cos(b * dtr);
        const sc = Math.sin(c * dtr);
        const cc = Math.cos(c * dtr);
        return {sa, ca, sb, cb, sc, cc}
    }

    
    /**
     * 生成tag云各标签宽度，高度的列表
     *
     * @param {*} aS
     * @returns
     * @memberof Overview
     */
    generateMcList(aS) {
        const mcList = [];
        aS.nodes().forEach(node => {
            mcList.push({
                offsetWidth: node.offsetWidth,
                offsetHeight: node.offsetHeight
            });
        });
        return mcList;
    }

    
    /**
     * 根据生成的tag云 "宽，高"集合均匀散布tag标签。
     * 即生成球面上的点x,y,z的坐标
     * @param {*} mcList
     * @memberof Overview
     */
    positionAll(mcList) {
        const max = mcList.length;
        const radius = 90; // 球体半径
        mcList.forEach((item, index) => {
            // 生成两个角度，为了以此来生成均匀分布的球坐标
            const phi = Math.acos(-1 + (2 * (index + 1) - 1) / max); // 反余弦
            const theta = Math.sqrt(max*Math.PI)*phi; // 平方根
            // cx,cy,cz为球坐标
            item.cx = radius * Math.cos(theta)*Math.sin(phi);
            item.cy = radius * Math.sin(theta)*Math.sin(phi);
            item.cz = radius * Math.cos(phi);
        });
    }

    /**
     * 更新tag云标签的位置，连续调用则形状球体转动的效果
     * 思路：绕球体运动
     *
     * @param {*} mcList
     * @memberof Overview
     */
    update(mcList) {
        const a = (10 / 90) * 10;
        const b = -10 / 90 * 10
        if (Math.abs(a) <= 0.01 && Math.abs(b) <= 0.01) {
            return;
        }
        var c = 0, d = 200, howElliptical = 1;
        const {sa, ca, sb, cb, sc, cc} = this.sineCosine(a, b, c, Math.PI/180);
        for (let j = 0; j < mcList.length; j++) {
            var rx1=mcList[j].cx;
            var ry1=mcList[j].cy*ca+mcList[j].cz*(-sa);
            var rz1=mcList[j].cy*sa+mcList[j].cz*ca;
            
            var rx2=rx1*cb+rz1*sb;
            var ry2=ry1;
            var rz2=rx1*(-sb)+rz1*cb;
            
            var rx3=rx2*cc+ry2*(-sc);
            var ry3=rx2*sc+ry2*cc;
            var rz3=rz2;
            
            mcList[j].cx=rx3;
            mcList[j].cy=ry3;
            mcList[j].cz=rz3;
            
            const per=d/(d+rz3);
            
            mcList[j].x=(howElliptical*rx3*per)-(howElliptical*2);
            mcList[j].y=ry3*per;
            mcList[j].scale=per;
            mcList[j].alpha=per;
            
            mcList[j].alpha=(mcList[j].alpha-0.6)*(10/6);

            // 可以先隐藏一些元素
            // let alpha = (per - 0.6) * (10 / 6);
            // mcList[j].alpha=alpha * alpha * alpha - 0.2;
        }
    }

    /**
     * 创建tag云标签，3d转动效果
     * 思路：先将所有tag均匀分布到球体上，球体效果依赖于改变tag的字体大小，z-index,透明度来实现。
     * 然后通过算法实现：做球体朝某一个方向转动。
     * 主要算法：1.均匀散布到球体的算法
     *          2.转动效果算法
     *
     * @memberof Overview
     */
    drawCloud() {
        const div = d3.select('#viz').insert('div', 'div')
        .attr('id', 'rotate');
        const aS = div.selectAll('a')
        .data(tags.tags.sort((a, b) => {
            return Math.random() < 0.5?1:-1;
        }))
        .join('a')
        .text(d => { return d.name})
        .style('color', 'black');
        this.mcList = this.generateMcList(aS);
        this.positionAll(this.mcList);
        aS.data(this.mcList)
        .join('a')
        .style('color', function(d, i) {
            const item = d3.select(this);
            item.style('left', d.cx + 450/2 - d.offsetWidth/2 + 'px');
            item.style('top', d.cy + 400/2 - d.offsetHeight/2 + 'px');
            return 'black';
        });
        this.moveAnimation = d3.interval(() => {
            this.updatePosition(aS);
        }, 30);
        const that = this;
        d3.selectAll('#rotate a')
        .on('mouseover', function(d, i) {
            that.moveAnimation.stop();
        })
        .on('mouseout', function(d, i) {
            that.moveAnimation.restart(() => {
                that.updatePosition(aS);
            }, 30)
        });
    }

    updatePosition(aS) {
        this.update(this.mcList);
        aS.data(this.mcList)
        .join('a')
        .style('color', function(d, i) {
            const item = d3.select(this);
            item.style('top', d.cy + 400/2 - d.offsetHeight/2 + 'px');
            item.style('left', d.cx + 450/2 - d.offsetWidth/2 + 'px');
            item.style('font-size', Math.ceil(12*d.scale/2) + 8 + 'px');
            item.style('z-index', i);
            item.style('filter', `alpha(opacity=")${100*d.scale/2 + 8}px`);
            item.style('opacity', d.alpha);
            return '#bb9246';
        });
    }

    componentDidMount() {
        // this.drawCloud();
    }

    componentWillUnmount() {
        if (this.moveAnimation) {
            this.moveAnimation.stop();
        }
    }
    // <span className="point"></span>
    // <div className="text"></div>
    render() {
        return <div id="viz">
            <div className="wrapper">
            <div className="container">
                <div className="ball ball1"></div>
                <div className="ball ball2"></div>
                <div className="ball ball3"></div>
                <div className="ball ball4"></div>
                <div className="ball ball5"></div>
            </div>
            </div>
        </div>;
    }
}
export default nprogressHoc(Overview);