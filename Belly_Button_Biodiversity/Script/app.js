const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

var metadata
var id
var samples

function init() {
  d3.json(url).then(function(data){
    metadata = data.metadata;
    id = data.names;
    samples = data.samples;
    var dropdown = d3.select("#selDataset");
    
    for (var i = 0; i < id.length; i++){
      dropdown.append("option").text(id[i]).attr("value", id[i]);
    };
    bar(id[0]);
    bubble(id[0])
    summary(id[0])
  });
}

function summary(dp_ID){
  d3.select("metadata").selectAll("p").remove();
  for (var i = 0; i < id.length; i++){
    if (dp_ID == id[i]){
      d3.select("#sample-metadata").append("p").text(`ID: ${metadata[i].id}`);
      d3.select("#sample-metadata").append("p").text(`ETHNICITY: ${metadata[i].ethnicity}`);
      d3.select("#sample-metadata").append("p").text(`GENDER: ${metadata[i].gender}`);
      d3.select("#sample-metadata").append("p").text(`AGE: ${metadata[i].age}`);
      d3.select("#sample-metadata").append("p").text(`LOCATION: ${metadata[i].location}`);
      d3.select("#sample-metadata").append("p").text(`BBTYPE: ${metadata[i].bbtype}`);
      d3.select("#sample-metadata").append("p").text(`WFREQ: ${metadata[i].wfreq}`);
    };
  };
};

function bar(dp_ID){
  for (var i = 0; i < id.length; i++){
    if (dp_ID == id[i]){
      var value_sort = samples[i].sample_values.sort((a, b) => b.sample_values - a.sample_values);
      var samp = value_sort.slice(0, 10)
      var sample_values = samp.reverse()
      var temp = samples[i].otu_ids.slice(0, 10);
      var otu_ids = temp.map(function (x) {
        return "OTU " + x;
      });

      var otu_labels = samples[i].otu_labels.slice(0, 10);
      var data1 = [{
        type: 'bar',
        x: sample_values,
        y: otu_ids,
        yaxis: otu_labels,
        orientation: 'h'
      }];
      Plotly.newPlot("bar", data1);
    };
  };

};

function bubble(dp_ID){
  for (var i = 0; i < id.length; i++){
    if (dp_ID == id[i]){
      var sample_values = samples[i].sample_values;
      var otu_ids = samples[i].otu_ids;
      var otu_labels = samples[i].otu_labels;
      var data2 = [{
        x: otu_ids,
        y: sample_values,
        mode: 'markers',
        text: otu_labels,
        marker: {
          size: sample_values,
          color: otu_ids,
          colorscale: "Earth",
        }
      }];
      Plotly.newPlot("bubble", data2);
    };
  };
};


function idChanger(value) {
  bar(value);
  bubble(value)
  summary(value)
}

init();