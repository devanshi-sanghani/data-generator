window.onload = function(){
	/*
		function convertToCSV contains the code to convert JSON data in csv format
		@param {data} input data to be converted
		@param {x_h} input column name for x-axis
		@param {y_h} input column name for y-axis
	*/

	var convertToCSV = function (objArray, x, y) {
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray,
        	str = x + ',' + y + '\r\n',
        	length = array.length;

        for (var i = 0; i < length; i++) {
            var line = '';
            for (var index in array[i]) {
                if (line != '') line += ','

                line += array[i][index];
            }

            str += line + '\r\n';
        }
        return str;
    }

    /*
		function dowloadData contains the code to downloadind data in csv format
		@param {data} input data to be downloaded
		@param {x_h} input column name for x-axis
		@param {y_h} input column name for y-axis
    */
    var downloadData = function (data, x_h, y_h) {
    	var csv = onvertToCSV(data, x_h, y_h),
			a = document.createElement('a');
		a.textContent='';
		a.download="myFileName.csv";
		a.href='data:text/csv;charset=utf-8,'+escape(csv);
		document.body.appendChild(a);

		a.click(); // This will download the data file named "my_data.csv".
    }

	/*
		function processData() would process the data for CSV
		@param {s_x} input start value for x-axis
		@param {e_x} input end value for x-axis
		@param {d_y} input array of data for y-axis
		@param {x_h} input column name for x-axis
		@param {y_h} input column name for y-axis
	*/

	var processData = function (s_x, e_x, d_y, x_h, y_h) {
		var length, data, temp;
		data = [];
		temp = new Array();
		temp = d_y.split(",");
		length = temp.length;
		for (var i=0; i < length; i++) {
			data[i] = {};
			data[i][x_h] = Math.floor(Math.random() * e_x) + s_x;
			data[i][y_h] = temp[i];
		}
		downloadData(data, x_h, y_h)
	}

	/* 
		function readData() reads all the data inputed from the form to generate the data
	*/
	var readData = function () {
		var start_x, end_x, data_y, x_header, y_header;

		start_x = parseInt(document.getElementById("start_x").value);
		end_x = parseInt(document.getElementById("end_x").value);
		data_y = document.getElementById("data_y").value;
		x_header = document.getElementById("x_header").value;
		y_header = document.getElementById("y_header").value;
		processData(start_x, end_x, data_y, x_header, y_header);
	}

	/*
		function generateData is called when button is clicked
	*/
	var generateData = function () {
		console.log("hi")
		readData();
		return false;
	}
	document.getElementById("generate").addEventListener("click", generateData);
	// generateData();
};