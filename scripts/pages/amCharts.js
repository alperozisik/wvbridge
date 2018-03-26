const extend = require('js-base/core/extend');
const wvbDesign = require('ui/ui_amCharts');
const WebViewBridge = require("sf-extension-utils").WebViewBridge;
const Application = require("sf-core/application");
const Color = require('sf-core/ui/color');

const wvb = extend(wvbDesign)(
    function(_super) {
        _super(this);
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
        const page = this;
        const wvb = page.wvb = new WebViewBridge({
            webView: page.webView,
            source: "assets://amcharts_index.html"
        });
        global.wvb = wvb;

        wvb.ready().then(() => {
            console.log("ready");
            setTimeout(function() {
                console.log("timeout"); //alper
                wvb.evaluateJS(chartScript, function(value) {
                    alert(`callback: ${decodeURIComponent(value)}`);
                    page.webView.visible = true;
                    page.aiWait.visible = false;
                });
            }, 2000);
        }).catch(e => {
            Application.onUnhandledError && Application.onUnhandledError(e);
        });

        wvb.loadScripts("amcharts/amcharts/amcharts.js", "amcharts/amcharts/serial.js");


    });

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(superOnShow) {
    superOnShow();
    const page = this;
    page.headerBar.itemColor = Color.DARKGRAY;
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(superOnLoad) {
    superOnLoad();
}

module && (module.exports = wvb);

const chartScript = `
document.body.style.backgroundColor = "yellow";
// document.documentElement.outerHTML
var x = typeof AmCharts;
var AmCharts = AmCharts;
try {
document.body.style.backgroundColor = typeof AmCharts !== "udefined" ? "red" : "blue";
} catch(eer) {}
// document.body.innerText = !!AmCharts;
x = encodeURIComponent(document.head.innerText);
x
// try{
// AmCharts.makeChart("chartdiv", {
//     "type": "serial",
//     "categoryField": "category",
//     "startDuration": 1,
//     "categoryAxis": {
//         "gridPosition": "start"
//     },
//     "trendLines": [],
//     "graphs": [{
//             "balloonText": "[[title]] of [[category]]:[[value]]",
//             "bullet": "round",
//             "id": "AmGraph-1",
//             "title": "graph 1",
//             "valueField": "column-1"
//         },
//         {
//             "balloonText": "[[title]] of [[category]]:[[value]]",
//             "bullet": "square",
//             "id": "AmGraph-2",
//             "title": "graph 2",
//             "valueField": "column-2"
//         }
//     ],
//     "guides": [],
//     "valueAxes": [{
//         "id": "ValueAxis-1",
//         "title": "Axis title"
//     }],
//     "allLabels": [],
//     "balloon": {},
//     "legend": {
//         "enabled": true,
//         "useGraphSettings": true
//     },
//     "titles": [{
//         "id": "Title-1",
//         "size": 15,
//         "text": "Chart Title"
//     }],
//     "dataProvider": [{
//             "category": "category 1",
//             "column-1": 8,
//             "column-2": 5
//         },
//         {
//             "category": "category 2",
//             "column-1": 6,
//             "column-2": 7
//         },
//         {
//             "category": "category 3",
//             "column-1": 2,
//             "column-2": 3
//         },
//         {
//             "category": "category 4",
//             "column-1": 1,
//             "column-2": 3
//         },
//         {
//             "category": "category 5",
//             "column-1": 2,
//             "column-2": 1
//         },
//         {
//             "category": "category 6",
//             "column-1": 3,
//             "column-2": 2
//         },
//         {
//             "category": "category 7",
//             "column-1": 6,
//             "column-2": 8
//         }
//     ]
// });
// } catc(ex) {
//     boubleEvent("error", ex);
// }

`;
