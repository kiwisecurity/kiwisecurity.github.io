var app = angular.module('ks-app', []);
        app.controller('ks-ctrl', function($scope, $timeout, $interval) {
            
            $scope.jobno = "";
            $scope.sitename = "";

            $scope.inspectiondate = "";
            $scope.contact = "";
            $scope.phone = "";
            $scope.installer = "";
            $scope.location = "";
            $scope.make = "";
            $scope.ssversion = "";

            $scope.table = [];

            $scope.tablerow = {
                assetid: '',
                locktype: '',
                doorno: '',
                doorloc: '',
                doorcomp: '',
                edr: '',
                technicalnotes: '',
                date: '',
                services: '',
                status: '',
                entrydevice: '',
                lockcond: '',
                pivot: '',
                handles: '',
                doorclosure: '',
                edrtest: '',
                exitdevice: '',
                egress: '',
                bwof: '',
                job_type: ''
            };


            $scope.saverow = function() {

                $scope.tablerow.date = $("#date").val();
                

                if($scope.tablerow.assetid === '') {
                    alert("Please enter Asset ID");
                    return;
                }
                
                if($scope.tablerow.locktype === '') {
                    alert("Please select an option for lock type");
                    return;
                }

                if($scope.tablerow.doorno === '') {
                    alert("Please enter Door Number / Name");
                    return;
                }

                if($scope.tablerow.doorloc === '') {
                    alert("Please enter Door Location");
                    return;
                }

                if($scope.tablerow.doorcomp === '') {
                    alert("Please select door composition");
                    return;
                }

                if($scope.tablerow.edr === '') {
                    alert("Please select EDR Required");
                    return;
                }

                if($scope.tablerow.technicalnotes === '') {
                    alert("Please enter technical notes");
                    return;
                }

                if($scope.tablerow.date === '') {
                    alert("Please select date"); 
                    return;
                }

                if($scope.tablerow.services === '') {
                    alert("Please select services");
                    return;
                }

                if($scope.tablerow.status === '') {
                    alert("Please enter Status");
                    return;
                }

                if($scope.tablerow.entrydevice === '') {
                    alert("Please select Entry Device");
                    return;
                }

                if($scope.tablerow.lockcond === '') {
                    alert("Please select Lock Condition");
                    return;
                }
                if($scope.tablerow.pivot === '') {
                    alert("Please select Pivot & Hinges");
                    return;
                }
                if($scope.tablerow.handles === '') {
                    alert("Please select Handles & Push buttons");
                    return;
                }
                if($scope.tablerow.doorclosure === '') {
                    alert("Please select Door closure condition");
                    return;
                }
                if($scope.tablerow.edrtest === '') {
                    alert("Please select EDR Test");
                    return;
                }
                if($scope.tablerow.exitdevice === '') {
                    alert("Please select Exit Device");
                    return;
                }
                if($scope.tablerow.egress === '') {
                    alert("Please select Egress path clear and un-obstructede");
                    return;
                }
                if($scope.tablerow.bwof === '') {
                    alert("Please select BWOF Book Sign");
                    return;
                }
                if($scope.tablerow.job_type === '') {
                    alert("Please select job type (iqp testing or service)");
                    return;
                }

                $scope.table.push($scope.tablerow);
                localforage.setItem('table', $scope.table, function (err) {
                    if(err === null) {
                        alert("Report saved to table.");
                        window.location.reload();
                    }
                });
            }

            $scope.export = function() {

                if($scope.jobno === '') {
                    alert("Enter job number in export table");
                    document.getElementById("jobno").focus();
                    return;
                }

                if($scope.sitename === '') {
                    alert("Enter site name in export table");
                    document.getElementById("sitename").focus();
                    return;
                }

                var inspectiondate = document.getElementById("inspectiondate").value;
                if(inspectiondate === '') {
                    alert("Enter inspection date in export table");
                    document.getElementById("inspectiondate").focus();
                    return;
                }
                $("#spanInspectionDate").html(inspectiondate);

                var contact = document.getElementById("contact").value;
                if(contact=== '') {
                    alert("Enter contact in export table");
                    document.getElementById("contact").focus();
                    return;
                }
                $("#spanContact").html(contact);
                
                var phone = document.getElementById("phone").value;
                if(phone=== '') {
                    alert("Enter phone in export table");
                    document.getElementById("phone").focus();
                    return;
                }
                $("#spanPhone").html(phone);

                var installer = document.getElementById("installer").value;
                if(installer=== '') {
                    alert("Enter installer name in export table");
                    document.getElementById("installer").focus();
                    return;
                }
                $("#spanInstaller").html(installer);

                var location = document.getElementById("location").value;
                if(location=== '') {
                    alert("Enter cabinet location name in export table");
                    document.getElementById("location").focus();
                    return;
                }
                $("#spanLocation").html(location);

                var make = document.getElementById("make").value;
                if(make=== '') {
                    alert("Enter make in export table");
                    document.getElementById("make").focus();
                    return;
                }
                $("#spanMake").html(make);

                if($scope.ssversion === '') {
                    alert("Enter SMA- SS version in export table");
                    document.getElementById("ssversion").focus();
                    return;
                }
                if($scope.table.length === 0) {
                    alert("No data in export table");
                    return;
                }
                TableToExcel.convert(document.getElementById("export-table"), {
                    name: $scope.sitename+".xlsx",
                    sheet: {
                        name: "Asset Inspection"
                    }
                });
            }

            $scope.resetTable = function() {
                var s = confirm("Do you want to clear the table data?");
                if(s) {
                    localforage.setItem('table', [], function (err) {
                        if(err === null) {
                            alert("Table data cleared");
                            window.location.reload();
                        }
                    });
                }
                
            }

            $scope.init = function() {
                var status = localforage.supports(localforage.INDEXEDDB);
                if(status) {
                    localforage.config({
                    driver      : localforage.INDEXEDDB, // Force WebSQL; same as using setDriver()
                    name        : 'kiwisecurity',
                    version     : 1.0,
                    size        : 4980736, // Size of database, in bytes. WebSQL-only for now.
                    storeName   : 'keyvaluepairs', // Should be alphanumeric, with underscores.
                    description : 'Simple app for exporting forms to excel'
                });
                }
                

                localforage.setItem('dev', 'done', function (err) {
                    console.log(err);
                });

                localforage.getItem('table', function(err, value) {
                    if(err === null && value !== null) {
                        $timeout(function() {
                            $scope.table = value;
                            $scope.tablerow.assetid = $scope.table.length+1;
                        }, 1);
                    }
                });


                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = today.getFullYear();

                today = dd + '/' + mm + '/' + yyyy;

                $scope.tablerow.date = today;
                $scope.inspectiondate = today;                

                $("#date").flatpickr({
                    dateFormat: "d/m/Y",
                    defaultDate: "today"
                });

                $("#inspectiondate").flatpickr({
                    dateFormat: "d/m/Y",
			        defaultDate: "today"
                });
            }

            $scope.init();
        });