<template>
    <div>

    </div>
</template>

<script>

    import {
    select, 
    csv, 
    scaleLinear, 
    max, 
    scaleBand, 
    scalePoint,
    scaleTime,
    extent,
    axisLeft,
    axisBottom,
    axisTop,
    min,
    line,
    area,
    curveBasis,
    scaleOrdinal,
    schemeSet2
    } from d3

    export default {
        name : "D3Tes",
        data () {
            return {
                defaultParameters = {
                    width 	: 900,
                    height	: 450,
                    title		: 'Title',
                    data		: [],
                    margin 	: [20, 20, 20, 20],
                    padding : 30,
                    radius	: 6,
                    svg_id	: '',
                    x_label : 'X Label',
                    y_label : 'Y_Label',
                }
            }
        },
        methods : {
            render_horizontal_bar_chart ( 
                svg_id = defaultParameters.svg_id, 
                width = defaultParameters.width, 
                height = defaultParameters.height,
                x_label = defaultParameters.x_label,
                y_label = defaultParameters.y_label,
                data = defaultParameters.data,
                margin = 	defaultParameters.margin, 
                padding = defaultParameters.padding,
                title = defaultParameters.title
            ) {

                const svg_bar_chart_horizontal = d3.select(svg_id)
                    .attr('height', height)
                    .attr('width', width)
                
                const addedHeightForTitle = 20
                const addedReducableRightWidth = 50
                const addedGapForYTitle = 30
                
                svg_bar_chart_horizontal.append("text")
                        .attr("x", (width / 2))             
                        .attr("y", addedHeightForTitle + (margin[0] / 2))
                        .attr("text-anchor", "center")  
                        .style("font-size", "16px") 
                        .text(title)
                
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
                
                const yAxis = axisLeft(yScale)
                const xAxis = axisBottom(xScale)
                
                const g = svg_bar_chart_horizontal.append('g')
                    .attr('transform', `translate(${margin[3] + addedGapForYTitle}, ${addedHeightForTitle + margin[0]})`)
                
                g.append('g').call(yAxis)
                g.append('g').call(xAxis)
                    .attr('transform', `translate(0, ${innerHeight})`)

                const barWidth = yScale.bandwidth()
                
                svg_bar_chart_horizontal.append("text")
                    .attr('y', (height - 10))
                    .attr('x', (width / 2))
                    .attr("text-anchor", "center")  
                    .style("font-size", "14px") 
                    .text(x_label)
                
                svg_bar_chart_horizontal.append("text")
                    .attr("x", 0)
                        .attr("y", height / 2)
                    .attr("text-anchor", "center")  
                    .style("font-size", "14px") 
                    .attr("transform", `rotate(-90,20,${height/2})`)
                    .text(y_label)
                
                
                g.selectAll('rect').data(data)
                    .enter().append("text")
                    .attr('y', d => (barWidth*0.65) + (yScale(xValue(d))))
                    .attr('x', d => (xScale(yValue(d))) + 5)
                    .attr("text-anchor", "start")  
                    .style("font-size", "14px") 
                    .text(d => d.y)
                    
                
                g.selectAll('rect').data(data)
                .enter().append('rect')
                    .attr('y', d => yScale(xValue(d)))
                    .attr('width', d => xScale(yValue(d)))
                    .attr('height', barWidth)
            },
            render_vertical_bar_chart (
                svg_id = defaultParameters.svg_id, 
                width = defaultParameters.width, 
                height = defaultParameters.height, 
                x_label = defaultParameters.x_label,
                y_label = defaultParameters.y_label,
                data = defaultParameters.data, 
                margin = 	defaultParameters.margin,
                padding = defaultParameters.padding,
                title = defaultParameters.title
                ) {

                const svg_bar_chart_vertical = d3.select(svg_id)
                    .attr('height', height)
                    .attr('width', width)
                
                const addedHeightForTitle = 20
                const addedGapForYTitle = 5
                
                svg_bar_chart_vertical.append("text")
                        .attr("x", (width / 2))             
                        .attr("y", addedHeightForTitle + (margin[0] / 2))
                        .attr("text-anchor", "middle")  
                        .style("font-size", "16px") 
                        .style("text-decoration", "underline")  
                        .text(title);
                
                const innerWidth = width - margin[3] - margin[1]
                const innerHeight = height - margin[0] - margin[2]
                
                const maxPopulation = max(data, d=>d.y)
                
                const xValue = d => d.x
                const yValue = d => { return (maxPopulation - d.y)}
                
                const xScale = scaleBand()
                    .domain(data.map(xValue))
                    .range([0, innerWidth])
                
                const yScale = scaleLinear()
                    .domain([0, maxPopulation])
                    .range([innerHeight, 0])
                    .nice()
                
                const xAxis = axisBottom(xScale)
                const yAxis = axisLeft(yScale)
                
                const g = svg_bar_chart_vertical.append('g')
                    .attr('transform', `translate(${margin[3] + addedGapForYTitle}, ${addedHeightForTitle + margin[0]})`)
                
                g.append('g').call(yAxis)
                g.append('g').call(xAxis)
                    .attr('transform', `translate(0, ${innerHeight})`)
                
                const padding_factor = 60
                let current_x = padding*padding_factor
                const barBandwidth = xScale.bandwidth() - (2*padding*padding_factor)
                
                svg_bar_chart_vertical.append("text")
                    .attr('y', (height - 10))
                    .attr('x', (width / 2))
                    .attr("text-anchor", "center")  
                    .style("font-size", "14px") 
                    .text(x_label)
                
                svg_bar_chart_vertical.append("text")
                    .attr("x", 0)
                        .attr("y", height / 2)
                    .attr("text-anchor", "center")  
                    .style("font-size", "14px") 
                    .attr("transform", `rotate(-90,20,${height/2})`)
                    .text(y_label)
                
                g.selectAll('rect').data(data)
                    .enter().append("text")
                    .attr('y', d => innerHeight - yScale(yValue(d)) - 5)
                    .attr('x', d => (barBandwidth/2) + xScale(xValue(d)))
                    .attr("text-anchor", "middle")  
                    .style("font-size", "14px") 
                    .text(d => d.y)
                
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
            },
            render_scatter_chart (
                svg_id = defaultParameters.svg_id, 
                width = defaultParameters.width, 
                height = defaultParameters.height,
                x_label = defaultParameters.x_label,
                y_label = defaultParameters.y_label,
                data = defaultParameters.data,
                margin = defaultParameters.margin,  	
                padding = defaultParameters.padding,
                radius = defaultParameters.radius,
                title = defaultParameters.title
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
                        .style("text-decoration", "underline")  
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
                svg_id = defaultParameters.svg_id, 
                width = defaultParameters.width, 
                height = defaultParameters.height,
                x_label = defaultParameters.x_label,
                y_label = defaultParameters.y_label,
                data = defaultParameters.data,
                margin = defaultParameters.margin,  	
                padding = defaultParameters.padding,
                radius = defaultParameters.radius,
                title = defaultParameters.title
            ) {

                const svg_line_chart = d3.select(svg_id)
                    .attr('height', height)
                    .attr('width', width)
                
                const addedHeightForTitle = 20
                
                svg_line_chart.append("text")
                        .attr("x", (width / 2))             
                        .attr("y", addedHeightForTitle + (margin[0] / 2))
                        .attr("text-anchor", "middle")  
                        .style("font-size", "16px") 
                        .style("text-decoration", "underline")  
                        .text(title)
                    
                const addedGapForYTitle = 30
                
                const innerWidth = width - margin[3] - margin[1] - addedGapForYTitle
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
                
                const g = svg_line_chart.append('g')
                    .attr('transform', `translate(${margin[3] + addedGapForYTitle}, ${addedHeightForTitle + margin[0]})`)
                
                g.append('g').call(yAxis)
                g.append('g').call(xAxis)
                    .attr('transform', `translate(0, ${innerHeight})`)
                
                
                const lineGenerator = line()
                        .x(d => xScale(xValue(d)))
                    .y(d => yScale(yValue(d)))
                    .curve(curveBasis)
                
                svg_line_chart.append("text")
                    .attr('y', (height - 10))
                    .attr('x', (width / 2))
                    .attr("text-anchor", "center")  
                    .style("font-size", "14px") 
                    .text(x_label)
                
                svg_line_chart.append("text")
                    .attr("x", 0)
                        .attr("y", height / 2)
                    .attr("text-anchor", "center")  
                    .style("font-size", "14px") 
                    .attr("transform", `rotate(-90,20,${height/2})`)
                    .text(y_label)
                
                g.append('path')
                    .attr('class', 'line_path')
                    .attr('d', lineGenerator(data))
                
                    g.selectAll('circle').data(data)
                    .enter().append('circle')
                    .attr('cy', d => yScale(yValue(d)))
                    .attr('cx', d => xScale(xValue(d)))
                    .attr('r', radius)
                
                g.selectAll('rect').data(data)
                    .enter().append("text")
                    .attr('y', d => yScale(yValue(d)))
                    .attr('x', d => xScale(xValue(d)))
                    .attr("text-anchor", "middle")  
                    .style("font-size", "14px") 
                    .text(d => d.y)
                    .attr('transform',`rotate(-90, (${yScale(yValue(d))}), (${xScale(xValue(d))}))`)
            },
            render_area_chart (
                svg_id = defaultParameters.svg_id, 
                width = defaultParameters.width, 
                height = defaultParameters.height,
                x_label = defaultParameters.x_label,
                y_label = defaultParameters.y_label, 
                data = defaultParameters.data,
                margin = defaultParameters.margin, 	
                padding = defaultParameters.padding,
                title = defaultParameters.title
            ) {

                const svg_area_chart = d3.select(svg_id)
                .attr('height', height)
                .attr('width', width)
                
                const addedHeightForTitle = 20
                
                svg_area_chart.append("text")
                        .attr("x", (width / 2))             
                        .attr("y", addedHeightForTitle + (margin[0] / 2))
                        .attr("text-anchor", "middle")  
                        .style("font-size", "16px") 
                        .style("text-decoration", "underline")  
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
                    .domain([0, max(data, yValue)])
                    .range([innerHeight, 0])
                    .nice()
                
                const yAxis = axisLeft(yScale)
                    .ticks(6)
                        .tickSize(-innerWidth)
                    .tickPadding(15)
                const xAxis = axisBottom(xScale)
                    .ticks(6)
                        .tickSize(-innerHeight)
                    .tickPadding(15)
                
                const g = svg_area_chart.append('g')
                    .attr('transform', `translate(${margin[3]}, ${addedHeightForTitle + margin[0]})`)
                
                g.append('g').call(yAxis)
                g.append('g').call(xAxis)
                    .attr('transform', `translate(0, ${innerHeight})`)
                
                const lineGenerator = area()
                        .x(d => xScale(xValue(d)))
                    .y0(innerHeight)
                    .y1(d => yScale(yValue(d)))
                    .curve(curveBasis)
                
                g.append('path')
                    .attr('class', 'area_path')
                    .attr('d', lineGenerator(data))
                
            },
            render_pie_chart (
                svg_id = defaultParameters.svg_id, 
                width = defaultParameters.width, 
                height = defaultParameters.height, 
                x_label = defaultParameters.x_label,
                y_label = defaultParameters.y_label,
                data = defaultParameters.data, 
                margin = defaultParameters.margin[0],
                title = defaultParameters.title
            ) {

                const svg_pie_chart = d3.select(svg_id)
                    .attr('height', height)
                    .attr('width', width)
                
                const addedHeightForTitle = 20
                
                
                svg_pie_chart.append("text")
                        .attr("x", (width / 2))             
                        .attr("y", addedHeightForTitle + (margin / 2))
                        .attr("text-anchor", "middle")  
                        .style("font-size", "16px") 
                        .style("text-decoration", "underline")  
                        .text(title);
                
                const g = svg_pie_chart.append('g')
                    .attr("transform", "translate(" + ( width / 2 ) + "," + (addedHeightForTitle + (height / 2)) + ")")
                
                const radius = Math.min(width, height)/2 - margin
                
                const xValue = d => d.x
                const yValue = d => d.y
                
                const datas = []
                
                const pie = d3.pie()
                
                data.forEach(d => datas.push(d.y))
                
                const colors = [ '#FFE8DF', '#BE9FE1', '#6FE7DD', '#142850', '#EA907A' ]
                
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
                
                let total = 0
                
                data.forEach( d => {
                    total += d.y
                })
                
                
                const new_arc = d3.arc()
                    .innerRadius(radius * 1.25)
                    .outerRadius(radius * 1.5)
                
                const new_arcs = g.selectAll('new_arc')
                    .data(pie(datas))
                    .enter().append('g')
                    .attr('class', 'arc_path')
                
                new_arcs.append("svg:text")
                    .attr("transform", (d) => {
                    d.outerRadius = radius * 1.5
                    d.innerRadius = radius * 1.25
                    return "translate(" + new_arc.centroid(d) + ")"
                    })
                    .attr("text-anchor", "middle")
                    .style("fill", "Purple")
                    .style("font", "bold 10px Arial")
                    .text((d, i) => data[i].x.toString() + ' , ' + (100 * (data[i].y / total)).toFixed(1).toString() + '%'  )

                
            },

            render_donought_chart (
                svg_id = defaultParameters.svg_id, 
                width = defaultParameters.width, 
                height = defaultParameters.height,
                x_label = defaultParameters.x_label,
                y_label = defaultParameters.y_label,
                data = defaultParameters.data, 
                margin = defaultParameters.margin[0],
                title = defaultParameters.title
            ) {
                const svg_doughnout_chart = d3.select(svg_id)
                    .attr('height', height)
                    .attr('width', width)
                
                const addedHeightForTitle = 20
                
                const g = svg_doughnout_chart.append('g')
                    .attr("transform", "translate(" + width / 2 + "," + (addedHeightForTitle + (height / 2)) + ")")
                
                svg_doughnout_chart.append("text")
                        .attr("x", (width / 2))             
                        .attr("y", addedHeightForTitle + (margin / 2))
                        .attr("text-anchor", "middle")  
                        .style("font-size", "16px") 
                        .style("text-decoration", "underline")  
                        .text(title)
                
                    const radius = Math.min(width, height)/2 - margin
                
                const xValue = d => d.x
                const yValue = d => d.y
                
                const datas = []
                
                const pie = d3.pie()

                
                data.forEach(d => datas.push(d.y))
                
                const colors = [ '#F38181', '#FCE38A', '#EAFFD0', '#95E1D3', '#AA96DA', '#FCBAD3', '#30E3CA', '#3282B8', '#C1F4C5', '#28FFBF', '#FFBF86',  '#C2F784']
                
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
                
                let total = 0
                
                data.forEach( d => {
                    total += d.y
                })
                
                arcs.append("svg:text")
                    .attr("transform", (d) => {
                    d.outerRadius = radius + 50
                    d.innerRadius = radius + 45
                    return "translate(" + arc.centroid(d) + ")"
                    })
                    .attr("text-anchor", "middle")
                    .style("fill", "Purple")
                    .style("font", "bold 12px Arial")
                    .text((d, i) => data[i].x.toString() + ' , ' + (100 * (data[i].y / total)).toFixed(2).toString() + '%'  )
                
            }
        },
        mounted : {
            
            // let target_data = []

            // // for bar charts (h/v)

            // // csv('data.csv').then(data => {
            // //   data.forEach(d => {
            // //     target_data.push({x: d.country , y: +d.population})
            // //   });
            // // 	render_horizontal_bar_chart('#horizontal_bar_chart_svg', 900, 450, 'Population', 'Country', target_data, [20, 20, 80, 80], 0.1, "H Bar")
            // // 	render_vertical_bar_chart('#vertical_bar_chart_svg', 900, 450, 'Population', 'Country', target_data, [20, 20, 80, 80], 0.1, "V Bar")
            // // });




            // // target_data = []

            // // // for line, area, pie chart


            // csv('https://vizhub.com/curran/datasets/world-population-by-year-2015.csv').then(data => {
            //   data.forEach(d => {
            //     // target_data.push({x: new Date(d.year) , y: +d.population})
            //     target_data=[{x: 'A', y: 10}, {x: 'B', y: 10}, {x: 'C', y: 10}, {x: 'D', y: 100}, {x: 'E', y: 10}, {x: 'E', y: 10}, {x: 'F', y: 1}, {x: 'G', y: 100}, {x: 'E', y: 20}, {x: 'E', y: 5}, {x: 'E', y: 5}]
            //   });
            // 	render_line_chart('#line_chart_svg', 900, 450, 'Date', 'Population', target_data, [20, 20, 80, 80], 2.5, 5, "Line")
            // 	render_area_chart('#area_chart_svg', 900, 450, 'Date', 'Population', target_data, [20, 20, 60, 80], 2.5, "Area")
            // 	render_pie_chart('#pie_chart_svg', 900, 450, 'Date', 'Population', target_data, 80, "Pie")
            // 	render_donought_chart('#donought_chart_svg', 900, 450, 'Date', 'Population', target_data, 40, "Donought")
            // });


        }
    }
</script>

<style scoped>

</style>
