$(document).ready(function() {
  var studentUser = (location.href.indexOf('student') > 0);
  var mutationObserver;
  var inlineChart;
  var modalChart;

  function getBarColor(percentage) {
    if (percentage >= 91) return '#33cc99';
    else if ((percentage >= 75) && (percentage <= 90)) return '#67cc72';
    else if ((percentage >= 60) && (percentage <= 74)) return '#a8cc41';
    else if ((percentage >= 50) && (percentage <= 59)) return '#e3cc15';
    else if ((percentage >= 35) && (percentage <= 49)) return '#f4a000';
    else if ((percentage >= 20) && (percentage <= 34)) return '#e76d00';
    else return '#d93300';
  }

  function disconnectObserver() {
    if (mutationObserver) {
      mutationObserver.disconnect();
      mutationObserver = null;
    }
  }

  function clearInlineChart() {
    if (inlineChart && inlineChart.clearChart) {
      inlineChart.clearChart();
      inlineChart = null;
    }
  }

  function clearModalChart() {
    if (modalChart && modalChart.clearChart) {
      modalChart.clearChart();
      modalChart = null;
    }
  }

  function updateStudentReport(container, chart) {
    google.visualization.events.addListener(chart, 'ready', function() {
      var svg = container.getElementsByTagName('svg')[0];
      var barRects = svg.querySelectorAll("rect[width='1'][fill='#333333']");
      for (var i = 0; i < barRects.length; i++) {
        var barRect = barRects[i];
        barRect.setAttribute('fill', '#6c757d');
        barRect.setAttribute('width', 3);
      }

      barRects = svg.querySelectorAll("rect[width='1'][fill='#6c757d']");
      var startX = 0, finishX = 0;
      for (var i = 0; i < barRects.length; i++) {
        var barRect = barRects[i];
        var barRectX = parseFloat(barRect.getAttribute('x'));
        if (i > 0) {
          finishX = barRectX;
          barRect.setAttribute('x', (barRectX - 3));
          barRect.setAttribute('width', 3);
        } else {
          startX = barRectX;
          if (barRect.parentElement) {
            var parentElement = barRect.parentElement.parentElement;
            parentElement.appendChild(barRect.parentElement);
          } else if (barRect.parentNode) {
            var parentNode = barRect.parentNode.parentNode;
            parentNode.appendChild(barRect.parentNode);
          }
        }        
      }

      var barRects = svg.querySelectorAll("rect[height='1']");
      var imgWidth = 92, imgHeight = 28;
      for (var i = 0; i < barRects.length; i++) {
        var barRect = barRects[i];
        var barRectX = parseFloat(barRect.getAttribute('x'));
        if (barRectX < (startX + 1)) continue;
        var barRectY = parseFloat(barRect.getAttribute('y'));
        var x = (barRectX < (startX + imgWidth)) 
          ? (barRectX - (barRectX - startX) + 1)
          : (barRectX - imgWidth + 1);
        var y = (barRectY - (imgHeight / 2));
        var image = createImage({
          href: '/static/images/icon_reports_rocket.png',
          x: x,
          y: y,
          width: imgWidth,
          height: imgHeight
        });
        if (barRect.parentElement) barRect.parentElement.appendChild(image);
        else if (barRect.parentNode) barRect.parentNode.appendChild(image);
        barRect.setAttribute('x', parseFloat(x) + 20);
      }

      if (mutationObserver || !MutationObserver) return;
      mutationObserver = new MutationObserver(function() {
        var svg = container.getElementsByTagName('svg')[0];
        var barLabels = svg.querySelectorAll("text[text-anchor='end']");
        for (var i = 0; i < barLabels.length; i++) {
          var barLabel = barLabels[i];
          var barLabelRect = barLabel.nextSibling;
          if (!barLabelRect) continue;
          if (barLabel.getAttribute('data-x')) continue;
          if (barLabelRect.getAttribute('data-x')) continue;
          var barLabelX = parseFloat(barLabel.getAttribute('x'));
          if (barLabelX < startX) continue;
          var barLabelRectX = parseFloat(barLabelRect.getAttribute('x'));
          var barLabelRectWidth = parseFloat(barLabelRect.getAttribute('width'));
          barLabel.setAttribute('data-x', barLabelX);
          barLabelRect.setAttribute('data-x', barLabelRectX);
          var availLabelWidth = (imgWidth - (barLabelX - startX)) + 10;
          availLabelWidth = (availLabelWidth > 0) ? availLabelWidth : 10;
          if (barLabelX < (startX + barLabelRectWidth + imgWidth)) {
            barLabel.setAttribute('x', (barLabelX + barLabelRectWidth + availLabelWidth));
            barLabel.setAttribute('fill', '#000000');
            barLabelRect.setAttribute('x', (barLabelRectX + barLabelRectWidth + availLabelWidth));
          } else {
            barLabel.setAttribute('x', (barLabelX - imgWidth));
            barLabel.setAttribute('fill', '#ffffff');
            barLabelRect.setAttribute('x', (barLabelRectX - imgWidth));
          }
        }

        var barLabels = svg.querySelectorAll("text[text-anchor='start']");
        for (var i = 0; i < barLabels.length; i++) {
          var barLabel = barLabels[i];
          var barLabelFill = barLabel.getAttribute('fill');
          if (barLabelFill === '#000000') continue;
          if (barLabel.getAttribute('data-x')) continue;
          var barLabelX = parseFloat(barLabel.getAttribute('x'));
          barLabel.setAttribute('data-x', barLabelX);
          var availLabelWidth = (imgWidth - (barLabelX - startX)) + 10;
          barLabel.setAttribute('fill', '#000000');

          if (barLabelX < (startX + availLabelWidth)) continue;
          barLabel.setAttribute('x', (barLabelX + availLabelWidth));

          var barLabelRects = [];
          if (barRect.parentElement) {
            var parentElement = barLabel.parentElement.parentElement;
            barLabelRects = parentElement.querySelectorAll('rect');
          } else if (barRect.parentNode) {
            parentNode = barRect.parentNode.parentNode;
            barLabelRects = parentNode.querySelectorAll('rect');
          }

          for (var j = 0; j < barLabelRects.length; j++) {
            var barLabelRect = barLabelRects[j];
            if (barLabelRect.getAttribute('data-x')) continue;
            var barLabelRectX = parseFloat(barLabelRect.getAttribute('x'));
            var availLabelWidth = (imgWidth - (barLabelRectX - startX)) + 10;
            barLabelRect.setAttribute('x', (barLabelRectX + availLabelWidth));
          }
        }
      });
      mutationObserver.observe(container, {
        childList: true,
        subtree: true
      });
    });
  }

  function createImage(options) {
    var image = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    image.setAttributeNS(null, 'height', options.height);
    image.setAttributeNS(null, 'width', options.width);
    image.setAttributeNS('http://www.w3.org/1999/xlink', 'href', options.href);
    image.setAttributeNS(null, 'x', options.x);
    image.setAttributeNS(null, 'y', options.y);
    image.setAttributeNS(null, 'style', 'background-color: #000000;');
    image.setAttributeNS(null, 'visibility', 'visible');
    return image;
  }

  function drawStudentUsageReport() {
    var data = [
      ['Element', 'Usage', { role: 'style' }, { role: 'annotation' }],
      ['Math Buddies', { v: 95, f: '95%' }, getBarColor(95), 'Success!'],
      ['Marshall Cavendish Maths', { v: 80, f: '80%' }, getBarColor(80), 'Almost There!'],
      ['Marshall Cavendish Science', { v: 70, f: '70%' }, getBarColor(70), 'Keep It Up!'],
      ['My Pals are here! Science', { v: 55, f: '55%' }, getBarColor(55), 'Halfway There!']
    ];
    var dataTable = google.visualization.arrayToDataTable(data);
    
    var chartAreaLeft = ($(window).width() > 768) ? 180 : 140;
    var options = {
      fontName: 'Arial',
      fontSize: 13,      
      height: (data.length * 48),
      chartArea: { left: chartAreaLeft, top: 16, bottom: 32, height: '80%', width: '60%' },
      bar: { groupWidth: (data.length === 2) ? '30%' : (data.length === 3) ? '40%' : '50%' },
      legend: { position: 'none' },
      tooltip: { text: 'percentage' },
      annotations: {
        textStyle: {
          color: 'white'
        }
      },
      hAxis: {
        gridlines: { count: 2, color: '#6c757d' },
        minorGridlines: { count: 0 },
        textStyle: {
          color: '#6c757d'
        },
        ticks: [
          {v: 0, f: 'Start'},
          {v: 101, f: 'Finish'}
        ],
        minValue: 0,
        maxValue: 100
      },
      vAxis: {
        textStyle: {
          color: '#007bff'
        }
      }
    };

    var element = $('.article-usage-report .chart').get(0);
    inlineChart = new google.visualization.BarChart(element);
    updateStudentReport(element, inlineChart);

    google.visualization.events.addListener(inlineChart, 'click', function(e) {
      var regex = /^vAxis[\#0-9a-zA-Z]+\#([0-9]+)$/;
      var matches = e.targetID.match(regex);
      if (!matches) return;

      disconnectObserver();
      clearInlineChart();
      drawStudentChannelUsageReport();
    });

    inlineChart.draw(dataTable, options);
  }

  function drawStudentChannelUsageReport() {
    var data = [
      ['Element', 'Usage', { role: 'style' }, { role: 'annotation' }],
      ['Numbers To 10', 95, getBarColor(95), 'Success!'],
      ['Number Bonds', 80, getBarColor(80), 'Almost There!'],
      ['Addition Within 10', 70, getBarColor(70), 'Keep It Up!'],
      ['Subtraction Within 10', 55, getBarColor(55), 'Halfway There!'],
      ['Shapes And Patterns', 40, getBarColor(40), 'Good Progress!'],
      ['Ordinal Numbers And Position', 30, getBarColor(30), 'You Can Do It!'],
      ['Numbers To 20', 5, getBarColor(10), 'Just Getting Started'],
      ['Numbers To 20', 10, getBarColor(10), 'Just Getting Started'],
      ['Numbers To 20', 15, getBarColor(10), 'Just Getting Started']
    ];
    var dataTable = google.visualization.arrayToDataTable(data);
    
    var chartAreaLeft = ($(window).width() > 768) ? 180 : 140;
    var options = {
      fontName: 'Arial',
      fontSize: 13,      
      height: (data.length * 48),
      chartArea: { left: chartAreaLeft, top: 16, bottom: 32, height: '80%', width: '60%' },
      bar: { groupWidth: (data.length === 2) ? '30%' : (data.length === 3) ? '40%' : '50%' },
      legend: { position: 'none' },
      annotations: {
        textStyle: {
          color: 'white'
        }
      },
      hAxis: {
        gridlines: { count: 2, color: '#6c757d' },
        minorGridlines: { count: 0 },
        textStyle: {
          color: '#6c757d'
        },
        ticks: [
          {v: 0, f: 'Start'},
          {v: 101, f: 'Finish'}
        ],
        minValue: 0,
        maxValue: 100
      },
      vAxis: {
        textStyle: {
          color: '#007bff'
        }
      }
    };

    var element = $('.article-usage-report .chart').get(0);
    inlineChart = new google.visualization.BarChart(element);
    updateStudentReport(element, inlineChart);
    inlineChart.draw(dataTable, options);
  }

  function drawStudentProficiencyReport() {
    var data = [
      ['Element', 'Mastery', { role: 'style' }, { role: 'annotation' }],
      ['Math Buddies', { v: 95, f: '95%' }, getBarColor(95), 'Master'],
      ['Marshall Cavendish Maths', { v: 80, f: '80%' }, getBarColor(80), 'Expert'],
      ['Marshall Cavendish Science', { v: 70, f: '70%' }, getBarColor(70), 'Advanced'],
      ['My Pals are here! Science', { v: 55, f: '55%' }, getBarColor(55), 'Apprentice']
    ];
    var dataTable = google.visualization.arrayToDataTable(data);
    
    var chartAreaLeft = ($(window).width() > 768) ? 180 : 140;
    var options = {
      fontName: 'Arial',
      fontSize: 13,      
      height: (data.length * 48),
      chartArea: { left: chartAreaLeft, top: 16, bottom: 32, height: '80%', width: '60%' },
      bar: { groupWidth: (data.length === 2) ? '30%' : (data.length === 3) ? '40%' : '50%' },
      legend: { position: 'none' },
      annotations: {
        textStyle: {
          color: 'white'
        }
      },
      hAxis: {
        gridlines: { count: 2, color: '#6c757d' },
        minorGridlines: { count: 0 },
        textStyle: {
          color: '#6c757d'
        },
        ticks: [
          {v: 0, f: 'Start'},
          {v: 101, f: 'Finish'}
        ],
        minValue: 0,
        maxValue: 100
      },
      vAxis: {
        textStyle: {
          color: '#007bff'
        }
      }
    };

    var element = $('.article-proficiency-report .chart').get(0);
    inlineChart = new google.visualization.BarChart(element);
    updateStudentReport(element, inlineChart);

    google.visualization.events.addListener(inlineChart, 'click', function(e) {
      var regex = /^vAxis[\#0-9a-zA-Z]+\#([0-9]+)$/;
      var matches = e.targetID.match(regex);
      if (!matches) return;

      disconnectObserver();
      clearInlineChart();
      drawStudentChannelProficiencyReport();
    });

    inlineChart.draw(dataTable, options);
  }

  function drawStudentChannelProficiencyReport() {
    var data = [
      ['Element', 'Mastery', { role: 'style' }, { role: 'annotation' }],
      ['Numbers To 10', 95, getBarColor(95), 'Master'],
      ['Number Bonds', 80, getBarColor(80), 'Expert'],
      ['Addition Within 10', 70, getBarColor(70), 'Advanced'],
      ['Subtraction Within 10', 55, getBarColor(55), 'Apprentice'],
      ['Shapes And Patterns', 40, getBarColor(40), 'Novice'],
      ['Ordinal Numbers And Position', 30, getBarColor(30), 'Learner'],
      ['Numbers To 20', 15, getBarColor(10), 'Beginner']
    ];
    var dataTable = google.visualization.arrayToDataTable(data);
    
    var chartAreaLeft = ($(window).width() > 768) ? 180 : 140;
    var options = {
      fontName: 'Arial',
      fontSize: 13,      
      height: (data.length * 48),
      chartArea: { left: chartAreaLeft, top: 16, bottom: 32, height: '80%', width: '60%' },
      bar: { groupWidth: (data.length === 2) ? '30%' : (data.length === 3) ? '40%' : '50%' },
      legend: { position: 'none' },
      annotations: {
        textStyle: {
          color: 'white'
        }
      },
      hAxis: {
        gridlines: { count: 2, color: '#6c757d' },
        minorGridlines: { count: 0 },
        textStyle: {
          color: '#6c757d'
        },
        ticks: [
          {v: 0, f: 'Start'},
          {v: 101, f: 'Finish'}
        ],
        minValue: 0,
        maxValue: 100
      },
      vAxis: {
        textStyle: {
          color: '#007bff'
        }
      }
    };
    
    var element = $('.article-proficiency-report .chart').get(0);
    inlineChart = new google.visualization.BarChart(element);
    updateStudentReport(element, inlineChart);
    inlineChart.draw(dataTable, options);
  }

  function drawAllClassesUsageReport() {
    var data = [
      ['Element', 'Usage', { role: 'style' }, { role: 'annotation' }, { role: 'tooltip' }],
      ['P1-EA', 95, getBarColor(95), '95%', '95%'],
      ['P1-HA', 80, getBarColor(80), '80%', '80%'],
      ['P1-MA', 70, getBarColor(70), '70%', '70%'],
      ['P1-PA', 55, getBarColor(55), '55%', '55%'],
      ['P1-SA', 40, getBarColor(40), '40%', '40%'],
      ['P1-TA', 30, getBarColor(30), '30%', '30%'],
      ['P1-UA', 10, getBarColor(10), '10%', '10%']
    ];
    var dataTable = google.visualization.arrayToDataTable(data);
    
    var options = {
      fontName: 'Arial',
      fontSize: 13,      
      height: (data.length * 48),
      chartArea: { left: 80, top: 16, bottom: 32, height: '80%', width: '70%' },
      bar: { groupWidth: '50%' },
      legend: { position: 'none' },
      annotations: {
        format: '#\'%\'',
        textStyle: {
          color: 'white'
        }
      },    
      hAxis: {
        format: '#\'%\'',
        gridlines: { count: 4 },
        minorGridlines: { count: 0 },
        minValue: 0,
        maxValue: 100
      },
      vAxis: {
        textStyle: {
          color: '#007bff'
        }
      }
    };

    var element = $('.article-usage-report .chart').get(0);
    inlineChart = new google.visualization.BarChart(element);

    google.visualization.events.addListener(inlineChart, 'click', function(e) {
      var regex = /^vAxis[\#0-9a-zA-Z]+\#([0-9]+)$/;
      var matches = e.targetID.match(regex);
      if (!matches) return;

      var student = data[++matches[1]][0];
      disconnectObserver();
      clearInlineChart();
      drawClassUsageReport(student);
    });

    inlineChart.draw(dataTable, options);
  }

  function drawClassUsageReport() {
    var data = [
      ['Element', 'Usage', { role: 'style' }, { role: 'annotation' }, { role: 'tooltip' }],
      ['Aaron Tan', 95, getBarColor(95), '95%', '95%'],
      ['Arya Suman', 80, getBarColor(80), '80%', '80%'],
      ['Ashar Ahmad', 70, getBarColor(70), '70%', '70%'],
      ['Chua Chin Hui', 55, getBarColor(55), '55%', '55%'],
      ['Derrick Lee', 40, getBarColor(40), '40%', '40%'],
      ['Nurulhuda bte Sazali', 30, getBarColor(30), '30%', '30%'],
      ['Siow Poh Piah Irene', 10, getBarColor(10), '10%', '10%']
    ];
    var dataTable = google.visualization.arrayToDataTable(data);
    
    var options = {
      fontName: 'Arial',
      fontSize: 13,      
      height: (data.length * 48),
      chartArea: { left: 160, top: 16, bottom: 32, height: '80%', width: '70%' },
      bar: { groupWidth: '50%' },
      legend: { position: 'none' },
      annotations: {
        textStyle: {
          color: 'white'
        }
      },    
      hAxis: {
        format: '#\'%\'',
        gridlines: { count: 4 },
        minorGridlines: { count: 0 },
        minValue: 0,
        maxValue: 100
      },
      vAxis: {
        textStyle: {
          color: '#007bff'
        }
      }
    };

    var element = $('.article-usage-report .chart').get(0);
    inlineChart = new google.visualization.BarChart(element);

    google.visualization.events.addListener(inlineChart, 'click', function(e) {
      var regex = /^vAxis[\#0-9a-zA-Z]+\#([0-9]+)$/;
      var matches = e.targetID.match(regex);
      if (!matches) return;

      var student = data[++matches[1]][0];
      $('.modal-usage-summary').modal('show');
      $('.modal-usage-summary').on('shown.bs.modal', function (e) {
        clearModalChart();
        drawClassStudentUsageReport(student);
      });
    });

    inlineChart.draw(dataTable, options);
  }

  function drawClassStudentUsageReport(student) {
    var data = [
      ['Element', 'Usage', { role: 'style' }, { role: 'annotation' }, { role: 'tooltip' }],
      ['Numbers To 10', 95, getBarColor(95), '95%', '95%'],
      ['Number Bonds', 80, getBarColor(80), '80%', '80%'],
      ['Addition Within 10', 70, getBarColor(70), '70%', '70%'],
      ['Subtraction Within 10', 55, getBarColor(55), '55%', '55%'],
      ['Shapes And Patterns', 40, getBarColor(40), '40%', '40%'],
      ['Ordinal Numbers And Position', 30, getBarColor(30), '30%', '30%'],
      ['Numbers To 20', 10, getBarColor(10), '10%', '10%']
    ];
    var dataTable = google.visualization.arrayToDataTable(data);
    
    var options = {
      fontName: 'Arial',
      fontSize: 13,      
      height: (data.length * 48),
      chartArea: { left: 180, top: 16, bottom: 32, height: '80%', width: '60%' },
      bar: { groupWidth: '50%' },
      legend: { position: 'none' },      
      annotations: {
        textStyle: {
          color: 'white'
        }
      },    
      hAxis: {
        format: '#\'%\'',
        gridlines: { count: 4 },
        minorGridlines: { count: 0 },
        minValue: 0,
        maxValue: 100
      }
    };
    var description = 'Math Buddies, ' + student;
    $('.modal-usage-summary .modal-body p').text(description);

    var element = $('.modal-usage-summary .chart').get(0);
    var chart = new google.visualization.BarChart(element);
    chart.draw(dataTable, options);
  }

  function drawAllClassesProficiencyReport() {
    var data = [
      ['Element', 'Mastery', { role: 'style' }, { role: 'annotation' }],
      ['P1-EA', 95, getBarColor(95), '95%'],
      ['P1-HA', 80, getBarColor(80), '80%'],
      ['P1-MA', 70, getBarColor(70), '70%'],
      ['P1-PA', 55, getBarColor(55), '55%'],
      ['P1-SA', 40, getBarColor(40), '40%'],
      ['P1-TA', 30, getBarColor(30), '30%'],
      ['P1-UA', 10, getBarColor(10), '10%']
    ];
    var dataTable = google.visualization.arrayToDataTable(data);
    
    var options = {
      fontName: 'Arial',
      fontSize: 13,      
      height: (data.length * 48),
      chartArea: { left: 80, top: 16, bottom: 32, height: '80%', width: '70%' },
      bar: { groupWidth: '50%' },
      legend: { position: 'none' },
      annotations: {
        textStyle: {
          color: 'white'
        }
      },    
      hAxis: {
        format: '#\'%\'',
        gridlines: { count: 4 },
        minorGridlines: { count: 0 },
        minValue: 0,
        maxValue: 100
      },
      vAxis: {
        textStyle: {
          color: '#007bff'
        }
      }
    };

    var element = $('.article-proficiency-report .chart').get(0);
    inlineChart = new google.visualization.BarChart(element);

    google.visualization.events.addListener(inlineChart, 'click', function(e) {
      var regex = /^vAxis[\#0-9a-zA-Z]+\#([0-9]+)$/;
      var matches = e.targetID.match(regex);
      if (!matches) return;

      var student = data[++matches[1]][0];
      disconnectObserver();
      clearInlineChart();
      drawClassProficiencyReport(student);
    });

    inlineChart.draw(dataTable, options);
  }

  function drawClassProficiencyReport() {
    var data = [
      ['Element', 'Mastery', { role: 'style' }, { role: 'annotation' }],
      ['Aaron Tan', 95, getBarColor(95), '95%'],
      ['Arya Suman', 80, getBarColor(80), '80%'],
      ['Ashar Ahmad', 70, getBarColor(70), '70%'],
      ['Chua Chin Hui', 55, getBarColor(55), '55%'],
      ['Derrick Lee', 40, getBarColor(40), '40%'],
      ['Nurulhuda bte Sazali', 30, getBarColor(30), '30%'],
      ['Siow Poh Piah Irene', 10, getBarColor(10), '10%']
    ];
    var dataTable = google.visualization.arrayToDataTable(data);
    
    var options = {
      fontName: 'Arial',
      fontSize: 13,      
      height: (data.length * 48),
      chartArea: { left: 160, top: 16, bottom: 32, height: '80%', width: '60%' },
      bar: { groupWidth: '50%' },
      legend: { position: 'none' },
      annotations: {
        textStyle: {
          color: 'white'
        }
      },    
      hAxis: {
        format: '#\'%\'',
        gridlines: { count: 4 },
        minorGridlines: { count: 0 },
        minValue: 0,
        maxValue: 100
      },
      vAxis: {
        textStyle: {
          color: '#007bff'
        }
      }
    };

    var element = $('.article-proficiency-report .chart').get(0);
    inlineChart = new google.visualization.BarChart(element);

    google.visualization.events.addListener(inlineChart, 'click', function(e) {
      var regex = /^vAxis[\#0-9a-zA-Z]+\#([0-9]+)$/;
      var matches = e.targetID.match(regex);
      if (!matches) return;

      var student = data[++matches[1]][0];
      $('.modal-proficiency-summary').modal('show');
      $('.modal-proficiency-summary').on('shown.bs.modal', function (e) {
        clearModalChart();
        drawClassStudentProficiencyReport(student);
      });
    });

    inlineChart.draw(dataTable, options);
  }

  function drawClassStudentProficiencyReport(student) {
    var data = [
      ['Element', 'Mastery', { role: 'style' }, { role: 'annotation' }],
      ['Numbers To 10', 95, getBarColor(95), '95%'],
      ['Number Bonds', 80, getBarColor(80), '80%'],
      ['Addition Within 10', 70, getBarColor(70), '70%'],
      ['Subtraction Within 10', 55, getBarColor(55), '55%'],
      ['Shapes And Patterns', 40, getBarColor(40), '40%'],
      ['Ordinal Numbers And Position', 30, getBarColor(30), '30%'],
      ['Numbers To 20', 10, getBarColor(10), '10%']
    ];
    var dataTable = google.visualization.arrayToDataTable(data);
    
    var options = {
      fontName: 'Arial',
      fontSize: 13,      
      height: (data.length * 48),
      chartArea: { left: 180, top: 16, bottom: 32, height: '80%', width: '60%' },
      bar: { groupWidth: '50%' },
      legend: { position: 'none' },
      annotations: {
        textStyle: {
          color: 'white'
        }
      },    
      hAxis: {
        format: '#\'%\'',
        gridlines: { count: 4 },
        minorGridlines: { count: 0 },
        minValue: 0,
        maxValue: 100
      }
    };
    var description = 'Math Buddies, ' + student;
    $('.modal-proficiency-summary .modal-body p').text(description);

    var element = $('.modal-proficiency-summary .chart').get(0);
    var chart = new google.visualization.BarChart(element);
    chart.draw(dataTable, options);
  }

  function drawWeeklyLoginReport() {
    var data = [['Element', 'Login Count']];
    var getRndInteger = function getRndInteger(min, max) {
      return Math.floor(Math.random() * (max - min) ) + min;
    };
    var endDate = moment(new Date());
    var startDate = endDate.clone().subtract(7, 'days');
    while (!startDate.isSame(endDate, 'day')) {
      var sessions = getRndInteger(20, 30);
      var percentage = Math.ceil((sessions / 30) * 100);
      data.push([
        { v: startDate.toDate(), f: startDate.format('ddd DD/MM') },
        { v: percentage, f: (sessions + '/30 (' + percentage + '%)') }
      ]);
      startDate.add(1, 'day');
    }
    var dataTable = google.visualization.arrayToDataTable(data);
    
    var options = {
      fontName: 'Arial',
      fontSize: 13,      
      height: 340,
      chartArea: { left: 80, top: 32, bottom: 32, height: '80%', width: '80%' },
      legend: { position: 'none' },
      hAxis: {
        gridlines: { count: 0, color: 'transparent' },
        textStyle: {
          color: '007bff'
        },
        ticks: [
          data[1][0], data[2][0], data[3][0],
          data[4][0], data[5][0], data[6][0],
          data[7][0]
        ]
      },
      vAxis: {
        format: '#\'%\'',
        gridlines: { count: 4 },
        minorGridlines: { count: 0 },
        minValue: 0,
        maxValue: 100
      },
      pointSize: 5,
      pointsVisible: true
    };

    $('.article-login-report .table').html(`
      <colgroup width="auto"></colgroup>
      <colgroup width="120px"></colgroup>  
      <thead>
        <tr>
          <th>Day</th>
          <th>Login Count</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    `);

    var html = [];
    data.forEach(function(item, index) {
      if (index === 0) return;
      html.push(`
        <tr>
          <td><a href="#">` + item[0].f + `</a></td>
          <td>` + item[1].f + `</td>
        </tr>
      `);
    });
    $('.article-login-report .table tbody').append(html.join(''));

    var element = $('.article-login-report .chart').get(0);
    inlineChart = new google.visualization.LineChart(element);

    google.visualization.events.addListener(inlineChart, 'click', function(e) {
      var regex = /^hAxis[\#0-9a-zA-Z]+\#([0-9]+)$/;
      var matches = e.targetID.match(regex);
      if (!matches) return;

      $('.modal-login-summary').modal('show');
      $('.modal-login-summary').on('shown.bs.modal', function (e) {
        // TO DO
      });
    });

    inlineChart.draw(dataTable, options);
  }

  function drawTermlyLoginReport() {
    var data = [
      ['Element', 'Login Count', { role: 'annotation' }],
      ['Jul', { v: 70, f: '21/30 (70%)' }, '70%'],
      ['Aug', { v: 80, f: '24/30 (80%)' }, '80%'],
      ['Sep', { v: 90, f: '27/30 (90%)' }, '90%'],
    ];
    var dataTable = google.visualization.arrayToDataTable(data);
    
    var options = {
      fontName: 'Arial',
      fontSize: 13,      
      height: 340,
      chartArea: { left: 80, top: 32, bottom: 32, height: '80%', width: '60%' },
      bar: { groupWidth: '30%' },
      legend: { position: 'none' },
      hAxis: {
        gridlines: { count: 0, color: 'transparent' },
        textStyle: {
          color: '007bff'
        }
      },
      vAxis: {
        format: '#\'%\'',
        gridlines: { count: 4 },
        minorGridlines: { count: 0 },
        minValue: 0,
        maxValue: 100
      }
    };

    $('.article-login-report .table').html(`
      <colgroup width="auto"></colgroup>
      <colgroup width="120px"></colgroup>
      <thead>
        <tr>
          <th>Month</th>
          <th>Login Count</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    `);

    var html = [];
    data.forEach(function(item, index) {
      if (index === 0) return;
      html.push(`
        <tr>
          <td><a href="#">` + item[0] + `</a></td>
          <td>` + item[1].f + `</td>
        </tr>
      `);
    });
    $('.article-login-report .table tbody').append(html.join(''));

    var element = $('.article-login-report .chart').get(0);
    inlineChart = new google.visualization.ColumnChart(element);

    google.visualization.events.addListener(inlineChart, 'click', function(e) {
      var regex = /^hAxis[\#0-9a-zA-Z]+\#([0-9]+)$/;
      var matches = e.targetID.match(regex);
      if (!matches) return;

      $('.modal-login-summary').modal('show');
      $('.modal-login-summary').on('shown.bs.modal', function (e) {
        // TO DO
      });
    });

    inlineChart.draw(dataTable, options);
  }

  function drawPeriodLoginReport() {
    var data = [['Element', 'Login']];
    var getRndInteger = function getRndInteger(min, max) {
      return Math.floor(Math.random() * (max - min) ) + min;
    };
    var startDate = moment(new Date(2019, 0, 1));
    var endDate = moment(new Date(2020, 0, 1));
    while (!startDate.isSame(endDate, 'day')) {
      var sessions = getRndInteger(20, 30);
      var percentage = Math.ceil((sessions / 30) * 100);
      data.push([
        { v: startDate.toDate(), f: startDate.format('ddd DD/MM') },
        { v: percentage, f: (sessions + '/30 (' + percentage + '%)') }
      ]);
      startDate.add(1, 'day');
    }
    var dataTable = google.visualization.arrayToDataTable(data);
    
    var options = {
      fontName: 'Arial',
      fontSize: 13,      
      height: 340,
      chartArea: { left: 80, top: 32, bottom: 32, height: '80%', width: '80%' },
      legend: { position: 'none' },
      hAxis: {
        gridlines: { count: 0, color: 'transparent' },
        textStyle: {
          color: '007bff'
        },
        ticks: [
          { v: new Date(2019, 0, 1), f: 'Jan' },
          { v: new Date(2019, 1, 1), f: 'Feb' },
          { v: new Date(2019, 2, 1), f: 'Mar' },
          { v: new Date(2019, 3, 1), f: 'Apr' },
          { v: new Date(2019, 4, 1), f: 'May' },
          { v: new Date(2019, 5, 1), f: 'Jun' },
          { v: new Date(2019, 6, 1), f: 'Jul' },
          { v: new Date(2019, 7, 1), f: 'Aug' },
          { v: new Date(2019, 8, 1), f: 'Sep' },
          { v: new Date(2019, 9, 1), f: 'Oct' },
          { v: new Date(2019, 10, 1), f: 'Nov' },
          { v: new Date(2019, 11, 1), f: 'Dec' }
        ]
      },
      vAxis: {
        format: '#\'%\'',
        gridlines: { count: 4 },
        minorGridlines: { count: 0 },
        minValue: 0,
        maxValue: 100
      },
      pointSize: 5,
      pointsVisible: false
    };

    var element = $('.article-login-report .chart').get(0);
    inlineChart = new google.visualization.LineChart(element);
    inlineChart.draw(dataTable, options);
  }

  function showDurationFilter() {
    $('.form-filters .form-group-duration').removeClass('d-none');
    $('.form-filters .form-group-period').addClass('d-none');
  }

  function hideDurationFilter() {
    $('.form-filters .form-group-duration').addClass('d-none');
    $('.form-filters .form-group-period').addClass('d-none');
  }

  function showChannelFilters() {
    $('.form-filters .form-group-channel').removeClass('d-none');
    $('.form-filters .form-group-topic').removeClass('d-none');
  }

  function hideChannelFilters() {
    $('.form-filters .form-group-channel').addClass('d-none');
    $('.form-filters .form-group-topic').addClass('d-none');
  }

  function initPage() {
    $('#selReport').on('changed.bs.select', function (e) {
      var selectedReportType = $('#selReport').selectpicker('val');
      var selectedClass = $('#selClass').selectpicker('val');
      var selectedChannel = $('#selChannel').selectpicker('val');
      disconnectObserver();
      clearInlineChart();

      if (selectedReportType === 'login') {
        hideChannelFilters();
        showDurationFilter();
      } else {
        hideDurationFilter();
        showChannelFilters();
      }

      switch (selectedReportType) {
        case 'usage':
          $('.article-proficiency-report').addClass('d-none');
          $('.article-login-report').addClass('d-none');
          $('.article-usage-report').removeClass('d-none');
          if (studentUser) {
            if (selectedChannel === 'All') drawStudentUsageReport();
            else drawStudentChannelUsageReport();
          } else {
            if (selectedClass === 'All') drawAllClassesUsageReport();
            else drawClassUsageReport();
          }
          break;
        case 'proficiency':
          $('.article-usage-report').addClass('d-none');
          $('.article-login-report').addClass('d-none');
          $('.article-proficiency-report').removeClass('d-none');
          if (studentUser) {
            if (selectedChannel === 'All') drawStudentProficiencyReport();
            else drawStudentChannelProficiencyReport();
          } else {
            if (selectedClass === 'All') drawAllClassesProficiencyReport();
            else drawClassProficiencyReport();
          }
          break;
        case 'login':
          $('.article-usage-report').addClass('d-none');
          $('.article-proficiency-report').addClass('d-none');
          $('.article-login-report').removeClass('d-none');
          var selectedDuration = $('#selDuration').selectpicker('val');
          if (selectedDuration === 'week') drawWeeklyLoginReport();
          else drawTermlyLoginReport();
          break;
      }
    });

    $('#selClass').on('changed.bs.select', function (e) {
      var selectedReport = $('#selReport').selectpicker('val');
      var selectedDuration = $('#selDuration').selectpicker('val');
      disconnectObserver();
      clearInlineChart();

      switch ($('#selClass').selectpicker('val')) {
        case 'All':
          if (selectedReport === 'usage') drawAllClassesUsageReport();
          else if (selectedReport === 'proficiency') drawAllClassesProficiencyReport();
          else {
            if (selectedDuration === 'week') drawWeeklyLoginReport();
            else if (selectedDuration === 'term') drawTermlyLoginReport();
            else drawPeriodLoginReport();
          }
          break;
        default:
          if (selectedReport === 'usage') drawClassUsageReport();
          else if (selectedReport === 'proficiency') drawClassProficiencyReport();
          else {
            if (selectedDuration === 'week') drawWeeklyLoginReport();
            else if (selectedDuration === 'term') drawTermlyLoginReport();
            else drawPeriodLoginReport();
          }
          break;
      }
    });

    $('#selChannel').on('changed.bs.select', function (e) {
      var selectedReport = $('#selReport').selectpicker('val');
      switch ($('#selChannel').selectpicker('val')) {
        case 'All':
          if (selectedReport === 'usage') drawStudentUsageReport();
          else drawAllClassesUsageReport();
          break;
        default:
          if (selectedReport === 'usage') drawStudentChannelUsageReport();
          else drawStudentChannelProficiencyReport();
          break;
      }
    });

    $('#selDuration').on('changed.bs.select', function (e) {
      var selectedDuration = $('#selDuration').selectpicker('val');
      $('.form-filters .form-group-period').addClass('d-none')
      disconnectObserver();
      clearInlineChart();

      if (selectedDuration === 'week') drawWeeklyLoginReport();
      else if (selectedDuration === 'term') drawTermlyLoginReport();
      else {
        $('.form-filters .form-group-period').removeClass('d-none');
        drawPeriodLoginReport();
      }
    });

    if (location.href.indexOf('type=login') > -1) {
      hideChannelFilters();
      showDurationFilter();
    } else {
      hideDurationFilter();
      showChannelFilters();
    }

    $('#txtPeriod').on('apply.daterangepicker', function(ev, picker) {
      drawPeriodLoginReport();
    });

    $('#txtPeriod').daterangepicker({
      drops: 'up',
      parentEl: '.article-create-announcement',
      startDate: '01 Jan 2019',
      endDate: '31 Dec 2019',
      minDate: '01 Jan 2019',
      maxDate: '31 Dec 2019',
      locale: {
        format: 'DD MMM YYYY',
        separator: ' - '
      }
    });

    setTimeout(function waitForVisualizationLib() {
      if (google.visualization && google.visualization.arrayToDataTable) {
        if (location.href.indexOf('type=usage') > -1) {
          $('#selReport').selectpicker('val', 'usage');
          //if (studentUser) drawStudentUsageReport();
          //else drawAllClassesUsageReport();
        } else if (location.href.indexOf('type=proficiency') > -1) {
          $('#selReport').selectpicker('val', 'proficiency');
          //if (studentUser) drawStudentProficiencyReport();
          //else drawAllClassesProficiencyReport();
        } else {
          $('#selReport').selectpicker('val', 'login');
          //drawWeeklyLoginReport();
        }
        return;
      }
      setTimeout(waitForVisualizationLib, 500);
    }, 500);
  }

  $('.btn-light[data-toggle="popover"]').popover({
    container: 'body',
    placement: 'top',
    trigger: 'focus'
  });

  google.charts.load('current', {'packages':['corechart', 'line']});
  google.charts.setOnLoadCallback(initPage());
});
