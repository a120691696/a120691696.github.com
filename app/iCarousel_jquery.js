Number.prototype.times=function (b,c){for(var a=0;a<this;a++){b.call(c,a,this)}};
Array.prototype.from=function (item){
	if (item == null) return [];
	return (typeof(item) == 'array') ? item :   [item];
};
$A=function (i){return Array.prototype.from(i).slice();};
$clear=function (i){clearTimeout(i);clearInterval(i);return null;};
if(Function.prototype.passx==undefined){
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
$defined=function (i){return(i!=null);};
Function.prototype.chain=function(f){f();return window.chainx;}
window.chainx=function(){};
(function($){
window.iCarousel = function(_1, _2){
    this.options= {
        animation: {
            type: "fadeNscroll",
            direction: "left",
            amount: 1,
            transition: 'easeOutExpo',
            duration: 500,
            rotate: {
                type: "manual",
                interval: 5000,
                onMouseOver: "stop"
            }
        },
        item: {
            klass: "item",
            size: 100
        },
        idPrevious: "previous",
        idNext: "next",
        idToggle: "toggle",
        onClickPrevious: function(){},
       onClickNext:function(){},
       onPrevious: function(){},
        onNext: function(){},
        onGoTo: function(){},
        s5_javascript:"mootools",
        display_time:5
    };
    this.initialize(_1, _2);
    
}
    iCarousel.prototype.initialize= function (_1, _2) {
		var oldanim=this.options.animation;
		var olditem=this.options.item;
		$.extend(oldanim,_2.animation);
		$.extend(olditem,_2.item);
		$(this.options).extend(_2);
		this.options.animation=oldanim;
		this.options.item=olditem;
		//console.log(this.options);
        this.container = $(_1);
        this.aItems = $("." + this.options.item.klass);
        this.isMouseOver = false;
        if (this.options.idPrevious != "undefined" && $(this.options.idPrevious)) {
            $(this.options.idPrevious).bind("click", (function (_3) {
                _3.preventDefault();
                this._previous();
                $(this).trigger("onClickPrevious", this, 20)
            }).bind(this))
        }
        if (this.options.idNext != "undefined" && $(this.options.idNext)) {
            $(this.options.idNext).bind("click", (function (_4) {
                _4.preventDefault();
                this._next();
                $(this).trigger("onClickNext", this, 20)
            }).bind(this))
        }
        if (this.options.idToggle != "undefined" && $(this.options.idToggle)) {
            $(this.options.idToggle).bind("click", (function (_5) {
                _5.preventDefault();
                this._toggle()
            }).bind(this))
        }
        var _6 = this.options.animation;
        switch (this.options.animation.type.toLowerCase()) {
        case "fade":
            $(this.aItems).each((function (i,_7) {
                this.aItems[i].fx = function(obj){$(_7).animate(obj, {
                    'duration': _6.duration,
                   'transition': _6.transition,
                    'queue':false
                });return window.chainx;};
                $(_7).css("opacity", 0);
                $(_7).bind(
                    "mouseenter",(function () {
                        this.isMouseOver = true;
                        if (this.options.animation.rotate.type == "auto") {
                            this.timer = $clear(this.timer)
                        }
                    }).bind(this));
                    $(_7).bind( "mouseleave",(function () {
                        this.isMouseOver = false;
                        if (this.options.animation.rotate.type == "auto") {
                            this.timer = this._autoRotate.periodical(this.options.animation.rotate.interval, this)
                        }
                    }).bind(this));
            }).bind(this));
            this.height = parseInt(this.container.height());
             (2).times((function () {
                $(this.aItems).each((function (i,_8) {
                    $(_8).clone().removeAttr('id').appendTo($(this.container))
                }).bind(this))
            }).bind(this));
             this.aItems = $("." + this.options.item.klass);
            this.atScreen = 0;
            this._animate(this.atScreen);
			
			
			
                break;
        default:                                                   
           var flag  = false;                                          
            var idx = 0;
            (2).times((function () {
                $(this.aItems).each((function (i,_8) {
                    var tmp = $(_8).clone();
                    if(! flag && jQuery('a.s5mb', tmp).size()) flag = true;
                    if(idx >= $(this.aItems).size()) {
                    jQuery('.s5_button_item_inner', tmp).html('');
                    $(".s5_button_item").css('minHeight', 1);
                }
                   tmp.removeAttr('id').appendTo($(this.container));
                   idx ++;
                }).bind(this))
            }).bind(this));
            $(this.aItems).each(function (i,_8) {jQuery('.s5_button_item_inner', _8).html('');});
            if(flag && window.s5mbox) window.s5mbox.start();
            this.aItems = $("." + this.options.item.klass);
            //console.log(this.aItems = $("." + this.options.item.klass));

          
            $(this.aItems).each((function (i,_9) {
                $(_9).bind(
                    "mouseenter", (function () {
                        this.isMouseOver = true;
                        if (this.options.animation.rotate.type == "auto") {
                            this.timer = $clear(this.timer)
                        }
                    }).bind(this));
                  $(_9).bind(  "mouseleave",(function () {
                        this.isMouseOver = false;
                        if (this.options.animation.rotate.type == "auto") {
                            this.timer = this._autoRotate.periodical(this.options.animation.rotate.interval, this)
                        }
                    }).bind(this));
            }).bind(this));
            this.fx = function(obj){this.container.animate(obj,{'duration': _6.duration,'easing':_6.transition,'queue':false,'complete':function(){}});return window.chainx;};
            this.atScreen = this.aItems.length / 3;
            this.container.css(_6.direction, -this.atScreen * this.options.item.size);
            break
        }
        if (this.options.animation.rotate.type == "auto") {
            this.timer = this._autoRotate.periodical(this.options.animation.rotate.interval, this);
            this.currentActiveIdx  = 1;
            $('#s5navfs > li').each(function(i,d){
					$(d).mouseenter(function(e){
						this.currentActiveIdx = i + 1;
						clearInterval(this.timer);
				}.bind(this)).mouseleave(function(e){
					this.timer = this._autoRotate.periodical(this.options.animation.rotate.interval, this);
				}.bind(this));
			}.bind(this));
            
        }
        

	};
    
     iCarousel.prototype.goTo= function (n) {
		 
        switch (this.options.animation.type.toLowerCase()) {
        case "fade":
            var _b = this.atScreen;
            this.atScreen = Math.abs(n % (this.aItems.length / 3));
            //this.atScreen += this.aItems.length / 3;
            this._animate(this.atScreen, _b);
            break;
        default:
            this.atScreen = Math.abs(n % (this.aItems.length / 3));
            this.atScreen += this.aItems.length / 3;
            this._animate(this.atScreen);
            break
        }
        $(this).trigger("onGoTo", this, 20)
    },
    iCarousel.prototype._previous= function () {
        switch (this.options.animation.type.toLowerCase()) {
        case "fade":
            var _c = this.atScreen;
            this.atScreen -= this.options.animation.amount;
            if (this.atScreen < 0) {
                this.atScreen = (this.aItems.length - 1)
            }
            this._animate(this.atScreen, _c);
            break;
        default:
            this.atScreen -= this.options.animation.amount;
            if (this.atScreen < this.aItems.length / 3) {
                this.container.css(this.options.animation.direction, -this.options.item.size * this.aItems.length * 2 / 3);
                this.atScreen = this.aItems.length * 2 / 3 - this.options.animation.amount
            }
            this._animate(this.atScreen);
            break
        }
        $(this).trigger("onPrevious", this, 20)
    },
    iCarousel.prototype._next=function () {
        switch (this.options.animation.type.toLowerCase()) {
        case "fade":
            var _d = this.atScreen;
                        
			this.atScreen += this.options.animation.amount;            
            if (this.atScreen >= this.aItems.length * 2 / 3) {              
                this.atScreen = this.aItems.length / 3
            }                   

            this._animate(this.atScreen, _d);
            break;
        default:
            
			this.atScreen += this.options.animation.amount;            
            if (this.atScreen >= this.aItems.length * 2 / 3) {              
                this.atScreen = this.aItems.length / 3
            }                   

            this._animate(this.atScreen);
            break
        }
        $(this).trigger("onNext", this, 20)
    },
   iCarousel.prototype. _toggle= function () {
        (parseInt(this.container.height()) == 0) ? this.container.animate({'height':this.height}, {duration: 1000, easing: 'easeOutExpo'})
																							: this.container.animate({'height':0},{duration: 1000,easing: 'easeOutExpo'});
    },
    iCarousel.prototype._autoRotate=function () {
        if (this.options.animation.rotate.onMouseOver == "stop" && !this.isMouseOver) {
			// make current menu item active
			this.currentActiveIdx ++;
			this.currentActiveIdx = this.currentActiveIdx >  $('#s5navfs > li').size()  ?  1 : this.currentActiveIdx;
			eval('s5_active'+this.currentActiveIdx+'()');
			// end 
            this._next()
        }
    },
    iCarousel.prototype._animate= function (a, b) {
		//console.log(a,b);
        switch (this.options.animation.type) {
        case "fade":
            if ($defined(b)) {
                this.aItems[a].fx({'opacity':0}).chain((function () {
                    this.aItems[a].fx({'opacity':1})
                }).bind(this))
            } else {
                this.aItems[a].fx({'opacity':1})
            }
            break;
        case "scroll":
            var _10 = this;
            if (_10.options.animation.direction == "top") {
                _10.fx({
                    "top": -a * _10.options.item.size
                });
            } else {
                _10.fx({
                    "left": -a * _10.options.item.size
                });
            }
            break;
        case "fadeNscroll":
            var _10 = this;
            if (_10.options.animation.direction == "top") {
                _10.fx({
                    "opacity": 0.75
                }).chain(function () {
                    _10.fx({
                        "top": -a * _10.options.item.size
                    }).chain(function () {
                        _10.fx({
                            "opacity": 1
                        })
                    })
                })
            } else {
                _10.fx({
                    "opacity": 0.75
                }).chain(function () {
                    _10.fx({
                        "left": -a * _10.options.item.size
                    }).chain(function () {
                        _10.fx({
                            "opacity": 1
                        })
                    })
                })
            }
            break
        }
    }

})(jQuery);
