<template>
    <div>
        <svg id="svg_zone"></svg>
        <div class="right-panel">
            <h4>Change the Chart Properties</h4>
            <input  
                type="checkbox" 
                id="make-unique-elements" 
                v-model="makeTheXElementsUnique" 
                @change="makeUniqueElements()"
            >
            <label 
                for="make-unique-elements"
            > 
                Make the objects unique 
            </label>
            <br><br>
            <input 
                v-if="!isTheChartPieOrDoughnut" 
                type="checkbox" 
                id="show-x-label" 
                v-model="currentPropertiesForChart.showXLabel" 
                @change="toggleToggler()"
            >
            <label 
                v-if="!isTheChartPieOrDoughnut" 
                for="show-x-label"
            > 
                X Label 
            </label>
            <br v-if="!isTheChartPieOrDoughnut"><br v-if="!isTheChartPieOrDoughnut">
            <input 
                v-if="!isTheChartPieOrDoughnut" 
                type="checkbox" 
                id="show-y-label" 
                v-model="currentPropertiesForChart.showYLabel" 
                @change="toggleToggler()"
            >
            <label 
                v-if="!isTheChartPieOrDoughnut" 
                for="show-y-label"
            > 
                Y Label 
            </label>
            <br v-if="!isTheChartPieOrDoughnut"><br v-if="!isTheChartPieOrDoughnut">
            <input 
                v-if="!isTheChartPieOrDoughnut" 
                type="checkbox" 
                id="show-x-legend" 
                v-model="currentPropertiesForChart.showXLegend" 
                @change="toggleToggler()"
            >
            <label 
                v-if="!isTheChartPieOrDoughnut" 
                for="show-x-legend"
            > 
                X Legend 
            </label>
            <br v-if="!isTheChartPieOrDoughnut"><br v-if="!isTheChartPieOrDoughnut">
            <input 
                v-if="!isTheChartPieOrDoughnut" 
                type="checkbox" 
                id="show-y-legend" 
                v-model="currentPropertiesForChart.showYLegend" 
                @change="toggleToggler()"
            >
            <label 
                v-if="!isTheChartPieOrDoughnut" 
                for="show-y-legend"
            > 
                Y Legend 
            </label>
            <br v-if="!isTheChartPieOrDoughnut"><br v-if="!isTheChartPieOrDoughnut">
            <input 
                type="checkbox" 
                id="show-values-on-chart" 
                v-model="currentPropertiesForChart.showValuesOnChart" 
                @change="toggleToggler()"
            >
            <label 
                for="show-values-on-chart"
            > 
                Values On Chart 
            </label>
            <br><br>
            <input 
                type="checkbox" 
                id="show-title" 
                v-model="currentPropertiesForChart.showTitle" 
                @change="toggleToggler()"
            >
            <label 
                for="show-title"
            > 
                Title 
            </label>
            <br><br>
            <label 
                for="set-title"
            > 
                Set Title 
            </label>
            <input 
                type="text" 
                id="set-title" 
                v-model="currentPropertiesForChart.setTitle" 
                @change="toggleToggler()"
                placeholder="give a title"
            >
            <br><br>
            <label 
                v-if="!isTheChartPieOrDoughnut" 
                for="colorPicker"
            > 
                Color For Chart 
            </label>
            <input 
                v-if="!isTheChartPieOrDoughnut" 
                type="color" 
                id="colorPicker" 
                v-model="currentPropertiesForChart.colorForChart" 
                @change="toggleToggler()"
            >
            <br v-if="!isTheChartPieOrDoughnut"><br v-if="!isTheChartPieOrDoughnut">
            <label 
                v-if="isAreaChart" 
                for="opacity"
            > 
                Opacity 
            </label>
            <input 
                v-if="isAreaChart" 
                type="number" 
                id="opacity" 
                v-model="currentPropertiesForChart.opacity" 
                placeholder="set the opacity"
                @change="toggleToggler()"
            >
            <br v-if="!isTheChartPieOrDoughnut"><br v-if="!isTheChartPieOrDoughnut">
            <label v-if="isRadiusNeeded" for="radius"> Radius </label>
            <input v-if="isRadiusNeeded" id="radius" type="number" v-model="currentPropertiesForChart.radiusOfPoint" placeholder=" set the point radius " @change="toggleToggler()">
            <br v-if="isRadiusNeeded"><br v-if="isRadiusNeeded">
            <label v-if="!isTheChartPieOrDoughnut" for="max-width"> Width </label>
            <input v-if="!isTheChartPieOrDoughnut" id="max-width" type="number" v-model="currentPropertiesForChart.widthForChart" placeholder=" set the width of chart " @change="toggleToggler()">
            <br v-if="!isTheChartPieOrDoughnut" ><br v-if="!isTheChartPieOrDoughnut" >
            <label v-if="!isTheChartPieOrDoughnut" for="max-height"> Height </label>
            <input v-if="!isTheChartPieOrDoughnut" id="max-height" type="number" v-model="currentPropertiesForChart.heightForChart" placeholder=" set the height of chart " @change="toggleToggler()">
            <br v-if="!isTheChartPieOrDoughnut" ><br v-if="!isTheChartPieOrDoughnut" >
            <label v-if="isTheChartPieOrDoughnut" for="max-radius"> Radius </label>
            <input v-if="isTheChartPieOrDoughnut" id="max-radius" type="number" v-model="currentPropertiesForChart.radiusOfPieOrDoughnut" placeholder=" set the height of chart " @change="toggleToggler()">
            <br v-if="isTheChartPieOrDoughnut" ><br v-if="!isTheChartPieOrDoughnut" >
        </div>
    </div>
