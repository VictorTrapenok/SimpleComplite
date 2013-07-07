/*
 * SimpleComplite.js 
 * 
 * Copyright (c) 2013, Трапенок Виктор (Trapenok Victor). All rights reserved.
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
 * MA 02110-1301  USA
 */

/**
 * Простой автокомплит, удобен для реализации живого поиска 
 * 
 * <example>
  user_search = new SimpleComplite({
        url: 'http://'+document.location.host+'/Урл_для получения данных',
        delay:800,
        onData: function(re, text, sc_obj)
        {

        }
    });

    user_search.onkeyup("Текст введёный пользователем");

 * </example>
 */
var SimpleComplite = function(param)
{
     this.id = GetNewID(this)
     this.param = param

     if(this.param.delay === undefined)
     this.param.delay = 500

     if(this.param.url === undefined)
     this.param.url = ""

     this.onkeyup = function(text)
     {
         var thisObj = this;
         clearTimeout(this.timer_id);
         this.timer_id = setTimeout(function()
         {
             thisObj.xhrObj = $.ajax({
                                    type: "POST",
                                    url: thisObj.param.url,
                                    dataType:'json',
                                    processData:false,
                                    cache:true,
                                    data:"q="+encodeURIComponent(text),
                                    success: function(re, textStatus, xhr)
                                    {
                                        thisObj.param.onData(re, text, thisObj )
                                    }
             })
         }, this.param.delay )
     }

     if(this.param.onData === undefined)
     this.param.onData = function(re, text, sc_obj)
     {
         console.log(text+":"+re)
     }
}


