// Initializes the page with a default plot

d3.json("samples.json").then((data) => {

 function init(index=0){
  console.log(data);
  var sampleValues = data.samples[index].sample_values.slice(0,10);
  var otu_ids = data.samples[index].otu_ids.slice(0,10);
  var otuLabels = data.samples[index].otu_labels.slice(0,10);

  data_bar = [{
    x: sampleValues.reverse(),
    y: otu_ids.map(id => "OTU " + id).reverse(),
    text: otuLabels.reverse(),
    type: "bar",
    orientation: "h"
   }];

  data_bubble = [{
      x: data.samples[index].otu_ids,
      y: data.samples[index].sample_values,
      text: data.samples[index].otu_labels,
      mode: 'markers',
      marker: {
          color: data.samples[index].otu_ids,
          size: data.samples[index].sample_values
      }      
      }]

  var layout_bubble = {
      xaxis: {title:'OTU ID'}
  };

  Plotly.newPlot("bar", data_bar);
  Plotly.newPlot("bubble", data_bubble, layout_bubble);

  d3.select("#sample-metadata").text("")

  for(key in data.metadata[index]){
      d3.select("#sample-metadata").append("p").text(`${key}: ${data.metadata[index][key]}`);
  }
}//INIT ENDS

function change() {
  var dropdown_value = d3.select("#selDataset").property("value");
  var id = data.samples.map( object => object.id);
  var i = 0
  id.forEach(item => {
      i += 1;//ITERATE TO FIND REQUESTED OTU ID's INDEX IN DATASET
      if (item == dropdown_value) {index = i - 1};
  });
  init(index)
}

data.samples.map( object => d3.select("#selDataset").append("option").text(object.id));
d3.selectAll("#selDataset").on("change", change);

init();//initial call
});