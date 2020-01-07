import React from 'react';
import './overview.less';
import nprogressHoc from '../../components/nprogress/nprogress';
import * as d3 from 'd3';
import data from '../../locales/miserables.json';
class Overview extends React.Component {
    // 
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
    componentDidMount() {
        this.drawForce();
    }
    render() {
        return <div id="viz"></div>;
    }
}
export default nprogressHoc(Overview);