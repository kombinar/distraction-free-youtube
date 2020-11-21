// ==UserScript==
// @name         Distraction-free YouTube
// @namespace    https://kombinar.xyz/
// @version      0.1
// @description  Removes all of the distractions from YouTube (comments, suggested videos, recommendation etc)
// @author       kombinar
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function distraction(name, selector, action /*remove or hide*/){
        return {name, selector,action};
    }
    const distractions = [
        distraction("Subscription Button", '#subscribe-button', "remove"),
        distraction("Merch under video", '#merch-shelf', "remove"),
        distraction("Buttons under video", '#info  #menu-container', 'remove'),
        distraction('Top right buttons', '#masthead > #container > #end', 'hide'),
        distraction('Top left button (expander)', '#guide-button', 'remove'),
        distraction('Left buttons (trending, subscriptions', 'ytd-mini-guide-renderer', 'remove'),
        distraction('Related videos', '#secondary', 'remove'),
        distraction('Video browser (home page)', 'ytd-browse', 'remove'),
        distraction('Comments', 'ytd-comments', 'remove'),
        distraction('Hide Companion Ad', '.video-ads.ytp-ad-module', 'hide')
    ]

    function hide_element(selector){
        var found = false;
        for (let el of document.querySelectorAll(selector)){
            if(el.style.visibility != 'hidden'){
                found = true;
            }
            el.style.visibility = 'hidden';
        }
        return found;
    }

    function remove_element(selector){
        var found = false;
        for (let el of document.querySelectorAll(selector)){
            el.parentNode.removeChild(el);
            found = true;
        }
        return found
    }

    function remove_distractions(){
        for (let d of distractions){
            if(d.action == 'remove'){
                remove_element(d.selector) &&
                    console.log('Removed ' + d.name);
            } else if (d.action == 'hide'){
                hide_element(d.selector) &&
                    console.log('Hidden ' + d.name);
            }
        }
    };

    setInterval(function() {
        remove_distractions()
    }, 250);
})();