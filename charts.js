        am4core.ready(function() {

                // Themes begin
                am4core.useTheme(am4themes_material);
                am4core.useTheme(am4themes_animated);
                // Themes end

                /**
                 * Chart design taken from Samsung health app
                 */

                var chart = am4core.create("chartdiv", am4charts.XYChart);
                chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

                chart.paddingBottom = 30;

                chart.data = [{
                    "name": "Cristiano Ronaldo",
                    "goals": 743,
                    "href": "https://futhead.cursecdn.com/static/img/17/players/20801.png"
                }, {
                    "name": "Leonel Messi",
                    "goals": 724,
                    "href": "https://futhead.cursecdn.com/static/img/19/players/158023.png"
                }, {
                    "name": "Zlatan Ibrahimovic",
                    "goals": 547,
                    "href": "https://futhead.cursecdn.com/static/img/19/players/41236.png"
                }, {
                    "name": "Luis Suarez",
                    "goals": 475,
                    "href": "https://futhead.cursecdn.com/static/img/20/players/176580.png"
                }, {
                    "name": "Robert Lewandowski",
                    "goals": 472,
                    "href": "https://www.futwiz.com/assets/img/fifa20/faces/188545.png"
                }];

                var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
                categoryAxis.dataFields.category = "name";
                categoryAxis.renderer.grid.template.strokeOpacity = 0;
                categoryAxis.renderer.minGridDistance = 10;
                categoryAxis.renderer.labels.template.dy = 35;
                categoryAxis.renderer.tooltip.dy = 35;

                var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
                valueAxis.renderer.inside = true;
                valueAxis.renderer.labels.template.fillOpacity = 0.3;
                valueAxis.renderer.grid.template.strokeOpacity = 0;
                valueAxis.min = 0;
                valueAxis.cursorTooltipEnabled = false;
                valueAxis.renderer.baseGrid.strokeOpacity = 0;

                var series = chart.series.push(new am4charts.ColumnSeries);
                series.dataFields.valueY = "goals";
                series.dataFields.categoryX = "name";
                series.tooltipText = "{valueY.value}";
                series.tooltip.pointerOrientation = "vertical";
                series.tooltip.dy = - 6;
                series.columnsContainer.zIndex = 100;

                var columnTemplate = series.columns.template;
                columnTemplate.width = am4core.percent(50);
                columnTemplate.maxWidth = 66;
                columnTemplate.column.cornerRadius(60, 60, 10, 10);
                columnTemplate.strokeOpacity = 0;

                series.heatRules.push({ target: columnTemplate, property: "fill", dataField: "valueY", min: am4core.color("#e5dc36"), max: am4core.color("#5faa46") });
                series.mainContainer.mask = undefined;

                var cursor = new am4charts.XYCursor();
                chart.cursor = cursor;
                cursor.lineX.disabled = true;
                cursor.lineY.disabled = true;
                cursor.behavior = "none";

                var bullet = columnTemplate.createChild(am4charts.CircleBullet);
                bullet.circle.radius = 30;
                bullet.valign = "bottom";
                bullet.align = "center";
                bullet.isMeasured = true;
                bullet.mouseEnabled = false;
                bullet.verticalCenter = "bottom";
                bullet.interactionsEnabled = false;

                var hoverState = bullet.states.create("hover");
                var outlineCircle = bullet.createChild(am4core.Circle);
                outlineCircle.adapter.add("radius", function (radius, target) {
                    var circleBullet = target.parent;
                    return circleBullet.circle.pixelRadius + 10;
                })

                var image = bullet.createChild(am4core.Image);
                image.width = 60;
                image.height = 60;
                image.horizontalCenter = "middle";
                image.verticalCenter = "middle";
                image.propertyFields.href = "href";

                image.adapter.add("mask", function (mask, target) {
                    var circleBullet = target.parent;
                    return circleBullet.circle;
                })

                var previousBullet;
                chart.cursor.events.on("cursorpositionchanged", function (event) {
                    var dataItem = series.tooltipDataItem;

                    if (dataItem.column) {
                        var bullet = dataItem.column.children.getIndex(1);

                        if (previousBullet && previousBullet != bullet) {
                            previousBullet.isHover = false;
                        }

                        if (previousBullet != bullet) {

                            var hs = bullet.states.getKey("hover");
                            hs.properties.dy = -bullet.parent.pixelHeight + 30;
                            bullet.isHover = true;

                            previousBullet = bullet;
                        }
                    }
                })

                }); // end am4core.ready()



         am4core.ready(function() {

                    // Themes begin
                    am4core.useTheme(am4themes_animated);
                    // Themes end

                    // Create chart instance
                    var chart = am4core.create("nationChart", am4charts.XYChart);
					chart.scrollbarX = new am4core.Scrollbar();
                    // Add data
                    chart.data = [
                      {
                        "region": "Bundesliga",
                        "state": "Bayern",
                        "league_point": 78
                      },
                      {
                        "region": "Bundesliga",
                        "state": "Dortmund",
                        "league_point": 76
                      },
                      {
                        "region": "Bundesliga",
                        "state": "Leipzig",
                        "league_point": 66
                      },

                      {
                        "region": "Laliga",
                        "state": "Barcelona",
                        "league_point": 89
                      },
                      {
                        "region": "Laliga",
                        "state": "Real Madrid",
                        "league_point": 84
                      },
                      {
                        "region": "Laliga",
                        "state": "ATM",
                        "league_point": 76
                      },

                      {
                        "region": "League1",
                        "state": "PSG",
                        "league_point": 91
                      },
                      {
                        "region": "League1",
                        "state": "Lille",
                        "league_point": 75
                      },
                      {
                        "region": "League1",
                        "state": "LYON",
                        "league_point": 72
                      },

                      {
                        "region": "EPL",
                        "state": "Liverpool",
                        "league_point": 81
                      },
                      {
                        "region": "EPL",
                        "state": "Arsenal",
                        "league_point": 70
                      },
                      {
                        "region": "EPL",
                        "state": "Man City",
                        "league_point": 80
                      }
                    ];

                    // Create axes
                    var yAxis = chart.yAxes.push(new am4charts.CategoryAxis());
                    yAxis.dataFields.category = "state";
                    yAxis.renderer.grid.template.location = 0;
                    yAxis.renderer.labels.template.fontSize = 10;
                    yAxis.renderer.minGridDistance = 10;

                    var xAxis = chart.xAxes.push(new am4charts.ValueAxis());

                    // Create series
                    var series = chart.series.push(new am4charts.ColumnSeries());
                    series.dataFields.valueX = "league_point";
                    series.dataFields.categoryY = "state";
                    series.columns.template.tooltipText = "{categoryY}: [bold]{valueX}[/]";
                    series.columns.template.strokeWidth = 0;
                    series.columns.template.adapter.add("fill", function(fill, target) {
                      if (target.dataItem) {
                        switch(target.dataItem.dataContext.region) {
                          case "Bundesliga":
                            return chart.colors.getIndex(0);
                            break;
                          case "Laliga":
                            return chart.colors.getIndex(1);
                            break;
                          case "League1":
                            return chart.colors.getIndex(2);
                            break;
                          case "EPL":
                            return chart.colors.getIndex(3);
                            break;
                        }
                      }
                      return fill;
                    });

                    // Add ranges
                    function addRange(label, start, end, color) {
                      var range = yAxis.axisRanges.create();
                      range.category = start;
                      range.endCategory = end;
                      range.label.text = label;
                      range.label.disabled = false;
                      range.label.fill = color;
                      range.label.location =0;
                      range.label.dx = -90;
                      range.label.dy = 12;
                      range.label.fontWeight = "bold";
                      range.label.fontSize = 12;
                      range.label.horizontalCenter = "left"
                      range.label.inside = true;

                      range.grid.stroke = am4core.color("#396478");
                      range.grid.strokeOpacity = 1;
                      range.tick.length = 200;
                      range.tick.disabled = false;
                      range.tick.strokeOpacity = 0.6;
                      range.tick.stroke = am4core.color("#396478");
                      range.tick.location = 0;

                      range.locations.category = 1;
                    }

                    addRange("Bundesliga", "Leipzig", "Bayern", chart.colors.getIndex(0));
                    addRange("Laliga", "ATM", "Barcelona", chart.colors.getIndex(1));
                    addRange("League1", "LYON", "PSG", chart.colors.getIndex(2));
                    addRange("EPL", "Man City", "Liverpool", chart.colors.getIndex(3));

                    chart.cursor = new am4charts.XYCursor();

                    }); // end am4core.ready()




         <!-- Chart code -->



    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

                var chart = am4core.create("radarChart", am4charts.RadarChart);
                chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
                chart.innerRadius = am4core.percent(50);
                chart.startAngle = -80;
                chart.endAngle = 260;

                chart.data = [
                  {
                    club: "Real Madrid",
                    titles: 90
                  },
                  {
                    club: "Barcelona",
                    titles: 91
                  },
                  {
                    club: "Benfica",
                    titles: 82
                  },
                  {
                    club: "Olympiacos",
                    titles: 75
                  },
                  {
                    club: "FC Porto",
                    titles: 74
                  },
                  {
                    club: "Man United",
                    titles: 71
                  },
                  {
                    club: "Ajax",
                    titles: 70
                  },
                  {
                    club: "Bayern Munich",
                    titles: 70
                  },
                  {
                    club: "Juventus",
                    titles: 63
                  }
                ];

                var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
                categoryAxis.renderer.grid.template.location = 0;
                categoryAxis.dataFields.category = "club";
                categoryAxis.renderer.labels.template.location = 0.5;
                categoryAxis.renderer.grid.template.strokeOpacity = 0.08;
                categoryAxis.renderer.tooltipLocation = 0.5;
                categoryAxis.tooltip.disabled = true;
                categoryAxis.renderer.labels.template.bent = true;
                categoryAxis.renderer.labels.template.padding(0, 0, 0, 0);
                categoryAxis.renderer.labels.template.radius = 7;

                var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
                valueAxis.min = 0;
                valueAxis.max = 100;
                valueAxis.strictMinMax = true;
                valueAxis.renderer.minGridDistance = 30;
                valueAxis.renderer.grid.template.strokeOpacity = 0.08;
                valueAxis.tooltip.disabled = true;

                // axis break
                var axisBreak = valueAxis.axisBreaks.create();
                axisBreak.startValue = 50;
                axisBreak.endValue = 70;
                axisBreak.breakSize = 0.02;

                // make break expand on hover
                var hoverState = axisBreak.states.create("hover");
                hoverState.properties.breakSize = 1;
                hoverState.properties.opacity = 0.1;
                hoverState.transitionDuration = 1500;

                axisBreak.defaultState.transitionDuration = 1000;

                var series = chart.series.push(new am4charts.RadarColumnSeries());
                series.dataFields.categoryX = "club";
                series.dataFields.valueY = "titles";
                series.columns.template.tooltipText = "{valueY.value}";
                series.columns.template.tooltipY = 0;
                series.columns.template.strokeOpacity = 0;

                chart.seriesContainer.zIndex = -1;

                // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
                series.columns.template.adapter.add("fill", function(fill, target) {
                  return chart.colors.getIndex(target.dataItem.index);
                });

                let cursor = new am4charts.RadarCursor();
                cursor.innerRadius = am4core.percent(50);
                cursor.lineY.disabled = true;

                cursor.xAxis = categoryAxis;
                chart.cursor = cursor;


                // end am4core.ready()
