addChart();
const xlabels = [];
const ylabels = [];
async function addChart()
{
    await getData();
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xlabels,
            datasets: [{
                label: 'Global average tempratre from 1880 to 2022',
                data: ylabels,
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
                    beginAtZero: true
                }
            }
        }
    });
}






async function getData()
{
    const resoponse = await fetch("./GLB.Ts+dSST.csv");
    const text = await resoponse.text();
    const table = text.split("\n").slice(1);
    table.forEach(row =>
    {
        const columns = row.split(',');
        const year = columns[0];
        xlabels.push(year);
        const temp = columns[1];
        ylabels.push(temp);
        console.log(year, temp);
    })
}