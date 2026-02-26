
// 1. Define a point of interest (ROI)

var roi = ee.Geometry.Point([-122.2531, 37.6295]);

// 2. Load and filter the Landsat 8 collection 

// 3. Calculate NDVI: (NIR - Red) / (NIR + Red)
// Landsat 8 bands: B5 is NIR, B4 is Red

var collection = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
  .filterBounds(roi)
  .filterDate('2022-01-01', '2023-12-31')
  .map(function(image) {
            var ndvi = image.normalizedDifference(['SR_B5', 'SR_B4']).rename('NDVI');
    return image.addBands(ndvi);
  });
  
  
// 4. Create the Time Series Chart on gee userinterface
        var chart = ui.Chart.image.series({
          imageCollection: collection.select('NDVI'),
          region: roi,
          reducer: ee.Reducer.mean(),
          scale: 30
        }).setOptions({
          title: 'NDVI Time Series for Selected Location',
          vAxis: {title: 'NDVI Value'},
          hAxis: {title: 'Date'},
          lineWidth: 1,
          pointSize: 3,
          series: {0: {color: 'green'}}
        });

// 5. Display the chart in the Console tab
      print(chart);



