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
                label: 'Combined Land-Surface Air and Sea-Surface Water Temperature Anomalies in C°',
                data: data.ylabels,
                fill: false,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
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
    const resoponse = await fetch("./GLB.Ts+dSST.csv");
    const text = await resoponse.text();
    const table = text.split("\n").slice(1);
    table.forEach(row =>
    {
        const columns = row.split(',');
        const year = columns[0];
        xlabels.push(year);
        const temp = columns[1];
        ylabels.push(parseFloat(temp) + 14);
    })
    return { xlabels, ylabels }
}