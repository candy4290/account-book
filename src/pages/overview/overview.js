import React from 'react';
import './overview.less';
import nprogressHoc from '../../components/nprogress/nprogress';
import * as d3 from 'd3';
class Overview extends React.Component {
    drawChart() {
        var dataset = [],
            i = 0;

        for (i = 0; i < 5; i++) {
            dataset.push(Math.round(Math.random() * 100));
        }
        var sampleSVG = d3.select("#viz")
            .append("svg")
            .attr("width", 402)
            .attr("height", 82);
            sampleSVG.selectAll("circle")
            .data(dataset)
            .enter().append("circle")
            .style("stroke", "gray")
            .style("fill", "white")
            .attr('r', 40)
            .attr("cx", function(d, i){return i*80 + 40})
            .attr("cy", 40)
            .on("mouseover", function () { d3.select(this).style("fill", "aliceblue"); })
            .on("mouseout", function () { d3.select(this).style("fill", "white"); })
            .on("mousedown", animateFirstStep);

        function animateFirstStep() {
            console.log('-----');
            d3.select(this)
                .transition()
                .delay(0)
                .duration(1000)
                .attr("r", 10)
                .each(animateSecondStep);
        };

        function animateSecondStep() {
            console.log('second step');
            d3.select(this)
                .transition()
                .delay(1000)
                .duration(1000)
                .attr("r", 40);
        };
    }
    componentDidMount() {
        this.drawChart();
    }
    render() {
        return <div id="viz"></div>;
    }
}
export default nprogressHoc(Overview);