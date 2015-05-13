var is_ie_s5_ls/*@cc_on = {

  // quirksmode : (document.compatMode=="BackCompat"),

  version : parseFloat(navigator.appVersion.match(/MSIE (.+?);/)[1])

}@*/;



function opacity_s5_ls(id_s5_ls, opacStart_s5_ls, opacEnd_s5_ls, millisec_s5_ls) {

    //speed for each frame

    var speed_s5_ls = Math.round(millisec_s5_ls / 100);

    var timer_s5_ls = 0;

    //determine the direction for the blending, if start and end are the same nothing happens

    if(opacStart_s5_ls > opacEnd_s5_ls) {

        for(i = opacStart_s5_ls; i >= opacEnd_s5_ls; i--) {

            setTimeout("changeOpac_s5_ls(" + i + ",'" + id_s5_ls + "')",(timer_s5_ls * speed_s5_ls));

            timer_s5_ls++;

        }

    } else if(opacStart_s5_ls < opacEnd_s5_ls) {

        for(i = opacStart_s5_ls; i <= opacEnd_s5_ls; i++)

            {

            setTimeout("changeOpac_s5_ls(" + i + ",'" + id_s5_ls + "')",(timer_s5_ls * speed_s5_ls));

            timer_s5_ls++;

        }

    }

}



//change the opacity for different browsers

function changeOpac_s5_ls(opacity_s5_ls, id_s5_ls) {

    var object_s5_ls = document.getElementById(id_s5_ls).style;

    object_s5_ls.opacity = (opacity_s5_ls / 100);

    object_s5_ls.MozOpacity = (opacity_s5_ls / 100);

    object_s5_ls.KhtmlOpacity = (opacity_s5_ls / 100);

    object_s5_ls.filter = "alpha(opacity=" + opacity_s5_ls + ")";

}



function blendimage_s5_ls(divid_s5_ls, imageid_s5_ls, imagefile_s5_ls, millisec_s5_ls) {

    var speed_s5_ls = Math.round(millisec_s5_ls / 100);

    var timer_s5_ls = 0;

    

    //set the current image as background

    document.getElementById(divid_s5_ls).style.backgroundImage = "url(" + document.getElementById(imageid_s5_ls).src + ")";

    

    //make image transparent

    changeOpac_s5_ls(0, imageid_s5_ls);

    

    //make new image

    document.getElementById(imageid_s5_ls).src = imagefile_s5_ls;



    //fade in image

    for(i = 0; i <= 100; i++) {

        setTimeout("changeOpac_s5_ls(" + i + ",'" + imageid_s5_ls + "')",(timer_s5_ls * speed_s5_ls));

        timer_s5_ls++;

    }

}



function currentOpac_s5_ls(id_s5_ls, opacEnd_s5_ls, millisec_s5_ls) {

    //standard opacity is 100

    var currentOpac_s5_ls = 100;

    

    //if the element has an opacity set, get it

    if(document.getElementById(id_s5_ls).style.opacity < 100) {

        currentOpac_s5_ls = document.getElementById(id_s5_ls).style.opacity * 100;

    }



    //call for the function that changes the opacity

    opacity_s5_ls(id_s5_ls, currentOpac_s5_ls, opacEnd_s5_ls, millisec_s5_ls)

}





//Ajax call lib



jx = {

		http:false, //HTTP Object

		format:'text',

		callback:function(data){},

		error:false,

		//Create a xmlHttpRequest object - this is the constructor. 

		getHTTPObject : function() {

			var http = false;

			//Use IE's ActiveX items to load the file.

			if(typeof ActiveXObject != 'undefined') {

				try {http = new ActiveXObject("Msxml2.XMLHTTP");}

				catch (e) {

					try {http = new ActiveXObject("Microsoft.XMLHTTP");}

					catch (E) {http = false;}

				}

			//If ActiveX is not available, use the XMLHttpRequest of Firefox/Mozilla etc. to load the document.

			} else if (XMLHttpRequest) {

				try {http = new XMLHttpRequest();}

				catch (e) {http = false;}

			}

			return http;

		},

		// This function is called from the user's script. 

		//Arguments - 

		//	url	- The url of the serverside script that is to be called. Append all the arguments to 

		//			this url - eg. 'get_data.php?id=5&car=benz'

		//	callback - Function that must be called once the data is ready.

		//	format - The return type for this function. Could be 'xml','json' or 'text'. If it is json, 

		//			the string will be 'eval'ed before returning it. Default:'text'

		load : function (url,callback,format) {

			this.init(); //The XMLHttpRequest object is recreated at every call - to defeat Cache problem in IE

			if(!this.http||!url) return;

			if (this.http.overrideMimeType) this.http.overrideMimeType('text/xml');



			this.callback=callback;

			if(!format) var format = "text";//Default return type is 'text'

			this.format = format.toLowerCase();

			var ths = this;//Closure

			

			//Kill the Cache problem in IE.

			var now = "uid=" + new Date().getTime();

			url += (url.indexOf("?")+1) ? "&" : "?";

			url += now;



			this.http.open("GET", url, true);



			this.http.onreadystatechange = function () {//Call a function when the state changes.

				if(!ths) return;

				var http = ths.http;

				if (http.readyState == 4) {//Ready State will be 4 when the document is loaded.

					if(http.status == 200) {

						var result = "";

						if(http.responseText) result = http.responseText;

						//If the return is in JSON format, eval the result before returning it.

						if(ths.format.charAt(0) == "j") {

							//\n's in JSON string, when evaluated will create errors in IE

							result = result.replace(/[\n\r]/g,"");

							result = eval('('+result+')'); 

						}

		

						//Give the data to the callback function.

						if(ths.callback) ths.callback(result);

					} else { //An error occured

						if(ths.error) ths.error(http.status);

					}

				}

			}

			this.http.send(null);

		},

		init : function() {this.http = this.getHTTPObject();}

	}



