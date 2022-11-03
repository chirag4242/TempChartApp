fetchTestData();
async function fetchTestData()
{
    const resoponse = await fetch("./GLB.Ts+dSST.csv");
    const text = await resoponse.text();
    const expected = text.split("\n").slice(1);
    expected.forEach(element =>
    {
        const row = element.split(',');
        const year = row[0];
        const temp = row[1];
        console.log(year, temp);

    })

}