document.addEventListener("DOMContentLoaded", () => {
    const sets = [
        { sets: ["User Docs"], size: 20, emoji: "👩‍👩‍👧‍👦" },
        { sets: ["Tech Docs"], size: 20, emoji: "💻" },
        { sets: ["User Docs", "Tech Docs"], size: 10, label: "Dev Docs", emoji: "👩‍💻" }
    ];

    const container = document.getElementById("venn-container");
    const svg = d3.select("#venn");
    const title = document.getElementById("docs-title");
    const list = document.getElementById("docs-items");

    function drawVenn() {
        const width = container.clientWidth;
        const height = width * 0.6;

        const chart = venn.VennDiagram().width(width).height(height);

        svg
            .attr("width", width)
            .attr("height", height)
            .datum(sets)
            .call(chart);

        const fills = {
            "User Docs": colours.blue[3],
            "Tech Docs": colours.yellow[3],
            "User Docs_Tech Docs": colours.peach[3]
        };

        svg.selectAll("path")
            .style("fill", d => fills[d.sets.join("_")] || "#ccc")
            .style("stroke", colours.green[4])
            .style("stroke-width", 2)
            .style("cursor", "pointer");

        svg.selectAll("text")
            .style("font-family", "Lato")
            .style("fill", "#000")
            .style("font-size", "18px")
            .style("font-weight", 700)
            .text(d => `${d.label || d.sets[0]} ${d.emoji || ""}`);

        svg.selectAll("g")
            .on("click", (event, d) => {
                const key = d.label || d.sets.join("_").replace("_", " ");
                showDocs(key);
            });
    }

    function showDocs(category) {
        const items = docs[category] || [];
        title.textContent = `${category}`;
        list.innerHTML = items
            .map(item => `<li>${item}</li>`)
            .join("");

        svg.selectAll("path")
            .style("opacity", d => (d.label === category || d.sets[0] === category) ? 1 : 0.6);
    }

    drawVenn();
    window.addEventListener("resize", drawVenn);
});
