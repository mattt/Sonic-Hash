/*
 * Sonic-Hash : A melodic Sonification of password field input
 * http://github.com/mattt/Sonic-Hash/
 *
 * Copyright (c) 2009-2012 Mattt Thompson (http://mattt.me)
 * Licensed under the MIT licenses.
 */

(function($){
  $.fn.extend({
    sonicHash: function(options) {
      var defaults = {
          notes:    4,
          minimum:  6,
          salt:     "7be82b35cb0199120eea35a4507c9acf",
          scale:    "pentatonic"
      };

      var options = $.extend(defaults, options);

      var notes = {
           "C3"      : 130.81,  "C4"      : 261.63,  "C5"      : 523.25,
           "C#3/Db3" : 138.59,  "C#4/Db4" : 277.18,  "C#5/Db5" : 277.18,
           "D3"      : 146.83,  "D4"      : 293.66,  "D5"      : 293.66,
           "D#3/Eb3" : 155.56,  "D#4/Eb4" : 311.13,  "D#5/Eb5" : 311.13,
           "E3"      : 164.81,  "E4"      : 329.63,  "E5"      : 329.63,
           "F3"      : 174.61,  "F4"      : 349.23,  "F5"      : 349.23,
           "F#3/Gb3" : 185.00,  "F#4/Gb4" : 369.99,  "F#5/Gb5" : 369.99,
           "G3"      : 196.00,  "G4"      : 392.00,  "G5"      : 392.00,
           "G#3/Ab3" : 207.65,  "G#4/Ab4" : 415.30,  "G#5/Ab5" : 415.30,
           "A3"      : 220.00,  "A4"      : 440.00,  "A5"      : 440.00,
           "A#3/Bb3" : 233.08,  "A#4/Bb4" : 466.16,  "A#5/Bb5" : 466.16,
           "B3"      : 246.94,  "B4"      : 493.88,  "B5"      : 493.88
      };

      var scale      = [];
      var pentatonic = ["C3", "D3", "E3", "G3", "A3", "C4", "D4", "E4", "G4", "A4", "C5", "D5", "E5", "G5", "A5"];
      var octatonic  = ["F3", "F#3/Gb3", "G3", "G#3/Ab3", "A3", "A#3/Bb3", "B3", "C4", "C#4/Db4", "D4", "D#4/Eb4", "E4", "F4", "F#4/Gb4", "G4"];

      if (options.scale === "octatonic") {
        scale = $.map(octatonic, function(n, i){return (notes[n]);});
      } else {
        scale = $.map(pentatonic, function(n, i){return (notes[n]);});
      }

      return this.each(function() {
        var trigger = function(e) {
          var $el = $(this);

          if ($el.val() == "" ) {
            return;
          } else if ($el.val().length < options.minimum) {
            $("#sonic-hash").replaceWith('<audio id="sonic-hash" src="' + alert + '"></audio>');
            $("#sonic-hash")[0].play();
          } else {
            var md5    = hex_md5('' + $(this).val() + ':' + options.salt);
            var digits = md5.match(/([\dABCDEF])/ig);
            var chord = [];

            for(var i = 0; i < options.notes; i++) {
              chord.push(scale[parseInt(digits[i], 0x10)]);
            }

            $("#sonic-hash").replaceWith('<audio id="sonic-hash" src="' + generate(chord, {seconds:0.25}) + '"></audio>');
            $("#sonic-hash")[0].play();
          }
        };

        $(this).each(function(e) {
          $el = $(this)
          if ($("#sonic-hash")[0] === undefined) {
            $el.after('<audio id="sonic-hash"></audio>');
          }
          
          $el.bind('blur', trigger);
        });
        
          // Javascript WAV generation based on code by sk89q (http://sk89q.therisenrealm.com/)
          var generate=function(B,D){var G={channels:1,sampleRate:1012,bitDepth:16,seconds:0.25,volume:32767};var D=$.extend(G,D);var A=D.channels;var C=D.sampleRate;var F=D.bitDepth;var I=D.seconds;var N=D.volume;var K;var T=[];var J=0;for(var P in B){K=B[P];for(var O=0;O<C*I;O++){for(var Q=0;Q<A;Q++){var H=N*Math.sin((2*Math.PI)*(O/C)*K);T.push(pack("v",H));J++;}}}T=T.join("");var S=["fmt ",pack("V",16),pack("v",1),pack("v",A),pack("V",C),pack("V",C*A*F/8),pack("v",A*F/8),pack("v",F)].join("");var R=["data",pack("V",J*A*F/8),T].join("");var M=["RIFF",pack("V",4+(8+S.length)+(8+R.length)),"WAVE"].join("");var L=[M,S,R].join("");var E="data:audio/wav;base64,"+escape(btoa(L));return E;};var btoa=function(D){var B="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";var A="";var K,I,G;var J,H,F,E;var C=0;do{K=D.charCodeAt(C++);I=D.charCodeAt(C++);G=D.charCodeAt(C++);J=K>>2;H=((K&3)<<4)|(I>>4);F=((I&15)<<2)|(G>>6);E=G&63;if(isNaN(I)){F=E=64;}else{if(isNaN(G)){E=64;}}A=A+B.charAt(J)+B.charAt(H)+B.charAt(F)+B.charAt(E);}while(C<D.length);return A;};var pack=function(B){var D="";var C=1;for(var E=0;E<B.length;E++){var F=B.charAt(E);var A=arguments[C];C++;switch(F){case"a":D+=A[0]+"\0";break;case"A":D+=A[0]+" ";break;case"C":case"c":D+=String.fromCharCode(A);break;case"n":D+=String.fromCharCode((A>>8)&255,A&255);break;case"v":D+=String.fromCharCode(A&255,(A>>8)&255);break;case"N":D+=String.fromCharCode((A>>24)&255,(A>>16)&255,(A>>8)&255,A&255);break;case"V":D+=String.fromCharCode(A&255,(A>>8)&255,(A>>16)&255,(A>>24)&255);break;case"x":C--;D+="\0";break;default:throw new Error("Unknown pack format character '"+F+"'");}}return D;};
          
          var alert = generate([799, 790, 799], {seconds:0.1, volume: 7797});

          /*
           * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
           * Digest Algorithm, as defined in RFC 1321.
           * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
           * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
           * Distributed under the BSD License
           * See http://pajhome.org.uk/crypt/md5 for more info.
          */
          var hexcase=0;var b64pad="";function hex_md5(A){return rstr2hex(rstr_md5(str2rstr_utf8(A)));}function b64_md5(A){return rstr2b64(rstr_md5(str2rstr_utf8(A)));}function any_md5(A,B){return rstr2any(rstr_md5(str2rstr_utf8(A)),B);}function hex_hmac_md5(A,B){return rstr2hex(rstr_hmac_md5(str2rstr_utf8(A),str2rstr_utf8(B)));}function b64_hmac_md5(A,B){return rstr2b64(rstr_hmac_md5(str2rstr_utf8(A),str2rstr_utf8(B)));}function any_hmac_md5(A,C,B){return rstr2any(rstr_hmac_md5(str2rstr_utf8(A),str2rstr_utf8(C)),B);}function rstr_md5(A){return binl2rstr(binl_md5(rstr2binl(A),A.length*8));}function rstr_hmac_md5(C,F){var E=rstr2binl(C);if(E.length>16){E=binl_md5(E,C.length*8);}var A=Array(16),D=Array(16);for(var B=0;B<16;B++){A[B]=E[B]^909522486;D[B]=E[B]^1549556828;}var G=binl_md5(A.concat(rstr2binl(F)),512+F.length*8);return binl2rstr(binl_md5(D.concat(G),512+128));}function rstr2hex(C){try{hexcase;}catch(F){hexcase=0;}var E=hexcase?"0123456789ABCDEF":"0123456789abcdef";var B="";var A;for(var D=0;D<C.length;D++){A=C.charCodeAt(D);B+=E.charAt((A>>>4)&15)+E.charAt(A&15);}return B;}function rstr2b64(C){try{b64pad;}catch(G){b64pad="";}var F="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var B="";var A=C.length;for(var E=0;E<A;E+=3){var H=(C.charCodeAt(E)<<16)|(E+1<A?C.charCodeAt(E+1)<<8:0)|(E+2<A?C.charCodeAt(E+2):0);for(var D=0;D<4;D++){if(E*8+D*6>C.length*8){B+=b64pad;}else{B+=F.charAt((H>>>6*(3-D))&63);}}}return B;}function rstr2any(K,C){var B=C.length;var J,F,A,L,E;var I=Array(Math.ceil(K.length/2));for(J=0;J<I.length;J++){I[J]=(K.charCodeAt(J*2)<<8)|K.charCodeAt(J*2+1);}var H=Math.ceil(K.length*8/(Math.log(C.length)/Math.log(2)));var G=Array(H);for(F=0;F<H;F++){E=Array();L=0;for(J=0;J<I.length;J++){L=(L<<16)+I[J];A=Math.floor(L/B);L-=A*B;if(E.length>0||A>0){E[E.length]=A;}}G[F]=L;I=E;}var D="";for(J=G.length-1;J>=0;J--){D+=C.charAt(G[J]);}return D;}function str2rstr_utf8(C){var B="";var D=-1;var A,E;while(++D<C.length){A=C.charCodeAt(D);E=D+1<C.length?C.charCodeAt(D+1):0;if(55296<=A&&A<=56319&&56320<=E&&E<=57343){A=65536+((A&1023)<<10)+(E&1023);D++;}if(A<=127){B+=String.fromCharCode(A);}else{if(A<=2047){B+=String.fromCharCode(192|((A>>>6)&31),128|(A&63));}else{if(A<=65535){B+=String.fromCharCode(224|((A>>>12)&15),128|((A>>>6)&63),128|(A&63));}else{if(A<=2097151){B+=String.fromCharCode(240|((A>>>18)&7),128|((A>>>12)&63),128|((A>>>6)&63),128|(A&63));}}}}}return B;}function str2rstr_utf16le(B){var A="";for(var C=0;C<B.length;C++){A+=String.fromCharCode(B.charCodeAt(C)&255,(B.charCodeAt(C)>>>8)&255);}return A;}function str2rstr_utf16be(B){var A="";for(var C=0;C<B.length;C++){A+=String.fromCharCode((B.charCodeAt(C)>>>8)&255,B.charCodeAt(C)&255);}return A;}function rstr2binl(B){var A=Array(B.length>>2);for(var C=0;C<A.length;C++){A[C]=0;}for(var C=0;C<B.length*8;C+=8){A[C>>5]|=(B.charCodeAt(C/8)&255)<<(C%32);}return A;}function binl2rstr(B){var A="";for(var C=0;C<B.length*32;C+=8){A+=String.fromCharCode((B[C>>5]>>>(C%32))&255);}return A;}function binl_md5(K,F){K[F>>5]|=128<<((F)%32);K[(((F+64)>>>9)<<4)+14]=F;var J=1732584193;var I=-271733879;var H=-1732584194;var G=271733878;for(var C=0;C<K.length;C+=16){var E=J;var D=I;var B=H;var A=G;J=md5_ff(J,I,H,G,K[C+0],7,-680876936);G=md5_ff(G,J,I,H,K[C+1],12,-389564586);H=md5_ff(H,G,J,I,K[C+2],17,606105819);I=md5_ff(I,H,G,J,K[C+3],22,-1044525330);J=md5_ff(J,I,H,G,K[C+4],7,-176418897);G=md5_ff(G,J,I,H,K[C+5],12,1200080426);H=md5_ff(H,G,J,I,K[C+6],17,-1473231341);I=md5_ff(I,H,G,J,K[C+7],22,-45705983);J=md5_ff(J,I,H,G,K[C+8],7,1770035416);G=md5_ff(G,J,I,H,K[C+9],12,-1958414417);H=md5_ff(H,G,J,I,K[C+10],17,-42063);I=md5_ff(I,H,G,J,K[C+11],22,-1990404162);J=md5_ff(J,I,H,G,K[C+12],7,1804603682);G=md5_ff(G,J,I,H,K[C+13],12,-40341101);H=md5_ff(H,G,J,I,K[C+14],17,-1502002290);I=md5_ff(I,H,G,J,K[C+15],22,1236535329);J=md5_gg(J,I,H,G,K[C+1],5,-165796510);G=md5_gg(G,J,I,H,K[C+6],9,-1069501632);H=md5_gg(H,G,J,I,K[C+11],14,643717713);I=md5_gg(I,H,G,J,K[C+0],20,-373897302);J=md5_gg(J,I,H,G,K[C+5],5,-701558691);G=md5_gg(G,J,I,H,K[C+10],9,38016083);H=md5_gg(H,G,J,I,K[C+15],14,-660478335);I=md5_gg(I,H,G,J,K[C+4],20,-405537848);J=md5_gg(J,I,H,G,K[C+9],5,568446438);G=md5_gg(G,J,I,H,K[C+14],9,-1019803690);H=md5_gg(H,G,J,I,K[C+3],14,-187363961);I=md5_gg(I,H,G,J,K[C+8],20,1163531501);J=md5_gg(J,I,H,G,K[C+13],5,-1444681467);G=md5_gg(G,J,I,H,K[C+2],9,-51403784);H=md5_gg(H,G,J,I,K[C+7],14,1735328473);I=md5_gg(I,H,G,J,K[C+12],20,-1926607734);J=md5_hh(J,I,H,G,K[C+5],4,-378558);G=md5_hh(G,J,I,H,K[C+8],11,-2022574463);H=md5_hh(H,G,J,I,K[C+11],16,1839030562);I=md5_hh(I,H,G,J,K[C+14],23,-35309556);J=md5_hh(J,I,H,G,K[C+1],4,-1530992060);G=md5_hh(G,J,I,H,K[C+4],11,1272893353);H=md5_hh(H,G,J,I,K[C+7],16,-155497632);I=md5_hh(I,H,G,J,K[C+10],23,-1094730640);J=md5_hh(J,I,H,G,K[C+13],4,681279174);G=md5_hh(G,J,I,H,K[C+0],11,-358537222);H=md5_hh(H,G,J,I,K[C+3],16,-722521979);I=md5_hh(I,H,G,J,K[C+6],23,76029189);J=md5_hh(J,I,H,G,K[C+9],4,-640364487);G=md5_hh(G,J,I,H,K[C+12],11,-421815835);H=md5_hh(H,G,J,I,K[C+15],16,530742520);I=md5_hh(I,H,G,J,K[C+2],23,-995338651);J=md5_ii(J,I,H,G,K[C+0],6,-198630844);G=md5_ii(G,J,I,H,K[C+7],10,1126891415);H=md5_ii(H,G,J,I,K[C+14],15,-1416354905);I=md5_ii(I,H,G,J,K[C+5],21,-57434055);J=md5_ii(J,I,H,G,K[C+12],6,1700485571);G=md5_ii(G,J,I,H,K[C+3],10,-1894986606);H=md5_ii(H,G,J,I,K[C+10],15,-1051523);I=md5_ii(I,H,G,J,K[C+1],21,-2054922799);J=md5_ii(J,I,H,G,K[C+8],6,1873313359);G=md5_ii(G,J,I,H,K[C+15],10,-30611744);H=md5_ii(H,G,J,I,K[C+6],15,-1560198380);I=md5_ii(I,H,G,J,K[C+13],21,1309151649);J=md5_ii(J,I,H,G,K[C+4],6,-145523070);G=md5_ii(G,J,I,H,K[C+11],10,-1120210379);H=md5_ii(H,G,J,I,K[C+2],15,718787259);I=md5_ii(I,H,G,J,K[C+9],21,-343485551);J=safe_add(J,E);I=safe_add(I,D);H=safe_add(H,B);G=safe_add(G,A);}return Array(J,I,H,G);}function md5_cmn(F,C,B,A,E,D){return safe_add(bit_rol(safe_add(safe_add(C,F),safe_add(A,D)),E),B);}function md5_ff(C,B,G,F,A,E,D){return md5_cmn((B&G)|((~B)&F),C,B,A,E,D);}function md5_gg(C,B,G,F,A,E,D){return md5_cmn((B&F)|(G&(~F)),C,B,A,E,D);}function md5_hh(C,B,G,F,A,E,D){return md5_cmn(B^G^F,C,B,A,E,D);}function md5_ii(C,B,G,F,A,E,D){return md5_cmn(G^(B|(~F)),C,B,A,E,D);}function safe_add(A,D){var C=(A&65535)+(D&65535);var B=(A>>16)+(D>>16)+(C>>16);return(B<<16)|(C&65535);}function bit_rol(A,B){return(A<<B)|(A>>>(32-B));}
        });
      }
    });
})(jQuery);
