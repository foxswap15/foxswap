
$( document ).ready(function() {

 $('.js--scoll').waypoint(function(direction) {
     if (direction == "down") {
         $('nav').addClass('sticky');
     } else {
         $('nav').removeClass('sticky');
     }
 }, {
   offset: '60px;'
 });

});




$(window).resize(function () {
    if ($(window).width() == '700') {
        $("#logo").remove()
    }
});


window.sr = ScrollReveal();
sr.reveal('.reveal', { duration: 1000 });

// CIRCLE 

;(function(window, document, undefined) {

    'use strict';
  
    var DonutChart = DonutChart || {
  
      /**
        * Initialize Chart
        */
  
      init: function(options) {
  
        this.settings(options);
        this.createChartStructre();
        this.setChartMeta();
        this.build();
  
      }, // init()
  
      /**
        * Update Chart
        */
  
      update: function(options) {
  
        this.settings(options);
        this.setChartMeta();
        this.build();
  
      }, // update()
  
      /**
        * Chart Settings
        */
  
      settings: function(options) {
  
        this.config = {
          container: options.container ? options.container : this.config.container,
          data: options.data ? options.data : this.config.data,
          label: options.label ? this.label : 'Total',
          offset: options.offset ? options.offset : 0
        };
  
      }, // settings()
  
      /**
        * Build chart
        */
  
      build: function() {
  
        var container = this.config.container.querySelector('.outer-circle');
        var wedges = container.querySelectorAll('[data-wedge-id]');
        var wedgesIdArray = [];
  
        for (var i = 0; i < wedges.length; i++) {
          wedgesIdArray.push(wedges[i].dataset.wedgeId);
        }
  
        for (var j = 0; j < this.config.data.wedges.length; j++) {
          if (wedgesIdArray.indexOf(this.config.data.wedges[j].id) == -1) {
            var wedge = this.createWedge(this.config.data.wedges[j]);
            container.appendChild(wedge);
          }
          this.setWedge(this.config.data.wedges[j]);
        }
  
      }, // createWedges()
  
      /**
        * Create chart structure
        */
  
      createChartStructre: function() {
  
        var outer = document.createElement('div');
        var inner = document.createElement('div');
        var label = document.createElement('span');
        var value = document.createElement('span');
  
        outer.className = 'outer-circle';
        inner.className = 'inner-circle';
        label.className = 'inner-circle-label';
        value.className = 'inner-circle-value';
  
        this.config.container.appendChild(outer);
        this.config.container.appendChild(inner);
        inner.appendChild(label);
        inner.appendChild(value);
  
      }, // createChartStructre()
  
      /**
        * Set chart meta
        */
  
      setChartMeta: function() {
  
        var label = this.config.container.querySelector('.inner-circle-label');
        var value = this.config.container.querySelector('.inner-circle-value');
  
        label.innerHTML = this.config.label;
        value.innerHTML = this.config.data.total;
  
      }, // setChartMeta()
  
      /**
        * Create wedge
        */
  
      createWedge: function(data) {
  
        var container = document.createElement('div');
        var wedge = document.createElement('div');
        var extension = document.createElement('div');
        var label = document.createElement('div');
        var value = document.createElement('span');
  
        container.setAttribute('data-wedge-id', data.id);
  
        container.className = 'wedge-container';
        wedge.className = 'wedge';
        extension.className = 'wedge-extension';
        label.className = 'wedge-label';
        value.className = 'wedge-value';
  
        container.appendChild(wedge);
        container.appendChild(extension);
        container.appendChild(label);
        label.appendChild(value);
  
        return container;
  
      }, // createWedge()
  
      /**
        * Set wedge
        */
  
      setWedge: function(data) {
  
        var container = this.config.container.querySelector('[data-wedge-id="' + data.id + '"]');
        var wedge = container.querySelector('.wedge');
        var extension = container.querySelector('.wedge-extension');
        var label = container.querySelector('.wedge-label');
        var value = container.querySelector('.wedge-value');
  
        var wedgeDegrees = (360 * data.value) / this.config.data.total;
        var labelDegrees = wedgeDegrees / 2;
        var w = container.offsetWidth;
  
        container.style.transform = 'rotate(' + this.config.offset + 'deg)';
        container.style.webkitTransform = 'rotate(' + this.config.offset + 'deg)';
        container.style.clip = wedgeDegrees > 180 ? 'auto' : 'rect(0, ' + w + 'px, ' + w +'px, ' + (w / 2) + 'px)';
  
        wedge.style.transform = 'rotate(' + wedgeDegrees + 'deg)';
        wedge.style.webkitTransform = 'rotate(' + wedgeDegrees + 'deg)';
        wedge.style.backgroundColor = this.color(data.color, 5);
        wedge.style.clip = 'rect(0, ' + (w / 2) + 'px, ' + w +'px, 0)';
  
        if (wedgeDegrees > 180) {
          extension.style.opacity = 1;
          extension.style.transform = 'rotate(' + 180 + 'deg)';
          extension.style.webkitTransform = 'rotate(' + 180 + 'deg)';
          extension.style.backgroundColor = this.color(data.color, 5);
          extension.style.clip = 'rect(0, ' + (w / 2) + 'px, ' + w +'px, 0)';
        } else {
          extension.style.opacity = 0;
        }
  
        label.style.transform = 'rotate(' + labelDegrees + 'deg)';
        label.style.webkitTransform = 'rotate(' + labelDegrees + 'deg)';
        label.style.color = this.color(data.color, -30);
  
        value.innerHTML = data.value;
  
        this.config.offset += wedgeDegrees;
  
      }, // setWedge()
  
      /**
        * Color Utility
        */
  
      color: function( color, percent ) {
  
        var num = parseInt(color.slice(1), 16);
        var amt = Math.round(2.55 * percent);
        var R = (num >> 16) + amt;
        var B = (num >> 8 & 0x00FF) + amt;
        var G = (num & 0x0000FF) + amt;
  
        return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (B < 255 ? B < 1 ? 0 : B : 255) * 0x100 + (G < 255 ? G < 1 ? 0 : G : 255)).toString(16).slice(1);
  
      } // color()
  
    }; // DonutChart
  
    window.DonutChart = DonutChart;
  
  })(window, document);
  
  
  /**
    * Demo
    * --------------------------------------------------
    */
  
  // Object.create() polyfill
  if (typeof Object.create !== 'function') {
    Object.create = function(obj) {
      function F() {}
      F.prototype = obj;
      return new F();
    };
  }
  
  // Select containers
  var chartContainer1 = document.querySelector('[data-donut-chart="1"]');
  var chartContainer2 = document.querySelector('[data-donut-chart="2"]');
  
  // Data
  var chartData1a = {
    total: 64,
    wedges: [
      { id: 'a', color: '#4FC1E9', value: 10 },
      { id: 'b', color: '#A0D468', value: 16 },
      { id: 'c', color: '#ED5565', value: 24 },
      { id: 'd', color: '#AC92EC', value: 14 }
    ]
  };
  
  var chartData1b = {
    total: 96,
    wedges: [
      { id: 'a', color: '#4FC1E9', value: 26 },
      { id: 'b', color: '#A0D468', value: 20 },
      { id: 'c', color: '#ED5565', value: 18 },
      { id: 'd', color: '#AC92EC', value: 32 }
    ]
  };
  
  var chartData2a = {
    total: 200,
    wedges: [
      { id: 'a', color: '#5D9CEC', value: 45 },
      { id: 'b', color: '#48CFAD', value: 25 },
      { id: 'c', color: '#FFCE54', value: 30 },
      { id: 'd', color: '#FC6E51', value: 100 }
    ]
  };
  
  var chartData2b = {
    total: 220,
    wedges: [
      { id: 'a', color: '#5D9CEC', value: 65 },
      { id: 'b', color: '#48CFAD', value: 40 },
      { id: 'c', color: '#FFCE54', value: 60 },
      { id: 'd', color: '#FC6E51', value: 55 }
    ]
  };
  
  // Create new chart objects
  var Chart1 = Object.create(DonutChart);
  var Chart2 = Object.create(DonutChart);
  
  Chart1.init({
    container: chartContainer1,
    data: chartData1a
  });
  
  Chart2.init({
    container: chartContainer2,
    data: chartData2a
  });
  
  setTimeout(function() {
    setInterval(function() {
  
      Chart1.update({
        data: chartData1a
      });
  
      Chart2.update({
        data: chartData2a
      });
  
    }, 4000);
  }, 2000);
  
  setInterval(function() {
  
    Chart1.update({
      data: chartData1b
    });
  
    Chart2.update({
      data: chartData2b
    });
  
  }, 4000);
  
