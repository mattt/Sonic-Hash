Sonic-Hash
===========

## A melodic Sonification of password field input

*In a tweet*: Sonic-Hash is a jQuery plugin that composes a pentatonic or octatonic melody for secure text-field values

Password entry can be frustrating, especially with long or difficult passwords. On a webpage, secure fields obscure your input with •'s, so others can't read it. Unfortunately, neither can you—you can't tell if you got your password right until you click "Log In". 

Sonic-Hash attempts to solve this problem using subtle audible cues. After you finish typing your password, Sonic-Hash will take it, and construct a musical representation of it. In a registration flow where you have to enter their password twice, you can easily tell if they match by comparing the first melody to the second. Or, every time you log in, your trusty password will generate the same distinctive melody. You'll know if you messed up if you hear an unfamiliar tune.

## Demo

Melodies speak louder than words:  
Try it out at: <tt>[http://mattt.github.com/Sonic-Hash/](http://mattt.github.com/Sonic-Hash/ "Try out Sonic-Hash!")</tt>  
*Note:* Requires browser with support for HTML5 <audio>, such as [Safari 4](http://www.apple.com/safari/download/), [Firefox 3.5](http://www.mozilla.com/firefox/), or [Chrome](http://www.google.com/chrome/)

## Usage

<code>
  $("input:password").sonicHash({notes: 4, minimum: 6, salt: "7be82b35cb0199120eea35a4507c9acf", scale: "pentatonic"});
</code>

- <tt>notes</tt> number of notes to be played each time
- <tt>minimum</tt> minimum number of characters; otherwise, an alert sound plays
- <tt>salt</tt> value to be appended when calculating hash function
- <tt>scale</tt> choose notes using a pentatonic or octatonic scale

## Requirements
- jQuery 1.3+

## License

Sonic-Hash is licensed under the MIT License:

  Copyright (c) 2009 Mattt Thompson (http://mattt.me/)

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
  
## Credit

Sonic-Hash uses Paul Johnston's Javascript MD5 implementation, and is distributed under the BSD License  
See [http://pajhome.org.uk/crypt/md5](http://pajhome.org.uk/crypt/md5) for more info

Javascript client-side WAV generation based on code by sk89q  
See [http://sk89q.therisenrealm.com/](http://sk89q.therisenrealm.com/) for more info

Thanks to Christian Crumlish (@mediajunkie) for suggesting the use of sound for password identification.