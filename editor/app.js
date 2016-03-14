define("nexus",{grid:null,board:null,mouse:null,scene:null,input:null,plane:null}),define("tower",{tileAction:new vg.Signal,objAction:new vg.Signal,userAction:new vg.Signal,save:new vg.Signal,TILE_CHANGE_HEIGHT:"cell.change.height",TILE_ADD:"cell.add",TILE_REMOVE:"cell.remove",TILE_CHANGE_WALKABLE:"cell.change.walkable"}),define("walkableTile",function(){function e(e,t,i){t&&r.mouse.down&&o(t)}function t(e,t,i){t&&o(t)}function i(e,t,i){}function o(e){return e?(e.cell.walkable=!e.cell.walkable,n.tileAction.dispatch(n.TILE_CHANGE_WALKABLE,e),e):void 0}var n=require("tower"),r=require("nexus");return{onOver:e,onDown:t,onUp:i,action:o}}),define("removeTile",function(){function e(e,t,i){t&&r.mouse.down&&o(t)}function t(e,t,i){t&&o(t)}function i(e,t,i){}function o(e){r.board.removeTile(e),n.tileAction.dispatch(n.TILE_REMOVE,e)}var n=require("tower"),r=require("nexus");return{onOver:e,onDown:t,onUp:i,action:o}}),define("data",{_store:{},changed:new vg.Signal,get:function(e){return this._store[e]||null},set:function(e,t){this.changed.dispatch(e,this._store[e],t),this._store[e]=t},save:function(){window.localStorage.vongrid=JSON.stringify(this._store)},load:function(e){var t=window.localStorage.vongrid;if(e||t)try{this._store=e||JSON.parse(t),this.changed.dispatch("load-success",this._store)}catch(i){console.warn(i),this.changed.dispatch("load-failure")}}}),define("tilemaker",function(){function e(){s.push(new THREE.MeshPhongMaterial({color:"rgb(0, 0, 0)"})),s.push(new THREE.MeshPhongMaterial({color:"rgb(10, 64, 16)"})),s.push(new THREE.MeshPhongMaterial({color:"rgb(64, 51, 10)"})),s.push(new THREE.MeshPhongMaterial({color:"rgb(200, 200, 200)"}))}function t(e){}function i(e,t){var i=s[t];if(e.tile)return e.tile.material=i,e.tile.mesh.material=i,e.tile;var o=a.pop();return o?(o.material=i,o.mesh.material=i,o.cell=e,e.tile=o,o.position.copy(n.grid.cellToPixel(e)),o.position.y=o.cell.h*n.board.tileHeightStep):o=new vg.Tile({cell:e,geometry:n.board.geoGen.tileGeo,material:s[t]}),n.board.addTile(o),o}function o(e,i,o){var n;"settings"===e?n=o.tileHeightStep:"load-success"===e&&(n=i.settings.tileHeightStep),n&&t(n)}var n=require("nexus"),r=require("data"),s=[],a=[];return r.changed.add(o,this),{init:e,getTile:i}}),define("addTile",function(){function e(e,t,i){!t&&r.mouse.down&&o(e)}function t(e,t,i){t||o(e)}function i(e,t,i){}function o(e){if(e&&!r.board.getTileAtCell(e)){var t=new vg.Cell;t.copy(e),t.h=Math.abs(r.mouse.wheel*r.board.tileHeightStep);var i=s.getTile(t,1);return r.board.addTile(i),n.tileAction.dispatch(n.TILE_ADD,i),i}}var n=require("tower"),r=require("nexus"),s=require("tilemaker");return{onOver:e,onDown:t,onUp:i,action:o}}),define("motor",function(){function e(){c=!1,window.requestAnimationFrame(n),window.addEventListener("focus",s,!1),window.addEventListener("blur",a,!1)}function t(){c=!0,window.removeEventListener("focus",s,!1),window.removeEventListener("blur",a,!1)}function i(e,t){var i=l(e.toString()),o=r(i);-1===o&&h.push({func:e,scope:t,key:i})}function o(e){var t=l(e.toString()),i=r(t);-1!==i&&h.splice(i,1)}function n(){if(!c){window.requestAnimationFrame(n);for(var e=0;e<h.length;e++){var t=h[e];t.func.call(t.scope||null)}}}function r(e){var t,i=-1;for(t=0;t<h.length;t++)if(i=h[t].key,i===e)return t;return-1}function s(e){c=!1,n()}function a(e){c=!0}function l(e){var t,i,o,n=0;if(0===e.length)return n;for(t=0,o=e.length;o>t;t++)i=e.charCodeAt(t),n=(n<<5)-n+i,n|=0;return n}var c=!1,h=[];return{on:e,off:t,add:i,remove:o}}),define("keyboard",function(){function e(e){switch(e.keyCode){case 16:i.shift=!0;break;case 17:i.ctrl=!0}i.signal.dispatch(i.eventType.DOWN,e.keyCode)}function t(e){switch(e.keyCode){case 16:i.shift=!1;break;case 17:i.ctrl=!1}i.signal.dispatch(i.eventType.UP,e.keyCode)}var i={shift:!1,ctrl:!1,eventType:{DOWN:"down",UP:"up"},signal:new vg.Signal,on:function(){document.addEventListener("keydown",e,!1),document.addEventListener("keyup",t,!1)},off:function(){document.removeEventListener("keydown",e),document.removeEventListener("keyup",t)},code:{A:"A".charCodeAt(0),B:"B".charCodeAt(0),C:"C".charCodeAt(0),D:"D".charCodeAt(0),E:"E".charCodeAt(0),F:"F".charCodeAt(0),G:"G".charCodeAt(0),H:"H".charCodeAt(0),I:"I".charCodeAt(0),J:"J".charCodeAt(0),K:"K".charCodeAt(0),L:"L".charCodeAt(0),M:"M".charCodeAt(0),N:"N".charCodeAt(0),O:"O".charCodeAt(0),P:"P".charCodeAt(0),Q:"Q".charCodeAt(0),R:"R".charCodeAt(0),S:"S".charCodeAt(0),T:"T".charCodeAt(0),U:"U".charCodeAt(0),V:"V".charCodeAt(0),W:"W".charCodeAt(0),X:"X".charCodeAt(0),Y:"Y".charCodeAt(0),Z:"Z".charCodeAt(0),ZERO:"0".charCodeAt(0),ONE:"1".charCodeAt(0),TWO:"2".charCodeAt(0),THREE:"3".charCodeAt(0),FOUR:"4".charCodeAt(0),FIVE:"5".charCodeAt(0),SIX:"6".charCodeAt(0),SEVEN:"7".charCodeAt(0),EIGHT:"8".charCodeAt(0),NINE:"9".charCodeAt(0),NUMPAD_0:96,NUMPAD_1:97,NUMPAD_2:98,NUMPAD_3:99,NUMPAD_4:100,NUMPAD_5:101,NUMPAD_6:102,NUMPAD_7:103,NUMPAD_8:104,NUMPAD_9:105,NUMPAD_MULTIPLY:106,NUMPAD_ADD:107,NUMPAD_ENTER:108,NUMPAD_SUBTRACT:109,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,F13:124,F14:125,F15:126,COLON:186,EQUALS:187,UNDERSCORE:189,QUESTION_MARK:191,TILDE:192,OPEN_BRACKET:219,BACKWARD_SLASH:220,CLOSED_BRACKET:221,QUOTES:222,BACKSPACE:8,TAB:9,CLEAR:12,ENTER:13,SHIFT:16,CTRL:17,ALT:18,CAPS_LOCK:20,ESC:27,SPACEBAR:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,INSERT:45,DELETE:46,HELP:47,NUM_LOCK:144}};return i}),define("toolbag",function(){function e(){d=n.grid.pixelToCell(n.input.editorWorldPos),!r.ctrl&&n.mouse.down&&"ADD_TILE"===ui.activeTool.name&&n.mouse.allHits&&n.mouse.allHits.length&&(d.equals(v)||a.action(d,null),v.copy(d))}function t(e){switch(e){case ui.Tools.ADD_TILE:h=a;break;case ui.Tools.REMOVE_TILE:h=l;break;case ui.Tools.WALK_TILE:h=c;break;default:h=null}}function i(e,t,i){if(!r.ctrl&&null!==i&&!n.mouse.rightDown&&h){var s=n.board.tileHeightStep;switch(e){case vg.MouseCaster.WHEEL:if(t){var a=u-i;t.cell.h+=a>0?-1:1,t.cell.h<1&&(t.cell.h=1),n.mouse.wheel=Math.round(t.cell.h/s+(a>0?-1:1)),u=n.mouse.wheel,t.position.y=t.cell.h*s,o.tileAction.dispatch(o.TILE_CHANGE_HEIGHT,t)}break;case vg.MouseCaster.OVER:h.onOver(d,t,i);break;case vg.MouseCaster.OUT:break;case vg.MouseCaster.DOWN:h.onDown(d,t,i);break;case vg.MouseCaster.UP:h.onUp(d,t,i)}}}var o=require("tower"),n=require("nexus"),r=require("keyboard"),s=require("motor"),a=require("addTile"),l=require("removeTile"),c=require("walkableTile"),h=a,u=1,d=null,v=new THREE.Vector3;return o.userAction.add(i,this),ui.on(ui.Events.TOOL_CHANGE,t),s.add(e),{}}),window.addEventListener("load",function(e){function t(e,t,i){"settings"===e&&(w.tileHeightStep=i.tileHeightStep),"load-success"===e&&(w.tileHeightStep=t.settings.tileHeightStep)}function i(){10>P&&(P++,10===P&&(S.active=!0)),A&&(f--,0===f&&(A=!1,l.set("map",p),l.save(),console.log("Map saved"))),S.update(),H.update(),_.update(),M.render(),ui.previewUpdate&&ui.previewUpdate()}function o(){S.active=!1,P=0}function n(){A=!0,f=E,p=C.toJSON()}function r(e){C.fromJSON(e),w.setGrid(C),_.generate();var t=l.get("settings");"default"===t.tileset&&w.makeTiles(30),_.updatePlane(t.planeColor,t.planeSize),console.log("Map load complete")}function s(){var e=null;p=C.toJSON();try{e=JSON.stringify(p,null,"	"),e=e.replace(/[\n\t]+([\d\.e\-\[\]]+)/g,"$1")}catch(t){e=JSON.stringify(p)}a(e,"hex-map.json")}function a(e,t){var i=new Blob([e],{type:"text/plain"}),o=URL.createObjectURL(i);D.href=o,D.download=t||"data.json",D.target="_blank";var n=document.createEvent("MouseEvents");n.initMouseEvent("click",!0,!1,window,0,0,0,0,0,!1,!1,!1,!1,0,null),D.dispatchEvent(n)}var l=require("data"),c=require("tower"),h=require("nexus"),u=require("keyboard"),d=require("motor"),v=require("Input"),g=require("EditorPlane");l.load();var p=l.get("map"),E=200,f=10,A=!1,T=document.createElement("input");T.type="file",T.addEventListener("change",function(e){var t=T.files[0];if(t){var i=new FileReader;return i.onload=function(e){var t=null;try{t=JSON.parse(e.target.result)}catch(i){return void console.warn("File is not json format")}r(t)},i.readAsText(t),!1}}),ui.on("error",function(e){console.warn(e)}),ui.on(ui.Events.SAVE_MAP,function(){s()}),ui.on(ui.Events.LOAD_MAP,function(){T.click()}),u.on(),d.on();var m=document.getElementById("view"),M=new vg.Scene({element:m,cameraPosition:{x:0,y:300,z:120}},{maxPolarAngle:Math.PI/2-.01});h.scene=M,M.controls.addEventListener("wheel",o);var C=new vg.HexGrid;h.grid=C;var w=new vg.Board(C);h.board=w;var S=new vg.MouseCaster(w.group,M.camera,m);h.mouse=S;var H=new v(w.group,S);h.input=H;var _=new g(w.group,C,S);if(h.plane=_,require("tilemaker").init(),c.tileAction.add(n,this),c.save.add(n,this),l.changed.add(t),M.focusOn(w.group),p)ui.trigger(ui.Events.UPDATE_SETTINGS,l.get("settings")),r(p);else{C.generate({size:5}),w.makeTiles(30),p=C.toJSON(),l.set("map",p);var b={mapSize:C.size,cellSize:C.cellSize,planeSize:_.planeSize,tileHeightStep:3,planeColor:"#ffffff",tileset:"default"};l.set("settings",b),console.log("Created a new map"),l.save(),_.generate()}ui.trigger(ui.Events.UPDATE_SETTINGS,l.get("settings")),M.add(w.group),ui.on(ui.Events.UPDATE_SETTINGS,function(e){if(_.updatePlane(e.planeColor,e.planeSize),l.set("settings",e),n(),e.mapSize===C.size){if(e.cellSize===C.cellSize)return;C.updateCellSize(e.cellSize)}else C.updateCellSize(e.cellSize),C.generate({size:e.mapSize});_.generate(),"default"===e.tileset&&w.makeTiles(30)}),d.add(i);var P=10,D=document.createElement("a");D.style.display="none",document.body.appendChild(D)}),define("Input",function(){var e=require("tower"),t=require("nexus"),i=require("keyboard"),o=function(e,t){this.mouse=t,this.mouse.signal.add(this.onMouse,this),this.mouseDelta=new THREE.Vector3,this.mousePanMinDistance=.1,this.editorWorldPos=new THREE.Vector3,this.overTile=null,this._travel=0};return o.prototype={update:function(){var e=this.mouse.allHits[0];e&&(this.editorWorldPos.x=e.point.x,this.editorWorldPos.y=e.point.y,this.editorWorldPos.z=e.point.z);var o=this.mouseDelta.x-this.mouse.screenPosition.x,n=this.mouseDelta.y-this.mouse.screenPosition.y;this._travel+=Math.sqrt(o*o+n*n),i.ctrl?t.scene.controls.enabled=!0:t.scene.controls.enabled=!1},onMouse:function(t,i){var o;switch(this.mouse.allHits&&this.mouse.allHits[0]&&(o=this.mouse.allHits[0]),t){case vg.MouseCaster.WHEEL:e.userAction.dispatch(vg.MouseCaster.WHEEL,this.overTile,i);break;case vg.MouseCaster.OVER:i&&(this.overTile=i),e.userAction.dispatch(vg.MouseCaster.OVER,this.overTile,o);break;case vg.MouseCaster.OUT:this.overTile=null,e.userAction.dispatch(vg.MouseCaster.OUT,this.overTile,o);break;case vg.MouseCaster.DOWN:this.mouseDelta.copy(this.mouse.screenPosition),e.userAction.dispatch(vg.MouseCaster.DOWN,this.overTile,o),this._travel=0;break;case vg.MouseCaster.UP:if(this._travel>this.mousePanMinDistance)break;e.userAction.dispatch(vg.MouseCaster.UP,this.overTile,o);break;case vg.MouseCaster.CLICK:e.userAction.dispatch(vg.MouseCaster.CLICK,this.overTile,o)}}},o}),define("EditorPlane",function(){function e(e,t,i){this.nexus=require("nexus"),this.tower=require("tower"),this.mesh=null,this.planeMaterial=new THREE.MeshBasicMaterial({color:16777215,side:THREE.DoubleSide}),this.hoverMaterial=new THREE.MeshBasicMaterial({color:1748735,side:THREE.DoubleSide}),this.scene=e,this.grid=t,this.mouse=i,this.board=this.nexus.board,this.hoverMesh=null,this.tileHoverMesh=null,this.planeSize=t.size+5,this._actualSize=this.planeSize*(.5*vg.SQRT3)*this.grid._cellWidth+this.grid.cellSize,this.tower.userAction.add(function(e,t,o){switch(e){case vg.MouseCaster.OVER:t&&!i.down&&(this.tileHoverMesh.visible=!0,this.tileHoverMesh.position.copy(t.position),this.tileHoverMesh.position.y+=1);break;case vg.MouseCaster.OUT:this.tileHoverMesh.visible=!1}},this),this.tower.tileAction.add(function(e,t){e===this.tower.TILE_CHANGE_HEIGHT&&(this.tileHoverMesh.position.copy(t.position),this.tileHoverMesh.position.y+=1)},this)}return e.prototype={updatePlane:function(e,t){var i=parseInt(e.replace(/^#/,""),16);if(this.planeMaterial.color.setHex(i),this.planeSize!==t){switch(this.planeSize=t,this.grid.type){case vg.HEX:this._actualSize=t*(.5*vg.SQRT3)*this.grid._cellWidth+this.grid.cellSize;break;case vg.SQR:this._actualSize=t*this.grid.cellSize*2}this.generate()}},generate:function(){var e;switch(this.mesh&&this.mesh.parent&&(this.mesh.parent.remove(this.mesh),this.mesh.geometry.dispose()),this.board.makeOverlay(this.planeSize),this.grid.type){case vg.HEX:e=new THREE.CircleGeometry(this._actualSize,6);break;case vg.SQR:e=new THREE.PlaneGeometry(this._actualSize,this._actualSize,1,1);break;default:console.warn("[EditorPlane.generate] no grid type set")}this.mesh=new THREE.Mesh(e,this.planeMaterial),this.mesh.rotation.x=90*vg.DEG_TO_RAD,this.mesh.position.y=-.5,this.grid.type===vg.HEX&&(this.mesh.rotation.z=90*vg.DEG_TO_RAD),this.scene.add(this.mesh),this.hoverMesh&&this.hoverMesh.parent&&this.hoverMesh.parent.remove(this.hoverMesh),this.hoverMesh=this.board.geoGen.makeTilePoly(this.hoverMaterial),this.nexus.scene.container.add(this.hoverMesh),this.tileHoverMesh&&this.tileHoverMesh.parent&&this.tileHoverMesh.parent.remove(this.tileHoverMesh),this.tileHoverMesh=this.board.geoGen.makeTileHighlight(this.hoverMaterial),this.nexus.scene.container.add(this.tileHoverMesh),this.tileHoverMesh.visible=!1},update:function(){if(this.mouse.allHits.length&&!this.mouse.pickedObject){var e=this.grid.pixelToCell(this.nexus.input.editorWorldPos);this.hoverMesh.position.copy(this.grid.cellToPixel(e)),this.hoverMesh.position.y+=.05,this.hoverMesh.visible=!0}else this.hoverMesh.visible=!1}},e});
//# sourceMappingURL=app.js.map
