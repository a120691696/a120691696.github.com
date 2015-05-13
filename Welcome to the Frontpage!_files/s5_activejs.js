var s5_active_id = "";

	if (document.getElementById("thumb10")) {
		s5_active_id = "thumb10";
	}
	if (document.getElementById("thumb9")) {
		s5_active_id = "thumb9";
	}
	if (document.getElementById("thumb8")) {
		s5_active_id = "thumb8";
	}
	if (document.getElementById("thumb7")) {
		s5_active_id = "thumb7";
	}
	if (document.getElementById("thumb6")) {
		s5_active_id = "thumb6";
	}
	if (document.getElementById("thumb5")) {
		s5_active_id = "thumb5";
	}
	if (document.getElementById("thumb4")) {
		s5_active_id = "thumb4";
	}
	if (document.getElementById("thumb3")) {
		s5_active_id = "thumb3";
	}
	if (document.getElementById("thumb2")) {
		s5_active_id = "thumb2";
	}
	if (document.getElementById("thumb1")) {
		s5_active_id = "thumb1";
	}
	if (document.getElementById("thumb0")) {
		s5_active_id = "thumb0";
	}
	document.getElementById(s5_active_id).className = "s5_ts_active";
	
	function s5_clear_ts_others() {
	if (document.getElementById("thumb0")) {
		document.getElementById("thumb0").className = "s5_ts_not_active";
	}
	if (document.getElementById("thumb1")) {
		document.getElementById("thumb1").className = "s5_ts_not_active";
	}
	if (document.getElementById("thumb2")) {
		document.getElementById("thumb2").className = "s5_ts_not_active";
	}
	if (document.getElementById("thumb3")) {
		document.getElementById("thumb3").className = "s5_ts_not_active";
	}
	if (document.getElementById("thumb4")) {
		document.getElementById("thumb4").className = "s5_ts_not_active";
	}
	if (document.getElementById("thumb5")) {
		document.getElementById("thumb5").className = "s5_ts_not_active";
	}
	if (document.getElementById("thumb6")) {
		document.getElementById("thumb6").className = "s5_ts_not_active";
	}
	if (document.getElementById("thumb7")) {
		document.getElementById("thumb7").className = "s5_ts_not_active";
	}
	if (document.getElementById("thumb8")) {
		document.getElementById("thumb8").className = "s5_ts_not_active";
	}
	if (document.getElementById("thumb9")) {
		document.getElementById("thumb9").className = "s5_ts_not_active";
	}
}

function s5_active1() {
s5_clear_ts_others();
document.getElementById("thumb0").className = "s5_ts_active";
}

function s5_active2() {
s5_clear_ts_others();
document.getElementById("thumb1").className = "s5_ts_active";
}

function s5_active3() {
s5_clear_ts_others();
document.getElementById("thumb2").className = "s5_ts_active";
}

function s5_active4() {
s5_clear_ts_others();
document.getElementById("thumb3").className = "s5_ts_active";
}

function s5_active5() {
s5_clear_ts_others();
document.getElementById("thumb4").className = "s5_ts_active";
}

function s5_active6() {
s5_clear_ts_others();
document.getElementById("thumb5").className = "s5_ts_active";
}

function s5_active7() {
s5_clear_ts_others();
document.getElementById("thumb6").className = "s5_ts_active";
}

function s5_active8() {
s5_clear_ts_others();
document.getElementById("thumb7").className = "s5_ts_active";
}

function s5_active9() {
s5_clear_ts_others();
document.getElementById("thumb8").className = "s5_ts_active";
}

function s5_active10() {
s5_clear_ts_others();
document.getElementById("thumb9").className = "s5_ts_active";
}

function s5_tab_show_resize() {
var s5_tab_show_width = document.body.getElementsByTagName("DIV");
	for (var s5_tab_show_width_y=0; s5_tab_show_width_y<s5_tab_show_width.length; s5_tab_show_width_y++) {
		if (s5_tab_show_width[s5_tab_show_width_y].className == "s5_button_item_inner") {
			s5_tab_show_width[s5_tab_show_width_y].style.width = document.getElementById("s5_button").offsetWidth + "px";
			s5_tab_show_width[s5_tab_show_width_y].style.visibility = "visible";
		}
	}
}

window.onresize=s5_tab_show_resize;

s5_tab_show_resize();
