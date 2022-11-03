addChart();

async function addChart()
{
    const data = await getData();
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.xlabels,
            datasets: [{
                label: 'Global-mean monthly, seasonal, and annual means temperature in C°',
                data: data.ylabels,
                fill: false,
                backgroundColor:
                    'rgba(255, 99, 132, 0.2)',
                borderColor:
                    'rgba(255, 99, 132, 1)',
                borderWidth: 1
            },
            {
                label: 'Northern Hemisphere-mean monthly, seasonal, and annual means Temperature Anomalies in C°',
                data: data.northHem,
                fill: false,
                backgroundColor:
                    'rgba(153, 102, 255, 0.2)'
                ,
                borderColor:
                    'rgba(153, 102, 255, 1)'
                ,
                borderWidth: 1
            },
            {
                label: 'Southern Hemisphere-mean monthly, seasonal, and annual means Temperature Anomalies in C°',
                data: data.southHem,
                fill: false,
                backgroundColor:
                    'rgba(75, 192, 192, 0.2)'
                ,
                borderColor:
                    'rgba(75, 192, 192, 1)'
                ,
                borderWidth: 1
            }
            ]
        },
        options: {
            scales: {
                y: {
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function (value, index, ticks)
                        {
                            return value + "°";
                        }
                    }
                }

            }
        }
    });
}

async function getData()
{
    const xlabels = [];
    const ylabels = [];
    const northHem = [];
    const southHem = [];
    const resoponse = await fetch("./ZonAnn.Ts+dSST.csv");
    const text = await resoponse.text();
    const table = text.split("\n").slice(1);
    table.forEach(row =>
    {
        const columns = row.split(',');
        const year = columns[0];
        xlabels.push(year);
        const temp = columns[1];
        ylabels.push(parseFloat(temp) + 14);
        const Ntemp = columns[2];
        const Stemp = columns[3];
        northHem.push(parseFloat(Ntemp) + 14);
        southHem.push(parseFloat(Stemp) + 14);
    })
    return { xlabels, ylabels, northHem, southHem }
}