</template>

<script>

    import * as d3 from 'd3'
    import {mapState, mapMutations} from 'vuex'
    import {
        scaleLinear, 
        max, 
        scaleBand, 
        scaleTime,
        extent,
        axisLeft,
        axisBottom,
        line,
        area,
        scaleOrdinal,
        } from 'd3'

    export default {
        name : "D3Tes",
        computed : {
            ...mapState(["x_property", "y_property", "dataArray", "chartToUse", "currentPropertiesForChart", "makeTheXElementsUnique"]),
        },
        data () {
            return {
                target_data             : [],
                colors                  : '',
                isTheChartPieOrDoughnut : false,
                isRadiusNeeded          : false,
                isAreaChart             : false,
            }
        },
        methods : {

            ...mapMutations(["toggleToggler", "makeUniqueElements"]),

            render_horizontal_bar_chart ( 
                svg_id , 
                width, 
                height,
                x_label,
                y_label,
                data,
                margin,
                padding,
                title,
                color
            ) {

                const svg_bar_chart_horizontal = d3.select(svg_id)
                    .attr('height', height)
                    .attr('width', width)
                
                const addedHeightForTitle = 20
                const addedReducableRightWidth = 50
                const addedGapForYTitle = 30

                if (this.currentPropertiesForChart.showTitle) {
                    svg_bar_chart_horizontal.append("text")
                        .attr("x", (width / 2))             
                        .attr("y", addedHeightForTitle + (margin[0] / 2))
                        .attr("text-anchor", "center")  
                        .style("font-size", "16px") 
                        .text(title)
                }
                
                const innerWidth = width - margin[3] - margin[1] - addedReducableRightWidth
                const innerHeight = height - margin[0] - margin[2]
                
                const xValue = d => d.x
                const yValue = d => d.y
                
                const xScale = scaleLinear()
                    .domain([0, max(data, yValue)])
                    .range([0, innerWidth])
                    .nice()
                
                const yScale = scaleBand()
                    .domain(data.map(xValue))
                    .range([0, innerHeight])
                    .padding(padding)

                const g = svg_bar_chart_horizontal.append('g')
                    .attr('transform', `translate(${margin[3] + addedGapForYTitle}, ${addedHeightForTitle + margin[0]})`)

                if (this.currentPropertiesForChart.showXLegend) {
                    const xAxis = axisBottom(xScale)
                    g.append('g').call(xAxis)
                    .attr('transform', `translate(0, ${innerHeight})`)
                }
                
                if (this.currentPropertiesForChart.showYLegend) {
                    const yAxis = axisLeft(yScale)
                    g.append('g').call(yAxis)
                }

                const barWidth = yScale.bandwidth()

                if(this.currentPropertiesForChart.showYLabel) {
                    svg_bar_chart_horizontal.append("text")
                    .attr('y', (height - 10))
                    .attr('x', (width / 2))
                    .attr("text-anchor", "center")  
                    .style("font-size", "14px") 
                    .text(y_label)
                }

                if(this.currentPropertiesForChart.showXLabel) {
                    svg_bar_chart_horizontal.append("text")
                    .attr("x", 0)
                    .attr("y", height / 2)
                    .attr("text-anchor", "center")  
                    .style("font-size", "14px") 
                    .attr("transform", `rotate(-90,20,${height/2})`)
                    .text(x_label)
                }  
                
                if(this.currentPropertiesForChart.showValuesOnChart) {
                    g.selectAll('rect').data(data)
                    .enter().append("text")
                    .attr('y', d => (barWidth*0.65) + (yScale(xValue(d))))
                    .attr('x', d => (xScale(yValue(d))) + 5)
                    .attr("text-anchor", "start")  
                    .style("font-size", "14px") 
                    .text(d => d.y)
                }  
                    
                g.selectAll('rect').data(data)
                .enter().append('rect')
                    .attr('y', d => yScale(xValue(d)))
                    .attr('width', d => xScale(yValue(d)))
                    .attr('height', barWidth)
                    .attr('fill', color)
            },
            render_vertical_bar_chart (
                svg_id , 
                width , 
                height , 
                x_label ,
                y_label ,
                data , 
                margin ,
                padding ,
                title,
                color
            ) {

                const svg_bar_chart_vertical = d3.select(svg_id)
                    .attr('height', height)
                    .attr('width', width)
                
                const addedHeightForTitle = 20
                const addedGapForYTitle = 5

                if (this.currentPropertiesForChart.showTitle) {
                    svg_bar_chart_vertical.append("text")
                        .attr("x", (width / 2))             
                        .attr("y", addedHeightForTitle + (margin[0] / 2))
                        .attr("text-anchor", "middle")  
                        .style("font-size", "16px") 
                        .text(title)
                }
                               
                
                const innerWidth = width - margin[3] - margin[1]
                const innerHeight = height - margin[0] - margin[2]
                
                const maxYValue = max(data, d=>d.y)
                
                const xValue = d => d.x
                const yValue = d => { return (maxYValue - d.y)}
                
                const xScale = scaleBand()
                    .domain(data.map(xValue))
                    .range([0, innerWidth])
                
                const yScale = scaleLinear()
                    .domain([0, maxYValue])
                    .range([innerHeight, 0])
                    .nice()
                
                const g = svg_bar_chart_vertical.append('g')
                    .attr('transform', `translate(${margin[3] + addedGapForYTitle}, ${addedHeightForTitle + margin[0]})`)
                
                if(this.currentPropertiesForChart.showXLegend) {
                    const xAxis = axisBottom(xScale)
                    g.append('g').call(xAxis)
                        .attr('transform', `translate(0, ${innerHeight})`)
                }
                
                if(this.currentPropertiesForChart.showYLegend) {
                    const yAxis = axisLeft(yScale)
                    g.append('g').call(yAxis)
                }
                
                const padding_factor = 30
                let current_x = padding*padding_factor
                const barBandwidth = xScale.bandwidth() - (2*padding*padding_factor)

                if(this.currentPropertiesForChart.showXLabel) { 
                    svg_bar_chart_vertical.append("text")
                        .attr('y', (height - 10))
                        .attr('x', (width / 2))
                        .attr("text-anchor", "center")  
                        .style("font-size", "14px") 
                        .text(x_label)
                }
                
                if(this.currentPropertiesForChart.showYLabel) { 
                    svg_bar_chart_vertical.append("text")
                        .attr("x", 0)
                        .attr("y", height / 2)
                        .attr("text-anchor", "center")  
                        .style("font-size", "14px") 
                        .attr("transform", `rotate(-90,20,${height/2})`)
                        .text(y_label)
                }
                
                if(this.currentPropertiesForChart.showValuesOnChart) { 
                    g.selectAll('rect').data(data)
                        .enter().append("text")
                        .attr('y', d => innerHeight - yScale(yValue(d)) - 5)
                        .attr('x', d => (barBandwidth/2) + xScale(xValue(d)))
                        .attr("text-anchor", "middle")  
                        .style("font-size", "14px") 
                        .text(d => d.y)
                } 
                
                g.selectAll('rect').data(data)
                    .enter().append('rect')
                        .attr('y', d => innerHeight - yScale(yValue(d)))
                        .attr('x', d => {
                            let tmp = current_x
                            current_x += xScale.bandwidth(d)
                            return tmp
                        })
                        .attr('width', barBandwidth)
                        .attr('height', d => yScale(yValue(d)))
                        .attr('fill', color)
            },
            render_scatter_chart (
                svg_id , 
                width , 
                height ,
                data ,
                margin ,  	
                radius ,
                title 
            ) {
            
            
                const svg_scatter_chart = d3.select(svg_id)
                    .attr('height', height)
                    .attr('width', width)
                
                const addedHeightForTitle = 20
                
                svg_scatter_chart.append("text")
                        .attr("x", (width / 2))             
                        .attr("y", addedHeightForTitle + (margin[0] / 2))
                        .attr("text-anchor", "middle")  
                        .style("font-size", "16px") 
                        .text(title);
                
                const innerWidth = width - margin[3] - margin[1]
                const innerHeight = height - margin[0] - margin[2]
                
                const xValue = d => d.x
                const yValue = d => d.y
                
                const xScale = scaleTime()
                    .domain(extent(data, xValue))
                    .range([0, innerWidth])
                    .nice()
                
                const yScale = scaleLinear()
                    .domain(extent(data, yValue))
                    .range([innerHeight, 0])
                    .nice()
                
                const yAxis = axisLeft(yScale)
                const xAxis = axisBottom(xScale)
                
                const g = svg_scatter_chart.append('g')
                    .attr('transform', `translate(${margin[3]}, ${addedHeightForTitle + margin[0]})`)
                
                g.append('g').call(yAxis)
                g.append('g').call(xAxis)
                    .attr('transform', `translate(0, ${innerHeight})`)
            
                g.selectAll('circle').data(data)
                .enter().append('circle')
                    .attr('cy', d => yScale(yValue(d)))
                    .attr('cx', d => xScale(xValue(d)))
                    .attr('r', radius)
            },
            render_line_chart (
                svg_id , 
                width , 
                height ,
                x_label ,
                y_label ,
                data ,
                margin ,  	
                padding ,
                radius ,
                title,
                color
            ) {
                const svg_line_chart = d3.select(svg_id)
                    .attr('height', height)
                    .attr('width', width)
                
                const addedHeightForTitle = 20
                
                if (this.currentPropertiesForChart.showTitle) {
                    svg_line_chart.append("text")
                        .attr("x", (width / 2))             
                        .attr("y", addedHeightForTitle)
                        .attr("text-anchor", "middle")  
                        .style("font-size", "16px") 
                        .text(title)
                }
                    
                const addedGapForYTitle = 30
                const innerWidth = width - margin[3] - margin[1] - addedGapForYTitle
                const innerHeight = height - margin[0] - margin[2]
                
                const xValue = d => d.x
                const yValue = d => d.y
                
                const xScale = scaleBand()
                    .domain(data.map(xValue))
                    .range([0, innerWidth])
                    .padding(padding)
                
                const yScale = scaleLinear()
                    .domain(extent(data, yValue))
                    .range([innerHeight, 0])
                    .nice()
                               
                
                const g = svg_line_chart.append('g')
                    .attr('transform', `translate(${margin[3] + addedGapForYTitle}, ${addedHeightForTitle + margin[0]})`)
                
                if (this.currentPropertiesForChart.showXLegend) {
                    const xAxis = axisBottom(xScale)
                    g.append('g').call(xAxis)
                        .attr('transform', `translate(0, ${innerHeight})`)
                } 
                
                if (this.currentPropertiesForChart.showYLegend) {
                    const yAxis = axisLeft(yScale)
                    g.append('g').call(yAxis)
                }
                
                const lineGenerator = line()
                    .x(d => xScale(xValue(d)))
                    .y(d => yScale(yValue(d)))

                if (this.currentPropertiesForChart.showYLabel) {
                    svg_line_chart.append("text")
                        .attr("x", 0)
                        .attr("y", height / 2)
                        .attr("text-anchor", "center")  
                        .style("font-size", "14px") 
                        .attr("transform", `rotate(-90,20,${height/2})`)
                        .text(y_label)
                }

                if (this.currentPropertiesForChart.showXLabel) {
                    svg_line_chart.append("text")
                        svg_line_chart.append("text")
                    .attr('y', (height - 10))
                    .attr('x', (width / 2))
                    .attr("text-anchor", "center")  
                    .style("font-size", "14px") 
                    .text(x_label)
                }               
                
                
                g.append('path')
                    .attr('class', 'line_path')
                    .attr('d', lineGenerator(data))
                    .attr('fill', 'none')
                    .attr('stroke', color)
                    .attr('stroke-width', '0.2rem')
                    .attr('stroke0line-join', 'round')
                
                g.selectAll('circle').data(data)
                    .enter().append('circle')
                    .attr('cy', d => yScale(yValue(d)))
                    .attr('cx', d => xScale(xValue(d)))
                    .attr('r', radius)
                
                if (this.currentPropertiesForChart.showValuesOnChart) {
                    g.selectAll('rect').data(data)
                        .enter().append("text")
                        .attr('y', d => yScale(yValue(d)))
                        .attr('x', d => xScale(xValue(d)))
                        .attr("text-anchor", "middle")  
                        .style("font-size", "14px") 
                        .text(d => d.y)
                        .attr("dx", "10")
                        .attr("dy", "-20")
                }
            },
            render_area_chart (
                svg_id , 
                width , 
                height ,
                x_label ,
                y_label , 
                data ,
                margin , 	
                title,
                color,
                opacity
            ) {

                const svg_area_chart = d3.select(svg_id)
                .attr('height', height)
                .attr('width', width)
                
                const addedHeightForTitle = 20
                
                if(this.currentPropertiesForChart.showTitle) {
                    svg_area_chart.append("text")
                        .attr("x", (width / 2))             
                        .attr("y", addedHeightForTitle + (margin[0] / 2))
                        .attr("text-anchor", "middle")  
                        .style("font-size", "16px") 
                        .text(title)
                }
                
                const innerWidth = width - margin[3] - margin[1]
                const innerHeight = height - margin[0] - margin[2]
                
                const xValue = d => d.x
                const yValue = d => d.y
                
                const xScale = scaleBand()
                    .domain(data.map(xValue))
                    .range([0, innerWidth])
                
                const yScale = scaleLinear()
                    .domain([0, 1.1*max(data, yValue)])
                    .range([innerHeight, 0])
                    .nice()
                
                
                const g = svg_area_chart.append('g')
                    .attr('transform', `translate(${margin[3]}, ${addedHeightForTitle + margin[0]})`)
                
                if(this.currentPropertiesForChart.showXLegend) {
                    const xAxis = axisBottom(xScale)
                        .ticks(6)
                        .tickSize(-innerHeight)
                        .tickPadding(15)

                    g.append('g').call(xAxis)
                        .attr('transform', `translate(0, ${innerHeight})`)
                }

                if(this.currentPropertiesForChart.showYLegend) {
                    const yAxis = axisLeft(yScale)
                        .ticks(6)
                        .tickSize(-innerWidth)
                        .tickPadding(15)
                        
                    g.append('g').call(yAxis)
                }

                let last_x = null
                let last_last_x = null
                let mid_x = null

                const lineGenerator = area()
                    .x(d => {
                        if (last_last_x == null) {
                            last_last_x = xScale(xValue(d))
                        } else if (last_last_x != null && last_x == null) {
                            last_x = xScale(xValue(d))
                            mid_x = (last_last_x + last_x) /2
                        }
                        return xScale(xValue(d))
                    })
                    .y0(innerHeight)
                    .y1( d => yScale(yValue(d)))                

                g.append('path')
                    .attr('class', 'area_path')
                    .attr('d', lineGenerator(data))
                    .attr('fill', color)
                    .attr('opacity', opacity)
                    .attr("transform","translate("+mid_x+",0)")

                if(this.currentPropertiesForChart.showXLabel) {
                    svg_area_chart.append("text")
                        .attr('y', (height - 10))
                        .attr('x', (width / 2))
                        .attr("text-anchor", "center")  
                        .style("font-size", "14px") 
                        .text(x_label)
                }

                if(this.currentPropertiesForChart.showYLabel) {
                    svg_area_chart.append("text")
                        .attr("x", 0)
                        .attr("y", height / 2)
                        .attr("text-anchor", "center")  
                        .style("font-size", "14px") 
                        .attr("transform", `rotate(-90,20,${height/2})`)
                        .text(y_label)
                }       
                
                if (this.currentPropertiesForChart.showValuesOnChart) {
                    g.selectAll('rect').data(data)
                        .enter().append("text")
                        .attr('y', d => yScale(yValue(d)))
                        .attr('x', d => xScale(xValue(d)))
                        .attr("text-anchor", "middle")  
                        .style("font-size", "14px") 
                        .text(d => d.y)
                        .attr("dx", mid_x)
                        // .attr("dy", "-20")
                }
                
            },
            render_pie_chart (
                svg_id , 
                Radius , 
                data , 
                margin,
                title 
            ) {

                const width = Radius
                const height = Radius

                const svg_pie_chart = d3.select(svg_id)
                    .attr('height', height)
                    .attr('width', width)
                
                const addedHeightForTitle = 20
                
                const g = svg_pie_chart.append('g')
                    .attr("transform", "translate(" + width / 2 + "," + (addedHeightForTitle + (height / 2)) + ")")
                
                if(this.currentPropertiesForChart.showTitle) {
                    svg_pie_chart.append("text")
                        .attr("x", (width / 2))             
                        .attr("y", addedHeightForTitle + (margin / 2))
                        .attr("text-anchor", "middle")  
                        .style("font-size", "16px") 
                        .text(title)
                }
                
                const radius = Math.min(width, height)/2 - margin
                
                const datas = []
                
                const pie = d3.pie().sort(null)
                
                data.forEach(d => datas.push(d.y))
                
                const colors = [ '#F38181', '#FCE38A', '#EAFFD0', '#95E1D3', '#AA96DA', '#FCBAD3', '#30E3CA', '#3282B8', '#C1F4C5', '#28FFBF', '#FFBF86',  '#C2F784']
                let additionalSpace = radius * 0.1
                const colorPallete = []
                
                let data_count = data.length
                
                while(data_count > 0){
                    if (data_count == 1) {
                        if((data_count-1) % colors.length == 0) {
                        colorPallete.push(colors[(data_count-1) % colors.length])
                    }
                    } else{
                    colorPallete.push(colors[data_count % colors.length])
                    }
                    data_count = data_count - 1
                }
                
                const color =  scaleOrdinal(colorPallete)
                
                const arc = d3.arc()
                    .innerRadius(0)
                    .outerRadius(radius)
                
                const arcs = g.selectAll('arc')
                    .data(pie(datas))
                    .enter().append('g')
                    .attr('class', 'arc_path')
                
                arcs.append('path')
                    .attr('fill', (d,i) => color(i))
                    .attr('d', arc)

                if(this.currentPropertiesForChart.showValuesOnChart) {

                    let total = 0

                    data.forEach( d => {
                        total += d.y
                    })
                    
                    const new_arc = d3.arc()
                        .outerRadius(radius*1.05)
                        .innerRadius(radius*1.05)
                    
                    const new_arcs = g.selectAll('new_arc')
                        .data(pie(datas))
                        .enter().append('g')
                        .attr('class', 'arc_path')

                    new_arcs.append("text")
                        .attr("transform", (d) => {
                            let angle = 0
                            angle = d.startAngle + ((d.endAngle - d.startAngle) / 2)
                            let xx = new_arc.centroid(d)[0] 
                            let yy = new_arc.centroid(d)[1]
                            let inner_xx = new_arc.centroid(d)[0] 
                            let inner_yy = new_arc.centroid(d)[1]
                            if ( 0 <= angle && angle < Math.PI/2) {
                                xx = xx + additionalSpace
                                yy = yy - additionalSpace
                            } else if (angle < Math.PI) {
                                xx = xx + additionalSpace
                                yy = yy + additionalSpace
                            } else if (angle < 1.5*Math.PI) {
                                xx = xx - additionalSpace
                                yy = yy + additionalSpace
                            } else {
                                xx = xx - additionalSpace
                                yy = yy - additionalSpace
                            }
                            
                            const xy = [xx,yy]
                            
                            g.append('line')
                                .style("stroke", "maroon")
                                .style("stroke-width", 1)
                                .attr("x1", inner_xx * 0.75)
                                .attr("y1", inner_yy * 0.75)
                                .attr("x2", inner_xx*1.05)
                                .attr("y2", inner_yy*1.05)
                            
                            g.append('circle')
                                .style("fill", "maroon")
                                .attr("cx", inner_xx * 0.75)
                                .attr("cy", inner_yy * 0.75)
                                .attr("r", 3)
                            
                            g.append('circle')
                                .style("fill", "maroon")
                                .attr("cx", inner_xx*1.05)
                                .attr("cy", inner_yy*1.05)
                                .attr("r", 3)
                            
                            return "translate(" + xy + ")"
                        })
                        .attr("text-anchor", "middle")
                        .style("fill", "Purple")
                        .style("font", "bold 10px Arial")
                        .text((d, i) => data[i].x.toString() + ' , ' + (100 * (data[i].y / total)).toFixed(1).toString() + '%')
                    
                }
                
            },
            render_doughnut_chart (
                svg_id , 
                Radius , 
                data , 
                margin,
                title
            ) {

                const width = Radius
                const height = Radius

                const svg_doughnout_chart = d3.select(svg_id)
                    .attr('height', height)
                    .attr('width', width)
                
                const addedHeightForTitle = 20
                
                const g = svg_doughnout_chart.append('g')
                    .attr("transform", "translate(" + width / 2 + "," + (addedHeightForTitle + (height / 2)) + ")")
                
                if(this.currentPropertiesForChart.showTitle) {
                    svg_doughnout_chart.append("text")
                        .attr("x", (width / 2))             
                        .attr("y", addedHeightForTitle + (margin / 2))
                        .attr("text-anchor", "middle")  
                        .style("font-size", "16px") 
                        .text(title)
                }
                
                const radius = Math.min(width, height)/2 - margin
                
                const datas = []
                
                const pie = d3.pie().sort(null)
                
                data.forEach(d => datas.push(d.y))
                
                const colors = [ '#F38181', '#FCE38A', '#EAFFD0', '#95E1D3', '#AA96DA', '#FCBAD3', '#30E3CA', '#3282B8', '#C1F4C5', '#28FFBF', '#FFBF86',  '#C2F784']
                let additionalSpace = radius * 0.1
                const colorPallete = []
                
                let data_count = data.length
                
                while(data_count > 0){
                    if (data_count == 1) {
                        if((data_count-1) % colors.length == 0) {
                        colorPallete.push(colors[(data_count-1) % colors.length])
                    }
                    } else{
                    colorPallete.push(colors[data_count % colors.length])
                    }
                    data_count = data_count - 1
                }
                
                const color =  scaleOrdinal(colorPallete)
                
                const arc = d3.arc()
                    .innerRadius(radius/2)
                    .outerRadius(radius)
                
                const arcs = g.selectAll('arc')
                    .data(pie(datas))
                    .enter().append('g')
                    .attr('class', 'arc_path')
                
                arcs.append('path')
                    .attr('fill', (d,i) => color(i))
                    .attr('d', arc)

                if(this.currentPropertiesForChart.showValuesOnChart) {

                    let total = 0

                    data.forEach( d => {
                        total += d.y
                    })
                    
                    const new_arc = d3.arc()
                        .outerRadius(radius*1.05)
                        .innerRadius(radius*1.05)
                    
                    const new_arcs = g.selectAll('new_arc')
                        .data(pie(datas))
                        .enter().append('g')
                        .attr('class', 'arc_path')

                    new_arcs.append("text")
                        .attr("transform", (d) => {
                            let angle = 0
                            angle = d.startAngle + ((d.endAngle - d.startAngle) / 2)
                            let xx = new_arc.centroid(d)[0] 
                            let yy = new_arc.centroid(d)[1]
                            let inner_xx = new_arc.centroid(d)[0] 
                            let inner_yy = new_arc.centroid(d)[1]
                            if ( 0 <= angle && angle < Math.PI/2) {
                                xx = xx + additionalSpace
                                yy = yy - additionalSpace
                            } else if (angle < Math.PI) {
                                xx = xx + additionalSpace
                                yy = yy + additionalSpace
                            } else if (angle < 1.5*Math.PI) {
                                xx = xx - additionalSpace
                                yy = yy + additionalSpace
                            } else {
                                xx = xx - additionalSpace
                                yy = yy - additionalSpace
                            }
                            
                            const xy = [xx,yy]
                            
                            g.append('line')
                                .style("stroke", "maroon")
                                .style("stroke-width", 1)
                                .attr("x1", inner_xx * 0.75)
                                .attr("y1", inner_yy * 0.75)
                                .attr("x2", inner_xx*1.05)
                                .attr("y2", inner_yy*1.05)
                            
                            g.append('circle')
                                .style("fill", "maroon")
                                .attr("cx", inner_xx * 0.75)
                                .attr("cy", inner_yy * 0.75)
                                .attr("r", 3)
                            
                            g.append('circle')
                                .style("fill", "maroon")
                                .attr("cx", inner_xx*1.05)
                                .attr("cy", inner_yy*1.05)
                                .attr("r", 3)
                            
                            return "translate(" + xy + ")"
                        })
                        .attr("text-anchor", "middle")
                        .style("fill", "Purple")
                        .style("font", "bold 10px Arial")
                        .text((d, i) => data[i].x.toString() + ' , ' + (100 * (data[i].y / total)).toFixed(1).toString() + '%')
                    
                }
                
            },
            populateTargetData () {
                this.dataArray.forEach(d => {
                    this.target_data.push({
                        x : d[this.x_property],
                        y : d[this.y_property],
                    })
                })
            }
        },
        mounted () {
            if (this.chartToUse === 'Pie Chart' || this.chartToUse === 'Doughnut Chart') {
                this.isTheChartPieOrDoughnut = true
                this.isRadiusNeeded = false
                this.isAreaChart = false
            } else {
                this.isTheChartPieOrDoughnut = false
                this.isAreaChart = false
                this.isRadiusNeeded = false
                if (this.chartToUse === 'Line Chart') {
                    this.isRadiusNeeded = true 
                } else if (this.chartToUse === 'Area Chart') {
                     this.isAreaChart = true
                }
            }
            this.populateTargetData()
            if (this.chartToUse === 'Horizontal Bar Chart') {
                this.render_horizontal_bar_chart(
                    '#svg_zone', 
                    this.currentPropertiesForChart.widthForChart, 
                    this.currentPropertiesForChart.heightForChart, 
                    this.x_property, 
                    this.y_property, 
                    this.target_data, 
                    [80, 80, 80, 80], 
                    0.1, 
                    this.currentPropertiesForChart.setTitle, 
                    this.currentPropertiesForChart.colorForChart
                )
            } else if (this.chartToUse === 'Vertical Bar Chart') {
                this.render_vertical_bar_chart(
                    '#svg_zone', 
                    this.currentPropertiesForChart.widthForChart, 
                    this.currentPropertiesForChart.heightForChart, 
                    this.x_property, 
                    this.y_property, 
                    this.target_data, 
                    [80, 80, 80, 80], 
                    0.1, 
                    this.currentPropertiesForChart.setTitle,
                    this.currentPropertiesForChart.colorForChart
                )
            } else if (this.chartToUse === 'Line Chart') {
                this.render_line_chart(
                    '#svg_zone', 
                    this.currentPropertiesForChart.widthForChart, 
                    this.currentPropertiesForChart.heightForChart, 
                    this.x_property, 
                    this.y_property, 
                    this.target_data, 
                    [80, 80, 80, 80], 
                    2.5, 
                    this.currentPropertiesForChart.radiusOfPoint, 
                    this.currentPropertiesForChart.setTitle,
                    this.currentPropertiesForChart.colorForChart
                )
            } else if (this.chartToUse === 'Area Chart') {
                this.render_area_chart(
                    '#svg_zone', 
                    this.currentPropertiesForChart.widthForChart, 
                    this.currentPropertiesForChart.heightForChart, 
                    this.x_property, 
                    this.y_property, 
                    this.target_data, 
                    [80, 80, 80, 80], 
                    this.currentPropertiesForChart.setTitle,
                    this.currentPropertiesForChart.colorForChart,
                    this.currentPropertiesForChart.opacity
                )
            } else if (this.chartToUse === 'Pie Chart') {
                this.render_pie_chart(
                    '#svg_zone', 
                    this.currentPropertiesForChart.radiusOfPieOrDoughnut,
                    this.target_data, 
                    120, 
                    this.currentPropertiesForChart.setTitle
                )
            } else if (this.chartToUse === 'Doughnut Chart') {
                this.render_doughnut_chart(
                    '#svg_zone', 
                    this.currentPropertiesForChart.radiusOfPieOrDoughnut,
                    this.target_data, 
                    120, 
                    this.currentPropertiesForChart.setTitle
                )
            }

        }
    }
</script>

<style scoped>
    .right-panel {
        width: 20%;
        float: right;
        margin: 10px;
        text-align: left;
    }
</style>

