# HUDson
[es](https://github.com/joelemiliano/HUDson/blob/main/README-es.md)

Tool that allows your JS scripts available in HUDson's JS file to be run. For MediaWiki

## Disclaimers
* If you don't want HUDson to be labeled as a disruption tool in the MediaWiki community, just DON'T RUN MALICIOUS SCRIPTS ON PUBLIC WIKIS!
* DON'T RUN CODE THAT WAS GIVEN TO YOU BY A STRANGER IF YOU DON'T KNOW WHAT IT DOES

## How to use HUDson
You need to use the right version of HUDson depending the skin you are using, select it here:
* [Vector 2010](https://github.com/joelemiliano/HUDson/blob/main/HUDson-vector.js) ([es](https://github.com/joelemiliano/HUDson/blob/main/HUDson-vector-es.js))

If for example you use Vector 2010, copy the code for that skin and paste it in ``Special:MyPage/vector.js``.

Automatically your HUDson JS file will be created on ``Special:MyPage/hudson.js`` that by default haves a example script in it

### How to add a script
Simple, go to ``Special:MyPage/hudson.js`` and add a new line, it must start with a comment like this: ``// === Here goes the title of your script ===`` (MUST ADD THE ===). Then just add the Javascript code that you want to run below the comment!
