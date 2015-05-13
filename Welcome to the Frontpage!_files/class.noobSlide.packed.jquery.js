Array.prototype.from=function (item){
	if (item == null) return [];
	return (typeof(item) == 'array') ? item :   [item];
}
$clear=function (i){clearTimeout(i);clearInterval(i);return null;}
if(undefined == Function.prototype.passx){
Function.prototype.passx=function (args, bind){
		var self = this;
		if (args != null) args = Array.prototype.from(args);
		return function(){
			return self.apply(bind, args || arguments);
		};
};
}
if(undefined == Function.prototype.bind){
	Function.prototype.bind=function(that){
		var self = this,
			args = arguments.length > 1 ? Array.slice(arguments, 1) : null,
			F = function(){};

		var bound = function(){
			var context = that, length = arguments.length;
			if (this instanceof bound){
				F.prototype = self.prototype;
				context = new F;
			}
			var result = (!args && !length)
				? self.call(context)
				: self.apply(context, args && length ? args.concat(Array.slice(arguments)) : args || arguments);
			return context == that ? result : context;
		};
		return bound;
	}
};
Function.prototype.periodical=function (c,b,a){return setInterval(this.passx((a==null?[]:a),b),c);};

(function($){
var noobSlide = window.noobSlide = function(a){
	this.items = {};
        this.mode = 'horizontal';
        this.modes = {
            horizontal: ['left', 'width'],
            vertical: ['top', 'height']
        };
        this.size =965;
        this.box = $('<div></div>');
        this.button_event = 'click';
        this.handle_event = 'click';
        this.onWalk = null;
        this.currentIndex = null;
        this.previousIndex = null;
        this.nextIndex = null;
        this.interval =  5000;
        this.autoPlay = false;
        this._play = null;
        this.handles =  null;
         this.onHoverStop=false;

        this.buttons = {
            previous: [],
            next: [],
            play: [],
            playback: [],
            stop: []
        };
        this.fxOptions={ duration:1000, easing:'easeOutBack', queue:false};;
        this.initialize(a);
          if(this.onHoverStop){
			 var s5IsWrap = this.box.parentsUntil('.s5_is_wrap').parent();
			s5IsWrap.bind('mouseenter',function(e){
				e.preventDefault();
				this.stop();
			}.bind(this)).bind('mouseleave',function(e){
				e.preventDefault();
				if(document.getElementById("s5_ismod_play").style.display !="block")this.play(this.interval, 'next', true)
			}.bind(this));
			

		}
}

    noobSlide.prototype.initialize=function (a) {
		
        this.items = a.items;
        this.mode = a.mode || 'horizontal';
        this.modes = {
            horizontal: ['left', 'width'],
            vertical: ['top', 'height']
        };
        this.size = a.size || 965;
        this.box = a.box.css(this.modes[this.mode][1], (this.size * this.items.length) + 'px');
        this.button_event = a.button_event || 'click';
        this.handle_event = a.handle_event || 'click';
        this.onWalk = a.onWalk || null;
        this.currentIndex = null;
        this.previousIndex = null;
        this.nextIndex = null;
        this.onHoverStop=a.onHoverStop;
        this.interval = a.interval || 5000;
        this.autoPlay = a.autoPlay || false;
        this._play = null;
        this.handles = a.handles || null;
        if (this.handles) {
            this.addHandleButtons(this.handles)
        }
        this.buttons = {
            previous: [],
            next: [],
            play: [],
            playback: [],
            stop: []
        };
        this.fxOptions=a.fxOptions;
        if (a.addButtons) {
            for (var b in a.addButtons) {
                this.addActionButtons(b, typeof(a.addButtons[b]) == 'array' ? a.addButtons[b] : [a.addButtons[b]])
            }
        }

        this.fx=(function(obj){
			var tmp = jQuery.parseJSON('{"'+this.modes[this.mode][0]+'":'+obj+'}');
			this.box.animate(tmp,{queue:false,duration:this.fxOptions.duration,easing:this.fxOptions.easing});}).bind(this);
        this.walk((a.startItem || 0), true, true)

    },
    noobSlide.prototype.addHandleButtons= function (a) {
        for (var i = 0; i < a.length; i++) {
            a.eq(i).bind(this.handle_event, this.walk.passx([i, true], this))
        }
    },
    noobSlide.prototype.addActionButtons= function (a, b) {
        for (var i = 0; i < b.length; i++) {
            switch (a) {
                case 'previous':
                    b[i].bind(this.button_event, this.previous.passx([true], this));
                    break;
                case 'next':
                    b[i].bind(this.button_event, this.next.passx([true], this));
                    break;
                case 'play':
                    b[i].bind(this.button_event, this.play.passx([this.interval, 'next', false], this));
                    break;
                case 'playback':
                    b[i].bind(this.button_event, this.play.passx([this.interval, 'previous', false], this));
                    break;
                case 'stop':
                    b[i].bind(this.button_event, this.stop.bind(this)/*.create({
                        bind: this
                    })*/);
                    break
            }
            this.buttons[a].push(b[i])
        }
    },
    noobSlide.prototype.previous=function (a) {
        this.walk((this.currentIndex > 0 ? this.currentIndex - 1 : this.items.length - 1), a)
    },
    noobSlide.prototype.next= function (a) {
        this.walk((this.currentIndex < this.items.length - 1 ? this.currentIndex + 1 : 0), a)
    },
    noobSlide.prototype.play=function (a, b, c) {
		if(typeof(a)=='object'){
			var tmp=a;
			a=tmp[0];
			b=tmp[1];
			c=tmp[2];
		}
        this.stop();
        if (!c) {
            this[b](false)
        }
        this._play = this[b].periodical(a, this, [false])
    },
    noobSlide.prototype.stop=function () {
        $clear(this._play)
    },
    noobSlide.prototype.walk= function (a, b, c) {
		if(typeof(a)=='object'){
			var tmp=a;
			a=tmp[0];
			b=tmp[1];
			c=tmp[2];
		}
		//console.log('walk');
        if (a != this.currentIndex) {
            this.currentIndex = a;
            this.previousIndex = this.currentIndex + (this.currentIndex > 0 ? -1 : this.items.length - 1);
            this.nextIndex = this.currentIndex + (this.currentIndex < this.items.length - 1 ? 1 : 1 - this.items.length);
            if (b) {
                this.stop()
            }
            if (c) {
                this.box.stop();
                //this.box.css(this.modes[this.mode][0],this.size * -this.currentIndex+ 'px');
            } else {
				//console.log(this.size * -this.currentIndex);
                this.fx(this.size * -this.currentIndex)
            }
            if (b && this.autoPlay) {
                this.play(this.interval, 'next', true)
            }
            if (this.onWalk) {
                this.onWalk((this.items[this.currentIndex] || null), (this.handles && this.handles[this.currentIndex] ? this.handles[this.currentIndex] : null))
            }
        }
    }
    
    
    
})(jQuery);
var s5_ismod_switch = 1;

function s5_ismod_switchbuttons() {

    if (s5_ismod_switch == "1") {
        document.getElementById("s5_ismod_play").style.display = "block";
        document.getElementById("s5_ismod_stop").style.display = "none";
        s5_ismod_switch = 0;
    } else {
        document.getElementById("s5_ismod_play").style.display = "none";
        document.getElementById("s5_ismod_stop").style.display = "block";
        s5_ismod_switch = 1;
    }
}


function s5_ismod_onhover() {
    document.getElementById("s5_ismod_onhover").style.display = "block";
}

function s5_ismod_outhover() {
    document.getElementById("s5_ismod_onhover").style.display = "none";
}
