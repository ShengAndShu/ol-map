/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "906345a33ab860ed16da";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(18)(__webpack_require__.s = 18);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

// OpenLayers. See https://openlayers.org/
// License: https://raw.githubusercontent.com/openlayers/openlayers/master/LICENSE.md
// Version: v4.6.5
;(function (root, factory) {
  if (true) {
    module.exports = factory();
  } else {}
}(this, function () {
  var OPENLAYERS = {};
  var k,aa=this;function t(a,b){var c=OPENLAYERS;a=a.split(".");c=c||aa;a[0]in c||!c.execScript||c.execScript("var "+a[0]);for(var d;a.length&&(d=a.shift());)a.length||void 0===b?c[d]&&c[d]!==Object.prototype[d]?c=c[d]:c=c[d]={}:c[d]=b};var ba,da;function w(a,b){a.prototype=Object.create(b.prototype);a.prototype.constructor=a}function ea(){}function x(a){return a.xp||(a.xp=++fa)}var fa=0;function ha(a){this.message="Assertion failed. See https://openlayers.org/en/v4.6.5/doc/errors/#"+a+" for details.";this.code=a;this.name="AssertionError"}w(ha,Error);function ja(a,b,c,d){this.fa=a;this.la=b;this.ea=c;this.ka=d}function ka(a,b,c,d,e){return void 0!==e?(e.fa=a,e.la=b,e.ea=c,e.ka=d,e):new ja(a,b,c,d)}function ma(a,b,c){return a.fa<=b&&b<=a.la&&a.ea<=c&&c<=a.ka}function na(a,b){return a.fa==b.fa&&a.ea==b.ea&&a.la==b.la&&a.ka==b.ka};function oa(a,b){if(!a)throw new ha(b);};function pa(a,b,c){return Math.min(Math.max(a,b),c)}var qa=function(){var a;"cosh"in Math?a=Math.cosh:a=function(a){a=Math.exp(a);return(a+1/a)/2};return a}();function ra(a){oa(0<a,29);return Math.pow(2,Math.ceil(Math.log(a)/Math.LN2))}function sa(a,b,c,d,e,f){var g=e-c,h=f-d;if(0!==g||0!==h){var l=((a-c)*g+(b-d)*h)/(g*g+h*h);1<l?(c=e,d=f):0<l&&(c+=g*l,d+=h*l)}return ua(a,b,c,d)}function ua(a,b,c,d){a=c-a;b=d-b;return a*a+b*b}function va(a){return a*Math.PI/180}
function wa(a,b){a%=b;return 0>a*b?a+b:a}function ya(a,b,c){return a+c*(b-a)};function za(a,b,c){void 0===c&&(c=[0,0]);c[0]=a[0]+2*b;c[1]=a[1]+2*b;return c}function Aa(a,b,c){void 0===c&&(c=[0,0]);c[0]=a[0]*b+.5|0;c[1]=a[1]*b+.5|0;return c}function Ba(a,b){if(Array.isArray(a))return a;void 0===b?b=[a,a]:b[0]=b[1]=a;return b};function Ca(a){for(var b=Da(),c=0,d=a.length;c<d;++c)Ea(b,a[c]);return b}function Fa(a,b,c){return c?(c[0]=a[0]-b,c[1]=a[1]-b,c[2]=a[2]+b,c[3]=a[3]+b,c):[a[0]-b,a[1]-b,a[2]+b,a[3]+b]}function Ga(a,b){return b?(b[0]=a[0],b[1]=a[1],b[2]=a[2],b[3]=a[3],b):a.slice()}function Ha(a,b,c){b=b<a[0]?a[0]-b:a[2]<b?b-a[2]:0;a=c<a[1]?a[1]-c:a[3]<c?c-a[3]:0;return b*b+a*a}function Ja(a,b){return Ka(a,b[0],b[1])}function La(a,b){return a[0]<=b[0]&&b[2]<=a[2]&&a[1]<=b[1]&&b[3]<=a[3]}
function Ka(a,b,c){return a[0]<=b&&b<=a[2]&&a[1]<=c&&c<=a[3]}function Ma(a,b){var c=a[1],d=a[2],e=a[3],f=b[0];b=b[1];var g=0;f<a[0]?g|=16:f>d&&(g|=4);b<c?g|=8:b>e&&(g|=2);0===g&&(g=1);return g}function Da(){return[Infinity,Infinity,-Infinity,-Infinity]}function Na(a,b,c,d,e){return e?(e[0]=a,e[1]=b,e[2]=c,e[3]=d,e):[a,b,c,d]}function Oa(a){return Na(Infinity,Infinity,-Infinity,-Infinity,a)}function Pa(a,b){var c=a[0];a=a[1];return Na(c,a,c,a,b)}
function Qa(a,b,c,d,e){e=Oa(e);return Ra(e,a,b,c,d)}function Sa(a,b){return a[0]==b[0]&&a[2]==b[2]&&a[1]==b[1]&&a[3]==b[3]}function Ta(a,b){b[0]<a[0]&&(a[0]=b[0]);b[2]>a[2]&&(a[2]=b[2]);b[1]<a[1]&&(a[1]=b[1]);b[3]>a[3]&&(a[3]=b[3]);return a}function Ea(a,b){b[0]<a[0]&&(a[0]=b[0]);b[0]>a[2]&&(a[2]=b[0]);b[1]<a[1]&&(a[1]=b[1]);b[1]>a[3]&&(a[3]=b[1])}
function Ra(a,b,c,d,e){for(;c<d;c+=e){var f=a,g=b[c],h=b[c+1];f[0]=Math.min(f[0],g);f[1]=Math.min(f[1],h);f[2]=Math.max(f[2],g);f[3]=Math.max(f[3],h)}return a}function Ua(a,b,c){var d;return(d=b.call(c,Wa(a)))||(d=b.call(c,Ya(a)))||(d=b.call(c,Za(a)))?d:(d=b.call(c,$a(a)))?d:!1}function ab(a){var b=0;bb(a)||(b=cb(a)*db(a));return b}function Wa(a){return[a[0],a[1]]}function Ya(a){return[a[2],a[1]]}function eb(a){return[(a[0]+a[2])/2,(a[1]+a[3])/2]}
function fb(a,b,c,d,e){var f=b*d[0]/2;d=b*d[1]/2;b=Math.cos(c);var g=Math.sin(c);c=f*b;f*=g;b*=d;var h=d*g,l=a[0],m=a[1];a=l-c+h;d=l-c-h;g=l+c-h;c=l+c+h;h=m-f-b;l=m-f+b;var n=m+f+b;f=m+f-b;return Na(Math.min(a,d,g,c),Math.min(h,l,n,f),Math.max(a,d,g,c),Math.max(h,l,n,f),e)}function db(a){return a[3]-a[1]}function gb(a,b,c){c=c?c:Da();hb(a,b)&&(c[0]=a[0]>b[0]?a[0]:b[0],c[1]=a[1]>b[1]?a[1]:b[1],c[2]=a[2]<b[2]?a[2]:b[2],c[3]=a[3]<b[3]?a[3]:b[3]);return c}function $a(a){return[a[0],a[3]]}
function Za(a){return[a[2],a[3]]}function cb(a){return a[2]-a[0]}function hb(a,b){return a[0]<=b[2]&&a[2]>=b[0]&&a[1]<=b[3]&&a[3]>=b[1]}function bb(a){return a[2]<a[0]||a[3]<a[1]}function ib(a,b){var c=(a[2]-a[0])/2*(b-1);b=(a[3]-a[1])/2*(b-1);a[0]-=c;a[2]+=c;a[1]-=b;a[3]+=b}
function jb(a,b,c){a=[a[0],a[1],a[0],a[3],a[2],a[1],a[2],a[3]];b(a,a,2);var d=[a[0],a[2],a[4],a[6]],e=[a[1],a[3],a[5],a[7]];b=Math.min.apply(null,d);a=Math.min.apply(null,e);d=Math.max.apply(null,d);e=Math.max.apply(null,e);return Na(b,a,d,e,c)};var kb="function"===typeof Object.assign?Object.assign:function(a,b){if(void 0===a||null===a)throw new TypeError("Cannot convert undefined or null to object");for(var c=Object(a),d=1,e=arguments.length;d<e;++d){var f=arguments[d];if(void 0!==f&&null!==f)for(var g in f)f.hasOwnProperty(g)&&(c[g]=f[g])}return c};function lb(a){for(var b in a)delete a[b]}function mb(a){var b=[],c;for(c in a)b.push(a[c]);return b}function nb(a){for(var b in a)return!1;return!b};/*

 Latitude/longitude spherical geodesy formulae taken from
 http://www.movable-type.co.uk/scripts/latlong.html
 Licensed under CC-BY-3.0.
*/
function ob(a){this.radius=a}ob.prototype.a=function(a){return pb(a,this.radius)};ob.prototype.b=function(a,b){return qb(a,b,this.radius)};ob.prototype.offset=function(a,b,c){var d=va(a[1]);b/=this.radius;var e=Math.asin(Math.sin(d)*Math.cos(b)+Math.cos(d)*Math.sin(b)*Math.cos(c));return[180*(va(a[0])+Math.atan2(Math.sin(c)*Math.sin(b)*Math.cos(d),Math.cos(b)-Math.sin(d)*Math.sin(e)))/Math.PI,180*e/Math.PI]};
function rb(a,b){var c=b||{},d=c.radius||6371008.8;c=c.projection||"EPSG:3857";a=a.clone().mb(c,"EPSG:4326");var e=a.S();c=0;var f;switch(e){case "Point":case "MultiPoint":break;case "LineString":case "LinearRing":b=a.W();c=sb(b,d);break;case "MultiLineString":case "Polygon":b=a.W();a=0;for(e=b.length;a<e;++a)c+=sb(b[a],d);break;case "MultiPolygon":b=a.W();a=0;for(e=b.length;a<e;++a){var g=b[a];var h=0;for(f=g.length;h<f;++h)c+=sb(g[h],d)}break;case "GeometryCollection":d=a.vd();a=0;for(e=d.length;a<
e;++a)c+=rb(d[a],b);break;default:throw Error("Unsupported geometry type: "+e);}return c}function sb(a,b){for(var c=0,d=0,e=a.length;d<e-1;++d)c+=qb(a[d],a[d+1],b);return c}function qb(a,b,c){var d=va(a[1]),e=va(b[1]),f=(e-d)/2;a=va(b[0]-a[0])/2;d=Math.sin(f)*Math.sin(f)+Math.sin(a)*Math.sin(a)*Math.cos(d)*Math.cos(e);return 2*c*Math.atan2(Math.sqrt(d),Math.sqrt(1-d))}
function tb(a,b){var c=b||{},d=c.radius||6371008.8;c=c.projection||"EPSG:3857";a=a.clone().mb(c,"EPSG:4326");var e=a.S();c=0;var f;switch(e){case "Point":case "MultiPoint":case "LineString":case "MultiLineString":case "LinearRing":break;case "Polygon":b=a.W();c=Math.abs(pb(b[0],d));a=1;for(e=b.length;a<e;++a)c-=Math.abs(pb(b[a],d));break;case "MultiPolygon":b=a.W();a=0;for(e=b.length;a<e;++a){var g=b[a];c+=Math.abs(pb(g[0],d));var h=1;for(f=g.length;h<f;++h)c-=Math.abs(pb(g[h],d))}break;case "GeometryCollection":d=
a.vd();a=0;for(e=d.length;a<e;++a)c+=tb(d[a],b);break;default:throw Error("Unsupported geometry type: "+e);}return c}function pb(a,b){for(var c=0,d=a.length,e=a[d-1][0],f=a[d-1][1],g=0;g<d;g++){var h=a[g][0],l=a[g][1];c+=va(h-e)*(2+Math.sin(va(f))+Math.sin(va(l)));e=h;f=l}return c*b*b/2};var ub={};ub.degrees=12741994*Math.PI/360;ub.ft=.3048;ub.m=1;ub["us-ft"]=1200/3937;var vb=null;function wb(a){this.wb=a.code;this.a=a.units;this.i=void 0!==a.extent?a.extent:null;this.oe=void 0!==a.worldExtent?a.worldExtent:null;this.b=void 0!==a.axisOrientation?a.axisOrientation:"enu";this.c=void 0!==a.global?a.global:!1;this.g=!(!this.c||!this.i);this.j=a.getPointResolution;this.f=null;this.l=a.metersPerUnit;var b=a.code,c=vb||window.proj4;"function"==typeof c&&(b=c.defs(b),void 0!==b&&(void 0!==b.axis&&void 0===a.axisOrientation&&(this.b=b.axis),void 0===a.metersPerUnit&&(this.l=b.to_meter),
void 0===a.units&&(this.a=b.units)))}k=wb.prototype;k.ml=function(){return this.wb};k.G=function(){return this.i};k.zo=function(){return this.a};k.Bc=function(){return this.l||ub[this.a]};k.Vl=function(){return this.oe};k.il=function(){return this.b};k.Gm=function(){return this.c};k.xq=function(a){this.c=a;this.g=!(!a||!this.i)};k.Si=function(a){this.i=a;this.g=!(!this.c||!a)};k.Sj=function(a){this.oe=a};k.wq=function(a){this.j=a};function xb(a){wb.call(this,{code:a,units:"m",extent:yb,global:!0,worldExtent:zb,getPointResolution:function(a,c){return a/qa(c[1]/6378137)}})}w(xb,wb);var Ab=6378137*Math.PI,yb=[-Ab,-Ab,Ab,Ab],zb=[-180,-85,180,85],Bb=[new xb("EPSG:3857"),new xb("EPSG:102100"),new xb("EPSG:102113"),new xb("EPSG:900913"),new xb("urn:ogc:def:crs:EPSG:6.18:3:3857"),new xb("urn:ogc:def:crs:EPSG::3857"),new xb("http://www.opengis.net/gml/srs/epsg.xml#3857")];
function Cb(a,b,c){var d=a.length;c=1<c?c:2;void 0===b&&(2<c?b=a.slice():b=Array(d));for(var e=0;e<d;e+=c){b[e]=Ab*a[e]/180;var f=6378137*Math.log(Math.tan(Math.PI*(a[e+1]+90)/360));f>Ab?f=Ab:f<-Ab&&(f=-Ab);b[e+1]=f}return b}function Db(a,b,c){var d=a.length;c=1<c?c:2;void 0===b&&(2<c?b=a.slice():b=Array(d));for(var e=0;e<d;e+=c)b[e]=180*a[e]/Ab,b[e+1]=360*Math.atan(Math.exp(a[e+1]/6378137))/Math.PI-90;return b};function Eb(a,b){wb.call(this,{code:a,units:"degrees",extent:Fb,axisOrientation:b,global:!0,metersPerUnit:Gb,worldExtent:Fb})}w(Eb,wb);var Fb=[-180,-90,180,90],Gb=6378137*Math.PI/180,Hb=[new Eb("CRS:84"),new Eb("EPSG:4326","neu"),new Eb("urn:ogc:def:crs:EPSG::4326","neu"),new Eb("urn:ogc:def:crs:EPSG:6.6:4326","neu"),new Eb("urn:ogc:def:crs:OGC:1.3:CRS84"),new Eb("urn:ogc:def:crs:OGC:2:84"),new Eb("http://www.opengis.net/gml/srs/epsg.xml#4326","neu"),new Eb("urn:x-ogc:def:crs:EPSG:4326","neu")];var Ib={};var Jb={};function Kb(a,b,c){a=a.wb;b=b.wb;a in Jb||(Jb[a]={});Jb[a][b]=c}function Lb(a,b){var c;a in Jb&&b in Jb[a]&&(c=Jb[a][b]);return c};var Mb=new ob(6371008.8);function Nb(a,b,c,d){a=Ob(a);var e=a.j;e?b=e(b,c):"degrees"==a.a&&!d||"degrees"==d||(e=Pb(a,Ob("EPSG:4326")),b=[c[0]-b/2,c[1],c[0]+b/2,c[1],c[0],c[1]-b/2,c[0],c[1]+b/2],b=e(b,b,2),b=(Mb.b(b.slice(0,2),b.slice(2,4))+Mb.b(b.slice(4,6),b.slice(6,8)))/2,a=d?ub[d]:a.Bc(),void 0!==a&&(b/=a));return b}function Qb(a){a.forEach(Rb);a.forEach(function(b){a.forEach(function(a){b!==a&&Kb(b,a,Sb)})})}
function Tb(){Hb.forEach(function(a){Bb.forEach(function(b){Kb(a,b,Cb);Kb(b,a,Db)})})}function Rb(a){Ib[a.wb]=a;Kb(a,a,Sb)}function Ub(a){return a?"string"===typeof a?Ob(a):a:Ob("EPSG:3857")}function Vb(a,b,c,d){a=Ob(a);b=Ob(b);Kb(a,b,Wb(c));Kb(b,a,Wb(d))}function Wb(a){return function(b,c,d){var e=b.length;d=void 0!==d?d:2;c=void 0!==c?c:Array(e);var f;for(f=0;f<e;f+=d){var g=a([b[f],b[f+1]]);c[f]=g[0];c[f+1]=g[1];for(g=d-1;2<=g;--g)c[f+g]=b[f+g]}return c}}
function Ob(a){var b=null;if(a instanceof wb)b=a;else if("string"===typeof a&&(b=Ib[a]||null,!b)){var c=vb||window.proj4;"function"==typeof c&&void 0!==c.defs(a)&&(b=new wb({code:a}),Rb(b))}return b}function Xb(a,b){if(a===b)return!0;var c=a.a===b.a;return a.wb===b.wb?c:Pb(a,b)===Sb&&c}function Yb(a,b){a=Ob(a);b=Ob(b);return Pb(a,b)}
function Pb(a,b){var c=a.wb,d=b.wb,e=Lb(c,d);if(!e){var f=vb||window.proj4;if("function"==typeof f){var g=f.defs(c),h=f.defs(d);void 0!==g&&void 0!==h&&(g===h?Qb([b,a]):(e=f(d,c),Vb(b,a,e.forward,e.inverse)),e=Lb(c,d))}}e||(e=$b);return e}function $b(a,b){if(void 0!==b&&a!==b){for(var c=0,d=a.length;c<d;++c)b[c]=a[c];a=b}return a}function Sb(a,b){if(void 0!==b){for(var c=0,d=a.length;c<d;++c)b[c]=a[c];a=b}else a=a.slice();return a}function ac(a,b,c){return Yb(b,c)(a,void 0,a.length)}
function bc(a,b,c){b=Yb(b,c);return jb(a,b)}function cc(){Qb(Bb);Qb(Hb);Tb()}cc();function dc(a,b){return a>b?1:a<b?-1:0}function ec(a,b){return 0<=a.indexOf(b)}function fc(a,b,c){var d=a.length;if(a[0]<=b)return 0;if(!(b<=a[d-1]))if(0<c)for(c=1;c<d;++c){if(a[c]<b)return c-1}else if(0>c)for(c=1;c<d;++c){if(a[c]<=b)return c}else for(c=1;c<d;++c){if(a[c]==b)return c;if(a[c]<b)return a[c-1]-b<b-a[c]?c-1:c}return d-1}function gc(a,b){var c=Array.isArray(b)?b:[b],d=c.length;for(b=0;b<d;b++)a[a.length]=c[b]}
function hc(a,b){for(var c=a.length>>>0,d,e=0;e<c;e++)if(d=a[e],b(d,e,a))return d;return null}function jc(a,b){var c=a.length;if(c!==b.length)return!1;for(var d=0;d<c;d++)if(a[d]!==b[d])return!1;return!0}function kc(a){var b=lc,c=a.length,d=Array(a.length),e;for(e=0;e<c;e++)d[e]={index:e,value:a[e]};d.sort(function(a,c){return b(a.value,c.value)||a.index-c.index});for(e=0;e<a.length;e++)a[e]=d[e].value}function mc(a,b){var c;return a.every(function(d,e){c=e;return!b(d,e,a)})?-1:c}
function nc(a,b){var c=b||dc;return a.every(function(b,e){if(0===e)return!0;b=c(a[e-1],b);return!(0<b||0===b)})};function oc(a,b,c,d){return void 0!==d?(d[0]=a,d[1]=b,d[2]=c,d):[a,b,c]}function pc(a){var b=a[0],c=Array(b),d=1<<b-1,e;for(e=0;e<b;++e){var f=48;a[1]&d&&(f+=1);a[2]&d&&(f+=2);c[e]=String.fromCharCode(f);d>>=1}return c.join("")};function qc(a){this.minZoom=void 0!==a.minZoom?a.minZoom:0;this.b=a.resolutions;oa(nc(this.b,function(a,b){return b-a}),17);if(!a.origins)for(var b=0,c=this.b.length-1;b<c;++b)if(!d)var d=this.b[b]/this.b[b+1];else if(this.b[b]/this.b[b+1]!==d){d=void 0;break}this.l=d;this.maxZoom=this.b.length-1;this.g=void 0!==a.origin?a.origin:null;this.c=null;void 0!==a.origins&&(this.c=a.origins,oa(this.c.length==this.b.length,20));d=a.extent;void 0===d||this.g||this.c||(this.g=$a(d));oa(!this.g&&this.c||this.g&&
!this.c,18);this.i=null;void 0!==a.tileSizes&&(this.i=a.tileSizes,oa(this.i.length==this.b.length,19));this.j=void 0!==a.tileSize?a.tileSize:this.i?null:256;oa(!this.j&&this.i||this.j&&!this.i,22);this.o=void 0!==d?d:null;this.a=null;this.f=[0,0];void 0!==a.sizes?this.a=a.sizes.map(function(a){return new ja(Math.min(0,a[0]),Math.max(a[0]-1,-1),Math.min(0,a[1]),Math.max(a[1]-1,-1))},this):d&&rc(this,d)}var sc=[0,0,0];k=qc.prototype;
k.Vf=function(a,b,c){a=tc(this,a,b);for(var d=a.fa,e=a.la;d<=e;++d)for(var f=a.ea,g=a.ka;f<=g;++f)c([b,d,f])};function uc(a,b,c,d,e){var f=null,g=b[0]-1;if(2===a.l){var h=b[1];var l=b[2]}else f=a.Ma(b,e);for(;g>=a.minZoom;){2===a.l?(h=Math.floor(h/2),l=Math.floor(l/2),b=ka(h,h,l,l,d)):b=tc(a,f,g,d);if(c.call(null,g,b))return!0;--g}return!1}k.G=function(){return this.o};k.mj=function(){return this.maxZoom};k.nj=function(){return this.minZoom};k.Ic=function(a){return this.g?this.g:this.c[a]};k.Ta=function(a){return this.b[a]};
k.oj=function(){return this.b};function vc(a,b,c,d){if(b[0]<a.maxZoom){if(2===a.l)return a=2*b[1],b=2*b[2],ka(a,a+1,b,b+1,c);d=a.Ma(b,d);return tc(a,d,b[0]+1,c)}return null}function wc(a,b,c){var d=a.Ic(b),e=a.Ta(b);a=Ba(a.Za(b),a.f);return Na(d[0]+c.fa*a[0]*e,d[1]+c.ea*a[1]*e,d[0]+(c.la+1)*a[0]*e,d[1]+(c.ka+1)*a[1]*e,void 0)}function tc(a,b,c,d){xc(a,b[0],b[1],c,!1,sc);var e=sc[1],f=sc[2];xc(a,b[2],b[3],c,!0,sc);return ka(e,sc[1],f,sc[2],d)}
function yc(a,b){var c=a.Ic(b[0]),d=a.Ta(b[0]);a=Ba(a.Za(b[0]),a.f);return[c[0]+(b[1]+.5)*a[0]*d,c[1]+(b[2]+.5)*a[1]*d]}k.Ma=function(a,b){var c=this.Ic(a[0]),d=this.Ta(a[0]),e=Ba(this.Za(a[0]),this.f),f=c[0]+a[1]*e[0]*d;a=c[1]+a[2]*e[1]*d;return Na(f,a,f+e[0]*d,a+e[1]*d,b)};
k.Le=function(a,b,c){var d=a[0],e=a[1];a=this.Dc(b);var f=b/this.Ta(a),g=this.Ic(a),h=Ba(this.Za(a),this.f);d=f*Math.floor((d-g[0])/b+0)/h[0];b=f*Math.floor((e-g[1])/b+.5)/h[1];d=Math.floor(d);b=Math.floor(b);return oc(a,d,b,c)};function xc(a,b,c,d,e,f){var g=a.Ic(d),h=a.Ta(d);a=Ba(a.Za(d),a.f);b=Math.floor((b-g[0])/h+(e?.5:0))/a[0];c=Math.floor((c-g[1])/h+(e?0:.5))/a[1];e?(b=Math.ceil(b)-1,c=Math.ceil(c)-1):(b=Math.floor(b),c=Math.floor(c));return oc(d,b,c,f)}
k.jg=function(a,b,c){return xc(this,a[0],a[1],b,!1,c)};k.Za=function(a){return this.j?this.j:this.i[a]};k.Dc=function(a,b){return pa(fc(this.b,a,b||0),this.minZoom,this.maxZoom)};function rc(a,b){for(var c=a.b.length,d=Array(c),e=a.minZoom;e<c;++e)d[e]=tc(a,b,e);a.a=d};function zc(a){var b=a.f;b||(b=Ac(a),a.f=b);return b}function Bc(a){var b={};kb(b,void 0!==a?a:{});void 0===b.extent&&(b.extent=Ob("EPSG:3857").G());b.resolutions=Cc(b.extent,b.maxZoom,b.tileSize);delete b.maxZoom;return new qc(b)}function Cc(a,b,c){b=void 0!==b?b:42;var d=db(a);a=cb(a);c=Ba(void 0!==c?c:256);c=Math.max(a/c[0],d/c[1]);b+=1;d=Array(b);for(a=0;a<b;++a)d[a]=c/Math.pow(2,a);return d}
function Ac(a,b,c){a=Dc(a);b=Cc(a,b,c);return new qc({extent:a,origin:$a(a),resolutions:b,tileSize:c})}function Dc(a){a=Ob(a);var b=a.G();b||(a=180*ub.degrees/a.Bc(),b=Na(-a,-a,a,a));return b};function Ec(a){this.og=a.html}Ec.prototype.b=function(){return this.og};function Fc(a){function b(b){var c=a.listener,e=a.Ch||a.target;a.Eh&&Gc(a);return c.call(e,b)}return a.Dh=b}function Hc(a,b,c,d){for(var e,f=0,g=a.length;f<g;++f)if(e=a[f],e.listener===b&&e.Ch===c)return d&&(e.deleteIndex=f),e}function Ic(a,b){return(a=a.ab)?a[b]:void 0}function Jc(a){var b=a.ab;b||(b=a.ab={});return b}
function Kc(a,b){var c=Ic(a,b);if(c){for(var d=0,e=c.length;d<e;++d)a.removeEventListener(b,c[d].Dh),lb(c[d]);c.length=0;if(c=a.ab)delete c[b],0===Object.keys(c).length&&delete a.ab}}function y(a,b,c,d,e){var f=Jc(a),g=f[b];g||(g=f[b]=[]);(f=Hc(g,c,d,!1))?e||(f.Eh=!1):(f={Ch:d,Eh:!!e,listener:c,target:a,type:b},a.addEventListener(b,Fc(f)),g.push(f));return f}function Lc(a,b,c,d){return y(a,b,c,d,!0)}function Mc(a,b,c,d){(a=Ic(a,b))&&(c=Hc(a,c,d,!0))&&Gc(c)}
function Gc(a){if(a&&a.target){a.target.removeEventListener(a.type,a.Dh);var b=Ic(a.target,a.type);if(b){var c="deleteIndex"in a?a.deleteIndex:b.indexOf(a);-1!==c&&b.splice(c,1);0===b.length&&Kc(a.target,a.type)}lb(a)}}function Nc(a){var b=Jc(a),c;for(c in b)Kc(a,c)};function Oc(){}Oc.prototype.Ub=!1;function Pc(a){a.Ub||(a.Ub=!0,a.ia())}Oc.prototype.ia=ea;function Qc(a){this.type=a;this.target=null}Qc.prototype.preventDefault=Qc.prototype.stopPropagation=function(){this.sj=!0};function Rc(a){a.stopPropagation()};function Sc(){this.Wa={};this.qa={};this.oa={}}w(Sc,Oc);Sc.prototype.addEventListener=function(a,b){var c=this.oa[a];c||(c=this.oa[a]=[]);-1===c.indexOf(b)&&c.push(b)};
Sc.prototype.b=function(a){var b="string"===typeof a?new Qc(a):a;a=b.type;b.target=this;var c=this.oa[a];if(c){a in this.qa||(this.qa[a]=0,this.Wa[a]=0);++this.qa[a];for(var d=0,e=c.length;d<e;++d)if(!1===c[d].call(this,b)||b.sj){var f=!1;break}--this.qa[a];if(0===this.qa[a]){b=this.Wa[a];for(delete this.Wa[a];b--;)this.removeEventListener(a,ea);delete this.qa[a]}return f}};Sc.prototype.ia=function(){Nc(this)};function Tc(a,b){return b?b in a.oa:0<Object.keys(a.oa).length}
Sc.prototype.removeEventListener=function(a,b){var c=this.oa[a];c&&(b=c.indexOf(b),a in this.Wa?(c[b]=ea,++this.Wa[a]):(c.splice(b,1),0===c.length&&delete this.oa[a]))};function Uc(){Sc.call(this);this.g=0}w(Uc,Sc);k=Uc.prototype;k.u=function(){++this.g;this.b("change")};k.K=function(){return this.g};k.I=function(a,b,c){if(Array.isArray(a)){for(var d=a.length,e=Array(d),f=0;f<d;++f)e[f]=y(this,a[f],b,c);return e}return y(this,a,b,c)};k.once=function(a,b,c){if(Array.isArray(a)){for(var d=a.length,e=Array(d),f=0;f<d;++f)e[f]=Lc(this,a[f],b,c);return e}return Lc(this,a,b,c)};
k.J=function(a,b,c){if(Array.isArray(a))for(var d=0,e=a.length;d<e;++d)Mc(this,a[d],b,c);else Mc(this,a,b,c)};function Vc(a){Uc.call(this);x(this);this.N={};void 0!==a&&this.H(a)}w(Vc,Uc);var Wc={};function Xc(a){return Wc.hasOwnProperty(a)?Wc[a]:Wc[a]="change:"+a}k=Vc.prototype;k.get=function(a){var b;this.N.hasOwnProperty(a)&&(b=this.N[a]);return b};k.P=function(){return Object.keys(this.N)};k.L=function(){return kb({},this.N)};function Yc(a,b,c){var d=Xc(b);a.b(new Zc(d,b,c));a.b(new Zc("propertychange",b,c))}k.set=function(a,b,c){c?this.N[a]=b:(c=this.N[a],this.N[a]=b,c!==b&&Yc(this,a,c))};
k.H=function(a,b){for(var c in a)this.set(c,a[c],b)};k.R=function(a,b){if(a in this.N){var c=this.N[a];delete this.N[a];b||Yc(this,a,c)}};function Zc(a,b,c){Qc.call(this,a);this.key=b;this.oldValue=c}w(Zc,Qc);function B(a,b){Vc.call(this);this.c=!!(b||{}).unique;this.a=a?a:[];if(this.c)for(a=0,b=this.a.length;a<b;++a)$c(this,this.a[a],a);ad(this)}w(B,Vc);k=B.prototype;k.clear=function(){for(;0<this.kc();)this.pop()};k.qg=function(a){var b;var c=0;for(b=a.length;c<b;++c)this.push(a[c]);return this};k.forEach=function(a,b){a=b?a.bind(b):a;b=this.a;for(var c=0,d=b.length;c<d;++c)a(b[c],c,b)};k.Xm=function(){return this.a};k.item=function(a){return this.a[a]};k.kc=function(){return this.get(bd)};
k.Re=function(a,b){this.c&&$c(this,b);this.a.splice(a,0,b);ad(this);this.b(new cd("add",b))};k.pop=function(){return this.Wg(this.kc()-1)};k.push=function(a){this.c&&$c(this,a);var b=this.kc();this.Re(b,a);return this.kc()};k.remove=function(a){var b=this.a,c;var d=0;for(c=b.length;d<c;++d)if(b[d]===a)return this.Wg(d)};k.Wg=function(a){var b=this.a[a];this.a.splice(a,1);ad(this);this.b(new cd("remove",b));return b};
k.rq=function(a,b){var c=this.kc();if(a<c)this.c&&$c(this,b,a),c=this.a[a],this.a[a]=b,this.b(new cd("remove",c)),this.b(new cd("add",b));else{for(;c<a;++c)this.Re(c,void 0);this.Re(a,b)}};function ad(a){a.set(bd,a.a.length)}function $c(a,b,c){for(var d=0,e=a.a.length;d<e;++d)if(a.a[d]===b&&d!==c)throw new ha(58);}var bd="length";function cd(a,b){Qc.call(this,a);this.element=b}w(cd,Qc);function dd(a,b,c){Qc.call(this,a);this.map=b;this.frameState=void 0!==c?c:null}w(dd,Qc);function ed(a,b,c,d,e){dd.call(this,a,b,e);this.originalEvent=c;this.pixel=b.ud(c);this.coordinate=b.Ra(this.pixel);this.dragging=void 0!==d?d:!1}w(ed,dd);ed.prototype.preventDefault=function(){dd.prototype.preventDefault.call(this);this.originalEvent.preventDefault()};ed.prototype.stopPropagation=function(){dd.prototype.stopPropagation.call(this);this.originalEvent.stopPropagation()};var fd=["experimental-webgl","webgl","webkit-3d","moz-webgl"];function gd(a,b){var c,d,e=fd.length;for(d=0;d<e;++d)try{if(c=a.getContext(fd[d],b))return c}catch(f){}return null};var hd,id="undefined"!==typeof navigator?navigator.userAgent.toLowerCase():"",jd=-1!==id.indexOf("firefox"),kd=-1!==id.indexOf("safari")&&-1==id.indexOf("chrom"),ld=-1!==id.indexOf("webkit")&&-1==id.indexOf("edge"),md=-1!==id.indexOf("macintosh"),nd=window.devicePixelRatio||1,od=!1,pd=function(){if(!("HTMLCanvasElement"in window))return!1;try{var a=document.createElement("CANVAS").getContext("2d");return a?(void 0!==a.setLineDash&&(od=!0),!0):!1}catch(b){return!1}}(),qd="DeviceOrientationEvent"in
window,rd="geolocation"in navigator,sd="ontouchstart"in window,td="PointerEvent"in window,ud=!!navigator.msPointerEnabled,vd=!1,wd,xd=[];if("WebGLRenderingContext"in window)try{var yd=gd(document.createElement("CANVAS"),{failIfMajorPerformanceCaveat:!0});yd&&(vd=!0,wd=yd.getParameter(yd.MAX_TEXTURE_SIZE),xd=yd.getSupportedExtensions())}catch(a){}hd=vd;da=xd;ba=wd;var zd={gr:"singleclick",Wq:"click",Xq:"dblclick",$q:"pointerdrag",cr:"pointermove",Zq:"pointerdown",fr:"pointerup",er:"pointerover",dr:"pointerout",ar:"pointerenter",br:"pointerleave",Yq:"pointercancel"};function Ad(a,b,c,d,e){ed.call(this,a,b,c.b,d,e);this.b=c}w(Ad,ed);function Bd(a,b){this.b=a;this.i=b};function Cd(a){Bd.call(this,a,{mousedown:this.Jm,mousemove:this.Km,mouseup:this.Nm,mouseover:this.Mm,mouseout:this.Lm});this.a=a.g;this.g=[]}w(Cd,Bd);function Dd(a,b){a=a.g;var c=b.clientX;b=b.clientY;for(var d=0,e=a.length,f;d<e&&(f=a[d]);d++){var g=Math.abs(b-f[1]);if(25>=Math.abs(c-f[0])&&25>=g)return!0}return!1}function Ed(a){var b=Fd(a,a),c=b.preventDefault;b.preventDefault=function(){a.preventDefault();c()};b.pointerId=1;b.isPrimary=!0;b.pointerType="mouse";return b}k=Cd.prototype;
k.Jm=function(a){if(!Dd(this,a)){(1).toString()in this.a&&this.cancel(a);var b=Ed(a);this.a[(1).toString()]=a;Gd(this.b,"pointerdown",b,a)}};k.Km=function(a){if(!Dd(this,a)){var b=Ed(a);Gd(this.b,"pointermove",b,a)}};k.Nm=function(a){if(!Dd(this,a)){var b=this.a[(1).toString()];b&&b.button===a.button&&(b=Ed(a),Gd(this.b,"pointerup",b,a),delete this.a[(1).toString()])}};k.Mm=function(a){if(!Dd(this,a)){var b=Ed(a);Hd(this.b,b,a)}};k.Lm=function(a){if(!Dd(this,a)){var b=Ed(a);Jd(this.b,b,a)}};
k.cancel=function(a){var b=Ed(a);this.b.cancel(b,a);delete this.a[(1).toString()]};function Kd(a){Bd.call(this,a,{MSPointerDown:this.Sm,MSPointerMove:this.Tm,MSPointerUp:this.Wm,MSPointerOut:this.Um,MSPointerOver:this.Vm,MSPointerCancel:this.Rm,MSGotPointerCapture:this.Pm,MSLostPointerCapture:this.Qm});this.a=a.g;this.g=["","unavailable","touch","pen","mouse"]}w(Kd,Bd);function Ld(a,b){var c=b;"number"===typeof b.pointerType&&(c=Fd(b,b),c.pointerType=a.g[b.pointerType]);return c}k=Kd.prototype;
k.Sm=function(a){this.a[a.pointerId.toString()]=a;var b=Ld(this,a);Gd(this.b,"pointerdown",b,a)};k.Tm=function(a){var b=Ld(this,a);Gd(this.b,"pointermove",b,a)};k.Wm=function(a){var b=Ld(this,a);Gd(this.b,"pointerup",b,a);delete this.a[a.pointerId.toString()]};k.Um=function(a){var b=Ld(this,a);Jd(this.b,b,a)};k.Vm=function(a){var b=Ld(this,a);Hd(this.b,b,a)};k.Rm=function(a){var b=Ld(this,a);this.b.cancel(b,a);delete this.a[a.pointerId.toString()]};
k.Qm=function(a){this.b.b(new Md("lostpointercapture",a,a))};k.Pm=function(a){this.b.b(new Md("gotpointercapture",a,a))};function Nd(a){Bd.call(this,a,{pointerdown:this.Kp,pointermove:this.Lp,pointerup:this.Op,pointerout:this.Mp,pointerover:this.Np,pointercancel:this.Jp,gotpointercapture:this.Wl,lostpointercapture:this.Hm})}w(Nd,Bd);k=Nd.prototype;k.Kp=function(a){Od(this.b,a)};k.Lp=function(a){Od(this.b,a)};k.Op=function(a){Od(this.b,a)};k.Mp=function(a){Od(this.b,a)};k.Np=function(a){Od(this.b,a)};k.Jp=function(a){Od(this.b,a)};k.Hm=function(a){Od(this.b,a)};k.Wl=function(a){Od(this.b,a)};function Md(a,b,c){Qc.call(this,a);this.b=b;a=c?c:{};this.buttons=Pd(a);this.pressure=Qd(a,this.buttons);this.bubbles="bubbles"in a?a.bubbles:!1;this.cancelable="cancelable"in a?a.cancelable:!1;this.view="view"in a?a.view:null;this.detail="detail"in a?a.detail:null;this.screenX="screenX"in a?a.screenX:0;this.screenY="screenY"in a?a.screenY:0;this.clientX="clientX"in a?a.clientX:0;this.clientY="clientY"in a?a.clientY:0;this.ctrlKey="ctrlKey"in a?a.ctrlKey:!1;this.altKey="altKey"in a?a.altKey:!1;this.shiftKey=
"shiftKey"in a?a.shiftKey:!1;this.metaKey="metaKey"in a?a.metaKey:!1;this.button="button"in a?a.button:0;this.relatedTarget="relatedTarget"in a?a.relatedTarget:null;this.pointerId="pointerId"in a?a.pointerId:0;this.width="width"in a?a.width:0;this.height="height"in a?a.height:0;this.tiltX="tiltX"in a?a.tiltX:0;this.tiltY="tiltY"in a?a.tiltY:0;this.pointerType="pointerType"in a?a.pointerType:"";this.isPrimary="isPrimary"in a?a.isPrimary:!1;b.preventDefault&&(this.preventDefault=function(){b.preventDefault()})}
w(Md,Qc);function Pd(a){if(a.buttons||Rd)a=a.buttons;else switch(a.which){case 1:a=1;break;case 2:a=4;break;case 3:a=2;break;default:a=0}return a}function Qd(a,b){var c=0;a.pressure?c=a.pressure:c=b?.5:0;return c}var Rd=!1;try{Rd=1===(new MouseEvent("click",{buttons:1})).buttons}catch(a){};function Sd(a,b){Bd.call(this,a,{touchstart:this.Qq,touchmove:this.Pq,touchend:this.Oq,touchcancel:this.Nq});this.a=a.g;this.j=b;this.g=void 0;this.f=0;this.c=void 0}w(Sd,Bd);k=Sd.prototype;k.Ej=function(){this.f=0;this.c=void 0};
function Td(a,b,c){b=Fd(b,c);b.pointerId=c.identifier+2;b.bubbles=!0;b.cancelable=!0;b.detail=a.f;b.button=0;b.buttons=1;b.width=c.webkitRadiusX||c.radiusX||0;b.height=c.webkitRadiusY||c.radiusY||0;b.pressure=c.webkitForce||c.force||.5;b.isPrimary=a.g===c.identifier;b.pointerType="touch";b.clientX=c.clientX;b.clientY=c.clientY;b.screenX=c.screenX;b.screenY=c.screenY;return b}
function Ud(a,b,c){function d(){b.preventDefault()}var e=Array.prototype.slice.call(b.changedTouches),f=e.length,g;for(g=0;g<f;++g){var h=Td(a,b,e[g]);h.preventDefault=d;c.call(a,b,h)}}
k.Qq=function(a){var b=a.touches,c=Object.keys(this.a),d=c.length;if(d>=b.length){var e=[],f;for(f=0;f<d;++f){var g=c[f];var h=this.a[g];var l;if(!(l=1==g))a:{for(var m=b.length,n=0;n<m;n++)if(l=b[n],l.identifier===g-2){l=!0;break a}l=!1}l||e.push(h.out)}for(f=0;f<e.length;++f)this.Of(a,e[f])}b=a.changedTouches[0];c=Object.keys(this.a).length;if(0===c||1===c&&(1).toString()in this.a)this.g=b.identifier,void 0!==this.c&&clearTimeout(this.c);Vd(this,a);this.f++;Ud(this,a,this.Fp)};
k.Fp=function(a,b){this.a[b.pointerId]={target:b.target,out:b,pj:b.target};var c=this.b;b.bubbles=!0;Gd(c,"pointerover",b,a);c=this.b;b.bubbles=!1;Gd(c,"pointerenter",b,a);Gd(this.b,"pointerdown",b,a)};k.Pq=function(a){a.preventDefault();Ud(this,a,this.Om)};
k.Om=function(a,b){var c=this.a[b.pointerId];if(c){var d=c.out,e=c.pj;Gd(this.b,"pointermove",b,a);d&&e!==b.target&&(d.relatedTarget=b.target,b.relatedTarget=e,d.target=e,b.target?(Jd(this.b,d,a),Hd(this.b,b,a)):(b.target=e,b.relatedTarget=null,this.Of(a,b)));c.out=b;c.pj=b.target}};k.Oq=function(a){Vd(this,a);Ud(this,a,this.Rq)};
k.Rq=function(a,b){Gd(this.b,"pointerup",b,a);this.b.out(b,a);Wd(this.b,b,a);delete this.a[b.pointerId];b.isPrimary&&(this.g=void 0,this.c=setTimeout(this.Ej.bind(this),200))};k.Nq=function(a){Ud(this,a,this.Of)};k.Of=function(a,b){this.b.cancel(b,a);this.b.out(b,a);Wd(this.b,b,a);delete this.a[b.pointerId];b.isPrimary&&(this.g=void 0,this.c=setTimeout(this.Ej.bind(this),200))};
function Vd(a,b){var c=a.j.g;b=b.changedTouches[0];if(a.g===b.identifier){var d=[b.clientX,b.clientY];c.push(d);setTimeout(function(){var a=c.indexOf(d);-1<a&&c.splice(a,1)},2500)}};function Xd(a){Sc.call(this);this.f=a;this.g={};this.i={};this.a=[];td?Yd(this,new Nd(this)):ud?Yd(this,new Kd(this)):(a=new Cd(this),Yd(this,a),sd&&Yd(this,new Sd(this,a)));a=this.a.length;for(var b,c=0;c<a;c++)b=this.a[c],Zd(this,Object.keys(b.i))}w(Xd,Sc);function Yd(a,b){var c=Object.keys(b.i);c&&(c.forEach(function(a){var c=b.i[a];c&&(this.i[a]=c.bind(b))},a),a.a.push(b))}Xd.prototype.c=function(a){var b=this.i[a.type];b&&b(a)};
function Zd(a,b){b.forEach(function(a){y(this.f,a,this.c,this)},a)}function $d(a,b){b.forEach(function(a){Mc(this.f,a,this.c,this)},a)}function Fd(a,b){for(var c={},d,e=0,f=ae.length;e<f;e++)d=ae[e][0],c[d]=a[d]||b[d]||ae[e][1];return c}function Wd(a,b,c){b.bubbles=!1;Gd(a,"pointerleave",b,c)}Xd.prototype.out=function(a,b){a.bubbles=!0;Gd(this,"pointerout",a,b)};Xd.prototype.cancel=function(a,b){Gd(this,"pointercancel",a,b)};
function Jd(a,b,c){a.out(b,c);var d=b.target,e=b.relatedTarget;d&&e&&d.contains(e)||Wd(a,b,c)}function Hd(a,b,c){b.bubbles=!0;Gd(a,"pointerover",b,c);var d=b.target,e=b.relatedTarget;d&&e&&d.contains(e)||(b.bubbles=!1,Gd(a,"pointerenter",b,c))}function Gd(a,b,c,d){a.b(new Md(b,d,c))}function Od(a,b){a.b(new Md(b.type,b,b))}Xd.prototype.ia=function(){for(var a=this.a.length,b,c=0;c<a;c++)b=this.a[c],$d(this,Object.keys(b.i));Sc.prototype.ia.call(this)};
var ae=[["bubbles",!1],["cancelable",!1],["view",null],["detail",null],["screenX",0],["screenY",0],["clientX",0],["clientY",0],["ctrlKey",!1],["altKey",!1],["shiftKey",!1],["metaKey",!1],["button",0],["relatedTarget",null],["buttons",0],["pointerId",0],["width",0],["height",0],["pressure",0],["tiltX",0],["tiltY",0],["pointerType",""],["hwTimestamp",0],["isPrimary",!1],["type",""],["target",null],["currentTarget",null],["which",0]];function be(a,b){Sc.call(this);this.g=a;this.j=0;this.l=!1;this.i=[];this.D=b?b*nd:nd;this.c=null;a=this.g.a;this.N=0;this.o={};this.f=new Xd(a);this.a=null;this.s=y(this.f,"pointerdown",this.pm,this);this.v=y(this.f,"pointermove",this.mq,this)}w(be,Sc);function ce(a,b){var c=new Ad("click",a.g,b);a.b(c);0!==a.j?(clearTimeout(a.j),a.j=0,c=new Ad("dblclick",a.g,b),a.b(c)):a.j=setTimeout(function(){this.j=0;var a=new Ad("singleclick",this.g,b);this.b(a)}.bind(a),250)}
function de(a,b){"pointerup"==b.type||"pointercancel"==b.type?delete a.o[b.pointerId]:"pointerdown"==b.type&&(a.o[b.pointerId]=!0);a.N=Object.keys(a.o).length}k=be.prototype;k.ci=function(a){de(this,a);var b=new Ad("pointerup",this.g,a);this.b(b);b.sj||this.l||0!==a.button||ce(this,this.c);0===this.N&&(this.i.forEach(Gc),this.i.length=0,this.l=!1,this.c=null,Pc(this.a),this.a=null)};
k.pm=function(a){de(this,a);var b=new Ad("pointerdown",this.g,a);this.b(b);this.c=a;0===this.i.length&&(this.a=new Xd(document),this.i.push(y(this.a,"pointermove",this.mn,this),y(this.a,"pointerup",this.ci,this),y(this.f,"pointercancel",this.ci,this)))};k.mn=function(a){if(fe(this,a)){this.l=!0;var b=new Ad("pointerdrag",this.g,a,this.l);this.b(b)}a.preventDefault()};k.mq=function(a){this.b(new Ad(a.type,this.g,a,!(!this.c||!fe(this,a))))};
function fe(a,b){return Math.abs(b.clientX-a.c.clientX)>a.D||Math.abs(b.clientY-a.c.clientY)>a.D}k.ia=function(){this.v&&(Gc(this.v),this.v=null);this.s&&(Gc(this.s),this.s=null);this.i.forEach(Gc);this.i.length=0;this.a&&(Pc(this.a),this.a=null);this.f&&(Pc(this.f),this.f=null);Sc.prototype.ia.call(this)};function ge(a,b){this.s=a;this.c=b;this.b=[];this.g=[];this.a={}}ge.prototype.clear=function(){this.b.length=0;this.g.length=0;lb(this.a)};function he(a){var b=a.b,c=a.g,d=b[0];1==b.length?(b.length=0,c.length=0):(b[0]=b.pop(),c[0]=c.pop(),ie(a,0));b=a.c(d);delete a.a[b];return d}ge.prototype.i=function(a){oa(!(this.c(a)in this.a),31);var b=this.s(a);return Infinity!=b?(this.b.push(a),this.g.push(b),this.a[this.c(a)]=!0,je(this,0,this.b.length-1),!0):!1};
function ie(a,b){for(var c=a.b,d=a.g,e=c.length,f=c[b],g=d[b],h=b;b<e>>1;){var l=2*b+1,m=2*b+2;l=m<e&&d[m]<d[l]?m:l;c[b]=c[l];d[b]=d[l];b=l}c[b]=f;d[b]=g;je(a,h,b)}function je(a,b,c){var d=a.b;a=a.g;for(var e=d[c],f=a[c];c>b;){var g=c-1>>1;if(a[g]>f)d[c]=d[g],a[c]=a[g],c=g;else break}d[c]=e;a[c]=f}
function ke(a){var b=a.s,c=a.b,d=a.g,e=0,f=c.length,g;for(g=0;g<f;++g){var h=c[g];var l=b(h);Infinity==l?delete a.a[a.c(h)]:(d[e]=l,c[e++]=h)}c.length=e;d.length=e;for(b=(a.b.length>>1)-1;0<=b;b--)ie(a,b)};function le(a,b){ge.call(this,function(b){return a.apply(null,b)},function(a){return a[0].lb()});this.v=b;this.j=0;this.f={}}w(le,ge);le.prototype.i=function(a){var b=ge.prototype.i.call(this,a);b&&y(a[0],"change",this.l,this);return b};le.prototype.l=function(a){a=a.target;var b=a.getState();if(2===b||3===b||4===b||5===b)Mc(a,"change",this.l,this),a=a.lb(),a in this.f&&(delete this.f[a],--this.j),this.v()};
function me(a,b,c){for(var d=0,e=!1,f,g,h;a.j<b&&d<c&&0<a.b.length;)g=he(a)[0],h=g.lb(),f=g.getState(),5===f?e=!0:0!==f||h in a.f||(a.f[h]=!0,++a.j,++d,g.load());0===d&&e&&a.v()};function ne(a){return function(b){if(b)return[pa(b[0],a[0],a[2]),pa(b[1],a[1],a[3])]}}function oe(a){return a};function pe(a){return function(b,c,d){if(void 0!==b)return b=fc(a,b,d),b=pa(b+c,0,a.length-1),c=Math.floor(b),b!=c&&c<a.length-1?a[c]/Math.pow(a[c]/a[c+1],b-c):a[c]}}function qe(a,b,c){return function(d,e,f){if(void 0!==d)return d=Math.max(Math.floor(Math.log(b/d)/Math.log(a)+(-f/2+.5))+e,0),void 0!==c&&(d=Math.min(d,c)),b/Math.pow(a,d)}};function re(a){if(void 0!==a)return 0}function se(a,b){if(void 0!==a)return a+b}function ue(a){var b=2*Math.PI/a;return function(a,d){if(void 0!==a)return a=Math.floor((a+d)/b+.5)*b}}function we(){var a=va(5);return function(b,c){if(void 0!==b)return Math.abs(b+c)<=a?0:b+c}};function xe(a,b){a=void 0!==b?a.toFixed(b):""+a;b=a.indexOf(".");b=-1===b?a.length:b;return 2<b?a:Array(3-b).join("0")+a}function ye(a){a=(""+a).split(".");for(var b=["1","3"],c=0;c<Math.max(a.length,b.length);c++){var d=parseInt(a[c]||"0",10),e=parseInt(b[c]||"0",10);if(d>e)return 1;if(e>d)return-1}return 0};function ze(a,b){a[0]+=b[0];a[1]+=b[1];return a}function Ae(a,b){var c=b.Bd(),d=b.xa();b=d[0];d=d[1];var e=a[0]-b;a=a[1]-d;0===e&&0===a&&(e=1);var f=Math.sqrt(e*e+a*a);return[b+c*e/f,d+c*a/f]}function Be(a,b){var c=a[0];a=a[1];var d=b[0],e=b[1];b=d[0];d=d[1];var f=e[0];e=e[1];var g=f-b,h=e-d;c=0===g&&0===h?0:(g*(c-b)+h*(a-d))/(g*g+h*h||0);0>=c?(a=b,c=d):1<=c?(a=f,c=e):(a=b+c*g,c=d+c*h);return[a,c]}
function Ce(a,b,c){b=wa(b+180,360)-180;var d=Math.abs(3600*b);c=c||0;var e=Math.pow(10,c),f=Math.floor(d/3600),g=Math.floor((d-3600*f)/60);d=Math.ceil((d-3600*f-60*g)*e)/e;60<=d&&(d=0,g+=1);60<=g&&(g=0,f+=1);return f+"\u00b0 "+xe(g)+"\u2032 "+xe(d,c)+"\u2033"+(0==b?"":" "+a.charAt(0>b?1:0))}function De(a,b,c){return a?b.replace("{x}",a[0].toFixed(c)).replace("{y}",a[1].toFixed(c)):""}function Ee(a,b){for(var c=!0,d=a.length-1;0<=d;--d)if(a[d]!=b[d]){c=!1;break}return c}
function Fe(a,b){var c=Math.cos(b);b=Math.sin(b);var d=a[1]*c+a[0]*b;a[0]=a[0]*c-a[1]*b;a[1]=d;return a}function Ge(a,b){a[0]*=b;a[1]*=b}function He(a,b){var c=a[0]-b[0];a=a[1]-b[1];return c*c+a*a}function Ie(a,b){return Math.sqrt(He(a,b))}function Je(a,b){return He(a,Be(a,b))}function Ke(a,b){return De(a,"{x}, {y}",b)};function Me(a){return Math.pow(a,3)}function Oe(a){return 1-Me(1-a)}function Pe(a){return 3*a*a-2*a*a*a}function Qe(a){return a};function Re(){return!0}function Se(){return!1};function Te(a,b,c,d,e,f){for(var g=f?f:[],h=0;b<c;b+=d){var l=a[b],m=a[b+1];g[h++]=e[0]*l+e[2]*m+e[4];g[h++]=e[1]*l+e[3]*m+e[5]}f&&g.length!=h&&(g.length=h);return g}function Ue(a,b,c,d,e,f,g){for(var h=g?g:[],l=0,m;b<c;b+=d)for(h[l++]=a[b]+e,h[l++]=a[b+1]+f,m=b+2;m<b+d;++m)h[l++]=a[m];g&&h.length!=l&&(h.length=l);return h};var Ve=Array(6);function We(){return[1,0,0,1,0,0]}function Xe(a){return Ye(a,1,0,0,1,0,0)}function Ze(a,b){var c=a[0],d=a[1],e=a[2],f=a[3],g=a[4],h=a[5],l=b[0],m=b[1],n=b[2],p=b[3],q=b[4];b=b[5];a[0]=c*l+e*m;a[1]=d*l+f*m;a[2]=c*n+e*p;a[3]=d*n+f*p;a[4]=c*q+e*b+g;a[5]=d*q+f*b+h;return a}function Ye(a,b,c,d,e,f,g){a[0]=b;a[1]=c;a[2]=d;a[3]=e;a[4]=f;a[5]=g;return a}function $e(a,b){a[0]=b[0];a[1]=b[1];a[2]=b[2];a[3]=b[3];a[4]=b[4];a[5]=b[5];return a}
function af(a,b){var c=b[0],d=b[1];b[0]=a[0]*c+a[2]*d+a[4];b[1]=a[1]*c+a[3]*d+a[5];return b}function bf(a,b){var c=Math.cos(b);b=Math.sin(b);Ze(a,Ye(Ve,c,b,-b,c,0,0))}function cf(a,b,c){return Ze(a,Ye(Ve,b,0,0,c,0,0))}function df(a,b,c){Ze(a,Ye(Ve,1,0,0,1,b,c))}function ef(a,b,c,d,e,f,g,h){var l=Math.sin(f);f=Math.cos(f);a[0]=d*f;a[1]=e*l;a[2]=-d*l;a[3]=e*f;a[4]=g*d*f-h*d*l+b;a[5]=g*e*l+h*e*f+c;return a}
function ff(a){var b=a[0]*a[3]-a[1]*a[2];oa(0!==b,32);var c=a[0],d=a[1],e=a[2],f=a[3],g=a[4],h=a[5];a[0]=f/b;a[1]=-d/b;a[2]=-e/b;a[3]=c/b;a[4]=(e*h-f*g)/b;a[5]=-(c*h-d*g)/b;return a};function gf(){Vc.call(this);this.s=Da();this.v=-1;this.i={};this.l=this.f=0;this.O=We()}w(gf,Vc);k=gf.prototype;k.Ib=function(a,b){b=b?b:[NaN,NaN];this.Nb(a[0],a[1],b,Infinity);return b};k.Bb=function(a){return this.Zc(a[0],a[1])};k.Zc=Se;k.G=function(a){this.v!=this.g&&(this.s=this.Ae(this.s),this.v=this.g);var b=this.s;a?(a[0]=b[0],a[1]=b[1],a[2]=b[2],a[3]=b[3]):a=b;return a};k.Sb=function(a){return this.Wd(a*a)};
k.mb=function(a,b){var c=this.O;a=Ob(a);var d="tile-pixels"==a.a?function(d,f,g){var e=a.G(),l=a.oe;e=db(l)/db(e);ef(c,l[0],l[3],e,-e,0,0,0);Te(d,0,d.length,g,c,f);return Yb(a,b)(d,f,g)}:Yb(a,b);this.Rc(d);return this};function hf(){gf.call(this);this.ja="XY";this.a=2;this.A=null}w(hf,gf);function jf(a){var b;"XY"==a?b=2:"XYZ"==a||"XYM"==a?b=3:"XYZM"==a&&(b=4);return b}k=hf.prototype;k.Zc=Se;k.Ae=function(a){return Qa(this.A,0,this.A.length,this.a,a)};k.fc=function(){return this.A.slice(0,this.a)};k.da=function(){return this.A};k.gc=function(){return this.A.slice(this.A.length-this.a)};k.ic=function(){return this.ja};
k.Wd=function(a){this.l!=this.g&&(lb(this.i),this.f=0,this.l=this.g);if(0>a||0!==this.f&&a<=this.f)return this;var b=a.toString();if(this.i.hasOwnProperty(b))return this.i[b];var c=this.xd(a);if(c.da().length<this.A.length)return this.i[b]=c;this.f=a;return this};k.xd=function(){return this};k.pa=function(){return this.a};function kf(a,b,c){a.a=jf(b);a.ja=b;a.A=c}
function lf(a,b,c,d){if(b)c=jf(b);else{for(b=0;b<d;++b){if(0===c.length){a.ja="XY";a.a=2;return}c=c[0]}c=c.length;var e;2==c?e="XY":3==c?e="XYZ":4==c&&(e="XYZM");b=e}a.ja=b;a.a=c}k.Rc=function(a){this.A&&(a(this.A,this.A,this.a),this.u())};
k.rotate=function(a,b){var c=this.da();if(c){var d=c.length,e=this.pa(),f=c?c:[],g=Math.cos(a);a=Math.sin(a);var h=b[0];b=b[1];for(var l=0,m=0;m<d;m+=e){var n=c[m]-h,p=c[m+1]-b;f[l++]=h+n*g-p*a;f[l++]=b+n*a+p*g;for(n=m+2;n<m+e;++n)f[l++]=c[n]}c&&f.length!=l&&(f.length=l);this.u()}};
k.scale=function(a,b,c){var d=b;void 0===d&&(d=a);var e=c;e||(e=eb(this.G()));if(c=this.da()){b=c.length;var f=this.pa(),g=c?c:[],h=e[0];e=e[1];for(var l=0,m=0;m<b;m+=f){var n=c[m]-h,p=c[m+1]-e;g[l++]=h+a*n;g[l++]=e+d*p;for(n=m+2;n<m+f;++n)g[l++]=c[n]}c&&g.length!=l&&(g.length=l);this.u()}};k.translate=function(a,b){var c=this.da();c&&(Ue(c,0,c.length,this.pa(),a,b,c),this.u())};function mf(a,b,c,d){for(var e=0,f=a[c-d],g=a[c-d+1];b<c;b+=d){var h=a[b],l=a[b+1];e+=g*h-f*l;f=h;g=l}return e/2}function nf(a,b,c,d){var e=0,f;var g=0;for(f=c.length;g<f;++g){var h=c[g];e+=mf(a,b,h,d);b=h}return e};function of(a,b,c,d,e,f,g){var h=a[b],l=a[b+1],m=a[c]-h,n=a[c+1]-l;if(0!==m||0!==n)if(f=((e-h)*m+(f-l)*n)/(m*m+n*n),1<f)b=c;else if(0<f){for(e=0;e<d;++e)g[e]=ya(a[b+e],a[c+e],f);g.length=d;return}for(e=0;e<d;++e)g[e]=a[b+e];g.length=d}function pf(a,b,c,d,e){var f=a[b],g=a[b+1];for(b+=d;b<c;b+=d){var h=a[b],l=a[b+1];f=ua(f,g,h,l);f>e&&(e=f);f=h;g=l}return e}function qf(a,b,c,d,e){var f;var g=0;for(f=c.length;g<f;++g){var h=c[g];e=pf(a,b,h,d,e);b=h}return e}
function tf(a,b,c,d,e,f,g,h,l,m,n){if(b==c)return m;if(0===e){var p=ua(g,h,a[b],a[b+1]);if(p<m){for(n=0;n<d;++n)l[n]=a[b+n];l.length=d;return p}return m}for(var q=n?n:[NaN,NaN],r=b+d;r<c;)if(of(a,r-d,r,d,g,h,q),p=ua(g,h,q[0],q[1]),p<m){m=p;for(n=0;n<d;++n)l[n]=q[n];l.length=d;r+=d}else r+=d*Math.max((Math.sqrt(p)-Math.sqrt(m))/e|0,1);if(f&&(of(a,c-d,b,d,g,h,q),p=ua(g,h,q[0],q[1]),p<m)){m=p;for(n=0;n<d;++n)l[n]=q[n];l.length=d}return m}
function uf(a,b,c,d,e,f,g,h,l,m,n){n=n?n:[NaN,NaN];var p;var q=0;for(p=c.length;q<p;++q){var r=c[q];m=tf(a,b,r,d,e,f,g,h,l,m,n);b=r}return m};function vf(a,b){var c=0,d;var e=0;for(d=b.length;e<d;++e)a[c++]=b[e];return c}function wf(a,b,c,d){var e;var f=0;for(e=c.length;f<e;++f){var g=c[f],h;for(h=0;h<d;++h)a[b++]=g[h]}return b}function xf(a,b,c,d,e){e=e?e:[];var f=0,g;var h=0;for(g=c.length;h<g;++h)b=wf(a,b,c[h],d),e[f++]=b;e.length=f;return e};function yf(a,b,c,d,e){e=void 0!==e?e:[];for(var f=0;b<c;b+=d)e[f++]=a.slice(b,b+d);e.length=f;return e}function zf(a,b,c,d,e){e=void 0!==e?e:[];var f=0,g;var h=0;for(g=c.length;h<g;++h){var l=c[h];e[f++]=yf(a,b,l,d,e[f]);b=l}e.length=f;return e}function Af(a,b,c,d,e){e=void 0!==e?e:[];var f=0,g;var h=0;for(g=c.length;h<g;++h){var l=c[h];e[f++]=zf(a,b,l,d,e[f]);b=l[l.length-1]}e.length=f;return e};function Bf(a,b,c,d,e,f,g){var h=(c-b)/d;if(3>h){for(;b<c;b+=d)f[g++]=a[b],f[g++]=a[b+1];return g}var l=Array(h);l[0]=1;l[h-1]=1;c=[b,c-d];for(var m=0,n;0<c.length;){var p=c.pop(),q=c.pop(),r=0,u=a[q],v=a[q+1],z=a[p],A=a[p+1];for(n=q+d;n<p;n+=d){var E=sa(a[n],a[n+1],u,v,z,A);E>r&&(m=n,r=E)}r>e&&(l[(m-b)/d]=1,q+d<m&&c.push(q,m),m+d<p&&c.push(m,p))}for(n=0;n<h;++n)l[n]&&(f[g++]=a[b+n*d],f[g++]=a[b+n*d+1]);return g}
function Cf(a,b,c,d,e,f,g,h){var l;var m=0;for(l=c.length;m<l;++m){var n=c[m];a:{var p=a,q=n,r=d,u=e,v=f,z=g;if(b!=q){var A=u*Math.round(p[b]/u),E=u*Math.round(p[b+1]/u);b+=r;v[z++]=A;v[z++]=E;do{var S=u*Math.round(p[b]/u);g=u*Math.round(p[b+1]/u);b+=r;if(b==q){v[z++]=S;v[z++]=g;g=z;break a}}while(S==A&&g==E);for(;b<q;){var Ia=u*Math.round(p[b]/u);var ta=u*Math.round(p[b+1]/u);b+=r;if(Ia!=S||ta!=g){var la=S-A,ca=g-E,ia=Ia-A,xa=ta-E;la*xa==ca*ia&&(0>la&&ia<la||la==ia||0<la&&ia>la)&&(0>ca&&xa<ca||ca==
xa||0<ca&&xa>ca)||(v[z++]=S,v[z++]=g,A=S,E=g);S=Ia;g=ta}}v[z++]=S;v[z++]=g}g=z}h.push(g);b=n}return g};function Df(a,b){hf.call(this);this.c=this.j=-1;this.na(a,b)}w(Df,hf);k=Df.prototype;k.clone=function(){var a=new Df(null);Ef(a,this.ja,this.A.slice());return a};k.Nb=function(a,b,c,d){if(d<Ha(this.G(),a,b))return d;this.c!=this.g&&(this.j=Math.sqrt(pf(this.A,0,this.A.length,this.a,0)),this.c=this.g);return tf(this.A,0,this.A.length,this.a,this.j,!0,a,b,c,d)};k.Vn=function(){return mf(this.A,0,this.A.length,this.a)};k.W=function(){return yf(this.A,0,this.A.length,this.a)};
k.xd=function(a){var b=[];b.length=Bf(this.A,0,this.A.length,this.a,a,b,0);a=new Df(null);Ef(a,"XY",b);return a};k.S=function(){return"LinearRing"};k.$a=function(){};k.na=function(a,b){a?(lf(this,b,a,1),this.A||(this.A=[]),this.A.length=wf(this.A,0,a,this.a),this.u()):Ef(this,"XY",null)};function Ef(a,b,c){kf(a,b,c);a.u()};function C(a,b){hf.call(this);this.na(a,b)}w(C,hf);k=C.prototype;k.clone=function(){var a=new C(null);a.ba(this.ja,this.A.slice());return a};k.Nb=function(a,b,c,d){var e=this.A;a=ua(a,b,e[0],e[1]);if(a<d){d=this.a;for(b=0;b<d;++b)c[b]=e[b];c.length=d;return a}return d};k.W=function(){return this.A?this.A.slice():[]};k.Ae=function(a){return Pa(this.A,a)};k.S=function(){return"Point"};k.$a=function(a){return Ka(a,this.A[0],this.A[1])};
k.na=function(a,b){a?(lf(this,b,a,0),this.A||(this.A=[]),this.A.length=vf(this.A,a),this.u()):this.ba("XY",null)};k.ba=function(a,b){kf(this,a,b);this.u()};function Ff(a,b,c,d,e){return!Ua(e,function(e){return!Gf(a,b,c,d,e[0],e[1])})}function Gf(a,b,c,d,e,f){for(var g=0,h=a[c-d],l=a[c-d+1];b<c;b+=d){var m=a[b],n=a[b+1];l<=f?n>f&&0<(m-h)*(f-l)-(e-h)*(n-l)&&g++:n<=f&&0>(m-h)*(f-l)-(e-h)*(n-l)&&g--;h=m;l=n}return 0!==g}function Hf(a,b,c,d,e,f){if(0===c.length||!Gf(a,b,c[0],d,e,f))return!1;var g;b=1;for(g=c.length;b<g;++b)if(Gf(a,c[b-1],c[b],d,e,f))return!1;return!0};function If(a,b,c,d,e,f,g){for(var h,l,m,n,p,q=e[f+1],r=[],u=0,v=c.length;u<v;++u){var z=c[u];m=a[z-d];p=a[z-d+1];for(h=b;h<z;h+=d){n=a[h];l=a[h+1];if(q<=p&&l<=q||p<=q&&q<=l)m=(q-p)/(l-p)*(n-m)+m,r.push(m);m=n;p=l}}u=NaN;v=-Infinity;r.sort(dc);m=r[0];h=1;for(l=r.length;h<l;++h)n=r[h],z=Math.abs(n-m),z>v&&(m=(m+n)/2,Hf(a,b,c,d,m,q)&&(u=m,v=z)),m=n;isNaN(u)&&(u=e[f]);return g?(g.push(u,q,v),g):[u,q,v]};function Jf(a,b,c,d,e,f){for(var g=[a[b],a[b+1]],h=[],l;b+d<c;b+=d){h[0]=a[b+d];h[1]=a[b+d+1];if(l=e.call(f,g,h))return l;g[0]=h[0];g[1]=h[1]}return!1};function Kf(a,b,c,d,e){var f=Ra(Da(),a,b,c,d);return hb(e,f)?La(e,f)||f[0]>=e[0]&&f[2]<=e[2]||f[1]>=e[1]&&f[3]<=e[3]?!0:Jf(a,b,c,d,function(a,b){var c=!1,d=Ma(e,a),f=Ma(e,b);if(1===d||1===f)c=!0;else{var g=e[0],h=e[1],r=e[2],u=e[3],v=b[0];b=b[1];a=(b-a[1])/(v-a[0]);f&2&&!(d&2)&&(c=v-(b-u)/a,c=c>=g&&c<=r);c||!(f&4)||d&4||(c=b-(v-r)*a,c=c>=h&&c<=u);c||!(f&8)||d&8||(c=v-(b-h)/a,c=c>=g&&c<=r);c||!(f&16)||d&16||(c=b-(v-g)*a,c=c>=h&&c<=u)}return c}):!1}
function Lf(a,b,c,d,e){var f=c[0];if(!(Kf(a,b,f,d,e)||Gf(a,b,f,d,e[0],e[1])||Gf(a,b,f,d,e[0],e[3])||Gf(a,b,f,d,e[2],e[1])||Gf(a,b,f,d,e[2],e[3])))return!1;if(1===c.length)return!0;b=1;for(f=c.length;b<f;++b)if(Ff(a,c[b-1],c[b],d,e))return!1;return!0};function Mf(a,b,c,d){for(var e=0,f=a[c-d],g=a[c-d+1];b<c;b+=d){var h=a[b],l=a[b+1];e+=(h-f)*(l+g);f=h;g=l}return 0<e}function Nf(a,b,c,d){var e=0;d=void 0!==d?d:!1;var f;var g=0;for(f=b.length;g<f;++g){var h=b[g];e=Mf(a,e,h,c);if(0===g){if(d&&e||!d&&!e)return!1}else if(d&&!e||!d&&e)return!1;e=h}return!0}
function Of(a,b,c,d,e){e=void 0!==e?e:!1;var f;var g=0;for(f=c.length;g<f;++g){var h=c[g],l=Mf(a,b,h,d);if(0===g?e&&l||!e&&!l:e&&!l||!e&&l){l=a;for(var m=h,n=d;b<m-n;){var p;for(p=0;p<n;++p){var q=l[b+p];l[b+p]=l[m-n+p];l[m-n+p]=q}b+=n;m-=n}}b=h}return b}function Pf(a,b,c,d){var e=0,f;var g=0;for(f=b.length;g<f;++g)e=Of(a,e,b[g],c,d);return e};function D(a,b){hf.call(this);this.c=[];this.o=-1;this.D=null;this.T=this.C=this.B=-1;this.j=null;this.na(a,b)}w(D,hf);k=D.prototype;k.Hk=function(a){this.A?gc(this.A,a.da()):this.A=a.da().slice();this.c.push(this.A.length);this.u()};k.clone=function(){var a=new D(null);a.ba(this.ja,this.A.slice(),this.c.slice());return a};
k.Nb=function(a,b,c,d){if(d<Ha(this.G(),a,b))return d;this.C!=this.g&&(this.B=Math.sqrt(qf(this.A,0,this.c,this.a,0)),this.C=this.g);return uf(this.A,0,this.c,this.a,this.B,!0,a,b,c,d)};k.Zc=function(a,b){return Hf(this.Xb(),0,this.c,this.a,a,b)};k.Yn=function(){return nf(this.Xb(),0,this.c,this.a)};k.W=function(a){if(void 0!==a){var b=this.Xb().slice();Of(b,0,this.c,this.a,a)}else b=this.A;return zf(b,0,this.c,this.a)};k.pb=function(){return this.c};
k.Td=function(){if(this.o!=this.g){var a=eb(this.G());this.D=If(this.Xb(),0,this.c,this.a,a,0);this.o=this.g}return this.D};k.tl=function(){return new C(this.Td(),"XYM")};k.zl=function(){return this.c.length};k.Wh=function(a){if(0>a||this.c.length<=a)return null;var b=new Df(null);Ef(b,this.ja,this.A.slice(0===a?0:this.c[a-1],this.c[a]));return b};k.Ud=function(){var a=this.ja,b=this.A,c=this.c,d=[],e=0,f;var g=0;for(f=c.length;g<f;++g){var h=c[g],l=new Df(null);Ef(l,a,b.slice(e,h));d.push(l);e=h}return d};
k.Xb=function(){if(this.T!=this.g){var a=this.A;Nf(a,this.c,this.a)?this.j=a:(this.j=a.slice(),this.j.length=Of(this.j,0,this.c,this.a));this.T=this.g}return this.j};k.xd=function(a){var b=[],c=[];b.length=Cf(this.A,0,this.c,this.a,Math.sqrt(a),b,0,c);a=new D(null);a.ba("XY",b,c);return a};k.S=function(){return"Polygon"};k.$a=function(a){return Lf(this.Xb(),0,this.c,this.a,a)};
k.na=function(a,b){a?(lf(this,b,a,2),this.A||(this.A=[]),a=xf(this.A,0,a,this.a,this.c),this.A.length=0===a.length?0:a[a.length-1],this.u()):this.ba("XY",null,this.c)};k.ba=function(a,b,c){kf(this,a,b);this.c=c;this.u()};function Qf(a,b,c,d){var e=d?d:32;d=[];var f;for(f=0;f<e;++f)gc(d,a.offset(b,c,2*Math.PI*f/e));d.push(d[0],d[1]);a=new D(null);a.ba("XY",d,[d.length]);return a}function Rf(a){var b=a[0],c=a[1],d=a[2];a=a[3];b=[b,c,b,a,d,a,d,c,b,c];c=new D(null);c.ba("XY",b,[b.length]);return c}
function Sf(a,b,c){var d=b?b:32,e=a.pa();b=a.ja;var f=new D(null,b);d=e*(d+1);e=Array(d);for(var g=0;g<d;g++)e[g]=0;f.ba(b,e,[e.length]);Tf(f,a.xa(),a.Bd(),c);return f}function Tf(a,b,c,d){var e=a.da(),f=a.ja,g=a.pa(),h=a.pb(),l=e.length/g-1;d=d?d:0;for(var m,n,p=0;p<=l;++p)n=p*g,m=d+2*wa(p,l)*Math.PI/l,e[n]=b[0]+c*Math.cos(m),e[n+1]=b[1]+c*Math.sin(m);a.ba(f,e,h)};function F(a){Vc.call(this);a=kb({},a);this.f=[0,0];this.c=[];this.Ff=this.Ff.bind(this);this.v=Ub(a.projection);Vf(this,a)}w(F,Vc);
function Vf(a,b){var c={};c.center=void 0!==b.center?b.center:null;var d=void 0!==b.minZoom?b.minZoom:0;var e=void 0!==b.maxZoom?b.maxZoom:28;var f=void 0!==b.zoomFactor?b.zoomFactor:2;if(void 0!==b.resolutions){var g=b.resolutions;var h=g[d];var l=void 0!==g[e]?g[e]:g[g.length-1];e=pe(g)}else{h=Ub(b.projection);l=h.G();g=(l?Math.max(cb(l),db(l)):360*ub.degrees/h.Bc())/256/Math.pow(2,0);var m=g/Math.pow(2,28);h=b.maxResolution;void 0!==h?d=0:h=g/Math.pow(f,d);l=b.minResolution;void 0===l&&(l=void 0!==
b.maxZoom?void 0!==b.maxResolution?h/Math.pow(f,e):g/Math.pow(f,e):m);e=d+Math.floor(Math.log(h/l)/Math.log(f));l=h/Math.pow(f,e-d);e=qe(f,h,e-d)}a.a=h;a.i=l;a.D=f;a.j=b.resolutions;a.s=d;(void 0!==b.enableRotation?b.enableRotation:1)?(d=b.constrainRotation,d=void 0===d||!0===d?we():!1===d?se:"number"===typeof d?ue(d):se):d=re;a.l={center:void 0!==b.extent?ne(b.extent):oe,resolution:e,rotation:d};void 0!==b.resolution?c.resolution=b.resolution:void 0!==b.zoom&&(c.resolution=a.constrainResolution(a.a,
b.zoom-a.s),a.j&&(c.resolution=pa(Number(a.Pa()||c.resolution),a.i,a.a)));c.rotation=void 0!==b.rotation?b.rotation:0;a.H(c);a.C=b}function $f(a,b){var c=kb({},a.C);void 0!==c.resolution?c.resolution=a.Pa():c.zoom=a.lg();c.center=a.xa();c.rotation=a.Sa();return kb({},c,b)}k=F.prototype;
k.animate=function(a){var b=arguments.length;if(1<b&&"function"===typeof arguments[b-1]){var c=arguments[b-1];--b}if(ag(this)){for(var d=Date.now(),e=this.xa().slice(),f=this.Pa(),g=this.Sa(),h=[],l=0;l<b;++l){var m=arguments[l],n={start:d,complete:!1,anchor:m.anchor,duration:void 0!==m.duration?m.duration:1E3,easing:m.easing||Pe};m.center&&(n.ie=e,n.me=m.center,e=n.me);void 0!==m.zoom?(n.ke=f,n.kd=this.constrainResolution(this.a,m.zoom-this.s,0),f=n.kd):m.resolution&&(n.ke=f,n.kd=m.resolution,f=
n.kd);void 0!==m.rotation&&(n.Df=g,n.ne=g+(wa(m.rotation-g+Math.PI,2*Math.PI)-Math.PI),g=n.ne);n.callback=c;n.ie&&n.me&&!Ee(n.ie,n.me)||n.ke!==n.kd||n.Df!==n.ne?d+=n.duration:n.complete=!0;h.push(n)}this.c.push(h);bg(this,0,1);this.Ff()}else b=arguments[b-1],b.center&&this.ub(b.center),void 0!==b.zoom&&this.Tj(b.zoom),void 0!==b.rotation&&this.ce(b.rotation),c&&c(!0)};k.Ac=function(){return 0<this.f[0]};k.Vh=function(){return 0<this.f[1]};
k.rd=function(){bg(this,0,-this.f[0]);for(var a=0,b=this.c.length;a<b;++a){var c=this.c[a];c[0].callback&&c[0].callback(!1)}this.c.length=0};
k.Ff=function(){void 0!==this.o&&(cancelAnimationFrame(this.o),this.o=void 0);if(this.Ac()){for(var a=Date.now(),b=!1,c=this.c.length-1;0<=c;--c){for(var d=this.c[c],e=!0,f=0,g=d.length;f<g;++f){var h=d[f];if(!h.complete){b=a-h.start;b=0<h.duration?b/h.duration:1;1<=b?(h.complete=!0,b=1):e=!1;b=h.easing(b);if(h.ie){var l=h.ie[0],m=h.ie[1];this.set("center",[l+b*(h.me[0]-l),m+b*(h.me[1]-m)])}h.ke&&h.kd&&(l=1===b?h.kd:h.ke+b*(h.kd-h.ke),h.anchor&&this.set("center",cg(this,l,h.anchor)),this.set("resolution",
l));void 0!==h.Df&&void 0!==h.ne&&(b=1===b?wa(h.ne+Math.PI,2*Math.PI)-Math.PI:h.Df+b*(h.ne-h.Df),h.anchor&&this.set("center",dg(this,b,h.anchor)),this.set("rotation",b));b=!0;if(!h.complete)break}}e&&(this.c[c]=null,bg(this,0,-1),(d=d[0].callback)&&d(!0))}this.c=this.c.filter(Boolean);b&&void 0===this.o&&(this.o=requestAnimationFrame(this.Ff))}};function dg(a,b,c){var d=a.xa();if(void 0!==d){var e=[d[0]-c[0],d[1]-c[1]];Fe(e,b-a.Sa());ze(e,c)}return e}
function cg(a,b,c){var d,e=a.xa();a=a.Pa();void 0!==e&&void 0!==a&&(d=[c[0]-b*(c[0]-e[0])/a,c[1]-b*(c[1]-e[1])/a]);return d}function eg(a){var b=[100,100];a='.ol-viewport[data-view="'+x(a)+'"]';if(a=document.querySelector(a))a=getComputedStyle(a),b[0]=parseInt(a.width,10),b[1]=parseInt(a.height,10);return b}k.Sc=function(a){return this.l.center(a)};k.constrainResolution=function(a,b,c){return this.l.resolution(a,b||0,c||0)};k.constrainRotation=function(a,b){return this.l.rotation(a,b||0)};k.xa=function(){return this.get("center")};
k.qd=function(a){a=a||eg(this);var b=this.xa();oa(b,1);var c=this.Pa();oa(void 0!==c,2);var d=this.Sa();oa(void 0!==d,3);return fb(b,c,d,a)};k.sn=function(){return this.a};k.vn=function(){return this.i};k.tn=function(){return this.Me(this.i)};k.Cq=function(a){Vf(this,$f(this,{maxZoom:a}))};k.wn=function(){return this.Me(this.a)};k.Dq=function(a){Vf(this,$f(this,{minZoom:a}))};k.xn=function(){return this.v};k.Pa=function(){return this.get("resolution")};k.yn=function(){return this.j};
k.Je=function(a,b){b=b||eg(this);return Math.max(cb(a)/b[0],db(a)/b[1])};function fg(a){var b=a.a,c=Math.log(b/a.i)/Math.log(2);return function(a){return b/Math.pow(2,a*c)}}k.Sa=function(){return this.get("rotation")};function gg(a){var b=a.a,c=Math.log(b/a.i)/Math.log(2);return function(a){return Math.log(b/a)/Math.log(2)/c}}k.getState=function(){var a=this.xa(),b=this.v,c=this.Pa(),d=this.Sa();return{center:a.slice(),projection:void 0!==b?b:null,resolution:c,rotation:d,zoom:this.lg()}};
k.lg=function(){var a,b=this.Pa();void 0!==b&&(a=this.Me(b));return a};k.Me=function(a){var b=this.s||0,c;if(this.j){b=c=fc(this.j,a,1);var d=this.j[c];c=c==this.j.length-1?2:d/this.j[c+1]}else d=this.a,c=this.D;return b+Math.log(d/a)/Math.log(c)};k.$h=function(a){return this.constrainResolution(this.a,a-this.s,0)};
k.Uf=function(a,b){b=b||{};var c=b.size;c||(c=eg(this));if(a instanceof hf)if("Circle"===a.S()){a=a.G();var d=Rf(a);d.rotate(this.Sa(),eb(a))}else d=a;else oa(Array.isArray(a),24),oa(!bb(a),25),d=Rf(a);var e=void 0!==b.padding?b.padding:[0,0,0,0],f=void 0!==b.constrainResolution?b.constrainResolution:!0,g=void 0!==b.nearest?b.nearest:!1,h;void 0!==b.minResolution?h=b.minResolution:void 0!==b.maxZoom?h=this.constrainResolution(this.a,b.maxZoom-this.s,0):h=0;var l=d.da(),m=this.Sa();a=Math.cos(-m);
m=Math.sin(-m);var n=Infinity,p=Infinity,q=-Infinity,r=-Infinity;d=d.pa();for(var u=0,v=l.length;u<v;u+=d){var z=l[u]*a-l[u+1]*m,A=l[u]*m+l[u+1]*a;n=Math.min(n,z);p=Math.min(p,A);q=Math.max(q,z);r=Math.max(r,A)}c=this.Je([n,p,q,r],[c[0]-e[1]-e[3],c[1]-e[0]-e[2]]);c=isNaN(c)?h:Math.max(c,h);f&&(h=this.constrainResolution(c,0,0),!g&&h<c&&(h=this.constrainResolution(h,-1,0)),c=h);m=-m;h=(n+q)/2+(e[1]-e[3])/2*c;e=(p+r)/2+(e[0]-e[2])/2*c;a=[h*a-e*m,e*a+h*m];e=b.callback?b.callback:ea;void 0!==b.duration?
this.animate({resolution:c,center:a,duration:b.duration,easing:b.easing},e):(this.gd(c),this.ub(a),setTimeout(e.bind(void 0,!0),0))};k.Nk=function(a,b,c){var d=this.Sa(),e=Math.cos(-d);d=Math.sin(-d);var f=a[0]*e-a[1]*d;a=a[1]*e+a[0]*d;var g=this.Pa();f+=(b[0]/2-c[0])*g;a+=(c[1]-b[1]/2)*g;d=-d;this.ub([f*e-a*d,a*e+f*d])};function ag(a){return!!a.xa()&&void 0!==a.Pa()}k.rotate=function(a,b){void 0!==b&&(b=dg(this,a,b),this.ub(b));this.ce(a)};k.ub=function(a){this.set("center",a);this.Ac()&&this.rd()};
function bg(a,b,c){a.f[b]+=c;a.u()}k.gd=function(a){this.set("resolution",a);this.Ac()&&this.rd()};k.ce=function(a){this.set("rotation",a);this.Ac()&&this.rd()};k.Tj=function(a){this.gd(this.$h(a))};function hg(a,b){var c=document.createElement("CANVAS");a&&(c.width=a);b&&(c.height=b);return c.getContext("2d")}function ig(a,b){var c=b.parentNode;c&&c.replaceChild(a,b)}function jg(a){a&&a.parentNode&&a.parentNode.removeChild(a)};function kg(a){Vc.call(this);var b=kb({},a);b.opacity=void 0!==a.opacity?a.opacity:1;b.visible=void 0!==a.visible?a.visible:!0;b.zIndex=void 0!==a.zIndex?a.zIndex:0;b.maxResolution=void 0!==a.maxResolution?a.maxResolution:Infinity;b.minResolution=void 0!==a.minResolution?a.minResolution:0;this.H(b);this.a={layer:this,Te:!0}}w(kg,Vc);k=kg.prototype;k.S=function(){return this.type};
function lg(a){a.a.opacity=pa(a.nc(),0,1);a.a.Vj=a.hg();a.a.visible=a.Jb();a.a.extent=a.G();a.a.zIndex=a.Ba();a.a.maxResolution=a.lc();a.a.minResolution=Math.max(a.mc(),0);return a.a}k.G=function(){return this.get("extent")};k.lc=function(){return this.get("maxResolution")};k.mc=function(){return this.get("minResolution")};k.nc=function(){return this.get("opacity")};k.Jb=function(){return this.get("visible")};k.Ba=function(){return this.get("zIndex")};k.Fc=function(a){this.set("extent",a)};
k.Mc=function(a){this.set("maxResolution",a)};k.Nc=function(a){this.set("minResolution",a)};k.Gc=function(a){this.set("opacity",a)};k.Hc=function(a){this.set("visible",a)};k.$b=function(a){this.set("zIndex",a)};function mg(a){var b=a||{};a=kb({},b);delete a.layers;b=b.layers;kg.call(this,a);this.i=[];this.c={};y(this,Xc(ng),this.im,this);b?Array.isArray(b)?b=new B(b.slice(),{unique:!0}):oa(b instanceof B,43):b=new B(void 0,{unique:!0});this.Qi(b)}w(mg,kg);k=mg.prototype;k.Pe=function(){this.u()};
k.im=function(){this.i.forEach(Gc);this.i.length=0;var a=this.Cd();this.i.push(y(a,"add",this.hm,this),y(a,"remove",this.jm,this));for(var b in this.c)this.c[b].forEach(Gc);lb(this.c);a=a.a;var c;b=0;for(c=a.length;b<c;b++){var d=a[b];this.c[x(d).toString()]=[y(d,"propertychange",this.Pe,this),y(d,"change",this.Pe,this)]}this.u()};k.hm=function(a){a=a.element;var b=x(a).toString();this.c[b]=[y(a,"propertychange",this.Pe,this),y(a,"change",this.Pe,this)];this.u()};
k.jm=function(a){a=x(a.element).toString();this.c[a].forEach(Gc);delete this.c[a];this.u()};k.Cd=function(){return this.get(ng)};k.Qi=function(a){this.set(ng,a)};
k.dg=function(a){var b=void 0!==a?a:[],c=b.length;this.Cd().forEach(function(a){a.dg(b)});a=lg(this);var d;for(d=b.length;c<d;c++){var e=b[c];e.opacity*=a.opacity;e.visible=e.visible&&a.visible;e.maxResolution=Math.min(e.maxResolution,a.maxResolution);e.minResolution=Math.max(e.minResolution,a.minResolution);void 0!==a.extent&&(e.extent=void 0!==e.extent?gb(e.extent,a.extent):a.extent)}return b};k.hg=function(){return"ready"};var ng="layers";var og=[],pg=[];function qg(a,b){switch(a){case "MAP_RENDERER":a=og;a.push(b);break;case "LAYER_RENDERER":a=pg;a.push(b);break;default:throw Error("Unsupported plugin type: "+a);}}function rg(a){for(var b=0,c=a.length;b<c;++b)qg("LAYER_RENDERER",a[b])};function G(a){Vc.call(this);var b=sg(a);this.ob=void 0!==a.loadTilesWhileAnimating?a.loadTilesWhileAnimating:!1;this.sc=void 0!==a.loadTilesWhileInteracting?a.loadTilesWhileInteracting:!1;this.ra=void 0!==a.pixelRatio?a.pixelRatio:nd;this.Md=b.logos;this.V=function(){this.j=void 0;this.pq.call(this)}.bind(this);this.La=We();this.If=We();this.bb=0;this.D=this.C=this.B=this.f=this.c=null;this.a=document.createElement("DIV");this.a.className="ol-viewport"+(sd?" ol-touch":"");this.a.style.position="relative";
this.a.style.overflow="hidden";this.a.style.width="100%";this.a.style.height="100%";this.a.style.msTouchAction="none";this.a.style.touchAction="none";this.o=document.createElement("DIV");this.o.className="ol-overlaycontainer";this.a.appendChild(this.o);this.v=document.createElement("DIV");this.v.className="ol-overlaycontainer-stopevent";for(var c="click dblclick mousedown touchstart MSPointerDown pointerdown mousewheel wheel".split(" "),d=0,e=c.length;d<e;++d)y(this.v,c[d],Rc);this.a.appendChild(this.v);
this.ca=new be(this,a.moveTolerance);for(var f in zd)y(this.ca,zd[f],this.bi,this);this.$=b.keyboardEventTarget;this.s=null;y(this.a,"wheel",this.yd,this);y(this.a,"mousewheel",this.yd,this);this.controls=b.controls||new B;this.interactions=b.interactions||new B;this.l=b.overlays;this.Fg={};this.pc=b.Im.create(this.a,this);this.T=null;this.Ea=[];this.ua=new le(this.Tl.bind(this),this.zm.bind(this));this.O={};y(this,Xc("layergroup"),this.fm,this);y(this,Xc("view"),this.Am,this);y(this,Xc("size"),this.um,
this);y(this,Xc("target"),this.ym,this);this.H(b.values);this.controls.forEach(function(a){a.setMap(this)},this);y(this.controls,"add",function(a){a.element.setMap(this)},this);y(this.controls,"remove",function(a){a.element.setMap(null)},this);this.interactions.forEach(function(a){a.setMap(this)},this);y(this.interactions,"add",function(a){a.element.setMap(this)},this);y(this.interactions,"remove",function(a){a.element.setMap(null)},this);this.l.forEach(this.zh,this);y(this.l,"add",function(a){this.zh(a.element)},
this);y(this.l,"remove",function(a){var b=a.element.id;void 0!==b&&delete this.Fg[b.toString()];a.element.setMap(null)},this)}w(G,Vc);k=G.prototype;k.Mf=function(a){this.controls.push(a)};k.Nf=function(a){this.interactions.push(a)};k.xe=function(a){this.hc().Cd().push(a)};k.ye=function(a){this.l.push(a)};k.zh=function(a){var b=a.id;void 0!==b&&(this.Fg[b.toString()]=a);a.setMap(this)};
k.ia=function(){Pc(this.ca);Mc(this.a,"wheel",this.yd,this);Mc(this.a,"mousewheel",this.yd,this);void 0!==this.i&&(window.removeEventListener("resize",this.i,!1),this.i=void 0);this.j&&(cancelAnimationFrame(this.j),this.j=void 0);this.Ad(null);Vc.prototype.ia.call(this)};k.Tc=function(a,b,c){if(this.c)return a=this.Ra(a),c=void 0!==c?c:{},this.pc.wa(a,this.c,void 0!==c.hitTolerance?c.hitTolerance*this.c.pixelRatio:0,b,null,void 0!==c.layerFilter?c.layerFilter:Re,null)};
k.Xf=function(a,b){var c=null;this.Tc(a,function(a){c||(c=[]);c.push(a)},b);return c};k.tg=function(a,b,c,d,e){if(this.c)return this.pc.Ti(a,this.c,b,void 0!==c?c:null,void 0!==d?d:Re,void 0!==e?e:null)};k.ng=function(a,b){if(!this.c)return!1;a=this.Ra(a);b=void 0!==b?b:{};return this.pc.Ui(a,this.c,void 0!==b.hitTolerance?b.hitTolerance*this.c.pixelRatio:0,void 0!==b.layerFilter?b.layerFilter:Re,null)};k.Sd=function(a){return this.Ra(this.ud(a))};
k.ud=function(a){var b=this.a.getBoundingClientRect();a=a.changedTouches?a.changedTouches[0]:a;return[a.clientX-b.left,a.clientY-b.top]};k.Xd=function(){return this.get("target")};k.Cc=function(){var a=this.Xd();return void 0!==a?"string"===typeof a?document.getElementById(a):a:null};k.Ra=function(a){var b=this.c;return b?af(b.pixelToCoordinateTransform,a.slice()):null};k.Wf=function(){return this.controls};k.gg=function(){return this.l};
k.fg=function(a){a=this.Fg[a.toString()];return void 0!==a?a:null};k.bg=function(){return this.interactions};k.hc=function(){return this.get("layergroup")};k.Xe=function(){return this.hc().Cd()};k.Ia=function(a){var b=this.c;return b?af(b.coordinateToPixelTransform,a.slice(0,2)):null};k.Ie=function(){return this.pc};k.Cb=function(){return this.get("size")};k.aa=function(){return this.get("view")};k.kg=function(){return this.a};
k.Tl=function(a,b,c,d){var e=this.c;if(!(e&&b in e.wantedTiles&&e.wantedTiles[b][a.lb()]))return Infinity;a=c[0]-e.focus[0];c=c[1]-e.focus[1];return 65536*Math.log(d)+Math.sqrt(a*a+c*c)/d};k.yd=function(a,b){a=new ed(b||a.type,this,a);this.bi(a)};k.bi=function(a){if(this.c){this.T=a.coordinate;a.frameState=this.c;var b=this.interactions.a,c;if(!1!==this.b(a))for(c=b.length-1;0<=c;c--){var d=b[c];if(d.c()&&!d.handleEvent(a))break}}};
k.sm=function(){var a=this.c,b=this.ua;if(0!==b.b.length){var c=16,d=c;if(a){var e=a.viewHints;e[0]&&(c=this.ob?8:0,d=2);e[1]&&(c=this.sc?8:0,d=2)}b.j<c&&(ke(b),me(b,c,d))}b=this.Ea;c=0;for(d=b.length;c<d;++c)b[c](this,a);b.length=0};k.um=function(){this.render()};
k.ym=function(){var a;this.Xd()&&(a=this.Cc());if(this.s){for(var b=0,c=this.s.length;b<c;++b)Gc(this.s[b]);this.s=null}if(a){a.appendChild(this.a);var d=this.$?this.$:a;this.s=[y(d,"keydown",this.yd,this),y(d,"keypress",this.yd,this)];this.i||(this.i=this.Oc.bind(this),window.addEventListener("resize",this.i,!1))}else{a=this.pc;for(d in a.c)Pc(tg(a,d));jg(this.a);void 0!==this.i&&(window.removeEventListener("resize",this.i,!1),this.i=void 0)}this.Oc()};k.zm=function(){this.render()};k.ei=function(){this.render()};
k.Am=function(){this.B&&(Gc(this.B),this.B=null);this.C&&(Gc(this.C),this.C=null);var a=this.aa();a&&(this.a.setAttribute("data-view",x(a)),this.B=y(a,"propertychange",this.ei,this),this.C=y(a,"change",this.ei,this));this.render()};k.fm=function(){this.D&&(this.D.forEach(Gc),this.D=null);var a=this.hc();a&&(this.D=[y(a,"propertychange",this.render,this),y(a,"change",this.render,this)]);this.render()};k.dh=function(){this.j&&cancelAnimationFrame(this.j);this.V()};
k.render=function(){void 0===this.j&&(this.j=requestAnimationFrame(this.V))};k.Xg=function(a){return this.controls.remove(a)};k.Zg=function(a){return this.interactions.remove(a)};k.$g=function(a){return this.hc().Cd().remove(a)};k.ah=function(a){return this.l.remove(a)};
k.pq=function(){var a=Date.now(),b,c=this.Cb(),d=this.aa(),e=Da(),f=this.c,g=null;if(void 0!==c&&0<c[0]&&0<c[1]&&d&&ag(d)){g=this.c?this.c.viewHints:void 0;void 0!==g?(g[0]=d.f[0],g[1]=d.f[1]):g=d.f.slice();var h=this.hc().dg(),l={};var m=0;for(b=h.length;m<b;++m)l[x(h[m].layer)]=h[m];m=d.getState();d=m.center;b=m.resolution/this.ra;d[0]=Math.round(d[0]/b)*b;d[1]=Math.round(d[1]/b)*b;g={animate:!1,coordinateToPixelTransform:this.La,extent:e,focus:this.T?this.T:d,index:this.bb++,layerStates:l,layerStatesArray:h,
logos:kb({},this.Md),pixelRatio:this.ra,pixelToCoordinateTransform:this.If,postRenderFunctions:[],size:c,skippedFeatureUids:this.O,tileQueue:this.ua,time:a,usedTiles:{},viewState:m,viewHints:g,wantedTiles:{}}}g&&(g.extent=fb(m.center,m.resolution,m.rotation,g.size,e));this.c=g;this.pc.bh(g);g&&(g.animate&&this.render(),Array.prototype.push.apply(this.Ea,g.postRenderFunctions),!f||this.f&&(bb(this.f)||Sa(g.extent,this.f))||(this.b(new dd("movestart",this,f)),this.f=Oa(this.f)),!this.f||g.viewHints[0]||
g.viewHints[1]||Sa(g.extent,this.f)||(this.b(new dd("moveend",this,g)),Ga(g.extent,this.f)));this.b(new dd("postrender",this,g));setTimeout(this.sm.bind(this),0)};k.zf=function(a){this.set("layergroup",a)};k.be=function(a){this.set("size",a)};k.Ad=function(a){this.set("target",a)};k.jh=function(a){this.set("view",a)};k.Uj=function(a){a=x(a).toString();this.O[a]=!0;this.render()};
k.Oc=function(){var a=this.Cc();if(a){var b=getComputedStyle(a);this.be([a.offsetWidth-parseFloat(b.borderLeftWidth)-parseFloat(b.paddingLeft)-parseFloat(b.paddingRight)-parseFloat(b.borderRightWidth),a.offsetHeight-parseFloat(b.borderTopWidth)-parseFloat(b.paddingTop)-parseFloat(b.paddingBottom)-parseFloat(b.borderBottomWidth)])}else this.be(void 0)};k.Zj=function(a){a=x(a).toString();delete this.O[a];this.render()};var ug=["canvas","webgl"];
function sg(a){var b=null;void 0!==a.keyboardEventTarget&&(b="string"===typeof a.keyboardEventTarget?document.getElementById(a.keyboardEventTarget):a.keyboardEventTarget);var c={},d={};if(void 0===a.logo||"boolean"===typeof a.logo&&a.logo)d["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAAHGAAABxgEXwfpGAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAhNQTFRF////AP//AICAgP//AFVVQECA////K1VVSbbbYL/fJ05idsTYJFtbbcjbJllmZszWWMTOIFhoHlNiZszTa9DdUcHNHlNlV8XRIVdiasrUHlZjIVZjaMnVH1RlIFRkH1RkH1ZlasvYasvXVsPQH1VkacnVa8vWIVZjIFRjVMPQa8rXIVVkXsXRsNveIFVkIFZlIVVj3eDeh6GmbMvXH1ZkIFRka8rWbMvXIFVkIFVjIFVkbMvWH1VjbMvWIFVlbcvWIFVla8vVIFVkbMvWbMvVH1VkbMvWIFVlbcvWIFVkbcvVbMvWjNPbIFVkU8LPwMzNIFVkbczWIFVkbsvWbMvXIFVkRnB8bcvW2+TkW8XRIFVkIlZlJVloJlpoKlxrLl9tMmJwOWd0Omh1RXF8TneCT3iDUHiDU8LPVMLPVcLPVcPQVsPPVsPQV8PQWMTQWsTQW8TQXMXSXsXRX4SNX8bSYMfTYcfTYsfTY8jUZcfSZsnUaIqTacrVasrVa8jTa8rWbI2VbMvWbcvWdJObdcvUdszUd8vVeJaee87Yfc3WgJyjhqGnitDYjaarldPZnrK2oNbborW5o9bbo9fbpLa6q9ndrL3ArtndscDDutzfu8fJwN7gwt7gxc/QyuHhy+HizeHi0NfX0+Pj19zb1+Tj2uXk29/e3uLg3+Lh3+bl4uXj4ufl4+fl5Ofl5ufl5ujm5+jmySDnBAAAAFp0Uk5TAAECAgMEBAYHCA0NDg4UGRogIiMmKSssLzU7PkJJT1JTVFliY2hrdHZ3foSFhYeJjY2QkpugqbG1tre5w8zQ09XY3uXn6+zx8vT09vf4+Pj5+fr6/P39/f3+gz7SsAAAAVVJREFUOMtjYKA7EBDnwCPLrObS1BRiLoJLnte6CQy8FLHLCzs2QUG4FjZ5GbcmBDDjxJBXDWxCBrb8aM4zbkIDzpLYnAcE9VXlJSWlZRU13koIeW57mGx5XjoMZEUqwxWYQaQbSzLSkYGfKFSe0QMsX5WbjgY0YS4MBplemI4BdGBW+DQ11eZiymfqQuXZIjqwyadPNoSZ4L+0FVM6e+oGI6g8a9iKNT3o8kVzNkzRg5lgl7p4wyRUL9Yt2jAxVh6mQCogae6GmflI8p0r13VFWTHBQ0rWPW7ahgWVcPm+9cuLoyy4kCJDzCm6d8PSFoh0zvQNC5OjDJhQopPPJqph1doJBUD5tnkbZiUEqaCnB3bTqLTFG1bPn71kw4b+GFdpLElKIzRxxgYgWNYc5SCENVHKeUaltHdXx0dZ8uBI1hJ2UUDgq82CM2MwKeibqAvSO7MCABq0wXEPiqWEAAAAAElFTkSuQmCC"]=
"https://openlayers.org/";else{var e=a.logo;"string"===typeof e?d[e]="":e instanceof HTMLElement?d[x(e).toString()]=e:e&&(oa("string"==typeof e.href,44),oa("string"==typeof e.src,45),d[e.src]=e.href)}e=a.layers instanceof mg?a.layers:new mg({layers:a.layers});c.layergroup=e;c.target=a.target;c.view=void 0!==a.view?a.view:new F;var f;void 0!==a.renderer?(Array.isArray(a.renderer)?f=a.renderer:"string"===typeof a.renderer?f=[a.renderer]:oa(!1,46),0<=f.indexOf("dom")&&(f=f.concat(ug))):f=ug;e=0;var g=
f.length;a:for(;e<g;++e)for(var h=f[e],l=0,m=og.length;l<m;++l){var n=og[l];if(n.handles(h)){var p=n;break a}}if(!p)throw Error("Unable to create a map renderer for types: "+f.join(", "));if(void 0!==a.controls)if(Array.isArray(a.controls))var q=new B(a.controls.slice());else oa(a.controls instanceof B,47),q=a.controls;if(void 0!==a.interactions)if(Array.isArray(a.interactions))var r=new B(a.interactions.slice());else oa(a.interactions instanceof B,48),r=a.interactions;void 0!==a.overlays?Array.isArray(a.overlays)?
a=new B(a.overlays.slice()):(oa(a.overlays instanceof B,49),a=a.overlays):a=new B;return{controls:q,interactions:r,keyboardEventTarget:b,logos:d,overlays:a,Im:p,values:c}};function vg(a){Vc.call(this);this.element=a.element?a.element:null;this.a=this.T=null;this.s=[];this.render=a.render?a.render:ea;a.target&&this.i(a.target)}w(vg,Vc);vg.prototype.ia=function(){jg(this.element);Vc.prototype.ia.call(this)};vg.prototype.f=function(){return this.a};
vg.prototype.setMap=function(a){this.a&&jg(this.element);for(var b=0,c=this.s.length;b<c;++b)Gc(this.s[b]);this.s.length=0;if(this.a=a)(this.T?this.T:a.v).appendChild(this.element),this.render!==ea&&this.s.push(y(a,"postrender",this.render,this)),a.render()};vg.prototype.i=function(a){this.T="string"===typeof a?document.getElementById(a):a};var wg=function(){var a,b={};return function(c){a||(a=document.createElement("div").style);if(!(c in b)){a.font=c;var d=a.fontFamily;a.font="";if(!d)return null;b[c]=d.split(/,\s?/)}return b[c]}}();function xg(a){var b=kb({},a);delete b.source;kg.call(this,b);this.o=this.v=this.s=null;a.map&&this.setMap(a.map);y(this,Xc("source"),this.wm,this);this.hd(a.source?a.source:null)}w(xg,kg);function yg(a,b){return a.visible&&b>=a.minResolution&&b<a.maxResolution}k=xg.prototype;k.dg=function(a){a=a?a:[];a.push(lg(this));return a};k.ha=function(){return this.get("source")||null};k.hg=function(){var a=this.ha();return a?a.getState():"undefined"};k.yo=function(){this.u()};
k.wm=function(){this.o&&(Gc(this.o),this.o=null);var a=this.ha();a&&(this.o=y(a,"change",this.yo,this));this.u()};k.setMap=function(a){this.s&&(Gc(this.s),this.s=null);a||this.u();this.v&&(Gc(this.v),this.v=null);a&&(this.s=y(a,"precompose",function(a){var b=lg(this);b.Te=!1;b.zIndex=Infinity;a.frameState.layerStatesArray.push(b);a.frameState.layerStates[x(this)]=b},this),this.v=y(this,"change",a.render,a),this.u())};k.hd=function(a){this.set("source",a)};function zg(a){a=a?a:{};this.v=document.createElement("UL");this.l=document.createElement("LI");this.v.appendChild(this.l);this.l.style.display="none";this.c=void 0!==a.collapsed?a.collapsed:!0;this.j=void 0!==a.collapsible?a.collapsible:!0;this.j||(this.c=!1);var b=void 0!==a.className?a.className:"ol-attribution",c=void 0!==a.tipLabel?a.tipLabel:"Attributions",d=void 0!==a.collapseLabel?a.collapseLabel:"\u00bb";"string"===typeof d?(this.o=document.createElement("span"),this.o.textContent=d):this.o=
d;d=void 0!==a.label?a.label:"i";"string"===typeof d?(this.D=document.createElement("span"),this.D.textContent=d):this.D=d;var e=this.j&&!this.c?this.o:this.D;d=document.createElement("button");d.setAttribute("type","button");d.title=c;d.appendChild(e);y(d,"click",this.Bn,this);c=document.createElement("div");c.className=b+" ol-unselectable ol-control"+(this.c&&this.j?" ol-collapsed":"")+(this.j?"":" ol-uncollapsible");c.appendChild(this.v);c.appendChild(d);vg.call(this,{element:c,render:a.render?
a.render:Ag,target:a.target});this.B=[];this.C=!0;this.O={}}w(zg,vg);
function Ag(a){if(a=a.frameState){for(var b={},c=[],d=a.layerStatesArray,e=a.viewState.resolution,f=0,g=d.length;f<g;++f){var h=d[f];if(yg(h,e)&&(h=h.layer.ha())&&(h=h.C)&&(h=h(a)))if(Array.isArray(h))for(var l=0,m=h.length;l<m;++l)h[l]in b||(c.push(h[l]),b[h[l]]=!0);else h in b||(c.push(h),b[h]=!0)}if(!jc(c,this.B)){for(;this.v.lastChild!==this.l;)this.v.removeChild(this.v.lastChild);b=0;for(d=c.length;b<d;++b)e=document.createElement("LI"),e.innerHTML=c[b],this.v.appendChild(e);0===c.length&&0<
this.B.length?this.element.classList.add("ol-logo-only"):0===this.B.length&&0<c.length&&this.element.classList.remove("ol-logo-only");b=0<c.length||!nb(a.logos);this.C!=b&&(this.element.style.display=b?"":"none",this.C=b);this.B=c;a=a.logos;c=this.O;for(p in c)p in a||(jg(c[p]),delete c[p]);for(var n in a)if(d=a[n],d instanceof HTMLElement&&(this.l.appendChild(d),c[n]=d),!(n in c)){var p=new Image;p.src=n;""===d?b=p:(b=document.createElement("a"),b.href=d,b.appendChild(p));this.l.appendChild(b);c[n]=
b}this.l.style.display=nb(a)?"none":""}}else this.C&&(this.element.style.display="none",this.C=!1)}k=zg.prototype;k.Bn=function(a){a.preventDefault();Bg(this)};function Bg(a){a.element.classList.toggle("ol-collapsed");a.c?ig(a.o,a.D):ig(a.D,a.o);a.c=!a.c}k.An=function(){return this.j};k.Dn=function(a){this.j!==a&&(this.j=a,this.element.classList.toggle("ol-uncollapsible"),!a&&this.c&&Bg(this))};k.Cn=function(a){this.j&&this.c!==a&&Bg(this)};k.zn=function(){return this.c};function Cg(a){a=a?a:{};var b=void 0!==a.className?a.className:"ol-rotate",c=void 0!==a.label?a.label:"\u21e7";this.c=null;"string"===typeof c?(this.c=document.createElement("span"),this.c.className="ol-compass",this.c.textContent=c):(this.c=c,this.c.classList.add("ol-compass"));var d=a.tipLabel?a.tipLabel:"Reset rotation";c=document.createElement("button");c.className=b+"-reset";c.setAttribute("type","button");c.title=d;c.appendChild(this.c);y(c,"click",Cg.prototype.D,this);d=document.createElement("div");
d.className=b+" ol-unselectable ol-control";d.appendChild(c);b=a.render?a.render:Dg;this.l=a.resetNorth?a.resetNorth:void 0;vg.call(this,{element:d,render:b,target:a.target});this.v=void 0!==a.duration?a.duration:250;this.j=void 0!==a.autoHide?a.autoHide:!0;this.o=void 0;this.j&&this.element.classList.add("ol-hidden")}w(Cg,vg);Cg.prototype.D=function(a){a.preventDefault();void 0!==this.l?this.l():(a=this.a.aa())&&void 0!==a.Sa()&&(0<this.v?a.animate({rotation:0,duration:this.v,easing:Oe}):a.ce(0))};
function Dg(a){if(a=a.frameState){a=a.viewState.rotation;if(a!=this.o){var b="rotate("+a+"rad)";if(this.j){var c=this.element.classList.contains("ol-hidden");c||0!==a?c&&0!==a&&this.element.classList.remove("ol-hidden"):this.element.classList.add("ol-hidden")}this.c.style.msTransform=b;this.c.style.webkitTransform=b;this.c.style.transform=b}this.o=a}};function Eg(a){a=a?a:{};var b=void 0!==a.className?a.className:"ol-zoom",c=void 0!==a.delta?a.delta:1,d=void 0!==a.zoomInLabel?a.zoomInLabel:"+",e=void 0!==a.zoomOutLabel?a.zoomOutLabel:"\u2212",f=void 0!==a.zoomInTipLabel?a.zoomInTipLabel:"Zoom in",g=void 0!==a.zoomOutTipLabel?a.zoomOutTipLabel:"Zoom out",h=document.createElement("button");h.className=b+"-in";h.setAttribute("type","button");h.title=f;h.appendChild("string"===typeof d?document.createTextNode(d):d);y(h,"click",Eg.prototype.j.bind(this,
c));d=document.createElement("button");d.className=b+"-out";d.setAttribute("type","button");d.title=g;d.appendChild("string"===typeof e?document.createTextNode(e):e);y(d,"click",Eg.prototype.j.bind(this,-c));c=document.createElement("div");c.className=b+" ol-unselectable ol-control";c.appendChild(h);c.appendChild(d);vg.call(this,{element:c,target:a.target});this.c=void 0!==a.duration?a.duration:250}w(Eg,vg);
Eg.prototype.j=function(a,b){b.preventDefault();if(b=this.a.aa()){var c=b.Pa();c&&(a=b.constrainResolution(c,a),0<this.c?(b.Ac()&&b.rd(),b.animate({resolution:a,duration:this.c,easing:Oe})):b.gd(a))}};function Fg(a){a=a?a:{};var b=new B;(void 0!==a.zoom?a.zoom:1)&&b.push(new Eg(a.zoomOptions));(void 0!==a.rotate?a.rotate:1)&&b.push(new Cg(a.rotateOptions));(void 0!==a.attribution?a.attribution:1)&&b.push(new zg(a.attributionOptions));return b};function Gg(a,b,c){this.i=a;this.c=b;this.f=c;this.b=[];this.a=this.g=0}function Hg(a){a.b.length=0;a.g=0;a.a=0}function Ig(a){if(6>a.b.length)return!1;var b=Date.now()-a.f,c=a.b.length-3;if(a.b[c+2]<b)return!1;for(var d=c-3;0<d&&a.b[d+2]>b;)d-=3;b=a.b[c+2]-a.b[d+2];if(b<1E3/60)return!1;var e=a.b[c]-a.b[d];c=a.b[c+1]-a.b[d+1];a.g=Math.atan2(c,e);a.a=Math.sqrt(e*e+c*c)/b;return a.a>a.c};function Jg(a){Vc.call(this);this.v=null;this.Ha(!0);this.handleEvent=a.handleEvent}w(Jg,Vc);Jg.prototype.c=function(){return this.get("active")};Jg.prototype.i=function(){return this.v};Jg.prototype.Ha=function(a){this.set("active",a)};Jg.prototype.setMap=function(a){this.v=a};function Kg(a,b,c,d){if(void 0!==b){var e=a.Sa(),f=a.xa();void 0!==e&&f&&0<d?a.animate({rotation:b,anchor:c,duration:d,easing:Oe}):a.rotate(b,c)}}
function Lg(a,b,c,d){var e=a.Pa();b=a.constrainResolution(e,b,0);if(void 0!==b){var f=a.j;b=pa(b,a.i||f[f.length-1],a.a||f[0])}c&&void 0!==b&&b!==e&&(f=a.xa(),c=cg(a,b,c),c=a.Sc(c),c=[(b*f[0]-e*c[0])/(b-e),(b*f[1]-e*c[1])/(b-e)]);Tg(a,b,c,d)}function Tg(a,b,c,d){if(b){var e=a.Pa(),f=a.xa();void 0!==e&&f&&b!==e&&d?a.animate({resolution:b,anchor:c,duration:d,easing:Oe}):(c&&(c=cg(a,b,c),a.ub(c)),a.gd(b))}};function Ug(a){a=a?a:{};this.a=a.delta?a.delta:1;Jg.call(this,{handleEvent:Vg});this.f=void 0!==a.duration?a.duration:250}w(Ug,Jg);function Vg(a){var b=!1,c=a.originalEvent;if("dblclick"==a.type){b=a.coordinate;c=c.shiftKey?-this.a:this.a;var d=a.map.aa();Lg(d,c,b,this.f);a.preventDefault();b=!0}return!b};function Wg(a){a=a.originalEvent;return a.altKey&&!(a.metaKey||a.ctrlKey)&&!a.shiftKey}function Xg(a){a=a.originalEvent;return a.altKey&&!(a.metaKey||a.ctrlKey)&&a.shiftKey}function Yg(a){a=a.originalEvent;return 0==a.button&&!(ld&&md&&a.ctrlKey)}function Zg(a){return"pointermove"==a.type}function $g(a){return"singleclick"==a.type}function ah(a){a=a.originalEvent;return!a.altKey&&!(a.metaKey||a.ctrlKey)&&!a.shiftKey}
function bh(a){a=a.originalEvent;return!a.altKey&&!(a.metaKey||a.ctrlKey)&&a.shiftKey}function ch(a){a=a.originalEvent.target.tagName;return"INPUT"!==a&&"SELECT"!==a&&"TEXTAREA"!==a}function dh(a){oa(a.b,56);return"mouse"==a.b.pointerType}function eh(a){a=a.b;return a.isPrimary&&0===a.button};function fh(a){a=a?a:{};Jg.call(this,{handleEvent:a.handleEvent?a.handleEvent:gh});this.ck=a.handleDownEvent?a.handleDownEvent:Se;this.Ek=a.handleDragEvent?a.handleDragEvent:ea;this.Kk=a.handleMoveEvent?a.handleMoveEvent:ea;this.Lk=a.handleUpEvent?a.handleUpEvent:Se;this.D=!1;this.$={};this.l=[]}w(fh,Jg);function hh(a){for(var b=a.length,c=0,d=0,e=0;e<b;e++)c+=a[e].clientX,d+=a[e].clientY;return[c/b,d/b]}
function gh(a){if(!(a instanceof Ad))return!0;var b=!1,c=a.type;if("pointerdown"===c||"pointerdrag"===c||"pointerup"===c){c=a.b;var d=c.pointerId.toString();"pointerup"==a.type?delete this.$[d]:"pointerdown"==a.type?this.$[d]=c:d in this.$&&(this.$[d]=c);this.l=mb(this.$)}this.D?"pointerdrag"==a.type?this.Ek(a):"pointerup"==a.type&&(this.D=this.Lk(a)&&0<this.l.length):"pointerdown"==a.type?(this.D=a=this.ck(a),b=this.jd(a)):"pointermove"==a.type&&this.Kk(a);return!b}fh.prototype.jd=function(a){return a};function ih(a){fh.call(this,{handleDownEvent:jh,handleDragEvent:kh,handleUpEvent:lh});a=a?a:{};this.a=a.kinetic;this.f=null;this.o=a.condition?a.condition:ah;this.j=!1}w(ih,fh);function kh(a){var b=this.l,c=hh(b);if(b.length==this.s){if(this.a&&this.a.b.push(c[0],c[1],Date.now()),this.f){var d=this.f[0]-c[0],e=c[1]-this.f[1];a=a.map.aa();var f=a.getState();d=[d,e];Ge(d,f.resolution);Fe(d,f.rotation);ze(d,f.center);d=a.Sc(d);a.ub(d)}}else this.a&&Hg(this.a);this.f=c;this.s=b.length}
function lh(a){var b=a.map;a=b.aa();if(0===this.l.length){if(!this.j&&this.a&&Ig(this.a)){var c=this.a;c=(c.c-c.a)/c.i;var d=this.a.g,e=a.xa();e=b.Ia(e);b=b.Ra([e[0]-c*Math.cos(d),e[1]-c*Math.sin(d)]);a.animate({center:a.Sc(b),duration:500,easing:Oe})}bg(a,1,-1);return!1}this.a&&Hg(this.a);this.f=null;return!0}
function jh(a){if(0<this.l.length&&this.o(a)){var b=a.map.aa();this.f=null;this.D||bg(b,1,1);b.Ac()&&b.ub(a.frameState.viewState.center);this.a&&Hg(this.a);this.j=1<this.l.length;return!0}return!1}ih.prototype.jd=Se;function mh(a){a=a?a:{};fh.call(this,{handleDownEvent:nh,handleDragEvent:oh,handleUpEvent:ph});this.f=a.condition?a.condition:Xg;this.a=void 0;this.j=void 0!==a.duration?a.duration:250}w(mh,fh);function oh(a){if(dh(a)){var b=a.map,c=b.aa();if(c.l.rotation!==re){b=b.Cb();a=a.pixel;a=Math.atan2(b[1]/2-a[1],a[0]-b[0]/2);if(void 0!==this.a){b=a-this.a;var d=c.Sa();Kg(c,d-b)}this.a=a}}}
function ph(a){if(!dh(a))return!0;a=a.map.aa();bg(a,1,-1);var b=a.Sa(),c=this.j;b=a.constrainRotation(b,0);Kg(a,b,void 0,c);return!1}function nh(a){return dh(a)&&Yg(a)&&this.f(a)?(bg(a.map.aa(),1,1),this.a=void 0,!0):!1}mh.prototype.jd=Se;function qh(a){this.Uc=null;this.a=document.createElement("div");this.a.style.position="absolute";this.a.className="ol-box "+a;this.g=this.c=this.b=null}w(qh,Oc);qh.prototype.ia=function(){this.setMap(null)};function rh(a){var b=a.c,c=a.g;a=a.a.style;a.left=Math.min(b[0],c[0])+"px";a.top=Math.min(b[1],c[1])+"px";a.width=Math.abs(c[0]-b[0])+"px";a.height=Math.abs(c[1]-b[1])+"px"}
qh.prototype.setMap=function(a){if(this.b){this.b.o.removeChild(this.a);var b=this.a.style;b.left=b.top=b.width=b.height="inherit"}(this.b=a)&&this.b.o.appendChild(this.a)};function sh(a){var b=a.c,c=a.g;b=[b,[b[0],c[1]],c,[c[0],b[1]]].map(a.b.Ra,a.b);b[4]=b[0].slice();a.Uc?a.Uc.na([b]):a.Uc=new D([b])}qh.prototype.U=function(){return this.Uc};function th(a){fh.call(this,{handleDownEvent:uh,handleDragEvent:vh,handleUpEvent:wh});a=a?a:{};this.a=new qh(a.className||"ol-dragbox");this.o=void 0!==a.minArea?a.minArea:64;this.f=null;this.C=a.condition?a.condition:Re;this.s=a.boxEndCondition?a.boxEndCondition:xh}w(th,fh);function xh(a,b,c){a=c[0]-b[0];b=c[1]-b[1];return a*a+b*b>=this.o}function vh(a){if(dh(a)){var b=this.a,c=a.pixel;b.c=this.f;b.g=c;sh(b);rh(b);this.b(new yh(zh,a.coordinate,a))}}th.prototype.U=function(){return this.a.U()};
th.prototype.j=ea;function wh(a){if(!dh(a))return!0;this.a.setMap(null);this.s(a,this.f,a.pixel)&&(this.j(a),this.b(new yh(Ah,a.coordinate,a)));return!1}function uh(a){if(dh(a)&&Yg(a)&&this.C(a)){this.f=a.pixel;this.a.setMap(a.map);var b=this.a,c=this.f;b.c=this.f;b.g=c;sh(b);rh(b);this.b(new yh(Bh,a.coordinate,a));return!0}return!1}var Bh="boxstart",zh="boxdrag",Ah="boxend";function yh(a,b,c){Qc.call(this,a);this.coordinate=b;this.mapBrowserEvent=c}w(yh,Qc);function Ch(a){a=a?a:{};var b=a.condition?a.condition:bh;this.B=void 0!==a.duration?a.duration:200;this.T=void 0!==a.out?a.out:!1;th.call(this,{condition:b,className:a.className||"ol-dragzoom"})}w(Ch,th);
Ch.prototype.j=function(){var a=this.v,b=a.aa(),c=a.Cb(),d=this.U().G();if(this.T){var e=b.qd(c);d=[a.Ia(Wa(d)),a.Ia(Za(d))];a=Oa(void 0);var f;var g=0;for(f=d.length;g<f;++g)Ea(a,d[g]);d=b.Je(a,c);ib(e,1/d);d=e}c=b.constrainResolution(b.Je(d,c));e=eb(d);e=b.Sc(e);b.animate({resolution:c,center:e,duration:this.B,easing:Oe})};function Dh(a){Jg.call(this,{handleEvent:Eh});a=a||{};this.a=function(a){return ah(a)&&ch(a)};this.f=void 0!==a.condition?a.condition:this.a;this.j=void 0!==a.duration?a.duration:100;this.l=void 0!==a.pixelDelta?a.pixelDelta:128}w(Dh,Jg);
function Eh(a){var b=!1;if("keydown"==a.type){var c=a.originalEvent.keyCode;if(this.f(a)&&(40==c||37==c||39==c||38==c)){b=a.map.aa();var d=b.Pa()*this.l,e=0,f=0;40==c?f=-d:37==c?e=-d:39==c?e=d:f=d;d=[e,f];Fe(d,b.Sa());c=this.j;if(e=b.xa())d=b.Sc([e[0]+d[0],e[1]+d[1]]),c?b.animate({duration:c,easing:Qe,center:d}):b.ub(d);a.preventDefault();b=!0}}return!b};function Fh(a){Jg.call(this,{handleEvent:Gh});a=a?a:{};this.f=a.condition?a.condition:ch;this.a=a.delta?a.delta:1;this.j=void 0!==a.duration?a.duration:100}w(Fh,Jg);function Gh(a){var b=!1;if("keydown"==a.type||"keypress"==a.type){var c=a.originalEvent.charCode;!this.f(a)||43!=c&&45!=c||(b=43==c?this.a:-this.a,c=a.map.aa(),Lg(c,b,void 0,this.j),a.preventDefault(),b=!0)}return!b};function Hh(a){Jg.call(this,{handleEvent:Ih});a=a||{};this.j=0;this.D=void 0!==a.duration?a.duration:250;this.$=void 0!==a.timeout?a.timeout:80;this.C=void 0!==a.useAnchor?a.useAnchor:!0;this.O=a.constrainResolution||!1;this.a=null;this.s=this.l=this.o=this.f=void 0}w(Hh,Jg);
function Ih(a){var b=a.type;if("wheel"!==b&&"mousewheel"!==b)return!0;a.preventDefault();b=a.map;var c=a.originalEvent;this.C&&(this.a=a.coordinate);if("wheel"==a.type){var d=c.deltaY;jd&&c.deltaMode===WheelEvent.DOM_DELTA_PIXEL&&(d/=nd);c.deltaMode===WheelEvent.DOM_DELTA_LINE&&(d*=40)}else"mousewheel"==a.type&&(d=-c.wheelDeltaY,kd&&(d/=3));if(0===d)return!1;a=Date.now();void 0===this.f&&(this.f=a);if(!this.l||400<a-this.f)this.l=4>Math.abs(d)?Ph:Qh;if(this.l===Ph){b=b.aa();this.s?clearTimeout(this.s):
bg(b,1,1);this.s=setTimeout(this.B.bind(this),400);c=b.Pa()*Math.pow(2,d/300);var e=b.i,f=b.a,g=0;c<e?(c=Math.max(c,e/1.5),g=1):c>f&&(c=Math.min(c,1.5*f),g=-1);if(this.a){var h=cg(b,c,this.a);b.ub(b.Sc(h))}b.gd(c);0===g&&this.O&&b.animate({resolution:b.constrainResolution(c,0<d?-1:1),easing:Oe,anchor:this.a,duration:this.D});0<g?b.animate({resolution:e,easing:Oe,anchor:this.a,duration:500}):0>g&&b.animate({resolution:f,easing:Oe,anchor:this.a,duration:500});this.f=a;return!1}this.j+=d;d=Math.max(this.$-
(a-this.f),0);clearTimeout(this.o);this.o=setTimeout(this.T.bind(this,b),d);return!1}Hh.prototype.B=function(){this.s=void 0;bg(this.v.aa(),1,-1)};Hh.prototype.T=function(a){a=a.aa();a.Ac()&&a.rd();Lg(a,-pa(this.j,-1,1),this.a,this.D);this.l=void 0;this.j=0;this.a=null;this.o=this.f=void 0};Hh.prototype.V=function(a){this.C=a;a||(this.a=null)};var Ph="trackpad",Qh="wheel";function Rh(a){fh.call(this,{handleDownEvent:Sh,handleDragEvent:Th,handleUpEvent:Uh});a=a||{};this.f=null;this.j=void 0;this.a=!1;this.s=0;this.C=void 0!==a.threshold?a.threshold:.3;this.o=void 0!==a.duration?a.duration:250}w(Rh,fh);
function Th(a){var b=0,c=this.l[0],d=this.l[1];c=Math.atan2(d.clientY-c.clientY,d.clientX-c.clientX);void 0!==this.j&&(b=c-this.j,this.s+=b,!this.a&&Math.abs(this.s)>this.C&&(this.a=!0));this.j=c;a=a.map;c=a.aa();if(c.l.rotation!==re){d=a.a.getBoundingClientRect();var e=hh(this.l);e[0]-=d.left;e[1]-=d.top;this.f=a.Ra(e);this.a&&(d=c.Sa(),a.render(),Kg(c,d+b,this.f))}}
function Uh(a){if(2>this.l.length){a=a.map.aa();bg(a,1,-1);if(this.a){var b=a.Sa(),c=this.f,d=this.o;b=a.constrainRotation(b,0);Kg(a,b,c,d)}return!1}return!0}function Sh(a){return 2<=this.l.length?(a=a.map,this.f=null,this.j=void 0,this.a=!1,this.s=0,this.D||bg(a.aa(),1,1),!0):!1}Rh.prototype.jd=Se;function Vh(a){fh.call(this,{handleDownEvent:Wh,handleDragEvent:Xh,handleUpEvent:Yh});a=a?a:{};this.s=a.constrainResolution||!1;this.f=null;this.o=void 0!==a.duration?a.duration:400;this.a=void 0;this.j=1}w(Vh,fh);
function Xh(a){var b=1,c=this.l[0],d=this.l[1],e=c.clientX-d.clientX;c=c.clientY-d.clientY;e=Math.sqrt(e*e+c*c);void 0!==this.a&&(b=this.a/e);this.a=e;a=a.map;e=a.aa();d=e.Pa();var f=e.a,g=e.i;c=d*b;c>f?(b=f/d,c=f):c<g&&(b=g/d,c=g);1!=b&&(this.j=b);b=a.a.getBoundingClientRect();d=hh(this.l);d[0]-=b.left;d[1]-=b.top;this.f=a.Ra(d);a.render();Tg(e,c,this.f)}
function Yh(a){if(2>this.l.length){a=a.map.aa();bg(a,1,-1);var b=a.Pa();if(this.s||b<a.i||b>a.a){var c=this.f,d=this.o;b=a.constrainResolution(b,0,this.j-1);Tg(a,b,c,d)}return!1}return!0}function Wh(a){return 2<=this.l.length?(a=a.map,this.f=null,this.a=void 0,this.j=1,this.D||bg(a.aa(),1,1),!0):!1}Vh.prototype.jd=Se;function Zh(a){a=a?a:{};var b=new B,c=new Gg(-.005,.05,100);(void 0!==a.altShiftDragRotate?a.altShiftDragRotate:1)&&b.push(new mh);(void 0!==a.doubleClickZoom?a.doubleClickZoom:1)&&b.push(new Ug({delta:a.zoomDelta,duration:a.zoomDuration}));(void 0!==a.dragPan?a.dragPan:1)&&b.push(new ih({kinetic:c}));(void 0!==a.pinchRotate?a.pinchRotate:1)&&b.push(new Rh);(void 0!==a.pinchZoom?a.pinchZoom:1)&&b.push(new Vh({constrainResolution:a.constrainResolution,duration:a.zoomDuration}));if(void 0!==a.keyboard?
a.keyboard:1)b.push(new Dh),b.push(new Fh({delta:a.zoomDelta,duration:a.zoomDuration}));(void 0!==a.mouseWheelZoom?a.mouseWheelZoom:1)&&b.push(new Hh({constrainResolution:a.constrainResolution,duration:a.zoomDuration}));(void 0!==a.shiftDragZoom?a.shiftDragZoom:1)&&b.push(new Ch({duration:a.zoomDuration}));return b};function $h(a,b,c,d){Sc.call(this);this.extent=a;this.a=c;this.resolution=b;this.state=d}w($h,Sc);$h.prototype.u=function(){this.b("change")};$h.prototype.G=function(){return this.extent};$h.prototype.getState=function(){return this.state};function ai(a,b,c,d,e){this.c=void 0!==e?e:null;$h.call(this,a,b,c,void 0!==e?0:2);this.g=d}w(ai,$h);ai.prototype.i=function(a){this.state=a?3:2;this.u()};ai.prototype.load=function(){0==this.state&&(this.state=1,this.u(),this.c(this.i.bind(this)))};ai.prototype.Y=function(){return this.g};function bi(a,b,c,d,e){Qc.call(this,a);this.vectorContext=b;this.frameState=c;this.context=d;this.glContext=e}w(bi,Qc);function ci(a){Sc.call(this);this.highWaterMark=void 0!==a?a:2048;this.i=0;this.a={};this.c=this.g=null}w(ci,Sc);function di(a){return a.i>a.highWaterMark}k=ci.prototype;k.clear=function(){this.i=0;this.a={};this.c=this.g=null;this.b("clear")};k.forEach=function(a,b){for(var c=this.g;c;)a.call(b,c.Pc,c.jc,this),c=c.kb};
k.get=function(a){a=this.a[a];oa(void 0!==a,15);if(a===this.c)return a.Pc;a===this.g?(this.g=this.g.kb,this.g.Pb=null):(a.kb.Pb=a.Pb,a.Pb.kb=a.kb);a.kb=null;a.Pb=this.c;this.c=this.c.kb=a;return a.Pc};k.remove=function(a){var b=this.a[a];oa(void 0!==b,15);if(b===this.c){if(this.c=b.Pb)this.c.kb=null}else if(b===this.g){if(this.g=b.kb)this.g.Pb=null}else b.kb.Pb=b.Pb,b.Pb.kb=b.kb;delete this.a[a];--this.i;return b.Pc};
k.pop=function(){var a=this.g;delete this.a[a.jc];a.kb&&(a.kb.Pb=null);this.g=a.kb;this.g||(this.c=null);--this.i;return a.Pc};k.replace=function(a,b){this.get(a);this.a[a].Pc=b};k.set=function(a,b){oa(!(a in this.a),16);b={jc:a,kb:null,Pb:this.c,Pc:b};this.c?this.c.kb=b:this.g=b;this.c=b;this.a[a]=b;++this.i};var ei=[0,0,0,1],fi=[],gi=[0,0,0,1],hi=[0,0,0,0],ii=new ci,ji={},ki=null,li={},ni=function(){function a(a){var b=mi();b.font="32px monospace";f=b.measureText("wmytzilWMYTZIL@#/&?$%10").width;var c=!0;"monospace"!=a&&(b.font="32px "+a+",monospace",c=b.measureText("wmytzilWMYTZIL@#/&?$%10").width!=f);return c}function b(){var b=!0,f;for(f in c)60>c[f]&&(a(f)?(c[f]=60,lb(li),ki=null,d.clear()):(++c[f],b=!1));b&&(window.clearInterval(e),e=void 0)}var c=ji,d=ii,e,f;return function(d){if(d=wg(d))for(var f=
0,g=d.length;f<g;++f){var m=d[f];m in c||(c[m]=60,a(m)||(c[m]=0,void 0===e&&(e=window.setInterval(b,32))))}}}();function mi(){var a=ki;a||(a=ki=hg(1,1));return a}
var oi=function(){var a;return function(b){var c=li[b];void 0==c&&(a||(a=document.createElement("span"),a.textContent="M",a.style.margin=a.style.padding="0 !important",a.style.position="absolute !important",a.style.left="-99999px !important"),a.style.font=b,document.body.appendChild(a),c=li[b]=a.offsetHeight,document.body.removeChild(a));return c}}();function pi(a,b){var c=mi();a!=c.font&&(c.font=a);return c.measureText(b).width}
function qi(a,b,c,d){0!==b&&(a.translate(c,d),a.rotate(b),a.translate(-c,-d))}var ri=We();function si(a,b,c,d,e,f,g,h,l,m,n){if(1!=c){var p=a.globalAlpha;a.globalAlpha=p*c}b&&a.setTransform.apply(a,b);a.drawImage(d,e,f,g,h,l,m,g*n,h*n);p&&(a.globalAlpha=p);b&&a.setTransform.apply(a,ri)};var ti=/^#(?:[0-9a-f]{3,4}){1,2}$/i,ui=/^([a-z]*)$/i;function vi(a){return Array.isArray(a)?a:wi(a)}function xi(a){if("string"!==typeof a){var b=a[0];b!=(b|0)&&(b=b+.5|0);var c=a[1];c!=(c|0)&&(c=c+.5|0);var d=a[2];d!=(d|0)&&(d=d+.5|0);a="rgba("+b+","+c+","+d+","+(void 0===a[3]?1:a[3])+")"}return a}
var wi=function(){var a={},b=0;return function(c){if(a.hasOwnProperty(c))var d=a[c];else{if(1024<=b){d=0;for(var e in a)0===(d++&3)&&(delete a[e],--b)}d=c;ui.exec(d)&&(e=document.createElement("div"),e.style.color=d,document.body.appendChild(e),d=getComputedStyle(e).color,document.body.removeChild(e));if(ti.exec(d)){e=d.length-1;var f=4>=e?1:2;var g=4===e||8===e;e=parseInt(d.substr(1+0*f,f),16);var h=parseInt(d.substr(1+1*f,f),16);var l=parseInt(d.substr(1+2*f,f),16);d=g?parseInt(d.substr(1+3*f,f),
16):255;1==f&&(e=(e<<4)+e,h=(h<<4)+h,l=(l<<4)+l,g&&(d=(d<<4)+d));f=[e,h,l,d/255]}else 0==d.indexOf("rgba(")?(d=d.slice(5,-1).split(",").map(Number),f=yi(d)):0==d.indexOf("rgb(")?(d=d.slice(4,-1).split(",").map(Number),d.push(1),f=yi(d)):oa(!1,14);d=f;a[c]=d;++b}return d}}();function yi(a){var b=[];b[0]=pa(a[0]+.5|0,0,255);b[1]=pa(a[1]+.5|0,0,255);b[2]=pa(a[2]+.5|0,0,255);b[3]=pa(a[3],0,1);return b};function zi(a){return"string"===typeof a||a instanceof CanvasPattern||a instanceof CanvasGradient?a:xi(a)};function Ai(){}k=Ai.prototype;k.Hh=function(){};k.Hb=function(){};k.Dd=function(){};k.cc=function(){};k.Ce=function(){};k.De=function(){};k.uc=function(){};k.vc=function(){};k.wc=function(){};k.xc=function(){};k.yc=function(){};k.zc=function(){};k.Wb=function(){};k.Oa=function(){};k.Zb=function(){};k.nb=function(){};function Bi(a,b,c,d,e){this.g=a;this.f=b;this.c=c;this.N=d;this.ob=e;this.M=this.b=this.a=this.Wa=this.O=this.T=null;this.$=this.V=this.v=this.B=this.C=this.D=0;this.ca=!1;this.i=this.ab=0;this.ra=!1;this.oa=0;this.ta="";this.Ub=this.ua=0;this.Ea=!1;this.s=this.La=0;this.qa=this.l=this.j=null;this.o=[];this.bb=We()}w(Bi,Ai);
function Ci(a,b,c){if(a.M){b=Te(b,0,c,2,a.N,a.o);c=a.g;var d=a.bb,e=c.globalAlpha;1!=a.v&&(c.globalAlpha=e*a.v);var f=a.ab;a.ca&&(f+=a.ob);var g;var h=0;for(g=b.length;h<g;h+=2){var l=b[h]-a.D,m=b[h+1]-a.C;a.ra&&(l=Math.round(l),m=Math.round(m));if(0!==f||1!=a.i){var n=l+a.D,p=m+a.C;ef(d,n,p,a.i,a.i,f,-n,-p);c.setTransform.apply(c,d)}c.drawImage(a.M,a.V,a.$,a.oa,a.B,l,m,a.oa,a.B)}0===f&&1==a.i||c.setTransform(1,0,0,1,0,0);1!=a.v&&(c.globalAlpha=e)}}
function Di(a,b,c,d){var e=0;if(a.qa&&""!==a.ta){a.j&&Ei(a,a.j);a.l&&Fi(a,a.l);var f=a.qa,g=a.g,h=a.Wa,l=f.textAlign?f.textAlign:"center";h?(h.font!=f.font&&(h.font=g.font=f.font),h.textAlign!=l&&(h.textAlign=l),h.textBaseline!=f.textBaseline&&(h.textBaseline=g.textBaseline=f.textBaseline)):(g.font=f.font,g.textAlign=l,g.textBaseline=f.textBaseline,a.Wa={font:f.font,textAlign:l,textBaseline:f.textBaseline});b=Te(b,e,c,d,a.N,a.o);f=a.g;g=a.La;for(a.Ea&&(g+=a.ob);e<c;e+=d){h=b[e]+a.ua;l=b[e+1]+a.Ub;
if(0!==g||1!=a.s){var m=ef(a.bb,h,l,a.s,a.s,g,-h,-l);f.setTransform.apply(f,m)}a.l&&f.strokeText(a.ta,h,l);a.j&&f.fillText(a.ta,h,l)}0===g&&1==a.s||f.setTransform(1,0,0,1,0,0)}}function Gi(a,b,c,d,e,f){var g=a.g;a=Te(b,c,d,e,a.N,a.o);g.moveTo(a[0],a[1]);b=a.length;f&&(b-=2);for(c=2;c<b;c+=2)g.lineTo(a[c],a[c+1]);f&&g.closePath();return d}function Hi(a,b,c,d,e){var f;var g=0;for(f=d.length;g<f;++g)c=Gi(a,b,c,d[g],e,!0);return c}k=Bi.prototype;
k.cc=function(a){if(hb(this.c,a.G())){if(this.a||this.b){this.a&&Ei(this,this.a);this.b&&Fi(this,this.b);var b=this.N;var c=this.o,d=a.da();b=d?Te(d,0,d.length,a.pa(),b,c):null;c=b[2]-b[0];d=b[3]-b[1];c=Math.sqrt(c*c+d*d);d=this.g;d.beginPath();d.arc(b[0],b[1],c,0,2*Math.PI);this.a&&d.fill();this.b&&d.stroke()}""!==this.ta&&Di(this,a.xa(),2,2)}};k.Dd=function(a){this.Oa(a.Fa(),a.Ga());this.Zb(a.Y());this.nb(a.Ka())};
k.Hb=function(a){switch(a.S()){case "Point":this.yc(a);break;case "LineString":this.uc(a);break;case "Polygon":this.zc(a);break;case "MultiPoint":this.wc(a);break;case "MultiLineString":this.vc(a);break;case "MultiPolygon":this.xc(a);break;case "GeometryCollection":this.De(a);break;case "Circle":this.cc(a)}};k.Ce=function(a,b){(a=(0,b.cb)(a))&&hb(this.c,a.G())&&(this.Dd(b),this.Hb(a))};k.De=function(a){a=a.a;var b;var c=0;for(b=a.length;c<b;++c)this.Hb(a[c])};
k.yc=function(a){var b=a.da();a=a.pa();this.M&&Ci(this,b,b.length);""!==this.ta&&Di(this,b,b.length,a)};k.wc=function(a){var b=a.da();a=a.pa();this.M&&Ci(this,b,b.length);""!==this.ta&&Di(this,b,b.length,a)};k.uc=function(a){if(hb(this.c,a.G())){if(this.b){Fi(this,this.b);var b=this.g,c=a.da();b.beginPath();Gi(this,c,0,c.length,a.pa(),!1);b.stroke()}""!==this.ta&&(a=a.Fe(),Di(this,a,2,2))}};
k.vc=function(a){var b=a.G();if(hb(this.c,b)){if(this.b){Fi(this,this.b);b=this.g;var c=a.da(),d=0,e=a.pb(),f=a.pa();b.beginPath();var g;var h=0;for(g=e.length;h<g;++h)d=Gi(this,c,d,e[h],f,!1);b.stroke()}""!==this.ta&&(a=a.Ge(),Di(this,a,a.length,2))}};k.zc=function(a){if(hb(this.c,a.G())){if(this.b||this.a){this.a&&Ei(this,this.a);this.b&&Fi(this,this.b);var b=this.g;b.beginPath();Hi(this,a.Xb(),0,a.pb(),a.pa());this.a&&b.fill();this.b&&b.stroke()}""!==this.ta&&(a=a.Td(),Di(this,a,2,2))}};
k.xc=function(a){if(hb(this.c,a.G())){if(this.b||this.a){this.a&&Ei(this,this.a);this.b&&Fi(this,this.b);var b=this.g,c=Ii(a),d=0,e=a.td(),f=a.pa(),g;b.beginPath();var h=0;for(g=e.length;h<g;++h)d=Hi(this,c,d,e[h],f);this.a&&b.fill();this.b&&b.stroke()}""!==this.ta&&(a=Ji(a),Di(this,a,a.length,2))}};function Ei(a,b){var c=a.g,d=a.T;d?d.fillStyle!=b.fillStyle&&(d.fillStyle=c.fillStyle=b.fillStyle):(c.fillStyle=b.fillStyle,a.T={fillStyle:b.fillStyle})}
function Fi(a,b){var c=a.g,d=a.O;d?(d.lineCap!=b.lineCap&&(d.lineCap=c.lineCap=b.lineCap),od&&(jc(d.lineDash,b.lineDash)||c.setLineDash(d.lineDash=b.lineDash),d.lineDashOffset!=b.lineDashOffset&&(d.lineDashOffset=c.lineDashOffset=b.lineDashOffset)),d.lineJoin!=b.lineJoin&&(d.lineJoin=c.lineJoin=b.lineJoin),d.lineWidth!=b.lineWidth&&(d.lineWidth=c.lineWidth=b.lineWidth),d.miterLimit!=b.miterLimit&&(d.miterLimit=c.miterLimit=b.miterLimit),d.strokeStyle!=b.strokeStyle&&(d.strokeStyle=c.strokeStyle=b.strokeStyle)):
(c.lineCap=b.lineCap,od&&(c.setLineDash(b.lineDash),c.lineDashOffset=b.lineDashOffset),c.lineJoin=b.lineJoin,c.lineWidth=b.lineWidth,c.miterLimit=b.miterLimit,c.strokeStyle=b.strokeStyle,a.O={lineCap:b.lineCap,lineDash:b.lineDash,lineDashOffset:b.lineDashOffset,lineJoin:b.lineJoin,lineWidth:b.lineWidth,miterLimit:b.miterLimit,strokeStyle:b.strokeStyle})}
k.Oa=function(a,b){a?(a=a.b,this.a={fillStyle:zi(a?a:ei)}):this.a=null;if(b){a=b.a;var c=b.f,d=b.g,e=b.i,f=b.j,g=b.c;b=b.l;this.b={lineCap:void 0!==c?c:"round",lineDash:d?d:fi,lineDashOffset:e?e:0,lineJoin:void 0!==f?f:"round",lineWidth:this.f*(void 0!==g?g:1),miterLimit:void 0!==b?b:10,strokeStyle:zi(a?a:gi)}}else this.b=null};
k.Zb=function(a){if(a){var b=a.Vc(),c=a.Y(1),d=a.bd(),e=a.oc();this.D=b[0];this.C=b[1];this.B=e[1];this.M=c;this.v=a.i;this.V=d[0];this.$=d[1];this.ca=a.s;this.ab=a.f;this.i=a.a*this.f;this.ra=a.v;this.oa=e[0]}else this.M=null};
k.nb=function(a){if(a){var b=a.Fa();b?(b=b.b,this.j={fillStyle:zi(b?b:ei)}):this.j=null;var c=a.Ga();if(c){b=c.a;var d=c.f,e=c.g,f=c.i,g=c.j,h=c.c;c=c.l;this.l={lineCap:void 0!==d?d:"round",lineDash:e?e:fi,lineDashOffset:f?f:0,lineJoin:void 0!==g?g:"round",lineWidth:void 0!==h?h:1,miterLimit:void 0!==c?c:10,strokeStyle:zi(b?b:gi)}}else this.l=null;b=a.a;d=a.g;e=a.c;f=a.l;g=a.i;h=a.b;c=a.Ka();var l=a.f;a=a.j;this.qa={font:void 0!==b?b:"10px sans-serif",textAlign:void 0!==l?l:"center",textBaseline:void 0!==
a?a:"middle"};this.ta=void 0!==c?c:"";this.ua=void 0!==d?this.f*d:0;this.Ub=void 0!==e?this.f*e:0;this.Ea=void 0!==f?f:!1;this.La=void 0!==g?g:0;this.s=this.f*(void 0!==h?h:1)}else this.ta=""};function Ki(a){Uc.call(this);this.a=a}w(Ki,Uc);Ki.prototype.wa=ea;Ki.prototype.cf=Se;Ki.prototype.Rf=function(a,b,c){return function(d,e){return Li(a,b,d,e,function(a){c[d]||(c[d]={});c[d][a.ya.toString()]=a})}};Ki.prototype.$=function(a){2===a.target.getState()&&Mi(this)};function Si(a,b){var c=b.getState();2!=c&&3!=c&&y(b,"change",a.$,a);0==c&&(b.load(),c=b.getState());return 2==c}function Mi(a){var b=a.a;b.Jb()&&"ready"==b.hg()&&a.u()}
function Ti(a,b){b.cj()&&a.postRenderFunctions.push(function(a,b,e){b=x(a).toString();b in e.usedTiles&&a.sd(e.viewState.projection,e.usedTiles[b])}.bind(null,b))}function Ui(a,b){b=b.T;void 0!==b&&("string"===typeof b?a.logos[b]="":b&&(oa("string"==typeof b.href,44),oa("string"==typeof b.src,45),a.logos[b.src]=b.href))}
function Vi(a,b,c,d){b=x(b).toString();c=c.toString();b in a?c in a[b]?(a=a[b][c],d.fa<a.fa&&(a.fa=d.fa),d.la>a.la&&(a.la=d.la),d.ea<a.ea&&(a.ea=d.ea),d.ka>a.ka&&(a.ka=d.ka)):a[b][c]=d:(a[b]={},a[b][c]=d)}
function Wi(a,b,c,d,e,f,g,h,l,m){var n=x(b).toString();n in a.wantedTiles||(a.wantedTiles[n]={});var p=a.wantedTiles[n];a=a.tileQueue;var q,r,u;for(u=c.minZoom;u<=g;++u){var v=tc(c,f,u,v);var z=c.Ta(u);for(q=v.fa;q<=v.la;++q)for(r=v.ea;r<=v.ka;++r)if(g-u<=h){var A=b.ad(u,q,r,d,e);0==A.getState()&&(p[A.lb()]=!0,A.lb()in a.a||a.i([A,n,yc(c,A.ya),z]));void 0!==l&&l.call(m,A)}else b.kh(u,q,r,e)}};function Xi(a){Ki.call(this,a);this.V=We()}w(Xi,Ki);function Yi(a,b,c){var d=b.pixelRatio,e=b.size[0]*d,f=b.size[1]*d,g=b.viewState.rotation,h=$a(c),l=Za(c),m=Ya(c);c=Wa(c);af(b.coordinateToPixelTransform,h);af(b.coordinateToPixelTransform,l);af(b.coordinateToPixelTransform,m);af(b.coordinateToPixelTransform,c);a.save();qi(a,-g,e/2,f/2);a.beginPath();a.moveTo(h[0]*d,h[1]*d);a.lineTo(l[0]*d,l[1]*d);a.lineTo(m[0]*d,m[1]*d);a.lineTo(c[0]*d,c[1]*d);a.clip();qi(a,g,e/2,f/2)}
function Zi(a,b,c,d,e){var f=a.a;if(Tc(f,b)){var g=d.size[0]*d.pixelRatio,h=d.size[1]*d.pixelRatio,l=d.viewState.rotation;qi(c,-l,g/2,h/2);a=void 0!==e?e:$i(a,d,0);f.b(new bi(b,new Bi(c,d.pixelRatio,d.extent,a,d.viewState.rotation),d,c,null));qi(c,l,g/2,h/2)}}Xi.prototype.s=function(a,b,c,d){if(this.wa(a,b,0,Re,this))return c.call(d,this.a,null)};Xi.prototype.pf=function(a,b,c,d){Zi(this,"postcompose",a,b,d)};
function $i(a,b,c){var d=b.viewState,e=b.pixelRatio,f=e/d.resolution;return ef(a.V,e*b.size[0]/2,e*b.size[1]/2,f,-f,-d.rotation,-d.center[0]+c,-d.center[1])};function aj(a){Xi.call(this,a);this.l=We();this.j=null}w(aj,Xi);aj.prototype.df=function(a,b,c){Zi(this,"precompose",c,a,void 0);var d=this.Y();if(d){var e=b.extent,f=void 0!==e&&!La(e,a.extent)&&hb(e,a.extent);f&&Yi(c,a,e);e=this.v();var g=c.globalAlpha;c.globalAlpha=b.opacity;c.drawImage(d,0,0,+d.width,+d.height,Math.round(e[4]),Math.round(e[5]),Math.round(d.width*e[0]),Math.round(d.height*e[3]));c.globalAlpha=g;f&&c.restore()}this.pf(c,a,b)};
aj.prototype.wa=function(a,b,c,d,e){var f=this.a;return f.ha().wa(a,b.viewState.resolution,b.viewState.rotation,c,b.skippedFeatureUids,function(a){return d.call(e,a,f)})};
aj.prototype.s=function(a,b,c,d){if(this.Y()){if(this.a.ha().wa!==ea)return Xi.prototype.s.apply(this,arguments);var e=af(this.l,a.slice());Ge(e,b.viewState.resolution/this.i);this.j||(this.j=hg(1,1));this.j.clearRect(0,0,1,1);this.j.drawImage(this.Y(),e[0],e[1],1,1,0,0,1,1);e=this.j.getImageData(0,0,1,1).data;if(0<e[3])return c.call(d,this.a,e)}};function bj(a){aj.call(this,a);this.M=null;this.f=We();this.o=[];this.c=null}w(bj,aj);bj.handles=function(a,b){return"canvas"===a&&("IMAGE"===b.S()||"VECTOR"===b.S()&&"image"===b.l)};bj.create=function(a,b){var c=new bj(b);if("VECTOR"===b.S())for(var d=0,e=pg.length;d<e;++d){var f=pg[d];f!==bj&&f.handles("canvas",b)&&(f=f.create(a,b),c.c=f)}return c};bj.prototype.Y=function(){return this.M?this.M.Y():null};bj.prototype.v=function(){return this.f};
bj.prototype.$c=function(a,b){var c=a.pixelRatio,d=a.size,e=a.viewState,f=e.center,g=e.resolution,h=this.a.ha(),l=a.viewHints,m=a.extent;void 0!==b.extent&&(m=gb(m,b.extent));if(!l[0]&&!l[1]&&!bb(m))if(l=e.projection,e=this.c){l=e.context;var n=kb({},a,{size:[cb(m)/g,db(m)/g],viewState:kb({},a.viewState,{rotation:0})}),p=Object.keys(n.skippedFeatureUids).sort();!e.$c(n,b)||!e.j&&jc(p,this.o)||(l.canvas.width=n.size[0]*c,l.canvas.height=n.size[1]*c,e.df(n,b,l),this.M=new ai(m,g,c,l.canvas),this.o=
p)}else(e=h.Y(m,g,c,l))&&Si(this,e)&&(this.M=e);this.M&&(e=this.M,m=e.G(),b=e.resolution,e=e.a,l=c*b/(g*e),m=ef(this.f,c*d[0]/2,c*d[1]/2,l,l,0,e*(m[0]-f[0])/b,e*(f[1]-m[3])/b),ef(this.l,c*d[0]/2-m[4],c*d[1]/2-m[5],c/g,-c/g,0,-f[0],-f[1]),Ui(a,h),this.i=b*c/e);return!!this.M};bj.prototype.wa=function(a,b,c,d,e){return this.c?this.c.wa(a,b,c,d,e):aj.prototype.wa.call(this,a,b,c,d,e)};function cj(){this.b={};this.a=0;this.g=32}cj.prototype.clear=function(){this.b={};this.a=0};function dj(a){if(a.a>a.g){var b=0,c;for(c in a.b){var d=a.b[c];0!==(b++&3)||Tc(d)||(delete a.b[c],--a.a)}}}cj.prototype.get=function(a,b,c){a=b+":"+a+":"+(c?xi(c):"null");return a in this.b?this.b[a]:null};cj.prototype.set=function(a,b,c,d){this.b[b+":"+a+":"+(c?xi(c):"null")]=d;++this.a};cj.prototype.c=function(a){this.g=a;dj(this)};var ej=new cj;function fj(a,b){this.l=b;this.c={};this.v={}}w(fj,Oc);function gj(a){var b=a.viewState,c=a.coordinateToPixelTransform,d=a.pixelToCoordinateTransform;ef(c,a.size[0]/2,a.size[1]/2,1/b.resolution,-1/b.resolution,-b.rotation,-b.center[0],-b.center[1]);ff($e(d,c))}function hj(){dj(ej)}k=fj.prototype;
k.wa=function(a,b,c,d,e,f,g){function h(a,c){var f=x(a).toString(),g=b.layerStates[x(c)].Te;if(!(f in b.skippedFeatureUids)||g)return d.call(e,a,g?c:null)}var l,m=b.viewState,n=m.resolution,p=m.projection;m=a;if(p.g){p=p.G();var q=cb(p),r=a[0];if(r<p[0]||r>p[2])m=[r+q*Math.ceil((p[0]-r)/q),a[1]]}p=b.layerStatesArray;for(q=p.length-1;0<=q;--q){var u=p[q];r=u.layer;if(yg(u,n)&&f.call(g,r)&&(u=ij(this,r),r.ha()&&(l=u.wa(r.ha().D?m:a,b,c,h,e)),l))return l}};
k.Ui=function(a,b,c,d,e){return void 0!==this.wa(a,b,c,Re,this,d,e)};function ij(a,b){var c=x(b).toString();if(c in a.c)return a.c[c];for(var d,e=a.S(),f=0,g=pg.length;f<g;++f){var h=pg[f];if(h.handles(e,b)){d=h.create(a,b);break}}if(d)a.c[c]=d,a.v[c]=y(d,"change",a.gm,a);else throw Error("Unable to create renderer for layer: "+b.S());return d}k.gm=function(){this.l.render()};function tg(a,b){var c=a.c[b];delete a.c[b];Gc(a.v[b]);delete a.v[b];return c}k.bh=ea;
k.oq=function(a,b){for(var c in this.c)b&&c in b.layerStates||Pc(tg(this,c))};function jj(a,b){for(var c in a.c)if(!(c in b.layerStates)){b.postRenderFunctions.push(a.oq.bind(a));break}}function lc(a,b){return a.zIndex-b.zIndex};function kj(a,b){fj.call(this,a,b);this.g=hg();this.b=this.g.canvas;this.b.style.width="100%";this.b.style.height="100%";this.b.style.display="block";this.b.className="ol-unselectable";a.insertBefore(this.b,a.childNodes[0]||null);this.a=!0;this.i=We()}w(kj,fj);kj.handles=function(a){return"canvas"===a};kj.create=function(a,b){return new kj(a,b)};
function lj(a,b,c){var d=a.l,e=a.g;if(Tc(d,b)){var f=c.extent,g=c.pixelRatio,h=c.viewState.rotation,l=c.viewState,m=c.pixelRatio/l.resolution;a=ef(a.i,a.b.width/2,a.b.height/2,m,-m,-l.rotation,-l.center[0],-l.center[1]);d.b(new bi(b,new Bi(e,g,f,a,h),c,e,null))}}kj.prototype.S=function(){return"canvas"};
kj.prototype.bh=function(a){if(a){var b=this.g,c=a.pixelRatio,d=Math.round(a.size[0]*c),e=Math.round(a.size[1]*c);this.b.width!=d||this.b.height!=e?(this.b.width=d,this.b.height=e):b.clearRect(0,0,d,e);c=a.viewState.rotation;gj(a);lj(this,"precompose",a);var f=a.layerStatesArray;kc(f);c&&(b.save(),qi(b,c,d/2,e/2));d=a.viewState.resolution;var g;e=0;for(g=f.length;e<g;++e){var h=f[e];var l=h.layer;l=ij(this,l);yg(h,d)&&"ready"==h.Vj&&l.$c(a,h)&&l.df(a,h,b)}c&&b.restore();lj(this,"postcompose",a);this.a||
(this.b.style.display="",this.a=!0);jj(this,a);a.postRenderFunctions.push(hj)}else this.a&&(this.b.style.display="none",this.a=!1)};kj.prototype.Ti=function(a,b,c,d,e,f){var g=b.viewState.resolution,h=b.layerStatesArray,l=h.length;a=af(b.pixelToCoordinateTransform,a.slice());for(--l;0<=l;--l){var m=h[l];var n=m.layer;if(yg(m,g)&&e.call(f,n)&&(m=ij(this,n).s(a,b,c,d)))return m}};function mj(a){aj.call(this,a);this.context=null===this.context?null:hg();this.c=null;this.f=[];this.T=Da();this.ra=new ja(0,0,0,0);this.o=We();this.O=0}w(mj,aj);mj.handles=function(a,b){return"canvas"===a&&"TILE"===b.S()};mj.create=function(a,b){return new mj(b)};function nj(a,b){b=b.getState();a=a.a.i();return 2==b||4==b||3==b&&!a}
mj.prototype.$c=function(a,b){var c=a.pixelRatio,d=a.size,e=a.viewState,f=e.projection,g=e.resolution;e=e.center;var h=this.a,l=h.ha(),m=l.g,n=l.eb(f),p=n.Dc(g,this.O),q=n.Ta(p),r=Math.round(g/q)||1,u=a.extent;void 0!==b.extent&&(u=gb(u,b.extent));if(bb(u))return!1;var v=tc(n,u,p),z=wc(n,p,v),A=l.Xc(c),E={};E[p]={};var S=this.Rf(l,f,E),Ia=this.T,ta=this.ra,la=!1,ca,ia;for(ca=v.fa;ca<=v.la;++ca)for(ia=v.ea;ia<=v.ka;++ia){var xa=l.ad(p,ca,ia,c,f);3==xa.getState()&&(h.i()?0<h.c()&&(la=!0):oj(xa,2));
nj(this,xa)||(xa=pj(xa));if(nj(this,xa)){var Va=x(this);if(2==xa.getState()){E[p][xa.ya.toString()]=xa;var ic=xa.j?-1!==xa.s[Va]:!1;la||!ic&&-1!==this.f.indexOf(xa)||(la=!0)}if(1===qj(xa,Va,a.time))continue}Va=vc(n,xa.ya,ta,Ia);ic=!1;Va&&(ic=S(p+1,Va));ic||uc(n,xa.ya,S,ta,Ia)}xa=a.viewHints;xa=xa[0]||xa[1];if(!(this.i&&16<Date.now()-a.time&&xa||!la&&this.c&&La(this.c,u)&&this.wf==m&&r==this.C&&(xa||q*c/A*r==this.i))){if(xa=this.context)ia=l.Zd(p,c,f),ca=Math.round((v.la-v.fa+1)*ia[0]/r),ia=Math.round((v.ka-
v.ea+1)*ia[1]/r),la=xa.canvas,la.width!=ca||la.height!=ia?(this.C=r,la.width=ca,la.height=ia):(this.c&&!Sa(z,this.c)&&xa.clearRect(0,0,ca,ia),r=this.C);this.f.length=0;la=Object.keys(E).map(Number);la.sort(function(a,b){return a===p?1:b===p?-1:a>b?1:a<b?-1:0});Va=0;for(ic=la.length;Va<ic;++Va){ta=la[Va];S=l.Zd(ta,c,f);xa=n.Ta(ta);var Xa=xa/q;var Z=A*l.Zf(f);var Zb=E[ta];for(var Le in Zb){xa=Zb[Le];ia=n.Ma(xa.ya,Ia);ca=(ia[0]-z[0])/q*A/r;ia=(z[3]-ia[3])/q*A/r;var Uf=S[0]*Xa/r;var Id=S[1]*Xa/r;this.Sf(xa,
a,b,ca,ia,Uf,Id,Z,p===ta);this.f.push(xa)}}this.wf=m;this.i=q*c/A*r;this.c=z}b=this.i/g;b=ef(this.o,c*d[0]/2,c*d[1]/2,b,b,0,(this.c[0]-e[0])/this.i*c,(e[1]-this.c[3])/this.i*c);ef(this.l,c*d[0]/2-b[4],c*d[1]/2-b[5],c/g,-c/g,0,-e[0],-e[1]);Vi(a.usedTiles,l,p,v);Wi(a,l,n,c,f,u,p,h.c());Ti(a,l);Ui(a,l);return 0<this.f.length};
mj.prototype.Sf=function(a,b,c,d,e,f,g,h,l){if(c=a.Y(this.a)){var m=x(this),n=l?qj(a,m,b.time):1;1!==n||this.a.ha().eg(b.viewState.projection)||this.context.clearRect(d,e,f,g);var p=n!==this.context.globalAlpha;p&&(this.context.save(),this.context.globalAlpha=n);this.context.drawImage(c,h,h,c.width-2*h,c.height-2*h,d,e,f,g);p&&this.context.restore();1!==n?b.animate=!0:l&&a.j&&(a.s[m]=-1)}};mj.prototype.Y=function(){var a=this.context;return a?a.canvas:null};mj.prototype.v=function(){return this.o};var rj={Jc:function(){}};
(function(a){function b(a,b,d,f,g){c(a,b,d||0,f||a.length-1,g||e)}function c(a,b,e,f,g){for(;f>e;){if(600<f-e){var h=f-e+1,l=b-e+1,m=Math.log(h),n=.5*Math.exp(2*m/3);m=.5*Math.sqrt(m*n*(h-n)/h)*(0>l-h/2?-1:1);c(a,b,Math.max(e,Math.floor(b-l*n/h+m)),Math.min(f,Math.floor(b+(h-l)*n/h+m)),g)}h=a[b];l=e;n=f;d(a,e,b);for(0<g(a[f],h)&&d(a,e,f);l<n;){d(a,l,n);l++;for(n--;0>g(a[l],h);)l++;for(;0<g(a[n],h);)n--}0===g(a[e],h)?d(a,e,n):(n++,d(a,n,f));n<=b&&(e=n+1);b<=n&&(f=n-1)}}function d(a,b,c){var d=a[b];
a[b]=a[c];a[c]=d}function e(a,b){return a<b?-1:a>b?1:0}function f(a,b){if(!(this instanceof f))return new f(a,b);this.Lf=Math.max(4,a||9);this.wh=Math.max(2,Math.ceil(.4*this.Lf));b&&this.Ak(b);this.clear()}function g(a,b){h(a,0,a.children.length,b,a)}function h(a,b,c,d,e){e||(e=v(null));e.fa=Infinity;e.ea=Infinity;e.la=-Infinity;e.ka=-Infinity;for(var f;b<c;b++)f=a.children[b],l(e,a.fb?d(f):f);return e}function l(a,b){a.fa=Math.min(a.fa,b.fa);a.ea=Math.min(a.ea,b.ea);a.la=Math.max(a.la,b.la);a.ka=
Math.max(a.ka,b.ka);return a}function m(a,b){return a.fa-b.fa}function n(a,b){return a.ea-b.ea}function p(a){return(a.la-a.fa)*(a.ka-a.ea)}function q(a){return a.la-a.fa+(a.ka-a.ea)}function r(a,b){return a.fa<=b.fa&&a.ea<=b.ea&&b.la<=a.la&&b.ka<=a.ka}function u(a,b){return b.fa<=a.la&&b.ea<=a.ka&&b.la>=a.fa&&b.ka>=a.ea}function v(a){return{children:a,height:1,fb:!0,fa:Infinity,ea:Infinity,la:-Infinity,ka:-Infinity}}function z(a,b,c,d,e){for(var f=[b,c],g;f.length;)c=f.pop(),b=f.pop(),c-b<=d||(g=
b+Math.ceil((c-b)/d/2)*d,A(a,g,b,c,e),f.push(b,g,g,c))}var A=b;A.default=b;f.prototype={all:function(){return this.rh(this.data,[])},search:function(a){var b=this.data,c=[],d=this.xb;if(!u(a,b))return c;for(var e=[],f,g,h,l;b;){f=0;for(g=b.children.length;f<g;f++)h=b.children[f],l=b.fb?d(h):h,u(a,l)&&(b.fb?c.push(h):r(a,l)?this.rh(h,c):e.push(h));b=e.pop()}return c},Ok:function(a){var b=this.data,c=this.xb;if(!u(a,b))return!1;for(var d=[],e,f,g,h;b;){e=0;for(f=b.children.length;e<f;e++)if(g=b.children[e],
h=b.fb?c(g):g,u(a,h)){if(b.fb||r(a,h))return!0;d.push(g)}b=d.pop()}return!1},load:function(a){if(!a||!a.length)return this;if(a.length<this.wh){for(var b=0,c=a.length;b<c;b++)this.Ca(a[b]);return this}a=this.th(a.slice(),0,a.length-1,0);this.data.children.length?this.data.height===a.height?this.yh(this.data,a):(this.data.height<a.height&&(b=this.data,this.data=a,a=b),this.vh(a,this.data.height-a.height-1,!0)):this.data=a;return this},Ca:function(a){a&&this.vh(a,this.data.height-1);return this},clear:function(){this.data=
v([]);return this},remove:function(a,b){if(!a)return this;for(var c=this.data,d=this.xb(a),e=[],f=[],g,h,l,m;c||e.length;){c||(c=e.pop(),h=e[e.length-1],g=f.pop(),m=!0);if(c.fb){a:{l=a;var n=c.children,p=b;if(p){for(var q=0;q<n.length;q++)if(p(l,n[q])){l=q;break a}l=-1}else l=n.indexOf(l)}if(-1!==l){c.children.splice(l,1);e.push(c);this.yk(e);break}}m||c.fb||!r(c,d)?h?(g++,c=h.children[g],m=!1):c=null:(e.push(c),f.push(g),g=0,h=c,c=c.children[0])}return this},xb:function(a){return a},Pf:m,Qf:n,toJSON:function(){return this.data},
rh:function(a,b){for(var c=[];a;)a.fb?b.push.apply(b,a.children):c.push.apply(c,a.children),a=c.pop();return b},th:function(a,b,c,d){var e=c-b+1,f=this.Lf;if(e<=f){var h=v(a.slice(b,c+1));g(h,this.xb);return h}d||(d=Math.ceil(Math.log(e)/Math.log(f)),f=Math.ceil(e/Math.pow(f,d-1)));h=v([]);h.fb=!1;h.height=d;e=Math.ceil(e/f);f=e*Math.ceil(Math.sqrt(f));var l;for(z(a,b,c,f,this.Pf);b<=c;b+=f){var m=Math.min(b+f-1,c);z(a,b,m,e,this.Qf);for(l=b;l<=m;l+=e){var n=Math.min(l+e-1,m);h.children.push(this.th(a,
l,n,d-1))}}g(h,this.xb);return h},xk:function(a,b,c,d){for(var e,f,g,h,l,m,n,q;;){d.push(b);if(b.fb||d.length-1===c)break;n=q=Infinity;e=0;for(f=b.children.length;e<f;e++)g=b.children[e],l=p(g),m=(Math.max(g.la,a.la)-Math.min(g.fa,a.fa))*(Math.max(g.ka,a.ka)-Math.min(g.ea,a.ea))-l,m<q?(q=m,n=l<n?l:n,h=g):m===q&&l<n&&(n=l,h=g);b=h||b.children[0]}return b},vh:function(a,b,c){var d=this.xb;c=c?a:d(a);d=[];var e=this.xk(c,this.data,b,d);e.children.push(a);for(l(e,c);0<=b;)if(d[b].children.length>this.Lf)this.Dk(d,
b),b--;else break;this.uk(c,d,b)},Dk:function(a,b){var c=a[b],d=c.children.length,e=this.wh;this.vk(c,e,d);d=this.wk(c,e,d);d=v(c.children.splice(d,c.children.length-d));d.height=c.height;d.fb=c.fb;g(c,this.xb);g(d,this.xb);b?a[b-1].children.push(d):this.yh(c,d)},yh:function(a,b){this.data=v([a,b]);this.data.height=a.height+1;this.data.fb=!1;g(this.data,this.xb)},wk:function(a,b,c){var d,e;var f=e=Infinity;for(d=b;d<=c-b;d++){var g=h(a,0,d,this.xb);var l=h(a,d,c,this.xb);var m=Math.max(0,Math.min(g.la,
l.la)-Math.max(g.fa,l.fa))*Math.max(0,Math.min(g.ka,l.ka)-Math.max(g.ea,l.ea));g=p(g)+p(l);if(m<f){f=m;var n=d;e=g<e?g:e}else m===f&&g<e&&(e=g,n=d)}return n},vk:function(a,b,c){var d=a.fb?this.Pf:m,e=a.fb?this.Qf:n,f=this.sh(a,b,c,d);b=this.sh(a,b,c,e);f<b&&a.children.sort(d)},sh:function(a,b,c,d){a.children.sort(d);d=this.xb;var e=h(a,0,b,d),f=h(a,c-b,c,d),g=q(e)+q(f),m;for(m=b;m<c-b;m++){var n=a.children[m];l(e,a.fb?d(n):n);g+=q(e)}for(m=c-b-1;m>=b;m--)n=a.children[m],l(f,a.fb?d(n):n),g+=q(f);return g},
uk:function(a,b,c){for(;0<=c;c--)l(b[c],a)},yk:function(a){for(var b=a.length-1,c;0<=b;b--)0===a[b].children.length?0<b?(c=a[b-1].children,c.splice(c.indexOf(a[b]),1)):this.clear():g(a[b],this.xb)},Ak:function(a){var b=["return a"," - b",";"];this.Pf=new Function("a","b",b.join(a[0]));this.Qf=new Function("a","b",b.join(a[1]));this.xb=new Function("a","return {minX: a"+a[0]+", minY: a"+a[1]+", maxX: a"+a[2]+", maxY: a"+a[3]+"};")}};a["default"]=f})(rj.Jc=rj.Jc||{});rj.Jc=rj.Jc.default;function sj(){};function tj(a,b,c,d){var e=a[b],f=a[b+1],g=0;for(b+=d;b<c;b+=d){var h=a[b],l=a[b+1];g+=Math.sqrt((h-e)*(h-e)+(l-f)*(l-f));e=h;f=l}return g};var uj="Polygon Circle LineString Image Text Default".split(" "),vj={left:0,end:0,center:.5,right:1,start:1,top:0,middle:.5,hanging:.2,alphabetic:.8,ideographic:.8,bottom:1};function wj(a,b,c,d,e,f){this.ra=f;this.La=Da();this.ob=a;this.Ea=b;this.overlaps=e;this.pixelRatio=d;this.Wa=0;this.resolution=c;this.i=this.T=this.qa=null;this.a=[];this.coordinates=[];this.Ub={};this.ca=We();this.b=[];this.oa=null;this.state={};this.$=0;this.bb=We()}w(wj,Ai);function xj(a,b,c,d,e,f,g,h){b.beginPath();b.moveTo.apply(b,c);b.lineTo.apply(b,d);b.lineTo.apply(b,e);b.lineTo.apply(b,f);b.lineTo.apply(b,c);g&&(a.O=g[2],a.Xa(b));h&&(yj(b,h),b.stroke())}
function zj(a,b,c,d,e,f,g,h,l,m,n,p,q,r,u,v,z,A,E){var S=A||E,Ia=a.bb;f*=r;g*=r;c-=f;d-=g;u&&(c=Math.round(c),d=Math.round(d));u=v+n>e.width?e.width-n:v;l=l+p>e.height?e.height-p:l;v=a.La;var ta=z[3]+u*r+z[1],la=z[0]+l*r+z[2],ca=c-z[3],ia=d-z[0];if(S||0!==q){var xa=[ca,ia];var Va=[ca+ta,ia];var ic=[ca+ta,ia+la];var Xa=[ca,ia+la]}z=null;0!==q?(f=c+f,g=d+g,z=ef(Ia,f,g,1,1,q,-f,-g),Oa(v),Ea(v,af(Ia,xa)),Ea(v,af(Ia,Va)),Ea(v,af(Ia,ic)),Ea(v,af(Ia,Xa))):Na(ca,ia,ca+ta,ia+la,v);q=b.canvas;q=v[0]<=q.width&&
0<=v[2]&&v[1]<=q.height&&0<=v[3];if(h){if(q||1!=h[4])Ta(h,v),(a=q?[b,z?z.slice(0):null,m,e,n,p,u,l,c,d,r]:null)&&S&&a.push(A,E,xa,Va,ic,Xa),h.push(a)}else q&&(S&&xj(a,b,xa,Va,ic,Xa,A,E),si(b,z,m,e,n,p,u,l,c,d,r))}function Aj(a,b){var c=a.pixelRatio;return 1==c?b:b.map(function(a){return a*c})}
function Bj(a,b,c,d,e,f,g){var h=a.coordinates.length,l=Cj(a);g&&(c+=e);g=[b[c],b[c+1]];var m=[NaN,NaN],n=!0,p;for(p=c+e;p<d;p+=e){m[0]=b[p];m[1]=b[p+1];var q=Ma(l,m);q!==r?(n&&(a.coordinates[h++]=g[0],a.coordinates[h++]=g[1]),a.coordinates[h++]=m[0],a.coordinates[h++]=m[1],n=!1):1===q?(a.coordinates[h++]=m[0],a.coordinates[h++]=m[1],n=!1):n=!0;g[0]=m[0];g[1]=m[1];var r=q}if(f&&n||p===c+e)a.coordinates[h++]=g[0],a.coordinates[h++]=g[1];return h}
function Dj(a,b,c,d,e,f){for(var g=0,h=d.length;g<h;++g){var l=d[g];c=Bj(a,b,c,l,e,!1,!1);f.push(c);c=l}return c}k=wj.prototype;
k.Hh=function(a,b,c){Ej(this,b);var d=a.S(),e=a.pa(),f=this.coordinates.length,g;if("MultiPolygon"==d){d=Ii(a);var h=[];for(var l=a.td(),m=g=0,n=l.length;m<n;++m){var p=[];g=Dj(this,d,g,l[m],e,p);h.push(p)}this.a.push([4,f,h,a,c,Af])}else"Polygon"==d||"MultiLineString"==d?(h=[],d="Polygon"==d?a.Xb():a.da(),Dj(this,d,0,a.pb(),e,h),this.a.push([4,f,h,a,c,zf])):"LineString"==d||"MultiPoint"==d?(d=a.da(),e=Bj(this,d,0,d.length,e,!1,!1),this.a.push([4,f,e,a,c,yf])):"Point"==d&&(d=a.da(),this.coordinates.push(d[0],
d[1]),e=this.coordinates.length,this.a.push([4,f,e,a,c]));Fj(this,b)};function Ej(a,b){a.qa=[0,b,0];a.a.push(a.qa);a.T=[0,b,0];a.b.push(a.T)}k.Xa=function(a){if(this.O){var b=af(this.ca,this.O.slice());a.translate(b[0],b[1]);a.rotate(this.$)}a.fill();this.O&&a.setTransform.apply(a,ri)};function yj(a,b){a.strokeStyle=b[1];a.lineWidth=b[2];a.lineCap=b[3];a.lineJoin=b[4];a.miterLimit=b[5];od&&(a.lineDashOffset=b[7],a.setLineDash(b[6]))}
function Gj(a,b,c){if(b&&5<b.length){var d=b[4];if(1==d||d==b.length-5){c={fa:b[0],ea:b[1],la:b[2],ka:b[3],value:c};if(!a.ra.Ok(c))for(a.ra.Ca(c),c=5,d=b.length;c<d;++c){var e=b[c];e&&(11<e.length&&xj(a,e[0],e[13],e[14],e[15],e[16],e[11],e[12]),si.apply(void 0,e))}b.length=5;Oa(b)}}}
function Hj(a,b,c,d,e,f,g){if(a.oa&&jc(c,a.ca))var h=a.oa;else a.oa||(a.oa=[]),h=Te(a.coordinates,0,a.coordinates.length,2,c,a.oa),$e(a.ca,c);for(var l=!nb(d),m=0,n=e.length,p=0,q,r,u,v,z,A,E,S,Ia,ta=0,la=0,ca=null,ia=null,xa=a.Ub,Va=a.$,ic={context:b,pixelRatio:a.pixelRatio,resolution:a.resolution,rotation:Va},Xa=a.a!=e||a.overlaps?0:200;m<n;){var Z=e[m];switch(Z[0]){case 0:var Zb=Z[1];l&&d[x(Zb).toString()]||!Zb.U()?m=Z[2]:void 0===g||hb(g,Zb.U().G())?++m:m=Z[2]+1;break;case 1:ta>Xa&&(a.Xa(b),ta=
0);la>Xa&&(b.stroke(),la=0);ta||la||(b.beginPath(),v=z=NaN);++m;break;case 2:p=Z[1];var Le=h[p],Uf=h[p+1],Id=h[p+2]-Le,te=h[p+3]-Uf,Jh=Math.sqrt(Id*Id+te*te);b.moveTo(Le+Jh,Uf);b.arc(Le,Uf,Jh,0,2*Math.PI,!0);++m;break;case 3:b.closePath();++m;break;case 4:p=Z[1];q=Z[2];var Mg=Z[4],Ng=6==Z.length?Z[5]:void 0;ic.geometry=Z[3];ic.feature=Zb;m in xa||(xa[m]=[]);var Wf=xa[m];Ng?Ng(h,p,q,2,Wf):(Wf[0]=h[p],Wf[1]=h[p+1],Wf.length=2);Mg(Wf,ic);++m;break;case 6:p=Z[1];q=Z[2];Ia=Z[3];r=Z[4];u=Z[5];S=f?null:
Z[6];var rf=Z[7],yu=Z[8],zu=Z[9],Au=Z[10],Bu=Z[11],jp=Z[12],Cu=Z[13],Du=Z[14],Eu=Z[15];if(16<Z.length){var kp=Z[16];var lp=Z[17];var mp=Z[18]}else kp=hi,lp=mp=!1;for(Bu&&(jp+=Va);p<q;p+=2)zj(a,b,h[p],h[p+1],Ia,r,u,S,rf,yu,zu,Au,jp,Cu,Du,Eu,kp,lp?ca:null,mp?ia:null);Gj(a,S,Zb);++m;break;case 5:var np=Z[1],op=Z[2],Lk=Z[3];S=f?null:Z[4];var Fu=Z[5],pp=Z[6],Gu=Z[7],qp=Z[8],rp=Z[9],sp=Z[10],tp=Z[11],up=Z[12],Mk=Z[13],vp=Z[14],wp=tj(h,np,op,2),xp=qp(up);if(Fu||xp<=wp){a:{var Ni=void 0,yp=void 0,Xf=void 0,
sf=h,ve=np,zp=op,Ap=up,Hu=qp,Bp=(wp-xp)*vj[a.s[Mk].textAlign],Iu=Gu,Nk=[],Kh=sf[ve]>sf[zp-2],Cp=Ap.length,Lh=sf[ve],Mh=sf[ve+1];ve+=2;for(var Og=sf[ve],Pg=sf[ve+1],Ok=0,Oi=Math.sqrt(Math.pow(Og-Lh,2)+Math.pow(Pg-Mh,2)),Yf="",Pk=0,Pi=0;Pi<Cp;++Pi){yp=Kh?Cp-Pi-1:Pi;var Qk=Ap.charAt(yp);Yf=Kh?Qk+Yf:Yf+Qk;var Qg=Hu(Yf)-Pk;Pk+=Qg;for(var Dp=Bp+Qg/2;ve<zp-2&&Ok+Oi<Dp;)Lh=Og,Mh=Pg,ve+=2,Og=sf[ve],Pg=sf[ve+1],Ok+=Oi,Oi=Math.sqrt(Math.pow(Og-Lh,2)+Math.pow(Pg-Mh,2));var Ju=Dp-Ok,Rg=Math.atan2(Pg-Mh,Og-Lh);
Kh&&(Rg+=0<Rg?-Math.PI:Math.PI);if(void 0!==Ni){var Qi=Rg-Ni;Qi+=Qi>Math.PI?-2*Math.PI:Qi<-Math.PI?2*Math.PI:0;if(Math.abs(Qi)>Iu){var Sg=null;break a}}var Ep=Ju/Oi,Fp=ya(Lh,Og,Ep),Gp=ya(Mh,Pg,Ep);Ni==Rg?(Kh&&(Xf[0]=Fp,Xf[1]=Gp,Xf[2]=Qg/2),Xf[4]=Yf):(Yf=Qk,Pk=Qg,Xf=[Fp,Gp,Qg/2,Rg,Yf],Kh?Nk.unshift(Xf):Nk.push(Xf),Ni=Rg);Bp+=Qg}Sg=Nk}if(Sg){var Ri;if(sp){var Zf=0;for(Ri=Sg.length;Zf<Ri;++Zf){var ee=Sg[Zf];var Rk=ee[4];var Ne=a.Y(Rk,Mk,"",sp);r=ee[2]+tp;u=Lk*Ne.height+2*(.5-Lk)*tp-rp;zj(a,b,ee[0],ee[1],
Ne,r,u,S,Ne.height,1,0,0,ee[3],vp,!1,Ne.width,hi,null,null)}}if(pp)for(Zf=0,Ri=Sg.length;Zf<Ri;++Zf)ee=Sg[Zf],Rk=ee[4],Ne=a.Y(Rk,Mk,pp,""),r=ee[2],u=Lk*Ne.height-rp,zj(a,b,ee[0],ee[1],Ne,r,u,S,Ne.height,1,0,0,ee[3],vp,!1,Ne.width,hi,null,null)}}Gj(a,S,Zb);++m;break;case 7:if(void 0!==f){Zb=Z[1];var Hp=f(Zb);if(Hp)return Hp}++m;break;case 8:Xa?ta++:a.Xa(b);++m;break;case 9:p=Z[1];q=Z[2];var Nh=h[p];var Oh=h[p+1];A=Nh+.5|0;E=Oh+.5|0;if(A!==v||E!==z)b.moveTo(Nh,Oh),v=A,z=E;for(p+=2;p<q;p+=2)if(Nh=h[p],
Oh=h[p+1],A=Nh+.5|0,E=Oh+.5|0,p==q-2||A!==v||E!==z)b.lineTo(Nh,Oh),v=A,z=E;++m;break;case 10:ca=Z;a.O=Z[2];ta&&(a.Xa(b),ta=0,la&&(b.stroke(),la=0));b.fillStyle=Z[1];++m;break;case 11:ia=Z;la&&(b.stroke(),la=0);yj(b,Z);++m;break;case 12:Xa?la++:b.stroke();++m;break;default:++m}}ta&&a.Xa(b);la&&b.stroke()}k.Na=function(a,b,c,d){this.$=c;Hj(this,a,b,d,this.a,void 0,void 0)};function Ij(a,b,c,d,e,f,g){a.$=d;return Hj(a,b,c,e,a.b,f,g)}
function Jj(a){var b=a.b;b.reverse();var c,d=b.length,e=-1;for(c=0;c<d;++c){var f=b[c];var g=f[0];if(7==g)e=c;else if(0==g){f[2]=c;f=a.b;for(g=c;e<g;){var h=f[e];f[e]=f[g];f[g]=h;++e;--g}e=-1}}}
k.Oa=function(a,b){var c=this.state;a?(a=a.b,c.fillStyle=zi(a?a:ei)):c.fillStyle=void 0;b?(a=b.a,c.strokeStyle=zi(a?a:gi),a=b.f,c.lineCap=void 0!==a?a:"round",a=b.g,c.lineDash=a?a.slice():fi,a=b.i,c.lineDashOffset=a?a:0,a=b.j,c.lineJoin=void 0!==a?a:"round",a=b.c,c.lineWidth=void 0!==a?a:1,b=b.l,c.miterLimit=void 0!==b?b:10,c.lineWidth>this.Wa&&(this.Wa=c.lineWidth,this.i=null)):(c.strokeStyle=void 0,c.lineCap=void 0,c.lineDash=null,c.lineDashOffset=void 0,c.lineJoin=void 0,c.lineWidth=void 0,c.miterLimit=
void 0)};k.Ah=function(a,b){var c=a.fillStyle;a=[10,c];"string"!==typeof c&&(b=b.G(),a.push([b[0],b[3]]));this.a.push(a)};k.pd=function(a){this.a.push([11,a.strokeStyle,a.lineWidth*this.pixelRatio,a.lineCap,a.lineJoin,a.miterLimit,Aj(this,a.lineDash),a.lineDashOffset*this.pixelRatio])};function Kj(a,b,c,d){var e=b.fillStyle;if("string"!==typeof e||b.Pk!=e)c.call(a,b,d),b.Pk=e}
function Lj(a,b,c){var d=b.strokeStyle,e=b.lineCap,f=b.lineDash,g=b.lineDashOffset,h=b.lineJoin,l=b.lineWidth,m=b.miterLimit;if(b.Vk!=d||b.Qk!=e||f!=b.Fh&&!jc(b.Fh,f)||b.Rk!=g||b.Sk!=h||b.Tk!=l||b.Uk!=m)c.call(a,b),b.Vk=d,b.Qk=e,b.Fh=f,b.Rk=g,b.Sk=h,b.Tk=l,b.Uk=m}function Fj(a,b){a.qa[2]=a.a.length;a.qa=null;a.T[2]=a.b.length;a.T=null;b=[7,b];a.a.push(b);a.b.push(b)}k.bf=ea;function Cj(a){a.i||(a.i=Ga(a.Ea),0<a.Wa&&Fa(a.i,a.resolution*(a.Wa+1)/2,a.i));return a.i};function Mj(a,b,c,d,e,f){wj.call(this,a,b,c,d,e,f);this.M=this.V=this.B=null;this.N=this.o=this.v=this.s=this.l=this.C=this.D=this.j=this.f=this.c=this.g=void 0}w(Mj,wj);
Mj.prototype.yc=function(a,b){if(this.M){Ej(this,b);var c=a.da(),d=this.coordinates.length;a=Bj(this,c,0,c.length,a.pa(),!1,!1);this.a.push([6,d,a,this.M,this.g,this.c,this.B,this.f,this.j,this.D,this.C,this.l,this.s,this.v*this.pixelRatio,this.o,this.N]);this.b.push([6,d,a,this.V,this.g,this.c,this.B,this.f,this.j,this.D,this.C,this.l,this.s,this.v,this.o,this.N]);Fj(this,b)}};
Mj.prototype.wc=function(a,b){if(this.M){Ej(this,b);var c=a.da(),d=this.coordinates.length;a=Bj(this,c,0,c.length,a.pa(),!1,!1);this.a.push([6,d,a,this.M,this.g,this.c,this.B,this.f,this.j,this.D,this.C,this.l,this.s,this.v*this.pixelRatio,this.o,this.N]);this.b.push([6,d,a,this.V,this.g,this.c,this.B,this.f,this.j,this.D,this.C,this.l,this.s,this.v,this.o,this.N]);Fj(this,b)}};
Mj.prototype.bf=function(){Jj(this);this.c=this.g=void 0;this.M=this.V=null;this.N=this.o=this.s=this.l=this.C=this.D=this.j=this.v=this.f=void 0};Mj.prototype.Zb=function(a,b){var c=a.Vc(),d=a.oc(),e=a.Eg(),f=a.Y(1),g=a.bd();this.g=c[0];this.c=c[1];this.B=b;this.V=e;this.M=f;this.f=d[1];this.j=a.i;this.D=g[0];this.C=g[1];this.l=a.s;this.s=a.f;this.v=a.a;this.o=a.v;this.N=d[0]};function Nj(a,b,c,d,e,f){wj.call(this,a,b,c,d,e,f)}w(Nj,wj);function Oj(a,b,c,d,e){var f=a.coordinates.length;b=Bj(a,b,c,d,e,!1,!1);f=[9,f,b];a.a.push(f);a.b.push(f);return d}Nj.prototype.uc=function(a,b){var c=this.state,d=c.lineWidth;void 0!==c.strokeStyle&&void 0!==d&&(Lj(this,c,this.pd),Ej(this,b),this.b.push([11,c.strokeStyle,c.lineWidth,c.lineCap,c.lineJoin,c.miterLimit,c.lineDash,c.lineDashOffset],[1]),c=a.da(),Oj(this,c,0,c.length,a.pa()),this.b.push([12]),Fj(this,b))};
Nj.prototype.vc=function(a,b){var c=this.state,d=c.lineWidth;if(void 0!==c.strokeStyle&&void 0!==d){Lj(this,c,this.pd);Ej(this,b);this.b.push([11,c.strokeStyle,c.lineWidth,c.lineCap,c.lineJoin,c.miterLimit,c.lineDash,c.lineDashOffset],[1]);c=a.pb();d=a.da();a=a.pa();var e=0,f;var g=0;for(f=c.length;g<f;++g)e=Oj(this,d,e,c[g],a);this.b.push([12]);Fj(this,b)}};Nj.prototype.bf=function(){var a=this.state;void 0!=a.$d&&a.$d!=this.coordinates.length&&this.a.push([12]);Jj(this);this.state=null};
Nj.prototype.pd=function(a){void 0!=a.$d&&a.$d!=this.coordinates.length&&(this.a.push([12]),a.$d=this.coordinates.length);a.$d=0;wj.prototype.pd.call(this,a);this.a.push([1])};function Pj(a,b,c,d,e,f){wj.call(this,a,b,c,d,e,f)}w(Pj,wj);function Qj(a,b,c,d,e){var f=a.state,g=void 0!==f.fillStyle;f=void 0!=f.strokeStyle;var h=d.length,l=[1];a.a.push(l);a.b.push(l);for(l=0;l<h;++l){var m=d[l],n=a.coordinates.length;c=Bj(a,b,c,m,e,!0,!f);c=[9,n,c];a.a.push(c);a.b.push(c);f&&(c=[3],a.a.push(c),a.b.push(c));c=m}b=[8];a.b.push(b);g&&a.a.push(b);f&&(g=[12],a.a.push(g),a.b.push(g));return c}
Pj.prototype.cc=function(a,b){var c=this.state,d=c.strokeStyle;if(void 0!==c.fillStyle||void 0!==d){Rj(this,a);Ej(this,b);this.b.push([10,xi(ei)]);void 0!==c.strokeStyle&&this.b.push([11,c.strokeStyle,c.lineWidth,c.lineCap,c.lineJoin,c.miterLimit,c.lineDash,c.lineDashOffset]);var e=a.da();d=this.coordinates.length;Bj(this,e,0,e.length,a.pa(),!1,!1);a=[1];d=[2,d];this.a.push(a,d);this.b.push(a,d);a=[8];this.b.push(a);void 0!==c.fillStyle&&this.a.push(a);void 0!==c.strokeStyle&&(c=[12],this.a.push(c),
this.b.push(c));Fj(this,b)}};Pj.prototype.zc=function(a,b){var c=this.state;Rj(this,a);Ej(this,b);this.b.push([10,xi(ei)]);void 0!==c.strokeStyle&&this.b.push([11,c.strokeStyle,c.lineWidth,c.lineCap,c.lineJoin,c.miterLimit,c.lineDash,c.lineDashOffset]);c=a.pb();var d=a.Xb();Qj(this,d,0,c,a.pa());Fj(this,b)};
Pj.prototype.xc=function(a,b){var c=this.state,d=c.strokeStyle;if(void 0!==c.fillStyle||void 0!==d){Rj(this,a);Ej(this,b);this.b.push([10,xi(ei)]);void 0!==c.strokeStyle&&this.b.push([11,c.strokeStyle,c.lineWidth,c.lineCap,c.lineJoin,c.miterLimit,c.lineDash,c.lineDashOffset]);c=a.td();d=Ii(a);a=a.pa();var e=0,f;var g=0;for(f=c.length;g<f;++g)e=Qj(this,d,e,c[g],a);Fj(this,b)}};
Pj.prototype.bf=function(){Jj(this);this.state=null;var a=this.ob;if(0!==a){var b=this.coordinates,c;var d=0;for(c=b.length;d<c;++d)b[d]=a*Math.round(b[d]/a)}};function Rj(a,b){var c=a.state;void 0!==c.fillStyle&&Kj(a,c,a.Ah,b);void 0!==c.strokeStyle&&Lj(a,c,a.pd)};function Sj(a,b,c,d,e,f){wj.call(this,a,b,c,d,e,f);this.ta="";this.l=this.D=0;this.C=void 0;this.B=0;this.c=null;this.o={};this.g=null;this.ab={};this.f={};this.s={};this.V=this.v=this.j="";for(this.ua={};di(ii);)ii.pop()}w(Sj,wj);
Sj.prototype.Wb=function(a,b){var c=this.c,d=this.g,e=this.f;if(""!==this.ta&&e&&(c||d)){c=this.coordinates.length;var f=a.S();d=null;var g=2,h=2;if("line"===e.placement){if(!hb(Cj(this),a.G()))return;d=a.da();h=a.pa();if("LineString"==f)var l=[d.length];else if("MultiLineString"==f)l=a.pb();else if("Polygon"==f)l=a.pb().slice(0,1);else if("MultiPolygon"==f)for(a=a.td(),l=[],g=0,f=a.length;g<f;++g)l.push(a[g][0]);Ej(this,b);a=e.textAlign;var m=0,n;f=0;for(var p=l.length;f<p;++f){if(void 0==a){for(var q,
r,u=void 0,v=void 0,z=g=r=q=void 0,A=n=m,E=0,S=0,Ia=m;m<l[f];m+=h){var ta=d[m],la=d[m+1];void 0!==r&&(r=ta-r,q=la-q,g=Math.sqrt(r*r+q*q),void 0!==v&&(S+=z,u=Math.acos((v*r+u*q)/(z*g)),u>e.maxAngle&&(S>E&&(E=S,n=Ia,A=m),S=0,Ia=m-h)),z=g,v=r,u=q);r=ta;q=la}g=S+g>E?[Ia,m]:[n,A];m=g[0];n=g[1]}else n=l[f];for(g=m;g<n;g+=h)this.coordinates.push(d[g],d[g+1]);g=this.coordinates.length;m=l[f];Tj(this,c,g,this.N);c=g}}else{l=this.Y(this.ta,this.j,this.v,this.V);p=l.width/this.pixelRatio;switch(f){case "Point":case "MultiPoint":d=
a.da();g=d.length;break;case "LineString":d=a.Fe();break;case "Circle":d=a.xa();break;case "MultiLineString":d=a.Ge();g=d.length;break;case "Polygon":d=a.Td();if(!e.overflow&&d[2]/this.resolution<p)return;h=3;break;case "MultiPolygon":n=Ji(a);d=[];g=0;for(f=n.length;g<f;g+=3)(e.overflow||n[g+2]/this.resolution>=p)&&d.push(n[g],n[g+1]);g=d.length;if(0==g)return}g=Bj(this,d,0,g,h,!1,!1);Ej(this,b);if(e.backgroundFill||e.backgroundStroke)this.Oa(e.backgroundFill,e.backgroundStroke),Kj(this,this.state,
this.Ah,a),Lj(this,this.state,this.pd);Uj(this,l,c,g)}Fj(this,b)}};
Sj.prototype.Y=function(a,b,c,d){var e=d+b+a+c+this.pixelRatio;if(!ii.a.hasOwnProperty(e)){var f=d?this.ab[d]||this.g:null,g=c?this.o[c]||this.c:null,h=this.s[b]||this.f,l=h.scale*this.pixelRatio,m=vj[h.textAlign||"center"];b=d&&f.lineWidth?f.lineWidth:0;a=a.split("\n");var n=a.length,p=[],q=h.font;var r=a.length;var u=0;var v;for(v=0;v<r;++v){var z=pi(q,a[v]);u=Math.max(u,z);p.push(z)}r=u;q=oi(h.font);r=hg(Math.ceil((r+b)*l),Math.ceil((q*n+b)*l));u=r.canvas;ii.set(e,u);1!=l&&r.scale(l,l);r.font=
h.font;d&&(r.strokeStyle=f.strokeStyle,r.lineWidth=b*(kd?l:1),r.lineCap=f.lineCap,r.lineJoin=f.lineJoin,r.miterLimit=f.miterLimit,od&&f.lineDash.length&&(r.setLineDash(f.lineDash),r.lineDashOffset=f.lineDashOffset));c&&(r.fillStyle=g.fillStyle);r.textBaseline="middle";r.textAlign="center";f=.5-m;g=m*u.width/l+f*b;if(d)for(d=0;d<n;++d)r.strokeText(a[d],g+f*p[d],.5*(b+q)+d*q);if(c)for(d=0;d<n;++d)r.fillText(a[d],g+f*p[d],.5*(b+q)+d*q)}return ii.get(e)};
function Uj(a,b,c,d){var e=a.f,f=a.g,g=a.pixelRatio,h=vj[e.textAlign||"center"],l=vj[e.textBaseline];f=f&&f.lineWidth?f.lineWidth:0;h=h*b.width/g+2*(.5-h)*f;l=l*b.height/g+2*(.5-l)*f;a.a.push([6,c,d,b,(h-a.D)*g,(l-a.l)*g,a.N,b.height,1,0,0,a.C,a.B,1,!0,b.width,e.padding==hi?hi:e.padding.map(function(a){return a*g}),!!e.backgroundFill,!!e.backgroundStroke]);a.b.push([6,c,d,b,(h-a.D)*g,(l-a.l)*g,a.N,b.height,1,0,0,a.C,a.B,1/g,!0,b.width,e.padding,!!e.backgroundFill,!!e.backgroundStroke])}
function Tj(a,b,c,d){var e=a.g,f=a.f,g=a.c,h=a.V;e&&(h in a.ab||(a.ab[h]={strokeStyle:e.strokeStyle,lineCap:e.lineCap,lineDashOffset:e.lineDashOffset,lineWidth:e.lineWidth,lineJoin:e.lineJoin,miterLimit:e.miterLimit,lineDash:e.lineDash}));var l=a.j;a.j in a.s||(a.s[a.j]={font:f.font,textAlign:f.textAlign||"center",scale:f.scale});var m=a.v;g&&(m in a.o||(a.o[m]={fillStyle:g.fillStyle}));var n=a.pixelRatio;g=vj[f.textBaseline];var p=a.l*n,q=a.ta,r=f.font,u=f.scale;e=e?e.lineWidth*u/2:0;var v=a.ua[r];
v||(a.ua[r]=v={});a.a.push([5,b,c,g,d,f.overflow,m,f.maxAngle,function(a){var b=v[a];b||(b=v[a]=pi(r,a));return b*u*n},p,h,e*n,q,l,1]);a.b.push([5,b,c,g,d,f.overflow,m,f.maxAngle,function(a){var b=v[a];b||(b=v[a]=pi(r,a));return b*u},p,h,e,q,l,1/n])}
Sj.prototype.nb=function(a,b){var c,d;if(a){this.N=b;(d=a.Fa())?(b=this.c,b||(b=this.c={}),b.fillStyle=zi(d.b||ei)):b=this.c=null;if(c=a.Ga()){d=this.g;d||(d=this.g={});var e=c.g,f=c.i,g=c.c,h=c.l;d.lineCap=c.f||"round";d.lineDash=e?e.slice():fi;d.lineDashOffset=void 0===f?0:f;d.lineJoin=c.j||"round";d.lineWidth=void 0===g?1:g;d.miterLimit=void 0===h?10:h;d.strokeStyle=zi(c.a||gi)}else d=this.g=null;c=this.f;e=a.a||"10px sans-serif";ni(e);f=a.b;c.overflow=a.v;c.font=e;c.maxAngle=a.s;c.placement=a.o;
c.textAlign=a.f;c.textBaseline=a.j||"middle";c.backgroundFill=a.N;c.backgroundStroke=a.D;c.padding=a.C||hi;c.scale=void 0===f?1:f;e=a.g;f=a.c;g=a.l;h=a.i;this.ta=a.Ka()||"";this.D=void 0===e?0:e;this.l=void 0===f?0:f;this.C=void 0===g?!1:g;this.B=void 0===h?0:h;this.V=d?("string"==typeof d.strokeStyle?d.strokeStyle:x(d.strokeStyle))+d.lineCap+d.lineDashOffset+"|"+d.lineWidth+d.lineJoin+d.miterLimit+"["+d.lineDash.join()+"]":"";this.j=c.font+c.scale+(c.textAlign||"?");this.v=b?"string"==typeof b.fillStyle?
b.fillStyle:"|"+x(b.fillStyle):""}else this.ta=""};function Vj(a,b,c,d,e,f,g){this.a=f;this.g=null;this.o=a;this.c=b;this.l=e;this.s=d;this.v=c;this.i=g;this.b={};this.f=hg(1,1);this.j=We()}w(Vj,sj);var Wj={0:[[!0]]};function Xj(a,b,c){var d,e=Math.floor(a.length/2);if(b>=e)for(d=e;d<b;d++)a[d][c]=!0;else if(b<e)for(d=b+1;d<e;d++)a[d][c]=!0}
function Yj(a){if(void 0!==Wj[a])return Wj[a];for(var b=2*a+1,c=Array(b),d=0;d<b;d++)c[d]=Array(b);b=a;for(var e=d=0;b>=d;)Xj(c,a+b,a+d),Xj(c,a+d,a+b),Xj(c,a-d,a+b),Xj(c,a-b,a+d),Xj(c,a-b,a-d),Xj(c,a-d,a-b),Xj(c,a+d,a-b),Xj(c,a+b,a-d),d++,e+=1+2*d,0<2*(e-b)+1&&(--b,e+=1-2*b);return Wj[a]=c}k=Vj.prototype;k.Vb=function(a){var b=null;this.a&&(a?(b=this.g,b[4]++):(b=this.g=Da(),b.push(1)));return b};function Zj(a){for(var b in a.b){var c=a.b[b],d;for(d in c)c[d].bf()}}
k.wa=function(a,b,c,d,e,f,g){function h(a){for(var b=n.getImageData(0,0,l,l).data,c=0;c<l;c++)for(var d=0;d<l;d++)if(q[c][d]&&0<b[4*(d*l+c)+3]){if(!r||"Image"!=z&&"Text"!=z||-1!==r.indexOf(a))var e=f(a);if(e)return e;n.clearRect(0,0,l,l);return}}d=Math.round(d);var l=2*d+1,m=ef(this.j,d+.5,d+.5,1/b,-1/b,-c,-a[0],-a[1]),n=this.f;n.canvas.width!==l||n.canvas.height!==l?(n.canvas.width=l,n.canvas.height=l):n.clearRect(0,0,l,l);if(void 0!==this.i){var p=Da();Ea(p,a);Fa(p,b*(this.i+d),p)}var q=Yj(d),r;
this.a&&(r=this.a.all().map(function(a){return a.value}));a=Object.keys(this.b).map(Number);a.sort(dc);for(b=a.length-1;0<=b;--b){var u=a[b].toString();var v=this.b[u];for(d=uj.length-1;0<=d;--d){var z=uj[d];var A=v[z];if(void 0!==A)if(!g||"Image"!=z&&"Text"!=z){if(A=Ij(A,n,m,c,e,h,p))return A}else{var E=g[u];E?E.push(A,m.slice(0)):g[u]=[A,m.slice(0)]}}}};function ak(a,b){var c=a.c;a=c[0];var d=c[1],e=c[2];c=c[3];a=[a,d,a,c,e,c,e,d];Te(a,0,8,2,b,a);return a}
k.Ja=function(a,b){var c=void 0!==a?a.toString():"0";a=this.b[c];void 0===a&&(a={},this.b[c]=a);c=a[b];void 0===c&&(c=new bk[b](this.o,this.c,this.v,this.s,this.l,this.a),a[b]=c);return c};k.yg=function(){return nb(this.b)};
k.Na=function(a,b,c,d,e,f){var g=Object.keys(this.b).map(Number);g.sort(dc);a.save();var h=ak(this,b);a.beginPath();a.moveTo(h[0],h[1]);a.lineTo(h[2],h[3]);a.lineTo(h[4],h[5]);a.lineTo(h[6],h[7]);a.clip();e=e?e:uj;var l,m;h=0;for(l=g.length;h<l;++h){var n=g[h].toString();var p=this.b[n];var q=0;for(m=e.length;q<m;++q){var r=e[q];var u=p[r];void 0!==u&&(!f||"Image"!=r&&"Text"!=r?u.Na(a,b,c,d):(r=f[n])?r.push(u,b.slice(0)):f[n]=[u,b.slice(0)])}}a.restore()};
var bk={Circle:Pj,Default:wj,Image:Mj,LineString:Nj,Polygon:Pj,Text:Sj};function ck(a,b){return x(a)-x(b)}function dk(a,b){a=.5*a/b;return a*a}function ek(a,b,c,d,e,f){var g=!1,h;if(h=c.Y()){var l=h.gf();2==l||3==l?h.Yj(e,f):(0==l&&h.load(),h.gi(e,f),g=!0)}if(e=(0,c.cb)(b))if(d=e.Wd(d),c.Ie())fk(a,d,c,b);else(0,gk[d.S()])(a,d,c,b);return g}function fk(a,b,c,d){if("GeometryCollection"==b.S()){b=b.vd();for(var e=0,f=b.length;e<f;++e)fk(a,b[e],c,d)}else a.Ja(c.Ba(),"Default").Hh(b,d,c.Ie())}
var gk={Point:function(a,b,c,d){var e=c.Y();if(e){if(2!=e.gf())return;var f=a.Ja(c.Ba(),"Image");f.Zb(e,a.Vb(!1));f.yc(b,d)}if(f=c.Ka())c=a.Ja(c.Ba(),"Text"),c.nb(f,a.Vb(!!e)),c.Wb(b,d)},LineString:function(a,b,c,d){var e=c.Ga();if(e){var f=a.Ja(c.Ba(),"LineString");f.Oa(null,e);f.uc(b,d)}if(e=c.Ka())c=a.Ja(c.Ba(),"Text"),c.nb(e,a.Vb(!1)),c.Wb(b,d)},Polygon:function(a,b,c,d){var e=c.Fa(),f=c.Ga();if(e||f){var g=a.Ja(c.Ba(),"Polygon");g.Oa(e,f);g.zc(b,d)}if(e=c.Ka())c=a.Ja(c.Ba(),"Text"),c.nb(e,a.Vb(!1)),
c.Wb(b,d)},MultiPoint:function(a,b,c,d){var e=c.Y();if(e){if(2!=e.gf())return;var f=a.Ja(c.Ba(),"Image");f.Zb(e,a.Vb(!1));f.wc(b,d)}if(f=c.Ka())c=a.Ja(c.Ba(),"Text"),c.nb(f,a.Vb(!!e)),c.Wb(b,d)},MultiLineString:function(a,b,c,d){var e=c.Ga();if(e){var f=a.Ja(c.Ba(),"LineString");f.Oa(null,e);f.vc(b,d)}if(e=c.Ka())c=a.Ja(c.Ba(),"Text"),c.nb(e,a.Vb(!1)),c.Wb(b,d)},MultiPolygon:function(a,b,c,d){var e=c.Fa(),f=c.Ga();if(f||e){var g=a.Ja(c.Ba(),"Polygon");g.Oa(e,f);g.xc(b,d)}if(e=c.Ka())c=a.Ja(c.Ba(),
"Text"),c.nb(e,a.Vb(!1)),c.Wb(b,d)},GeometryCollection:function(a,b,c,d){b=b.a;var e;var f=0;for(e=b.length;f<e;++f)(0,gk[b[f].S()])(a,b[f],c,d)},Circle:function(a,b,c,d){var e=c.Fa(),f=c.Ga();if(e||f){var g=a.Ja(c.Ba(),"Circle");g.Oa(e,f);g.cc(b,d)}if(e=c.Ka())c=a.Ja(c.Ba(),"Text"),c.nb(e,a.Vb(!1)),c.Wb(b,d)}};function hk(a){Xi.call(this,a);this.f=a.D?rj.Jc(9):null;this.i=!1;this.N=-1;this.o=NaN;this.l=Da();this.c=this.v=null;this.j=!0;this.context=hg();y(ii,"clear",this.Vi,this)}w(hk,Xi);hk.handles=function(a,b){return"canvas"===a&&"VECTOR"===b.S()};hk.create=function(a,b){return new hk(b)};k=hk.prototype;k.ia=function(){Mc(ii,"clear",this.Vi,this);Xi.prototype.ia.call(this)};
k.df=function(a,b,c){var d=a.extent,e=a.pixelRatio,f=b.Te?a.skippedFeatureUids:{},g=a.viewState,h=g.projection,l=g.rotation,m=h.G(),n=this.a.ha(),p=$i(this,a,0);Zi(this,"precompose",c,a,p);var q=b.extent;(g=void 0!==q)&&Yi(c,a,q);var r=this.c;if(r&&!r.yg()){this.f&&this.f.clear();var u=q=0,v=1!==b.opacity,z=Tc(this.a,"render");if(v||z){var A=c.canvas.width;var E=c.canvas.height;if(l){var S=Math.round(Math.sqrt(A*A+E*E));q=(S-A)/2;u=(S-E)/2;A=E=S}this.context.canvas.width=A;this.context.canvas.height=
E;A=this.context}else A=c;E=A.globalAlpha;v||(A.globalAlpha=b.opacity);A!=c&&A.translate(q,u);S=a.size[0]*e;e*=a.size[1];qi(A,-l,S/2,e/2);r.Na(A,p,l,f);if(n.D&&h.g&&!La(m,d)){h=d[0];n=cb(m);for(var Ia=0;h<m[0];)--Ia,p=n*Ia,p=$i(this,a,p),r.Na(A,p,l,f),h+=n;Ia=0;for(h=d[2];h>m[2];)++Ia,p=n*Ia,p=$i(this,a,p),r.Na(A,p,l,f),h-=n;p=$i(this,a,0)}qi(A,l,S/2,e/2);A!=c&&(z&&Zi(this,"render",A,a,p),v?(d=c.globalAlpha,c.globalAlpha=b.opacity,c.drawImage(A.canvas,-q,-u),c.globalAlpha=d):c.drawImage(A.canvas,
-q,-u),A.translate(-q,-u));v||(A.globalAlpha=E)}g&&c.restore();this.pf(c,a,b,p)};k.wa=function(a,b,c,d,e){if(this.c){var f=this.a,g={};return this.c.wa(a,b.viewState.resolution,b.viewState.rotation,c,{},function(a){var b=x(a).toString();if(!(b in g))return g[b]=!0,d.call(e,a,f)},null)}};k.Vi=function(){var a=this.a;a.Jb()&&this.c&&a.u()};k.Wi=function(){Mi(this)};
k.$c=function(a){var b=this.a,c=b.ha();Ui(a,c);var d=a.viewHints[0],e=a.viewHints[1],f=b.ca,g=b.ra;if(!this.i&&!f&&d||!g&&e)return!0;f=a.extent;var h=a.viewState;g=h.projection;var l=h.resolution,m=a.pixelRatio;d=b.g;var n=b.f;e=b.get(ik);void 0===e&&(e=ck);f=Fa(f,n*l);n=h.projection.G();c.D&&h.projection.g&&!La(n,a.extent)&&(a=Math.max(cb(f)/2,cb(n)),f[0]=n[0]-a,f[2]=n[2]+a);if(!this.i&&this.o==l&&this.N==d&&this.v==e&&La(this.l,f))return this.j=!1,!0;this.c=null;this.i=!1;var p=new Vj(.5*l/m,f,
l,m,c.$,this.f,b.f);c.ae(f,l,g);a=function(a){var c=a.ib();if(c)var d=c.call(a,l);else(c=b.ib())&&(d=c(a,l));if(d){if(d){c=!1;if(Array.isArray(d))for(var e=0,f=d.length;e<f;++e)c=ek(p,a,d[e],dk(l,m),this.Wi,this)||c;else c=ek(p,a,d,dk(l,m),this.Wi,this);a=c}else a=!1;this.i=this.i||a}}.bind(this);if(e){var q=[];c.ec(f,function(a){q.push(a)},this);q.sort(e);c=0;for(g=q.length;c<g;++c)a(q[c])}else c.ec(f,a,this);Zj(p);this.o=l;this.N=d;this.v=e;this.l=f;this.c=p;return this.j=!0};function jk(a){this.context=null;mj.call(this,a);this.N=a.D?rj.Jc(9):null;this.D=!1;this.ca=We();this.O="vector"==a.l?1:0;y(ii,"clear",this.Xi,this)}w(jk,mj);jk.handles=function(a,b){return"canvas"===a&&"VECTOR_TILE"===b.S()};jk.create=function(a,b){return new jk(b)};var kk={image:["Polygon","Circle","LineString","Image","Text"],hybrid:["Polygon","LineString"]},lk={image:["Default"],hybrid:["Image","Text","Default"],vector:uj};k=jk.prototype;k.ia=function(){Mc(ii,"clear",this.Xi,this);mj.prototype.ia.call(this)};
k.$c=function(a,b){var c=this.a,d=c.g;this.B!=d&&(this.f.length=0,c=c.l,this.context||"vector"==c||(this.context=hg()),this.context&&"vector"==c&&(this.context=null));this.B=d;return mj.prototype.$c.apply(this,arguments)};
k.Sf=function(a,b,c,d,e,f,g,h,l){var m=a,n=this.a,p=b.pixelRatio,q=b.viewState.projection,r=n.g,u=n.get(ik)||null,v=mk(m,n);if(v.Be||v.wf!=r||v.eh!=u){var z=n.ha(),A=z.tileGrid,E=z.eb(q),S=E.Ta(m.ya[0]);E=E.Ma(m.l);for(var Ia=0,ta=m.a.length;Ia<ta;++Ia){var la=m.c[m.a[Ia]];if(3!=la.getState()){var ca=A.Ma(la.ya),ia=gb(E,ca),xa=Sa(ca,ia)?null:Fa(ia,n.f*S),Va=la.o,ic=!1;Xb(q,Va)||(ic=!0,la.vg(q));v.Be=!1;ia=new Vj(0,ia,S,p,z.s,this.N,n.f);var Xa=dk(S,p),Z=la.a;u&&u!==v.eh&&Z.sort(u);for(var Zb,Le=0,
Uf=Z.length;Le<Uf;++Le)if(Zb=Z[Le],ic&&("tile-pixels"==Va.a&&(Va.Sj(ca),Va.Si(la.G())),Zb.U().mb(Va,q)),!xa||hb(xa,Zb.U().G())){var Id=void 0,te=Zb.ib();te?Id=te.call(Zb,S):(te=n.ib())&&(Id=te(Zb,S));if(Id){te=Xa;var Jh=ia;if(Id){var Mg=!1;if(Array.isArray(Id))for(var Ng=0,Wf=Id.length;Ng<Wf;++Ng)Mg=ek(Jh,Zb,Id[Ng],te,this.Yi,this)||Mg;else Mg=ek(Jh,Zb,Id,te,this.Yi,this);Zb=Mg}else Zb=!1;this.D=this.D||Zb;v.Be=v.Be||Zb}}Zj(ia);for(var rf in ia.b);ca=m.ya.toString();xa=ia;la.f[x(n)+","+ca]=xa}}v.wf=
r;v.eh=u}if(this.context){v=b;n=this.a;q=mk(m,n);r=n.g;if((p=kk[n.l])&&q.fh!==r)for(q.fh=r,z=m.l,S=z[0],q=v.pixelRatio,rf=n.ha(),A=rf.eb(v.viewState.projection),r=A.Ta(S),u=nk(m,n),v=rf.Zd(S,q,v.viewState.projection),u.canvas.width=v[0],u.canvas.height=v[1],v=A.Ma(z),z=0,A=m.a.length;z<A;++z)S=m.c[m.a[z]],3!=S.getState()&&(rf=q/r,E=Xe(this.ca),cf(E,rf,-rf),df(E,-v[0],-v[3]),ok(S,n,m.ya.toString()).Na(u,E,0,{},p));mj.prototype.Sf.apply(this,arguments)}};
k.wa=function(a,b,c,d,e){var f=b.viewState.resolution,g=b.viewState.rotation;c=void 0==c?0:c;var h=this.a,l={},m=this.f;b=h.ha().eb(b.viewState.projection);var n;var p=0;for(n=m.length;p<n;++p){var q=m[p];var r=q.l;r=b.Ma(r,this.T);var u=Fa(r,c*f,u);if(Ja(u,a)){r=0;for(var v=q.a.length;r<v;++r){var z=q.c[q.a[r]];if(3!=z.getState()){z=ok(z,h,q.ya.toString());var A=A||z.wa(a,f,g,c,{},function(a){var b=x(a).toString();if(!(b in l))return l[b]=!0,d.call(e,a,h)},null)}}}}return A};
k.Xi=function(){var a=this.a;a.Jb()&&void 0!==this.B&&a.u()};k.Yi=function(){Mi(this)};
k.pf=function(a,b,c){var d=this.a,e=d.D?{}:null,f=d.ha(),g=d.l,h=lk[g],l=b.pixelRatio,m=b.viewState.rotation,n=b.size;if(m){var p=Math.round(l*n[0]/2);var q=Math.round(l*n[1]/2);qi(a,-m,p,q)}e&&this.N.clear();l=this.f;f=f.eb(b.viewState.projection);n=[];for(var r=[],u=l.length-1;0<=u;--u){var v=l[u];if(5!=v.getState())for(var z=v.ya,A=f.Ma(z)[0]-f.Ma(v.l)[0],E=void 0,S=0,Ia=v.a.length;S<Ia;++S){var ta=v.c[v.a[S]];if(3!=ta.getState()){var la=ok(ta,d,z.toString()),ca;if(!(ca="vector"==g))a:{ca=void 0;
for(ca in la.b)for(var ia=la.b[ca],xa=0,Va=h.length;xa<Va;++xa)if(h[xa]in ia){ca=!0;break a}ca=!1}if(ca){E||(E=$i(this,b,A));ta=ta.ya[0];ca=ak(la,E);a.save();a.globalAlpha=c.opacity;ia=0;for(xa=n.length;ia<xa;++ia)Va=n[ia],ta<r[ia]&&(a.beginPath(),a.moveTo(ca[0],ca[1]),a.lineTo(ca[2],ca[3]),a.lineTo(ca[4],ca[5]),a.lineTo(ca[6],ca[7]),a.moveTo(Va[6],Va[7]),a.lineTo(Va[4],Va[5]),a.lineTo(Va[2],Va[3]),a.lineTo(Va[0],Va[1]),a.clip());la.Na(a,E,m,{},h,e);a.restore();n.push(ca);r.push(ta)}}}}if(e)for(d=
a,g=Object.keys(e).map(Number).sort(dc),h={},l=0,f=g.length;l<f;++l)for(n=e[g[l].toString()],r=0,u=n.length;r<u;)v=n[r++],z=n[r++],v.Na(d,z,m,h);m&&qi(a,m,p,q);mj.prototype.pf.apply(this,arguments)};qg("MAP_RENDERER",kj);rg([bj,mj,hk,jk]);function H(a){a=kb({},a);delete a.renderer;a.controls||(a.controls=Fg());a.interactions||(a.interactions=Zh());G.call(this,a)}w(H,G);function pk(a){Vc.call(this);a=a?a:{};this.a=null;y(this,Xc(qk),this.$m,this);this.rg(void 0!==a.tracking?a.tracking:!1)}w(pk,Vc);k=pk.prototype;k.ia=function(){this.rg(!1);Vc.prototype.ia.call(this)};
k.Dp=function(a){if(null!==a.alpha){var b=va(a.alpha);this.set(rk,b);"boolean"===typeof a.absolute&&a.absolute?this.set(sk,b):"number"===typeof a.webkitCompassHeading&&-1!=a.webkitCompassAccuracy&&this.set(sk,va(a.webkitCompassHeading))}null!==a.beta&&this.set(tk,va(a.beta));null!==a.gamma&&this.set(uk,va(a.gamma));this.u()};k.Ym=function(){return this.get(rk)};k.ll=function(){return this.get(tk)};k.ql=function(){return this.get(uk)};k.Zm=function(){return this.get(sk)};k.li=function(){return this.get(qk)};
k.$m=function(){if(qd){var a=this.li();a&&!this.a?this.a=y(window,"deviceorientation",this.Dp,this):a||null===this.a||(Gc(this.a),this.a=null)}};k.rg=function(a){this.set(qk,a)};var rk="alpha",tk="beta",uk="gamma",sk="heading",qk="tracking";function vk(a){this.i=a.opacity;this.s=a.rotateWithView;this.f=a.rotation;this.a=a.scale;this.v=a.snapToPixel}k=vk.prototype;k.hf=function(){return this.i};k.jf=function(){return this.s};k.kf=function(){return this.f};k.lf=function(){return this.a};k.Ke=function(){return this.v};k.Ed=function(a){this.i=a};k.mf=function(a){this.f=a};k.Fd=function(a){this.a=a};function wk(a){this.D=this.o=this.c=null;this.Xa=void 0!==a.fill?a.fill:null;this.oa=[0,0];this.l=a.points;this.b=void 0!==a.radius?a.radius:a.radius1;this.g=a.radius2;this.j=void 0!==a.angle?a.angle:0;this.Ya=void 0!==a.stroke?a.stroke:null;this.B=this.qa=this.C=null;this.N=a.atlasManager;xk(this,this.N);vk.call(this,{opacity:1,rotateWithView:void 0!==a.rotateWithView?a.rotateWithView:!1,rotation:void 0!==a.rotation?a.rotation:0,scale:1,snapToPixel:void 0!==a.snapToPixel?a.snapToPixel:!0})}
w(wk,vk);k=wk.prototype;k.clone=function(){var a=new wk({fill:this.Fa()?this.Fa().clone():void 0,points:this.l,radius:this.b,radius2:this.g,angle:this.j,snapToPixel:this.v,stroke:this.Ga()?this.Ga().clone():void 0,rotation:this.f,rotateWithView:this.s,atlasManager:this.N});a.Ed(this.i);a.Fd(this.a);return a};k.Vc=function(){return this.C};k.ij=function(){return this.j};k.Fa=function(){return this.Xa};k.Eg=function(){return this.D};k.Y=function(){return this.o};k.He=function(){return this.B};
k.gf=function(){return 2};k.bd=function(){return this.oa};k.jj=function(){return this.l};k.kj=function(){return this.b};k.Zh=function(){return this.g};k.oc=function(){return this.qa};k.Ga=function(){return this.Ya};k.gi=function(){};k.load=function(){};k.Yj=function(){};
function xk(a,b){var c="",d="",e=0,f=null,g=0,h=0;if(a.Ya){var l=a.Ya.a;null===l&&(l=gi);l=zi(l);h=a.Ya.c;void 0===h&&(h=1);f=a.Ya.g;g=a.Ya.i;od||(f=null,g=0);d=a.Ya.j;void 0===d&&(d="round");c=a.Ya.f;void 0===c&&(c="round");e=a.Ya.l;void 0===e&&(e=10)}var m=2*(a.b+h)+1;c={strokeStyle:l,Wj:h,size:m,lineCap:c,lineDash:f,lineDashOffset:g,lineJoin:d,miterLimit:e};if(void 0===b){var n=hg(m,m);a.o=n.canvas;b=m=a.o.width;a.Jh(c,n,0,0);a.Xa?a.D=a.o:(n=hg(c.size,c.size),a.D=n.canvas,a.Ih(c,n,0,0))}else m=
Math.round(m),(d=!a.Xa)&&(n=a.Ih.bind(a,c)),a.Ya?(e=a.Ya,void 0===e.b&&(e.b="s",e.b=e.a?"string"===typeof e.a?e.b+e.a:e.b+x(e.a).toString():e.b+"-",e.b+=","+(void 0!==e.f?e.f.toString():"-")+","+(e.g?e.g.toString():"-")+","+(void 0!==e.i?e.i:"-")+","+(void 0!==e.j?e.j:"-")+","+(void 0!==e.l?e.l.toString():"-")+","+(void 0!==e.c?e.c.toString():"-")),e=e.b):e="-",a.Xa?(f=a.Xa,void 0===f.a&&(f.a=f.b instanceof CanvasPattern||f.b instanceof CanvasGradient?x(f.b).toString():"f"+(f.b?xi(f.b):"-")),f=f.a):
f="-",a.c&&e==a.c[1]&&f==a.c[2]&&a.b==a.c[3]&&a.g==a.c[4]&&a.j==a.c[5]&&a.l==a.c[6]||(a.c=["r"+e+f+(void 0!==a.b?a.b.toString():"-")+(void 0!==a.g?a.g.toString():"-")+(void 0!==a.j?a.j.toString():"-")+(void 0!==a.l?a.l.toString():"-"),e,f,a.b,a.g,a.j,a.l]),n=b.add(a.c[0],m,m,a.Jh.bind(a,c),n),a.o=n.image,a.oa=[n.offsetX,n.offsetY],b=n.image.width,a.D=d?n.Bm:a.o;a.C=[m/2,m/2];a.qa=[m,m];a.B=[b,b]}
k.Jh=function(a,b,c,d){b.setTransform(1,0,0,1,0,0);b.translate(c,d);b.beginPath();var e=this.l;if(Infinity===e)b.arc(a.size/2,a.size/2,this.b,0,2*Math.PI,!0);else{var f=void 0!==this.g?this.g:this.b;f!==this.b&&(e*=2);for(c=0;c<=e;c++){d=2*c*Math.PI/e-Math.PI/2+this.j;var g=0===c%2?this.b:f;b.lineTo(a.size/2+g*Math.cos(d),a.size/2+g*Math.sin(d))}}this.Xa&&(c=this.Xa.b,null===c&&(c=ei),b.fillStyle=zi(c),b.fill());this.Ya&&(b.strokeStyle=a.strokeStyle,b.lineWidth=a.Wj,a.lineDash&&(b.setLineDash(a.lineDash),
b.lineDashOffset=a.lineDashOffset),b.lineCap=a.lineCap,b.lineJoin=a.lineJoin,b.miterLimit=a.miterLimit,b.stroke());b.closePath()};
k.Ih=function(a,b,c,d){b.setTransform(1,0,0,1,0,0);b.translate(c,d);b.beginPath();c=this.l;if(Infinity===c)b.arc(a.size/2,a.size/2,this.b,0,2*Math.PI,!0);else{d=void 0!==this.g?this.g:this.b;d!==this.b&&(c*=2);var e;for(e=0;e<=c;e++){var f=2*e*Math.PI/c-Math.PI/2+this.j;var g=0===e%2?this.b:d;b.lineTo(a.size/2+g*Math.cos(f),a.size/2+g*Math.sin(f))}}b.fillStyle=ei;b.fill();this.Ya&&(b.strokeStyle=a.strokeStyle,b.lineWidth=a.Wj,a.lineDash&&(b.setLineDash(a.lineDash),b.lineDashOffset=a.lineDashOffset),
b.stroke());b.closePath()};function yk(a){a=a||{};wk.call(this,{points:Infinity,fill:a.fill,radius:a.radius,snapToPixel:a.snapToPixel,stroke:a.stroke,atlasManager:a.atlasManager})}w(yk,wk);yk.prototype.clone=function(){var a=new yk({fill:this.Fa()?this.Fa().clone():void 0,stroke:this.Ga()?this.Ga().clone():void 0,radius:this.b,snapToPixel:this.v,atlasManager:this.N});a.Ed(this.i);a.Fd(this.a);return a};yk.prototype.fd=function(a){this.b=a;xk(this,this.N)};function zk(a){a=a||{};this.b=void 0!==a.color?a.color:null;this.a=void 0}zk.prototype.clone=function(){var a=this.b;return new zk({color:a&&a.slice?a.slice():a||void 0})};zk.prototype.g=function(){return this.b};zk.prototype.c=function(a){this.b=a;this.a=void 0};function Ak(a){a=a||{};this.a=void 0!==a.color?a.color:null;this.f=a.lineCap;this.g=void 0!==a.lineDash?a.lineDash:null;this.i=a.lineDashOffset;this.j=a.lineJoin;this.l=a.miterLimit;this.c=a.width;this.b=void 0}k=Ak.prototype;k.clone=function(){var a=this.a;return new Ak({color:a&&a.slice?a.slice():a||void 0,lineCap:this.f,lineDash:this.g?this.g.slice():void 0,lineDashOffset:this.i,lineJoin:this.j,miterLimit:this.l,width:this.c})};k.pp=function(){return this.a};k.vl=function(){return this.f};
k.qp=function(){return this.g};k.wl=function(){return this.i};k.xl=function(){return this.j};k.Dl=function(){return this.l};k.rp=function(){return this.c};k.sp=function(a){this.a=a;this.b=void 0};k.yq=function(a){this.f=a;this.b=void 0};k.setLineDash=function(a){this.g=a;this.b=void 0};k.zq=function(a){this.i=a;this.b=void 0};k.Aq=function(a){this.j=a;this.b=void 0};k.Eq=function(a){this.l=a;this.b=void 0};k.Kq=function(a){this.c=a;this.b=void 0};function Bk(a){a=a||{};this.Uc=null;this.cb=Ck;void 0!==a.geometry&&this.Va(a.geometry);this.Xa=void 0!==a.fill?a.fill:null;this.M=void 0!==a.image?a.image:null;this.pc=void 0!==a.renderer?a.renderer:null;this.Ya=void 0!==a.stroke?a.stroke:null;this.ta=void 0!==a.text?a.text:null;this.bk=a.zIndex}k=Bk.prototype;
k.clone=function(){var a=this.U();a&&a.clone&&(a=a.clone());return new Bk({geometry:a,fill:this.Fa()?this.Fa().clone():void 0,image:this.Y()?this.Y().clone():void 0,stroke:this.Ga()?this.Ga().clone():void 0,text:this.Ka()?this.Ka().clone():void 0,zIndex:this.Ba()})};k.Ie=function(){return this.pc};k.Iq=function(a){this.pc=a};k.U=function(){return this.Uc};k.rl=function(){return this.cb};k.Fa=function(){return this.Xa};k.yf=function(a){this.Xa=a};k.Y=function(){return this.M};
k.ih=function(a){this.M=a};k.Ga=function(){return this.Ya};k.Af=function(a){this.Ya=a};k.Ka=function(){return this.ta};k.Hd=function(a){this.ta=a};k.Ba=function(){return this.bk};k.Va=function(a){"function"===typeof a?this.cb=a:"string"===typeof a?this.cb=function(b){return b.get(a)}:a?void 0!==a&&(this.cb=function(){return a}):this.cb=Ck;this.Uc=a};k.$b=function(a){this.bk=a};
function Dk(a){if("function"!==typeof a){if(Array.isArray(a))var b=a;else oa(a instanceof Bk,41),b=[a];a=function(){return b}}return a}var Ek=null;function Fk(){if(!Ek){var a=new zk({color:"rgba(255,255,255,0.4)"}),b=new Ak({color:"#3399CC",width:1.25});Ek=[new Bk({image:new yk({fill:a,stroke:b,radius:5}),fill:a,stroke:b})]}return Ek}
function Gk(){var a={},b=[255,255,255,1],c=[0,153,255,1];a.Polygon=[new Bk({fill:new zk({color:[255,255,255,.5]})})];a.MultiPolygon=a.Polygon;a.LineString=[new Bk({stroke:new Ak({color:b,width:5})}),new Bk({stroke:new Ak({color:c,width:3})})];a.MultiLineString=a.LineString;a.Circle=a.Polygon.concat(a.LineString);a.Point=[new Bk({image:new yk({radius:6,fill:new zk({color:c}),stroke:new Ak({color:b,width:1.5})}),zIndex:Infinity})];a.MultiPoint=a.Point;a.GeometryCollection=a.Polygon.concat(a.LineString,
a.Point);return a}function Ck(a){return a.U()};function Hk(a){Vc.call(this);this.c=void 0;this.a="geometry";this.f=null;this.j=void 0;this.i=null;y(this,Xc(this.a),this.Oe,this);void 0!==a&&(a instanceof gf||!a?this.Va(a):this.H(a))}w(Hk,Vc);k=Hk.prototype;k.clone=function(){var a=new Hk(this.L());a.Lc(this.a);var b=this.U();b&&a.Va(b.clone());(b=this.f)&&a.sg(b);return a};k.U=function(){return this.get(this.a)};k.an=function(){return this.c};k.sl=function(){return this.a};k.bn=function(){return this.f};k.ib=function(){return this.j};k.bm=function(){this.u()};
k.Oe=function(){this.i&&(Gc(this.i),this.i=null);var a=this.U();a&&(this.i=y(a,"change",this.bm,this));this.u()};k.Va=function(a){this.set(this.a,a)};k.sg=function(a){this.j=(this.f=a)?Ik(a):void 0;this.u()};k.qc=function(a){this.c=a;this.u()};k.Lc=function(a){Mc(this,Xc(this.a),this.Oe,this);this.a=a;y(this,Xc(this.a),this.Oe,this);this.Oe()};
function Ik(a){var b;if("function"===typeof a)2==a.length?b=function(b){return a(this,b)}:b=a;else{if(Array.isArray(a))var c=a;else oa(a instanceof Bk,41),c=[a];b=function(){return c}}return b};function Jk(a){Vc.call(this);a=a||{};this.a=null;this.i=$b;this.f=new ob(6378137);this.c=void 0;y(this,Xc("projection"),this.en,this);y(this,Xc("tracking"),this.fn,this);void 0!==a.projection&&this.oi(a.projection);void 0!==a.trackingOptions&&this.Rj(a.trackingOptions);this.Ue(void 0!==a.tracking?a.tracking:!1)}w(Jk,Vc);k=Jk.prototype;k.ia=function(){this.Ue(!1);Vc.prototype.ia.call(this)};k.en=function(){var a=this.mi();a&&(this.i=Pb(Ob("EPSG:4326"),a),this.a&&this.set("position",this.i(this.a)))};
k.fn=function(){if(rd){var a=this.ni();a&&void 0===this.c?this.c=navigator.geolocation.watchPosition(this.Pp.bind(this),this.Qp.bind(this),this.ai()):a||void 0===this.c||(navigator.geolocation.clearWatch(this.c),this.c=void 0)}};
k.Pp=function(a){a=a.coords;this.set("accuracy",a.accuracy);this.set("altitude",null===a.altitude?void 0:a.altitude);this.set("altitudeAccuracy",null===a.altitudeAccuracy?void 0:a.altitudeAccuracy);this.set("heading",null===a.heading?void 0:va(a.heading));this.a?(this.a[0]=a.longitude,this.a[1]=a.latitude):this.a=[a.longitude,a.latitude];var b=this.i(this.a);this.set("position",b);this.set("speed",null===a.speed?void 0:a.speed);a=Qf(this.f,this.a,a.accuracy);a.Rc(this.i);this.set("accuracyGeometry",
a);this.u()};k.Qp=function(a){a.type="error";this.Ue(!1);this.b(a)};k.el=function(){return this.get("accuracy")};k.fl=function(){return this.get("accuracyGeometry")||null};k.gl=function(){return this.get("altitude")};k.hl=function(){return this.get("altitudeAccuracy")};k.cn=function(){return this.get("heading")};k.dn=function(){return this.get("position")};k.mi=function(){return this.get("projection")};k.Ol=function(){return this.get("speed")};k.ni=function(){return this.get("tracking")};k.ai=function(){return this.get("trackingOptions")};
k.oi=function(a){this.set("projection",Ob(a))};k.Ue=function(a){this.set("tracking",a)};k.Rj=function(a){this.set("trackingOptions",a)};function Kk(a,b,c,d,e,f){var g=NaN,h=NaN,l=(c-b)/d;if(1===l)g=a[b],h=a[b+1];else if(2==l)g=(1-e)*a[b]+e*a[b+d],h=(1-e)*a[b+1]+e*a[b+d+1];else if(0!==l){h=a[b];l=a[b+1];var m=0;g=[0];var n;for(n=b+d;n<c;n+=d){var p=a[n],q=a[n+1];m+=Math.sqrt((p-h)*(p-h)+(q-l)*(q-l));g.push(m);h=p;l=q}c=e*m;l=0;m=g.length;for(n=!1;l<m;)e=l+(m-l>>1),h=+dc(g[e],c),0>h?l=e+1:(m=e,n=!h);e=n?l:~l;0>e?(c=(c-g[-e-2])/(g[-e-1]-g[-e-2]),b+=(-e-2)*d,g=ya(a[b],a[b+d],c),h=ya(a[b+1],a[b+d+1],c)):(g=a[b+e*d],h=a[b+e*d+1])}return f?
(f[0]=g,f[1]=h,f):[g,h]}function Sk(a,b,c,d,e,f){if(c==b)return null;if(e<a[b+d-1])return f?(c=a.slice(b,b+d),c[d-1]=e,c):null;if(a[c-1]<e)return f?(c=a.slice(c-d,c),c[d-1]=e,c):null;if(e==a[b+d-1])return a.slice(b,b+d);b/=d;for(c/=d;b<c;)f=b+c>>1,e<a[(f+1)*d-1]?c=f:b=f+1;c=a[b*d-1];if(e==c)return a.slice((b-1)*d,(b-1)*d+d);f=(e-c)/(a[(b+1)*d-1]-c);c=[];var g;for(g=0;g<d-1;++g)c.push(ya(a[(b-1)*d+g],a[b*d+g],f));c.push(e);return c}
function Tk(a,b,c,d,e,f){var g=0;if(f)return Sk(a,g,b[b.length-1],c,d,e);if(d<a[c-1])return e?(a=a.slice(0,c),a[c-1]=d,a):null;if(a[a.length-1]<d)return e?(a=a.slice(a.length-c),a[c-1]=d,a):null;e=0;for(f=b.length;e<f;++e){var h=b[e];if(g!=h){if(d<a[g+c-1])break;else if(d<=a[h-1])return Sk(a,g,h,c,d,!1);g=h}}return null};function I(a,b){hf.call(this);this.c=null;this.o=this.D=this.j=-1;this.na(a,b)}w(I,hf);k=I.prototype;k.Fk=function(a){this.A?gc(this.A,a):this.A=a.slice();this.u()};k.clone=function(){var a=new I(null);a.ba(this.ja,this.A.slice());return a};k.Nb=function(a,b,c,d){if(d<Ha(this.G(),a,b))return d;this.o!=this.g&&(this.D=Math.sqrt(pf(this.A,0,this.A.length,this.a,0)),this.o=this.g);return tf(this.A,0,this.A.length,this.a,this.D,!1,a,b,c,d)};
k.dl=function(a,b){return Jf(this.A,0,this.A.length,this.a,a,b)};k.Tn=function(a,b){return"XYM"!=this.ja&&"XYZM"!=this.ja?null:Sk(this.A,0,this.A.length,this.a,a,void 0!==b?b:!1)};k.W=function(){return yf(this.A,0,this.A.length,this.a)};k.Ph=function(a,b){return Kk(this.A,0,this.A.length,this.a,a,b)};k.Un=function(){return tj(this.A,0,this.A.length,this.a)};k.Fe=function(){this.j!=this.g&&(this.c=this.Ph(.5,this.c),this.j=this.g);return this.c};
k.xd=function(a){var b=[];b.length=Bf(this.A,0,this.A.length,this.a,a,b,0);a=new I(null);a.ba("XY",b);return a};k.S=function(){return"LineString"};k.$a=function(a){return Kf(this.A,0,this.A.length,this.a,a)};k.na=function(a,b){a?(lf(this,b,a,1),this.A||(this.A=[]),this.A.length=wf(this.A,0,a,this.a),this.u()):this.ba("XY",null)};k.ba=function(a,b){kf(this,a,b);this.u()};function Uk(a,b,c){for(var d=[],e=a(0),f=a(1),g=b(e),h=b(f),l=[f,e],m=[h,g],n=[1,0],p={},q=1E5,r,u,v,z,A;0<--q&&0<n.length;)v=n.pop(),e=l.pop(),g=m.pop(),f=v.toString(),f in p||(d.push(g[0],g[1]),p[f]=!0),z=n.pop(),f=l.pop(),h=m.pop(),A=(v+z)/2,r=a(A),u=b(r),sa(u[0],u[1],g[0],g[1],h[0],h[1])<c?(d.push(h[0],h[1]),f=z.toString(),p[f]=!0):(n.push(z,A,A,v),m.push(h,u,u,g),l.push(f,r,r,e));return d}function Vk(a,b,c,d,e){var f=Ob("EPSG:4326");return Uk(function(d){return[a,b+(c-b)*d]},Yb(f,d),e)}
function Wk(a,b,c,d,e){var f=Ob("EPSG:4326");return Uk(function(d){return[b+(c-b)*d,a]},Yb(f,d),e)};function J(a){a=a||{};this.a=a.font;this.i=a.rotation;this.l=a.rotateWithView;this.b=a.scale;this.ta=a.text;this.f=a.textAlign;this.j=a.textBaseline;this.Xa=void 0!==a.fill?a.fill:new zk({color:"#333"});this.s=void 0!==a.maxAngle?a.maxAngle:Math.PI/4;this.o=void 0!==a.placement?a.placement:"point";var b=void 0===a.overflow?a.exceedLength:a.overflow;this.v=void 0!==b?b:!1;this.Ya=void 0!==a.stroke?a.stroke:null;this.g=void 0!==a.offsetX?a.offsetX:0;this.c=void 0!==a.offsetY?a.offsetY:0;this.N=a.backgroundFill?
a.backgroundFill:null;this.D=a.backgroundStroke?a.backgroundStroke:null;this.C=void 0===a.padding?null:a.padding}k=J.prototype;k.clone=function(){return new J({font:this.a,placement:this.o,maxAngle:this.s,overflow:this.v,rotation:this.i,rotateWithView:this.l,scale:this.b,text:this.Ka(),textAlign:this.f,textBaseline:this.j,fill:this.Fa()?this.Fa().clone():void 0,stroke:this.Ga()?this.Ga().clone():void 0,offsetX:this.g,offsetY:this.c})};k.Gl=function(){return this.v};k.pl=function(){return this.a};
k.Bl=function(){return this.s};k.Kl=function(){return this.o};k.El=function(){return this.g};k.Fl=function(){return this.c};k.Fa=function(){return this.Xa};k.tp=function(){return this.l};k.up=function(){return this.i};k.vp=function(){return this.b};k.Ga=function(){return this.Ya};k.Ka=function(){return this.ta};k.Ql=function(){return this.f};k.Rl=function(){return this.j};k.jl=function(){return this.N};k.kl=function(){return this.D};k.Il=function(){return this.C};k.Fq=function(a){this.v=a};
k.Jj=function(a){this.a=a};k.Bq=function(a){this.s=a};k.Nj=function(a){this.g=a};k.Oj=function(a){this.c=a};k.Hq=function(a){this.o=a};k.yf=function(a){this.Xa=a};k.wp=function(a){this.i=a};k.lj=function(a){this.b=a};k.Af=function(a){this.Ya=a};k.Hd=function(a){this.ta=a};k.Qj=function(a){this.f=a};k.Jq=function(a){this.j=a};k.sq=function(a){this.N=a};k.tq=function(a){this.D=a};k.Gq=function(a){this.C=a};function Xk(a){a=a||{};this.i=this.v=null;this.j=this.f=Infinity;this.s=this.l=-Infinity;this.qa=this.oa=Infinity;this.O=this.T=-Infinity;this.ua=void 0!==a.targetSize?a.targetSize:100;this.ab=void 0!==a.maxLines?a.maxLines:100;this.g=[];this.c=[];this.ra=void 0!==a.strokeStyle?a.strokeStyle:Yk;this.D=this.o=void 0;this.a=this.b=this.N=null;1==a.showLabels&&(this.$=void 0==a.lonLabelFormatter?Ce.bind(this,"EW"):a.lonLabelFormatter,this.Wa=void 0==a.latLabelFormatter?Ce.bind(this,"NS"):a.latLabelFormatter,
this.ca=void 0==a.lonLabelPosition?0:a.lonLabelPosition,this.V=void 0==a.latLabelPosition?1:a.latLabelPosition,this.B=void 0!==a.lonLabelStyle?a.lonLabelStyle:new J({font:"12px Calibri,sans-serif",textBaseline:"bottom",fill:new zk({color:"rgba(0,0,0,1)"}),stroke:new Ak({color:"rgba(255,255,255,1)",width:3})}),this.C=void 0!==a.latLabelStyle?a.latLabelStyle:new J({font:"12px Calibri,sans-serif",textAlign:"end",fill:new zk({color:"rgba(0,0,0,1)"}),stroke:new Ak({color:"rgba(255,255,255,1)",width:3})}),
this.b=[],this.a=[]);this.setMap(void 0!==a.map?a.map:null)}var Yk=new Ak({color:"rgba(0,0,0,0.2)"}),Zk=[90,45,30,20,10,5,2,1,.5,.2,.1,.05,.01,.005,.002,.001];function $k(a,b,c,d,e,f,g){var h=g;c=Vk(b,c,d,a.i,e);h=void 0!==a.g[h]?a.g[h]:new I(null);h.ba("XY",c);hb(h.G(),f)&&(a.b&&(c=g,d=h.da(),f=[d[0],pa(f[1]+Math.abs(f[1]-f[3])*a.ca,Math.max(f[1],d[1]),Math.min(f[3],d[d.length-1]))],c=void 0!==a.b[c]?a.b[c].Qd:new C(null),c.na(f),a.b[g]={Qd:c,text:a.$(b)}),a.g[g++]=h);return g}
function al(a,b,c,d,e,f,g){var h=g;c=Wk(b,c,d,a.i,e);h=void 0!==a.c[h]?a.c[h]:new I(null);h.ba("XY",c);hb(h.G(),f)&&(a.a&&(c=g,d=h.da(),f=[pa(f[0]+Math.abs(f[0]-f[2])*a.V,Math.max(f[0],d[0]),Math.min(f[2],d[d.length-2])),d[1]],c=void 0!==a.a[c]?a.a[c].Qd:new C(null),c.na(f),a.a[g]={Qd:c,text:a.Wa(b)}),a.c[g++]=h);return g}k=Xk.prototype;k.gn=function(){return this.v};k.Cl=function(){return this.g};k.Jl=function(){return this.c};
k.di=function(a){var b=a.vectorContext,c=a.frameState;a=c.extent;var d=c.viewState,e=d.center,f=d.projection;d=d.resolution;c=c.pixelRatio;c=d*d/(4*c*c);if(!this.i||!Xb(this.i,f)){var g=Ob("EPSG:4326"),h=f.G(),l=f.oe,m=bc(l,g,f),n=l[2],p=l[1],q=l[0],r=m[3],u=m[2],v=m[1];m=m[0];this.f=l[3];this.j=n;this.l=p;this.s=q;this.oa=r;this.qa=u;this.T=v;this.O=m;this.o=Yb(g,f);this.D=Yb(f,g);this.N=this.D(eb(h));this.i=f}f=this.N[0];g=this.N[1];h=-1;n=Math.pow(this.ua*d,2);p=[];q=[];d=0;for(l=Zk.length;d<l;++d){r=
Zk[d]/2;p[0]=f-r;p[1]=g-r;q[0]=f+r;q[1]=g+r;this.o(p,p);this.o(q,q);r=Math.pow(q[0]-p[0],2)+Math.pow(q[1]-p[1],2);if(r<=n)break;h=Zk[d]}d=h;if(-1==d)this.g.length=this.c.length=0,this.b&&(this.b.length=0),this.a&&(this.a.length=0);else{f=this.D(e);e=f[0];f=f[1];g=this.ab;l=[Math.max(a[0],this.O),Math.max(a[1],this.T),Math.min(a[2],this.qa),Math.min(a[3],this.oa)];l=bc(l,this.i,"EPSG:4326");p=l[3];h=l[2];q=l[1];r=l[0];e=Math.floor(e/d)*d;u=pa(e,this.s,this.j);n=$k(this,u,q,p,c,a,0);for(l=0;u!=this.s&&
l++<g;)u=Math.max(u-d,this.s),n=$k(this,u,q,p,c,a,n);u=pa(e,this.s,this.j);for(l=0;u!=this.j&&l++<g;)u=Math.min(u+d,this.j),n=$k(this,u,q,p,c,a,n);this.g.length=n;this.b&&(this.b.length=n);f=Math.floor(f/d)*d;e=pa(f,this.l,this.f);n=al(this,e,r,h,c,a,0);for(l=0;e!=this.l&&l++<g;)e=Math.max(e-d,this.l),n=al(this,e,r,h,c,a,n);e=pa(f,this.l,this.f);for(l=0;e!=this.f&&l++<g;)e=Math.min(e+d,this.f),n=al(this,e,r,h,c,a,n);this.c.length=n;this.a&&(this.a.length=n)}b.Oa(null,this.ra);a=0;for(c=this.g.length;a<
c;++a)e=this.g[a],b.Hb(e);a=0;for(c=this.c.length;a<c;++a)e=this.c[a],b.Hb(e);if(this.b)for(a=0,c=this.b.length;a<c;++a)e=this.b[a],this.B.Hd(e.text),b.nb(this.B),b.Hb(e.Qd);if(this.a)for(a=0,c=this.a.length;a<c;++a)e=this.a[a],this.C.Hd(e.text),b.nb(this.C),b.Hb(e.Qd)};k.setMap=function(a){this.v&&(this.v.J("postcompose",this.di,this),this.v.render());a&&(a.I("postcompose",this.di,this),a.render());this.v=a};function bl(a,b,c,d,e,f){$h.call(this,a,b,c,0);this.i=d;this.M=new Image;null!==e&&(this.M.crossOrigin=e);this.g=null;this.state=0;this.c=f}w(bl,$h);k=bl.prototype;k.Y=function(){return this.M};k.kn=function(){this.state=3;this.g.forEach(Gc);this.g=null;this.u()};k.ln=function(){void 0===this.resolution&&(this.resolution=db(this.extent)/this.M.height);this.state=2;this.g.forEach(Gc);this.g=null;this.u()};
k.load=function(){if(0==this.state||3==this.state)this.state=1,this.u(),this.g=[Lc(this.M,"error",this.kn,this),Lc(this.M,"load",this.ln,this)],this.c(this,this.i)};k.ih=function(a){this.M=a};function cl(a,b,c){Sc.call(this);c=c?c:{};this.ya=a;this.state=b;this.g=null;this.key="";this.j=void 0===c.transition?250:c.transition;this.s={}}w(cl,Sc);cl.prototype.u=function(){this.b("change")};cl.prototype.lb=function(){return this.key+"/"+this.ya};function pj(a){if(!a.g)return a;var b=a.g;do{if(2==b.getState())return b;b=b.g}while(b);return a}function dl(a){if(a.g){var b=a.g;do{if(2==b.getState()){b.g=null;break}else 1==b.getState()?a=b:0==b.getState()?a.g=b.g:a=b;b=a.g}while(b)}}
cl.prototype.i=function(){return this.ya};cl.prototype.getState=function(){return this.state};function oj(a,b){a.state=b;a.u()}function qj(a,b,c){if(!a.j)return 1;var d=a.s[b];if(!d)d=c,a.s[b]=d;else if(-1===d)return 1;b=c-d+1E3/60;return b>=a.j?1:Me(b/a.j)};function el(a,b,c,d,e,f){cl.call(this,a,b,f);this.f=d;this.l=c;this.M=new Image;null!==d&&(this.M.crossOrigin=d);this.c=null;this.v=e}w(el,cl);k=el.prototype;k.ia=function(){1==this.state&&(fl(this),this.M=gl());this.g&&Pc(this.g);this.state=5;this.u();cl.prototype.ia.call(this)};k.Y=function(){return this.M};k.lb=function(){return this.l};k.hn=function(){this.state=3;fl(this);this.M=gl();this.u()};k.jn=function(){this.state=this.M.naturalWidth&&this.M.naturalHeight?2:4;fl(this);this.u()};
k.load=function(){3==this.state&&(this.state=0,this.M=new Image,null!==this.f&&(this.M.crossOrigin=this.f));0==this.state&&(this.state=1,this.u(),this.c=[Lc(this.M,"error",this.hn,this),Lc(this.M,"load",this.jn,this)],this.v(this,this.l))};function fl(a){a.c.forEach(Gc);a.c=null}function gl(){var a=hg(1,1);a.fillStyle="rgba(0,0,0,0)";a.fillRect(0,0,1,1);return a.canvas};function hl(a){this.b=a};function il(a){this.b=a}w(il,hl);il.prototype.S=function(){return 35632};function jl(a){this.b=a}w(jl,hl);jl.prototype.S=function(){return 35633};var kl=new il("precision mediump float;varying vec2 a;varying vec2 b;varying float c;varying float d;uniform float m;uniform vec4 n;uniform vec4 o;uniform vec2 p;void main(void){vec2 windowCenter=vec2((a.x+1.0)/2.0*p.x*d,(a.y+1.0)/2.0*p.y*d);vec2 windowOffset=vec2((b.x+1.0)/2.0*p.x*d,(b.y+1.0)/2.0*p.y*d);float radius=length(windowCenter-windowOffset);float dist=length(windowCenter-gl_FragCoord.xy);if(dist>radius+c){if(o.a==0.0){gl_FragColor=n;}else{gl_FragColor=o;}gl_FragColor.a=gl_FragColor.a-(dist-(radius+c));}else if(n.a==0.0){gl_FragColor=o;if(dist<radius-c){gl_FragColor.a=gl_FragColor.a-(radius-c-dist);}} else{gl_FragColor=n;float strokeDist=radius-c;float antialias=2.0*d;if(dist>strokeDist){gl_FragColor=o;}else if(dist>=strokeDist-antialias){float step=smoothstep(strokeDist-antialias,strokeDist,dist);gl_FragColor=mix(n,o,step);}} gl_FragColor.a=gl_FragColor.a*m;if(gl_FragColor.a<=0.0){discard;}}"),
ll=new jl("varying vec2 a;varying vec2 b;varying float c;varying float d;attribute vec2 e;attribute float f;attribute float g;uniform mat4 h;uniform mat4 i;uniform mat4 j;uniform float k;uniform float l;void main(void){mat4 offsetMatrix=i*j;a=vec4(h*vec4(e,0.0,1.0)).xy;d=l;float lineWidth=k*l;c=lineWidth/2.0;if(lineWidth==0.0){lineWidth=2.0*l;}vec2 offset;float radius=g+3.0*l;//Until we get gl_VertexID in WebGL,we store an instruction.if(f==0.0){//Offsetting the edges of the triangle by lineWidth/2 is necessary,however//we should also leave some space for the antialiasing,thus we offset by lineWidth.offset=vec2(-1.0,1.0);}else if(f==1.0){offset=vec2(-1.0,-1.0);}else if(f==2.0){offset=vec2(1.0,-1.0);}else{offset=vec2(1.0,1.0);}gl_Position=h*vec4(e+offset*radius,0.0,1.0)+offsetMatrix*vec4(offset*lineWidth,0.0,0.0);b=vec4(h*vec4(e.x+g,e.y,0.0,1.0)).xy;if(distance(a,b)>20000.0){gl_Position=vec4(a,0.0,1.0);}}");function ml(a,b){this.g=a.getUniformLocation(b,"h");this.i=a.getUniformLocation(b,"i");this.c=a.getUniformLocation(b,"j");this.oa=a.getUniformLocation(b,"k");this.qa=a.getUniformLocation(b,"l");this.a=a.getUniformLocation(b,"m");this.C=a.getUniformLocation(b,"n");this.O=a.getUniformLocation(b,"o");this.T=a.getUniformLocation(b,"p");this.b=a.getAttribLocation(b,"e");this.j=a.getAttribLocation(b,"f");this.N=a.getAttribLocation(b,"g")};function nl(){return[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}function pl(a,b){a[0]=b[0];a[1]=b[1];a[4]=b[2];a[5]=b[3];a[12]=b[4];a[13]=b[5];return a};function ql(a,b){this.origin=eb(b);this.bb=We();this.Ea=We();this.La=We();this.V=nl();this.b=[];this.j=null;this.g=[];this.i=[];this.a=[];this.s=null;this.f=void 0}w(ql,Ai);
ql.prototype.Na=function(a,b,c,d,e,f,g,h,l,m,n){var p=a.b;if(this.f){var q=p.isEnabled(p.STENCIL_TEST);var r=p.getParameter(p.STENCIL_FUNC);var u=p.getParameter(p.STENCIL_VALUE_MASK);var v=p.getParameter(p.STENCIL_REF);var z=p.getParameter(p.STENCIL_WRITEMASK);var A=p.getParameter(p.STENCIL_FAIL);var E=p.getParameter(p.STENCIL_PASS_DEPTH_PASS);var S=p.getParameter(p.STENCIL_PASS_DEPTH_FAIL);p.enable(p.STENCIL_TEST);p.clear(p.STENCIL_BUFFER_BIT);p.stencilMask(255);p.stencilFunc(p.ALWAYS,1,255);p.stencilOp(p.KEEP,
p.KEEP,p.REPLACE);this.f.Na(a,b,c,d,e,f,g,h,l,m,n);p.stencilMask(0);p.stencilFunc(p.NOTEQUAL,1,255)}rl(a,34962,this.s);rl(a,34963,this.j);f=this.Bf(p,a,e,f);var Ia=Xe(this.bb);cf(Ia,2/(c*e[0]),2/(c*e[1]));bf(Ia,-d);df(Ia,-(b[0]-this.origin[0]),-(b[1]-this.origin[1]));b=Xe(this.La);cf(b,2/e[0],2/e[1]);e=Xe(this.Ea);0!==d&&bf(e,-d);p.uniformMatrix4fv(f.g,!1,pl(this.V,Ia));p.uniformMatrix4fv(f.i,!1,pl(this.V,b));p.uniformMatrix4fv(f.c,!1,pl(this.V,e));p.uniform1f(f.a,g);if(void 0===l)this.Od(p,a,h,!1);
else{m?a=this.Ee(p,a,h,l,n):(p.clear(p.COLOR_BUFFER_BIT|p.DEPTH_BUFFER_BIT),this.Od(p,a,h,!0),a=(a=l(null))?a:void 0);var ta=a}this.Cf(p,f);this.f&&(q||p.disable(p.STENCIL_TEST),p.clear(p.STENCIL_BUFFER_BIT),p.stencilFunc(r,v,u),p.stencilMask(z),p.stencilOp(A,S,E));return ta};function sl(a,b,c,d){a.drawElements(4,d-c,b.f?5125:5123,c*(b.f?4:2))};var tl=[0,0,0,1],ul=[],vl=[0,0,0,1];function wl(a,b,c,d,e,f){a=(c-a)*(f-b)-(e-a)*(d-b);return a<=xl&&a>=-xl?void 0:0<a}var xl=Number.EPSILON||2.220446049250313E-16;function yl(a){this.b=void 0!==a?a:[];this.a=zl}var zl=35044;function Al(a,b){ql.call(this,a,b);this.v=null;this.l=[];this.o=[];this.N=0;this.c={fillColor:null,strokeColor:null,lineDash:null,lineDashOffset:void 0,lineWidth:void 0,u:!1}}w(Al,ql);k=Al.prototype;
k.cc=function(a,b){var c=a.Bd(),d=a.pa();if(c){this.g.push(this.b.length);this.i.push(b);this.c.u&&(this.o.push(this.b.length),this.c.u=!1);this.N=c;a=a.da();a=Ue(a,0,2,d,-this.origin[0],-this.origin[1]);b=this.a.length;c=this.b.length;var e=b/4,f;for(f=0;2>f;f+=d)this.a[b++]=a[f],this.a[b++]=a[f+1],this.a[b++]=0,this.a[b++]=this.N,this.a[b++]=a[f],this.a[b++]=a[f+1],this.a[b++]=1,this.a[b++]=this.N,this.a[b++]=a[f],this.a[b++]=a[f+1],this.a[b++]=2,this.a[b++]=this.N,this.a[b++]=a[f],this.a[b++]=
a[f+1],this.a[b++]=3,this.a[b++]=this.N,this.b[c++]=e,this.b[c++]=e+1,this.b[c++]=e+2,this.b[c++]=e+2,this.b[c++]=e+3,this.b[c++]=e,e+=4}else this.c.u&&(this.l.pop(),this.l.length&&(d=this.l[this.l.length-1],this.c.fillColor=d[0],this.c.strokeColor=d[1],this.c.lineWidth=d[2],this.c.u=!1))};k.gb=function(){this.s=new yl(this.a);this.j=new yl(this.b);this.g.push(this.b.length);0===this.o.length&&0<this.l.length&&(this.l=[]);this.b=this.a=null};
k.Db=function(a){var b=this.s,c=this.j;return function(){Bl(a,b);Bl(a,c)}};k.Bf=function(a,b,c,d){var e=Cl(b,kl,ll);if(this.v)var f=this.v;else this.v=f=new ml(a,e);b.cd(e);a.enableVertexAttribArray(f.b);a.vertexAttribPointer(f.b,2,5126,!1,16,0);a.enableVertexAttribArray(f.j);a.vertexAttribPointer(f.j,1,5126,!1,16,8);a.enableVertexAttribArray(f.N);a.vertexAttribPointer(f.N,1,5126,!1,16,12);a.uniform2fv(f.T,c);a.uniform1f(f.qa,d);return f};
k.Cf=function(a,b){a.disableVertexAttribArray(b.b);a.disableVertexAttribArray(b.j);a.disableVertexAttribArray(b.N)};
k.Od=function(a,b,c){if(nb(c)){var d=this.g[this.g.length-1];for(c=this.o.length-1;0<=c;--c){var e=this.o[c];var f=this.l[c];a.uniform4fv(this.v.C,f[0]);Dl(this,a,f[1],f[2]);sl(a,b,e,d);d=e}}else{var g=this.g.length-2;f=d=this.g[g+1];for(e=this.o.length-1;0<=e;--e){var h=this.l[e];a.uniform4fv(this.v.C,h[0]);Dl(this,a,h[1],h[2]);for(h=this.o[e];0<=g&&this.g[g]>=h;){var l=this.g[g];var m=this.i[g];m=x(m).toString();c[m]&&(d!==f&&sl(a,b,d,f),f=l);g--;d=l}d!==f&&sl(a,b,d,f);d=f=h}}};
k.Ee=function(a,b,c,d,e){var f,g;var h=this.g.length-2;var l=this.g[h+1];for(f=this.o.length-1;0<=f;--f){var m=this.l[f];a.uniform4fv(this.v.C,m[0]);Dl(this,a,m[1],m[2]);for(g=this.o[f];0<=h&&this.g[h]>=g;){m=this.g[h];var n=this.i[h];var p=x(n).toString();if(void 0===c[p]&&n.U()&&(void 0===e||hb(e,n.U().G()))&&(a.clear(a.COLOR_BUFFER_BIT|a.DEPTH_BUFFER_BIT),sl(a,b,m,l),l=d(n)))return l;h--;l=m}}};function Dl(a,b,c,d){b.uniform4fv(a.v.O,c);b.uniform1f(a.v.oa,d)}
k.Oa=function(a,b){if(b){var c=b.g;this.c.lineDash=c?c:ul;c=b.i;this.c.lineDashOffset=c?c:0;c=b.a;c instanceof CanvasGradient||c instanceof CanvasPattern?c=vl:c=vi(c).map(function(a,b){return 3!=b?a/255:a})||vl;b=b.c;b=void 0!==b?b:1}else c=[0,0,0,0],b=0;a=a?a.b:[0,0,0,0];a instanceof CanvasGradient||a instanceof CanvasPattern?a=tl:a=vi(a).map(function(a,b){return 3!=b?a/255:a})||tl;this.c.strokeColor&&jc(this.c.strokeColor,c)&&this.c.fillColor&&jc(this.c.fillColor,a)&&this.c.lineWidth===b||(this.c.u=
!0,this.c.fillColor=a,this.c.strokeColor=c,this.c.lineWidth=b,this.l.push([a,c,b]))};var El=new il("precision mediump float;varying vec2 a;varying float b;uniform float k;uniform sampler2D l;void main(void){vec4 texColor=texture2D(l,a);gl_FragColor.rgb=texColor.rgb;float alpha=texColor.a*b*k;if(alpha==0.0){discard;}gl_FragColor.a=alpha;}"),Fl=new jl("varying vec2 a;varying float b;attribute vec2 c;attribute vec2 d;attribute vec2 e;attribute float f;attribute float g;uniform mat4 h;uniform mat4 i;uniform mat4 j;void main(void){mat4 offsetMatrix=i;if(g==1.0){offsetMatrix=i*j;}vec4 offsets=offsetMatrix*vec4(e,0.0,0.0);gl_Position=h*vec4(c,0.0,1.0)+offsets;a=d;b=f;}");function Gl(a,b){this.g=a.getUniformLocation(b,"h");this.i=a.getUniformLocation(b,"i");this.c=a.getUniformLocation(b,"j");this.a=a.getUniformLocation(b,"k");this.b=a.getAttribLocation(b,"c");this.B=a.getAttribLocation(b,"d");this.v=a.getAttribLocation(b,"e");this.o=a.getAttribLocation(b,"f");this.D=a.getAttribLocation(b,"g")};function Hl(a,b){this.j=a;this.b=b;this.a={};this.c={};this.g={};this.s=this.v=this.i=this.l=null;(this.f=ec(da,"OES_element_index_uint"))&&b.getExtension("OES_element_index_uint");y(this.j,"webglcontextlost",this.zp,this);y(this.j,"webglcontextrestored",this.Ap,this)}w(Hl,Oc);
function rl(a,b,c){var d=a.b,e=c.b,f=String(x(c));if(f in a.a)d.bindBuffer(b,a.a[f].buffer);else{var g=d.createBuffer();d.bindBuffer(b,g);var h;34962==b?h=new Float32Array(e):34963==b&&(h=a.f?new Uint32Array(e):new Uint16Array(e));d.bufferData(b,h,c.a);a.a[f]={tc:c,buffer:g}}}function Bl(a,b){var c=a.b;b=String(x(b));var d=a.a[b];c.isContextLost()||c.deleteBuffer(d.buffer);delete a.a[b]}k=Hl.prototype;
k.ia=function(){Nc(this.j);var a=this.b;if(!a.isContextLost()){for(var b in this.a)a.deleteBuffer(this.a[b].buffer);for(b in this.g)a.deleteProgram(this.g[b]);for(b in this.c)a.deleteShader(this.c[b]);a.deleteFramebuffer(this.i);a.deleteRenderbuffer(this.s);a.deleteTexture(this.v)}};k.yp=function(){return this.b};
function Il(a){if(!a.i){var b=a.b,c=b.createFramebuffer();b.bindFramebuffer(b.FRAMEBUFFER,c);var d=Jl(b,1,1),e=b.createRenderbuffer();b.bindRenderbuffer(b.RENDERBUFFER,e);b.renderbufferStorage(b.RENDERBUFFER,b.DEPTH_COMPONENT16,1,1);b.framebufferTexture2D(b.FRAMEBUFFER,b.COLOR_ATTACHMENT0,b.TEXTURE_2D,d,0);b.framebufferRenderbuffer(b.FRAMEBUFFER,b.DEPTH_ATTACHMENT,b.RENDERBUFFER,e);b.bindTexture(b.TEXTURE_2D,null);b.bindRenderbuffer(b.RENDERBUFFER,null);b.bindFramebuffer(b.FRAMEBUFFER,null);a.i=c;
a.v=d;a.s=e}return a.i}function Kl(a,b){var c=String(x(b));if(c in a.c)return a.c[c];var d=a.b,e=d.createShader(b.S());d.shaderSource(e,b.b);d.compileShader(e);return a.c[c]=e}function Cl(a,b,c){var d=x(b)+"/"+x(c);if(d in a.g)return a.g[d];var e=a.b,f=e.createProgram();e.attachShader(f,Kl(a,b));e.attachShader(f,Kl(a,c));e.linkProgram(f);return a.g[d]=f}k.zp=function(){lb(this.a);lb(this.c);lb(this.g);this.s=this.v=this.i=this.l=null};k.Ap=function(){};
k.cd=function(a){if(a==this.l)return!1;this.b.useProgram(a);this.l=a;return!0};function Ll(a,b,c){var d=a.createTexture();a.bindTexture(a.TEXTURE_2D,d);a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.LINEAR);a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.LINEAR);void 0!==b&&a.texParameteri(3553,10242,b);void 0!==c&&a.texParameteri(3553,10243,c);return d}function Jl(a,b,c){var d=Ll(a,void 0,void 0);a.texImage2D(a.TEXTURE_2D,0,a.RGBA,b,c,0,a.RGBA,a.UNSIGNED_BYTE,null);return d}
function Ml(a,b){var c=Ll(a,33071,33071);a.texImage2D(a.TEXTURE_2D,0,a.RGBA,a.RGBA,a.UNSIGNED_BYTE,b);return c};function Nl(a,b){ql.call(this,a,b);this.C=this.D=void 0;this.v=[];this.o=[];this.qa=this.oa=this.height=void 0;this.Wa=null;this.width=this.scale=this.rotation=this.rotateWithView=this.O=this.T=this.opacity=void 0}w(Nl,ql);k=Nl.prototype;k.Db=function(a){var b=this.s,c=this.j,d=this.ig(!0),e=a.b;return function(){if(!e.isContextLost()){var f;var g=0;for(f=d.length;g<f;++g)e.deleteTexture(d[g])}Bl(a,b);Bl(a,c)}};
function Ol(a,b,c,d){var e=a.D,f=a.C,g=a.height,h=a.oa,l=a.qa,m=a.opacity,n=a.T,p=a.O,q=a.rotateWithView?1:0,r=-a.rotation,u=a.scale,v=a.width,z=Math.cos(r);r=Math.sin(r);var A=a.b.length,E=a.a.length,S;for(S=0;S<c;S+=d){var Ia=b[S]-a.origin[0];var ta=b[S+1]-a.origin[1];var la=E/8;var ca=-u*e;var ia=-u*(g-f);a.a[E++]=Ia;a.a[E++]=ta;a.a[E++]=ca*z-ia*r;a.a[E++]=ca*r+ia*z;a.a[E++]=n/l;a.a[E++]=(p+g)/h;a.a[E++]=m;a.a[E++]=q;ca=u*(v-e);ia=-u*(g-f);a.a[E++]=Ia;a.a[E++]=ta;a.a[E++]=ca*z-ia*r;a.a[E++]=ca*
r+ia*z;a.a[E++]=(n+v)/l;a.a[E++]=(p+g)/h;a.a[E++]=m;a.a[E++]=q;ca=u*(v-e);ia=u*f;a.a[E++]=Ia;a.a[E++]=ta;a.a[E++]=ca*z-ia*r;a.a[E++]=ca*r+ia*z;a.a[E++]=(n+v)/l;a.a[E++]=p/h;a.a[E++]=m;a.a[E++]=q;ca=-u*e;ia=u*f;a.a[E++]=Ia;a.a[E++]=ta;a.a[E++]=ca*z-ia*r;a.a[E++]=ca*r+ia*z;a.a[E++]=n/l;a.a[E++]=p/h;a.a[E++]=m;a.a[E++]=q;a.b[A++]=la;a.b[A++]=la+1;a.b[A++]=la+2;a.b[A++]=la;a.b[A++]=la+2;a.b[A++]=la+3}}
function Pl(a,b,c,d){var e,f=b.length;for(e=0;e<f;++e){var g=b[e];var h=x(g).toString();h in c?g=c[h]:(g=Ml(d,g),c[h]=g);a[e]=g}}
k.Bf=function(a,b){var c=Cl(b,El,Fl);if(this.Wa)var d=this.Wa;else this.Wa=d=new Gl(a,c);b.cd(c);a.enableVertexAttribArray(d.b);a.vertexAttribPointer(d.b,2,5126,!1,32,0);a.enableVertexAttribArray(d.v);a.vertexAttribPointer(d.v,2,5126,!1,32,8);a.enableVertexAttribArray(d.B);a.vertexAttribPointer(d.B,2,5126,!1,32,16);a.enableVertexAttribArray(d.o);a.vertexAttribPointer(d.o,1,5126,!1,32,24);a.enableVertexAttribArray(d.D);a.vertexAttribPointer(d.D,1,5126,!1,32,28);return d};
k.Cf=function(a,b){a.disableVertexAttribArray(b.b);a.disableVertexAttribArray(b.v);a.disableVertexAttribArray(b.B);a.disableVertexAttribArray(b.o);a.disableVertexAttribArray(b.D)};
k.Od=function(a,b,c,d){var e=d?this.ag():this.ig();d=d?this.o:this.v;if(nb(c)){var f;c=0;var g=e.length;for(f=0;c<g;++c){a.bindTexture(3553,e[c]);var h=d[c];sl(a,b,f,h);f=h}}else for(f=g=0,h=e.length;f<h;++f){a.bindTexture(3553,e[f]);for(var l=0<f?d[f-1]:0,m=d[f],n=l;g<this.g.length&&this.g[g]<=m;){var p=x(this.i[g]).toString();void 0!==c[p]?(n!==l&&sl(a,b,n,l),l=n=g===this.g.length-1?m:this.g[g+1]):l=g===this.g.length-1?m:this.g[g+1];g++}n!==l&&sl(a,b,n,l)}};
k.Ee=function(a,b,c,d,e){var f,g,h=this.g.length-1,l=this.ag();for(f=l.length-1;0<=f;--f){a.bindTexture(3553,l[f]);var m=0<f?this.o[f-1]:0;for(g=this.o[f];0<=h&&this.g[h]>=m;){var n=this.g[h];var p=this.i[h];var q=x(p).toString();if(void 0===c[q]&&p.U()&&(void 0===e||hb(e,p.U().G()))&&(a.clear(a.COLOR_BUFFER_BIT|a.DEPTH_BUFFER_BIT),sl(a,b,n,g),g=d(p)))return g;g=n;h--}}};
k.gb=function(){this.qa=this.oa=this.height=this.C=this.D=void 0;this.b=null;this.scale=this.rotation=this.rotateWithView=this.O=this.T=this.opacity=void 0;this.a=null;this.width=void 0};function Ql(a,b){Nl.call(this,a,b);this.l=[];this.c=[];this.B=[];this.N=[]}w(Ql,Nl);k=Ql.prototype;k.wc=function(a,b){this.g.push(this.b.length);this.i.push(b);b=a.da();Ol(this,b,b.length,a.pa())};k.yc=function(a,b){this.g.push(this.b.length);this.i.push(b);b=a.da();Ol(this,b,b.length,a.pa())};
k.gb=function(a){var b=a.b;this.v.push(this.b.length);this.o.push(this.b.length);this.s=new yl(this.a);this.j=new yl(this.b);var c={};Pl(this.B,this.l,c,b);Pl(this.N,this.c,c,b);this.c=this.l=null;Nl.prototype.gb.call(this,a)};
k.Zb=function(a){var b=a.Vc(),c=a.Y(1),d=a.He(),e=a.Eg(),f=a.i,g=a.bd(),h=a.s,l=a.f,m=a.oc();a=a.a;if(0===this.l.length)this.l.push(c);else{var n=this.l[this.l.length-1];x(n)!=x(c)&&(this.v.push(this.b.length),this.l.push(c))}0===this.c.length?this.c.push(e):(n=this.c[this.c.length-1],x(n)!=x(e)&&(this.o.push(this.b.length),this.c.push(e)));this.D=b[0];this.C=b[1];this.height=m[1];this.oa=d[1];this.qa=d[0];this.opacity=f;this.T=g[0];this.O=g[1];this.rotation=l;this.rotateWithView=h;this.scale=a;this.width=
m[0]};k.ig=function(a){return a?this.B.concat(this.N):this.B};k.ag=function(){return this.N};function Rl(a,b,c){var d=b-c;return a[0]===a[d]&&a[1]===a[d+1]&&3<(b-0)/c?!!mf(a,0,b,c):!1};var Sl=new il("precision mediump float;varying float a;varying vec2 aVertex;varying float c;uniform float m;uniform vec4 n;uniform vec2 o;uniform float p;void main(void){if(a>0.0){vec2 windowCoords=vec2((aVertex.x+1.0)/2.0*o.x*p,(aVertex.y+1.0)/2.0*o.y*p);if(length(windowCoords-gl_FragCoord.xy)>c*p){discard;}} gl_FragColor=n;float alpha=n.a*m;if(alpha==0.0){discard;}gl_FragColor.a=alpha;}"),Tl=new jl("varying float a;varying vec2 aVertex;varying float c;attribute vec2 d;attribute vec2 e;attribute vec2 f;attribute float g;uniform mat4 h;uniform mat4 i;uniform mat4 j;uniform float k;uniform float l;bool nearlyEquals(in float value,in float ref){float epsilon=0.000000000001;return value>=ref-epsilon&&value<=ref+epsilon;}void alongNormal(out vec2 offset,in vec2 nextP,in float turnDir,in float direction){vec2 dirVect=nextP-e;vec2 normal=normalize(vec2(-turnDir*dirVect.y,turnDir*dirVect.x));offset=k/2.0*normal*direction;}void miterUp(out vec2 offset,out float round,in bool isRound,in float direction){float halfWidth=k/2.0;vec2 tangent=normalize(normalize(f-e)+normalize(e-d));vec2 normal=vec2(-tangent.y,tangent.x);vec2 dirVect=f-e;vec2 tmpNormal=normalize(vec2(-dirVect.y,dirVect.x));float miterLength=abs(halfWidth/dot(normal,tmpNormal));offset=normal*direction*miterLength;round=0.0;if(isRound){round=1.0;}else if(miterLength>l+k){offset=halfWidth*tmpNormal*direction;}} bool miterDown(out vec2 offset,in vec4 projPos,in mat4 offsetMatrix,in float direction){bool degenerate=false;vec2 tangent=normalize(normalize(f-e)+normalize(e-d));vec2 normal=vec2(-tangent.y,tangent.x);vec2 dirVect=d-e;vec2 tmpNormal=normalize(vec2(-dirVect.y,dirVect.x));vec2 longOffset,shortOffset,longVertex;vec4 shortProjVertex;float halfWidth=k/2.0;if(length(f-e)>length(d-e)){longOffset=tmpNormal*direction*halfWidth;shortOffset=normalize(vec2(dirVect.y,-dirVect.x))*direction*halfWidth;longVertex=f;shortProjVertex=h*vec4(d,0.0,1.0);}else{shortOffset=tmpNormal*direction*halfWidth;longOffset=normalize(vec2(dirVect.y,-dirVect.x))*direction*halfWidth;longVertex=d;shortProjVertex=h*vec4(f,0.0,1.0);}vec4 p1=h*vec4(longVertex,0.0,1.0)+offsetMatrix*vec4(longOffset,0.0,0.0);vec4 p2=projPos+offsetMatrix*vec4(longOffset,0.0,0.0);vec4 p3=shortProjVertex+offsetMatrix*vec4(-shortOffset,0.0,0.0);vec4 p4=shortProjVertex+offsetMatrix*vec4(shortOffset,0.0,0.0);float denom=(p4.y-p3.y)*(p2.x-p1.x)-(p4.x-p3.x)*(p2.y-p1.y);float firstU=((p4.x-p3.x)*(p1.y-p3.y)-(p4.y-p3.y)*(p1.x-p3.x))/denom;float secondU=((p2.x-p1.x)*(p1.y-p3.y)-(p2.y-p1.y)*(p1.x-p3.x))/denom;float epsilon=0.000000000001;if(firstU>epsilon&&firstU<1.0-epsilon&&secondU>epsilon&&secondU<1.0-epsilon){shortProjVertex.x=p1.x+firstU*(p2.x-p1.x);shortProjVertex.y=p1.y+firstU*(p2.y-p1.y);offset=shortProjVertex.xy;degenerate=true;}else{float miterLength=abs(halfWidth/dot(normal,tmpNormal));offset=normal*direction*miterLength;}return degenerate;}void squareCap(out vec2 offset,out float round,in bool isRound,in vec2 nextP,in float turnDir,in float direction){round=0.0;vec2 dirVect=e-nextP;vec2 firstNormal=normalize(dirVect);vec2 secondNormal=vec2(turnDir*firstNormal.y*direction,-turnDir*firstNormal.x*direction);vec2 hypotenuse=normalize(firstNormal-secondNormal);vec2 normal=vec2(turnDir*hypotenuse.y*direction,-turnDir*hypotenuse.x*direction);float length=sqrt(c*c*2.0);offset=normal*length;if(isRound){round=1.0;}} void main(void){bool degenerate=false;float direction=float(sign(g));mat4 offsetMatrix=i*j;vec2 offset;vec4 projPos=h*vec4(e,0.0,1.0);bool round=nearlyEquals(mod(g,2.0),0.0);a=0.0;c=k/2.0;aVertex=projPos.xy;if(nearlyEquals(mod(g,3.0),0.0)||nearlyEquals(mod(g,17.0),0.0)){alongNormal(offset,f,1.0,direction);}else if(nearlyEquals(mod(g,5.0),0.0)||nearlyEquals(mod(g,13.0),0.0)){alongNormal(offset,d,-1.0,direction);}else if(nearlyEquals(mod(g,23.0),0.0)){miterUp(offset,a,round,direction);}else if(nearlyEquals(mod(g,19.0),0.0)){degenerate=miterDown(offset,projPos,offsetMatrix,direction);}else if(nearlyEquals(mod(g,7.0),0.0)){squareCap(offset,a,round,f,1.0,direction);}else if(nearlyEquals(mod(g,11.0),0.0)){squareCap(offset,a,round,d,-1.0,direction);}if(!degenerate){vec4 offsets=offsetMatrix*vec4(offset,0.0,0.0);gl_Position=projPos+offsets;}else{gl_Position=vec4(offset,0.0,1.0);}}");function Ul(a,b){this.g=a.getUniformLocation(b,"h");this.i=a.getUniformLocation(b,"i");this.c=a.getUniformLocation(b,"j");this.oa=a.getUniformLocation(b,"k");this.O=a.getUniformLocation(b,"l");this.a=a.getUniformLocation(b,"m");this.C=a.getUniformLocation(b,"n");this.T=a.getUniformLocation(b,"o");this.qa=a.getUniformLocation(b,"p");this.l=a.getAttribLocation(b,"d");this.b=a.getAttribLocation(b,"e");this.s=a.getAttribLocation(b,"f");this.f=a.getAttribLocation(b,"g")};function Vl(a,b){ql.call(this,a,b);this.v=null;this.o=[];this.l=[];this.c={strokeColor:null,lineCap:void 0,lineDash:null,lineDashOffset:void 0,lineJoin:void 0,lineWidth:void 0,miterLimit:void 0,u:!1}}w(Vl,ql);
function Wl(a,b,c,d){var e,f=a.a.length,g=a.b.length,h="bevel"===a.c.lineJoin?0:"miter"===a.c.lineJoin?1:2,l="butt"===a.c.lineCap?0:"square"===a.c.lineCap?1:2,m=Rl(b,c,d),n=g,p=1;for(e=0;e<c;e+=d){var q=f/7;var r=u;var u=v||[b[e],b[e+1]];if(0===e){var v=[b[e+d],b[e+d+1]];if(c-0===2*d&&jc(u,v))break;if(m){r=[b[c-2*d],b[c-2*d+1]];var z=v}else{l&&(f=Xl(a,[0,0],u,v,p*Yl*l,f),f=Xl(a,[0,0],u,v,-p*Yl*l,f),a.b[g++]=q+2,a.b[g++]=q,a.b[g++]=q+1,a.b[g++]=q+1,a.b[g++]=q+3,a.b[g++]=q+2);f=Xl(a,[0,0],u,v,p*Zl*
(l||1),f);f=Xl(a,[0,0],u,v,-p*Zl*(l||1),f);n=f/7-1;continue}}else if(e===c-d){m?v=z:(r=r||[0,0],f=Xl(a,r,u,[0,0],p*$l*(l||1),f),f=Xl(a,r,u,[0,0],-p*$l*(l||1),f),a.b[g++]=q,a.b[g++]=n-1,a.b[g++]=n,a.b[g++]=n,a.b[g++]=q+1,a.b[g++]=q,l&&(f=Xl(a,r,u,[0,0],p*am*l,f),f=Xl(a,r,u,[0,0],-p*am*l,f),a.b[g++]=q+2,a.b[g++]=q,a.b[g++]=q+1,a.b[g++]=q+1,a.b[g++]=q+3,a.b[g++]=q+2));break}else v=[b[e+d],b[e+d+1]];var A=wl(r[0],r[1],u[0],u[1],v[0],v[1])?-1:1;f=Xl(a,r,u,v,A*bm*(h||1),f);f=Xl(a,r,u,v,A*cm*(h||1),f);f=
Xl(a,r,u,v,-A*dm*(h||1),f);0<e&&(a.b[g++]=q,a.b[g++]=n-1,a.b[g++]=n,a.b[g++]=q+2,a.b[g++]=q,a.b[g++]=0<p*A?n:n-1);a.b[g++]=q;a.b[g++]=q+2;a.b[g++]=q+1;n=q+2;p=A;h&&(f=Xl(a,r,u,v,A*em*h,f),a.b[g++]=q+1,a.b[g++]=q+3,a.b[g++]=q)}m&&(q=q||f/7,A=Mf([r[0],r[1],u[0],u[1],v[0],v[1]],0,6,2)?1:-1,f=Xl(a,r,u,v,A*bm*(h||1),f),Xl(a,r,u,v,-A*dm*(h||1),f),a.b[g++]=q,a.b[g++]=n-1,a.b[g++]=n,a.b[g++]=q+1,a.b[g++]=q,a.b[g++]=0<p*A?n:n-1)}
function Xl(a,b,c,d,e,f){a.a[f++]=b[0];a.a[f++]=b[1];a.a[f++]=c[0];a.a[f++]=c[1];a.a[f++]=d[0];a.a[f++]=d[1];a.a[f++]=e;return f}function fm(a,b,c,d){c-=b;return c<2*d?!1:c===2*d?!jc([a[b],a[b+1]],[a[b+d],a[b+d+1]]):!0}k=Vl.prototype;k.uc=function(a,b){var c=a.da();a=a.pa();fm(c,0,c.length,a)&&(c=Ue(c,0,c.length,a,-this.origin[0],-this.origin[1]),this.c.u&&(this.l.push(this.b.length),this.c.u=!1),this.g.push(this.b.length),this.i.push(b),Wl(this,c,c.length,a))};
k.vc=function(a,b){var c=this.b.length,d=a.pb();d.unshift(0);var e=a.da();a=a.pa();var f;if(1<d.length){var g=1;for(f=d.length;g<f;++g)if(fm(e,d[g-1],d[g],a)){var h=Ue(e,d[g-1],d[g],a,-this.origin[0],-this.origin[1]);Wl(this,h,h.length,a)}}this.b.length>c&&(this.g.push(c),this.i.push(b),this.c.u&&(this.l.push(c),this.c.u=!1))};
function gm(a,b,c,d){Rl(b,b.length,d)||(b.push(b[0]),b.push(b[1]));Wl(a,b,b.length,d);if(c.length){var e;b=0;for(e=c.length;b<e;++b)Rl(c[b],c[b].length,d)||(c[b].push(c[b][0]),c[b].push(c[b][1])),Wl(a,c[b],c[b].length,d)}}function hm(a,b,c){c=void 0===c?a.b.length:c;a.g.push(c);a.i.push(b);a.c.u&&(a.l.push(c),a.c.u=!1)}k.gb=function(){this.s=new yl(this.a);this.j=new yl(this.b);this.g.push(this.b.length);0===this.l.length&&0<this.o.length&&(this.o=[]);this.b=this.a=null};
k.Db=function(a){var b=this.s,c=this.j;return function(){Bl(a,b);Bl(a,c)}};
k.Bf=function(a,b,c,d){var e=Cl(b,Sl,Tl);if(this.v)var f=this.v;else this.v=f=new Ul(a,e);b.cd(e);a.enableVertexAttribArray(f.l);a.vertexAttribPointer(f.l,2,5126,!1,28,0);a.enableVertexAttribArray(f.b);a.vertexAttribPointer(f.b,2,5126,!1,28,8);a.enableVertexAttribArray(f.s);a.vertexAttribPointer(f.s,2,5126,!1,28,16);a.enableVertexAttribArray(f.f);a.vertexAttribPointer(f.f,1,5126,!1,28,24);a.uniform2fv(f.T,c);a.uniform1f(f.qa,d);return f};
k.Cf=function(a,b){a.disableVertexAttribArray(b.l);a.disableVertexAttribArray(b.b);a.disableVertexAttribArray(b.s);a.disableVertexAttribArray(b.f)};
k.Od=function(a,b,c,d){var e=a.getParameter(a.DEPTH_FUNC),f=a.getParameter(a.DEPTH_WRITEMASK);d||(a.enable(a.DEPTH_TEST),a.depthMask(!0),a.depthFunc(a.NOTEQUAL));if(nb(c)){var g=this.g[this.g.length-1];for(c=this.l.length-1;0<=c;--c){var h=this.l[c];var l=this.o[c];im(this,a,l[0],l[1],l[2]);sl(a,b,h,g);a.clear(a.DEPTH_BUFFER_BIT);g=h}}else{var m=this.g.length-2;l=g=this.g[m+1];for(h=this.l.length-1;0<=h;--h){var n=this.o[h];im(this,a,n[0],n[1],n[2]);for(n=this.l[h];0<=m&&this.g[m]>=n;){var p=this.g[m];
var q=this.i[m];q=x(q).toString();c[q]&&(g!==l&&(sl(a,b,g,l),a.clear(a.DEPTH_BUFFER_BIT)),l=p);m--;g=p}g!==l&&(sl(a,b,g,l),a.clear(a.DEPTH_BUFFER_BIT));g=l=n}}d||(a.disable(a.DEPTH_TEST),a.clear(a.DEPTH_BUFFER_BIT),a.depthMask(f),a.depthFunc(e))};
k.Ee=function(a,b,c,d,e){var f,g;var h=this.g.length-2;var l=this.g[h+1];for(f=this.l.length-1;0<=f;--f){var m=this.o[f];im(this,a,m[0],m[1],m[2]);for(g=this.l[f];0<=h&&this.g[h]>=g;){m=this.g[h];var n=this.i[h];var p=x(n).toString();if(void 0===c[p]&&n.U()&&(void 0===e||hb(e,n.U().G()))&&(a.clear(a.COLOR_BUFFER_BIT|a.DEPTH_BUFFER_BIT),sl(a,b,m,l),l=d(n)))return l;h--;l=m}}};function im(a,b,c,d,e){b.uniform4fv(a.v.C,c);b.uniform1f(a.v.oa,d);b.uniform1f(a.v.O,e)}
k.Oa=function(a,b){a=b.f;this.c.lineCap=void 0!==a?a:"round";a=b.g;this.c.lineDash=a?a:ul;a=b.i;this.c.lineDashOffset=a?a:0;a=b.j;this.c.lineJoin=void 0!==a?a:"round";a=b.a;a instanceof CanvasGradient||a instanceof CanvasPattern?a=vl:a=vi(a).map(function(a,b){return 3!=b?a/255:a})||vl;var c=b.c;c=void 0!==c?c:1;b=b.l;b=void 0!==b?b:10;this.c.strokeColor&&jc(this.c.strokeColor,a)&&this.c.lineWidth===c&&this.c.miterLimit===b||(this.c.u=!0,this.c.strokeColor=a,this.c.lineWidth=c,this.c.miterLimit=b,
this.o.push([a,c,b]))};var Zl=3,$l=5,Yl=7,am=11,bm=13,cm=17,dm=19,em=23;var jm=new il("precision mediump float;uniform vec4 e;uniform float f;void main(void){gl_FragColor=e;float alpha=e.a*f;if(alpha==0.0){discard;}gl_FragColor.a=alpha;}"),km=new jl("attribute vec2 a;uniform mat4 b;uniform mat4 c;uniform mat4 d;void main(void){gl_Position=b*vec4(a,0.0,1.0);}");function lm(a,b){this.g=a.getUniformLocation(b,"b");this.i=a.getUniformLocation(b,"c");this.c=a.getUniformLocation(b,"d");this.C=a.getUniformLocation(b,"e");this.a=a.getUniformLocation(b,"f");this.b=a.getAttribLocation(b,"a")};function mm(){this.b=this.a=this.g=void 0;this.c=0}function nm(a){var b=a.b;if(b){var c=b.next,d=b.Eb;c&&(c.Eb=d);d&&(d.next=c);a.b=c||d;a.g===a.a?(a.b=void 0,a.g=void 0,a.a=void 0):a.g===b?a.g=a.b:a.a===b&&(a.a=d?a.b.Eb:a.b);a.c--}}function om(a){a.b=a.g;if(a.b)return a.b.data}function pm(a){if(a.b&&a.b.next)return a.b=a.b.next,a.b.data}function qm(a){if(a.b&&a.b.next)return a.b.next.data}function rm(a){if(a.b&&a.b.Eb)return a.b=a.b.Eb,a.b.data}function sm(a){if(a.b&&a.b.Eb)return a.b.Eb.data}
function tm(a){if(a.b)return a.b.data}mm.prototype.concat=function(a){if(a.b){if(this.b){var b=this.b.next;this.b.next=a.g;a.g.Eb=this.b;b.Eb=a.a;a.a.next=b;this.c+=a.c}else this.b=a.b,this.g=a.g,this.a=a.a,this.c=a.c;a.b=void 0;a.g=void 0;a.a=void 0;a.c=0}};function um(){this.a=rj.Jc(void 0);this.b={}}k=um.prototype;k.Ca=function(a,b){a={fa:a[0],ea:a[1],la:a[2],ka:a[3],value:b};this.a.Ca(a);this.b[x(b)]=a};k.load=function(a,b){for(var c=Array(b.length),d=0,e=b.length;d<e;d++){var f=a[d],g=b[d];f={fa:f[0],ea:f[1],la:f[2],ka:f[3],value:g};c[d]=f;this.b[x(g)]=f}this.a.load(c)};k.remove=function(a){a=x(a);var b=this.b[a];delete this.b[a];return null!==this.a.remove(b)};
function vm(a,b,c){var d=a.b[x(c)];Sa([d.fa,d.ea,d.la,d.ka],b)||(a.remove(c),a.Ca(b,c))}function wm(a){return a.a.all().map(function(a){return a.value})}function xm(a,b){return a.a.search({fa:b[0],ea:b[1],la:b[2],ka:b[3]}).map(function(a){return a.value})}k.forEach=function(a,b){return ym(wm(this),a,b)};function zm(a,b,c,d){return ym(xm(a,b),c,d)}function ym(a,b,c){for(var d,e=0,f=a.length;e<f&&!(d=b.call(c,a[e]));e++);return d}k.clear=function(){this.a.clear();this.b={}};
k.G=function(a){var b=this.a.data;return Na(b.fa,b.ea,b.la,b.ka,a)};k.concat=function(a){this.a.load(a.a.all());for(var b in a.b)this.b[b|0]=a.b[b|0]};function Am(a,b){ql.call(this,a,b);this.f=new Vl(a,b);this.v=null;this.o=[];this.c=[];this.l={fillColor:null,u:!1}}w(Am,ql);
function Bm(a,b,c,d){var e=new mm,f=new um;Cm(a,b,d,e,f,!0);b=Dm(e);if(c.length){var g,h=[];var l=0;for(g=c.length;l<g;++l){var m={list:new mm,Ec:void 0,gh:new um};h.push(m);Cm(a,c[l],d,m.list,m.gh,!1);Em(m.list,m.gh,!0);m.Ec=Dm(m.list)}h.sort(function(a,b){return b.Ec[0]===a.Ec[0]?a.Ec[1]-b.Ec[1]:b.Ec[0]-a.Ec[0]});for(l=0;l<h.length;++l){c=h[l].list;g=d=om(c);do{if(Fm(g,f).length){var n=!0;break}g=pm(c)}while(d!==g);!n&&Gm(c,h[l].Ec[0],e,b[0],f)&&(f.concat(h[l].gh),Em(e,f,!1))}}else Em(e,f,!1);Hm(a,
e,f)}
function Cm(a,b,c,d,e,f){var g,h=a.a.length/2,l=[],m=[];if(f===Mf(b,0,b.length,c)){var n=f=Im(a,b[0],b[1],h++);var p=c;for(g=b.length;p<g;p+=c){var q=Im(a,b[p],b[p+1],h++);m.push(Jm(n,q,d));l.push([Math.min(n.x,q.x),Math.min(n.y,q.y),Math.max(n.x,q.x),Math.max(n.y,q.y)]);n=q}}else for(p=b.length-c,n=f=Im(a,b[p],b[p+1],h++),p-=c,g=0;p>=g;p-=c)q=Im(a,b[p],b[p+1],h++),m.push(Jm(n,q,d)),l.push([Math.min(n.x,q.x),Math.min(n.y,q.y),Math.max(n.x,q.x),Math.max(n.y,q.y)]),n=q;m.push(Jm(q,f,d));l.push([Math.min(n.x,q.x),
Math.min(n.y,q.y),Math.max(n.x,q.x),Math.max(n.y,q.y)]);e.load(l,m)}function Dm(a){var b=om(a),c=b,d=[c.Z.x,c.Z.y];do c=pm(a),c.Z.x>d[0]&&(d=[c.Z.x,c.Z.y]);while(c!==b);return d}function Em(a,b,c){var d=om(a),e=d,f=pm(a),g=!1;do{var h=c?wl(f.X.x,f.X.y,e.X.x,e.X.y,e.Z.x,e.Z.y):wl(e.Z.x,e.Z.y,e.X.x,e.X.y,f.X.x,f.X.y);void 0===h?(Km(e,f,a,b),g=!0,f===d&&(d=qm(a)),f=e,rm(a)):e.X.Kb!==h&&(e.X.Kb=h,g=!0);e=f;f=pm(a)}while(e!==d);return g}
function Gm(a,b,c,d,e){for(var f=om(a);f.X.x!==b;)f=pm(a);b=f.X;d={x:d,y:b.y,qb:-1};var g=Infinity,h;var l=Fm({Z:b,X:d},e,!0);var m=0;for(h=l.length;m<h;++m){var n=l[m],p=Lm(b,d,n.Z,n.X,!0),q=Math.abs(b.x-p[0]);if(q<g&&void 0!==wl(b.x,b.y,n.Z.x,n.Z.y,n.X.x,n.X.y)){g=q;var r={x:p[0],y:p[1],qb:-1};f=n}}if(Infinity===g)return!1;l=f.X;if(0<g&&(f=Mm(b,r,f.X,e),f.length))for(r=Infinity,m=0,h=f.length;m<h;++m)if(g=f[m],n=Math.atan2(b.y-g.y,d.x-g.x),n<r||n===r&&g.x<l.x)r=n,l=g;for(f=om(c);f.X.x!==l.x||f.X.y!==
l.y;)f=pm(c);d={x:b.x,y:b.y,qb:b.qb,Kb:void 0};m={x:f.X.x,y:f.X.y,qb:f.X.qb,Kb:void 0};qm(a).Z=d;Jm(b,f.X,a,e);Jm(m,d,a,e);f.X=m;a.b&&(a.g=a.b,a.a=a.b.Eb);c.concat(a);return!0}
function Hm(a,b,c){for(var d=!1,e=Nm(b,c);3<b.c;)if(e){if(!Om(a,b,c,e,d)&&!Em(b,c,d)&&!Pm(a,b,c,!0))break}else if(!Om(a,b,c,e,d)&&!Em(b,c,d)&&!Pm(a,b,c))if(e=Nm(b,c)){d=b;var f=2*d.c,g=Array(f),h=om(d),l=h,m=0;do g[m++]=l.Z.x,g[m++]=l.Z.y,l=pm(d);while(l!==h);d=!Mf(g,0,f,2);Em(b,c,d)}else{e=a;d=b;f=g=om(d);do{h=Fm(f,c);if(h.length){g=h[0];h=Lm(f.Z,f.X,g.Z,g.X);h=Im(e,h[0],h[1],e.a.length/2);l=new mm;m=new um;Jm(h,f.X,l,m);f.X=h;vm(c,[Math.min(f.Z.x,h.x),Math.min(f.Z.y,h.y),Math.max(f.Z.x,h.x),Math.max(f.Z.y,
h.y)],f);for(f=pm(d);f!==g;)Jm(f.Z,f.X,l,m),c.remove(f),nm(d),f=tm(d);Jm(g.Z,h,l,m);g.Z=h;vm(c,[Math.min(g.X.x,h.x),Math.min(g.X.y,h.y),Math.max(g.X.x,h.x),Math.max(g.X.y,h.y)],g);Em(d,c,!1);Hm(e,d,c);Em(l,m,!1);Hm(e,l,m);break}f=pm(d)}while(f!==g);break}3===b.c&&(e=a.b.length,a.b[e++]=sm(b).Z.qb,a.b[e++]=tm(b).Z.qb,a.b[e++]=qm(b).Z.qb)}
function Om(a,b,c,d,e){var f=a.b.length,g=om(b),h=sm(b),l=g,m=pm(b),n=qm(b),p=!1;do{var q=l.Z;var r=l.X;var u=m.X;if(!1===r.Kb){var v=d?0===Mm(q,r,u,c,!0).length:e?Qm(n.X,u,r,q,h.Z):Qm(h.Z,q,r,u,n.X);!d&&0!==Fm({Z:q,X:u},c).length||!v||!d&&!1!==q.Kb&&!1!==u.Kb&&Mf([h.Z.x,h.Z.y,q.x,q.y,r.x,r.y,u.x,u.y,n.X.x,n.X.y],0,10,2)!==!e||(a.b[f++]=q.qb,a.b[f++]=r.qb,a.b[f++]=u.qb,Km(l,m,b,c),m===g&&(g=n),p=!0)}h=sm(b);l=tm(b);m=pm(b);n=qm(b)}while(l!==g&&3<b.c);return p}
function Pm(a,b,c,d){var e=om(b);pm(b);var f=e,g=pm(b),h=!1;do{var l=Lm(f.Z,f.X,g.Z,g.X,d);if(l){h=a.b.length;var m=a.a.length/2,n=rm(b);nm(b);c.remove(n);var p=n===e;d?(l[0]===f.Z.x&&l[1]===f.Z.y?(rm(b),l=f.Z,g.Z=l,c.remove(f),p=p||f===e):(l=g.X,f.X=l,c.remove(g),p=p||g===e),nm(b)):(l=Im(a,l[0],l[1],m),f.X=l,g.Z=l,vm(c,[Math.min(f.Z.x,f.X.x),Math.min(f.Z.y,f.X.y),Math.max(f.Z.x,f.X.x),Math.max(f.Z.y,f.X.y)],f),vm(c,[Math.min(g.Z.x,g.X.x),Math.min(g.Z.y,g.X.y),Math.max(g.Z.x,g.X.x),Math.max(g.Z.y,
g.X.y)],g));a.b[h++]=n.Z.qb;a.b[h++]=n.X.qb;a.b[h++]=l.qb;h=!0;if(p)break}f=sm(b);g=pm(b)}while(f!==e);return h}function Nm(a,b){var c=om(a),d=c;do{if(Fm(d,b).length)return!1;d=pm(a)}while(d!==c);return!0}function Im(a,b,c,d){var e=a.a.length;a.a[e++]=b;a.a[e++]=c;return{x:b,y:c,qb:d,Kb:void 0}}
function Jm(a,b,c,d){var e={Z:a,X:b},f={Eb:void 0,next:void 0,data:e},g=c.b;if(g){var h=g.next;f.Eb=g;f.next=h;g.next=f;h&&(h.Eb=f);g===c.a&&(c.a=f)}else c.g=f,c.a=f,f.next=f,f.Eb=f;c.b=f;c.c++;d&&d.Ca([Math.min(a.x,b.x),Math.min(a.y,b.y),Math.max(a.x,b.x),Math.max(a.y,b.y)],e);return e}function Km(a,b,c,d){tm(c)===b&&(nm(c),a.X=b.X,d.remove(b),vm(d,[Math.min(a.Z.x,a.X.x),Math.min(a.Z.y,a.X.y),Math.max(a.Z.x,a.X.x),Math.max(a.Z.y,a.X.y)],a))}
function Mm(a,b,c,d,e){var f,g,h=[],l=xm(d,[Math.min(a.x,b.x,c.x),Math.min(a.y,b.y,c.y),Math.max(a.x,b.x,c.x),Math.max(a.y,b.y,c.y)]);d=0;for(f=l.length;d<f;++d)for(g in l[d]){var m=l[d][g];"object"!==typeof m||e&&!m.Kb||m.x===a.x&&m.y===a.y||m.x===b.x&&m.y===b.y||m.x===c.x&&m.y===c.y||-1!==h.indexOf(m)||!Gf([a.x,a.y,b.x,b.y,c.x,c.y],0,6,2,m.x,m.y)||h.push(m)}return h}
function Fm(a,b,c){var d=a.Z,e=a.X;b=xm(b,[Math.min(d.x,e.x),Math.min(d.y,e.y),Math.max(d.x,e.x),Math.max(d.y,e.y)]);var f=[],g;var h=0;for(g=b.length;h<g;++h){var l=b[h];a!==l&&(c||l.Z!==e||l.X!==d)&&Lm(d,e,l.Z,l.X,c)&&f.push(l)}return f}
function Lm(a,b,c,d,e){var f=(d.y-c.y)*(b.x-a.x)-(d.x-c.x)*(b.y-a.y);if(0!==f&&(d=((d.x-c.x)*(a.y-c.y)-(d.y-c.y)*(a.x-c.x))/f,c=((b.x-a.x)*(a.y-c.y)-(b.y-a.y)*(a.x-c.x))/f,!e&&d>xl&&d<1-xl&&c>xl&&c<1-xl||e&&0<=d&&1>=d&&0<=c&&1>=c))return[a.x+d*(b.x-a.x),a.y+d*(b.y-a.y)]}
function Qm(a,b,c,d,e){if(void 0===b.Kb||void 0===d.Kb)return!1;var f=(c.x-d.x)*(b.y-d.y)>(c.y-d.y)*(b.x-d.x);e=(e.x-d.x)*(b.y-d.y)<(e.y-d.y)*(b.x-d.x);a=(a.x-b.x)*(d.y-b.y)>(a.y-b.y)*(d.x-b.x);c=(c.x-b.x)*(d.y-b.y)<(c.y-b.y)*(d.x-b.x);b=b.Kb?c||a:c&&a;return(d.Kb?e||f:e&&f)&&b}k=Am.prototype;
k.xc=function(a,b){var c=a.td(),d=a.pa(),e=this.b.length,f=this.f.b.length;a=a.da();var g,h,l;var m=h=0;for(g=c.length;m<g;++m){var n=c[m];if(0<n.length){var p=Ue(a,h,n[0],d,-this.origin[0],-this.origin[1]);if(p.length){var q=[];h=1;for(l=n.length;h<l;++h)if(n[h]!==n[h-1]){var r=Ue(a,n[h-1],n[h],d,-this.origin[0],-this.origin[1]);q.push(r)}gm(this.f,p,q,d);Bm(this,p,q,d)}}h=n[n.length-1]}this.b.length>e&&(this.g.push(e),this.i.push(b),this.l.u&&(this.c.push(e),this.l.u=!1));this.f.b.length>f&&hm(this.f,
b,f)};k.zc=function(a,b){var c=a.pb(),d=a.pa();if(0<c.length){a=a.da().map(Number);var e=Ue(a,0,c[0],d,-this.origin[0],-this.origin[1]);if(e.length){var f=[],g;var h=1;for(g=c.length;h<g;++h)if(c[h]!==c[h-1]){var l=Ue(a,c[h-1],c[h],d,-this.origin[0],-this.origin[1]);f.push(l)}this.g.push(this.b.length);this.i.push(b);this.l.u&&(this.c.push(this.b.length),this.l.u=!1);hm(this.f,b);gm(this.f,e,f,d);Bm(this,e,f,d)}}};
k.gb=function(a){this.s=new yl(this.a);this.j=new yl(this.b);this.g.push(this.b.length);this.f.gb(a);0===this.c.length&&0<this.o.length&&(this.o=[]);this.b=this.a=null};k.Db=function(a){var b=this.s,c=this.j,d=this.f.Db(a);return function(){Bl(a,b);Bl(a,c);d()}};k.Bf=function(a,b){var c=Cl(b,jm,km);if(this.v)var d=this.v;else this.v=d=new lm(a,c);b.cd(c);a.enableVertexAttribArray(d.b);a.vertexAttribPointer(d.b,2,5126,!1,8,0);return d};k.Cf=function(a,b){a.disableVertexAttribArray(b.b)};
k.Od=function(a,b,c,d){var e=a.getParameter(a.DEPTH_FUNC),f=a.getParameter(a.DEPTH_WRITEMASK);d||(a.enable(a.DEPTH_TEST),a.depthMask(!0),a.depthFunc(a.NOTEQUAL));if(nb(c)){var g=this.g[this.g.length-1];for(c=this.c.length-1;0<=c;--c){var h=this.c[c];var l=this.o[c];a.uniform4fv(this.v.C,l);sl(a,b,h,g);g=h}}else{var m=this.g.length-2;l=g=this.g[m+1];for(h=this.c.length-1;0<=h;--h){var n=this.o[h];a.uniform4fv(this.v.C,n);for(n=this.c[h];0<=m&&this.g[m]>=n;){var p=this.g[m];var q=this.i[m];q=x(q).toString();
c[q]&&(g!==l&&(sl(a,b,g,l),a.clear(a.DEPTH_BUFFER_BIT)),l=p);m--;g=p}g!==l&&(sl(a,b,g,l),a.clear(a.DEPTH_BUFFER_BIT));g=l=n}}d||(a.disable(a.DEPTH_TEST),a.clear(a.DEPTH_BUFFER_BIT),a.depthMask(f),a.depthFunc(e))};
k.Ee=function(a,b,c,d,e){var f,g;var h=this.g.length-2;var l=this.g[h+1];for(f=this.c.length-1;0<=f;--f){var m=this.o[f];a.uniform4fv(this.v.C,m);for(g=this.c[f];0<=h&&this.g[h]>=g;){m=this.g[h];var n=this.i[h];var p=x(n).toString();if(void 0===c[p]&&n.U()&&(void 0===e||hb(e,n.U().G()))&&(a.clear(a.COLOR_BUFFER_BIT|a.DEPTH_BUFFER_BIT),sl(a,b,m,l),l=d(n)))return l;h--;l=m}}};
k.Oa=function(a,b){a=a?a.b:[0,0,0,0];a instanceof CanvasGradient||a instanceof CanvasPattern?a=tl:a=vi(a).map(function(a,b){return 3!=b?a/255:a})||tl;this.l.fillColor&&jc(a,this.l.fillColor)||(this.l.fillColor=a,this.l.u=!0,this.o.push(a));b?this.f.Oa(null,b):this.f.Oa(null,new Ak({color:[0,0,0,0],lineWidth:0}))};function Rm(a,b){this.b=b;this.a=[{x:0,y:0,width:a,height:a}];this.c={};this.g=hg(a,a);this.i=this.g.canvas}Rm.prototype.get=function(a){return this.c[a]||null};
Rm.prototype.add=function(a,b,c,d,e){var f;var g=0;for(f=this.a.length;g<f;++g){var h=this.a[g];if(h.width>=b+this.b&&h.height>=c+this.b)return f={offsetX:h.x+this.b,offsetY:h.y+this.b,image:this.i},this.c[a]=f,d.call(e,this.g,h.x+this.b,h.y+this.b),a=g,b+=this.b,d=c+this.b,h.width-b>h.height-d?(c={x:h.x+b,y:h.y,width:h.width-b,height:h.height},b={x:h.x,y:h.y+d,width:b,height:h.height-d},Sm(this,a,c,b)):(c={x:h.x+b,y:h.y,width:h.width-b,height:d},b={x:h.x,y:h.y+d,width:h.width,height:h.height-d},
Sm(this,a,c,b)),f}return null};function Sm(a,b,c,d){b=[b,1];0<c.width&&0<c.height&&b.push(c);0<d.width&&0<d.height&&b.push(d);a.a.splice.apply(a.a,b)};function Tm(a){a=a||{};this.a=void 0!==a.initialSize?a.initialSize:256;this.g=void 0!==a.maxSize?a.maxSize:void 0!==ba?ba:2048;this.b=void 0!==a.space?a.space:1;this.f=[new Rm(this.a,this.b)];this.c=this.a;this.i=[new Rm(this.c,this.b)]}function Um(a,b){var c;var d=0;for(c=a.length;d<c;++d){var e=a[d];if(e=e.get(b))return e}return null}function Vm(a,b){return{offsetX:a.offsetX,offsetY:a.offsetY,image:a.image,Bm:b.image}}
Tm.prototype.add=function(a,b,c,d,e,f){if(b+this.b>this.g||c+this.b>this.g)return null;d=Wm(this,!1,a,b,c,d,f);if(!d)return null;a=Wm(this,!0,a,b,c,void 0!==e?e:ea,f);return Vm(d,a)};function Wm(a,b,c,d,e,f,g){var h=b?a.i:a.f,l;var m=0;for(l=h.length;m<l;++m){var n=h[m];if(n=n.add(c,d,e,f,g))return n;n||m!==l-1||(b?(n=Math.min(2*a.c,a.g),a.c=n):(n=Math.min(2*a.a,a.g),a.a=n),n=new Rm(n,a.b),h.push(n),++l)}return null};function Xm(a,b){Nl.call(this,a,b);this.c=[];this.ua=[];this.Ub=hg(0,0).canvas;this.N={strokeColor:null,lineCap:void 0,lineDash:null,lineDashOffset:void 0,lineJoin:void 0,lineWidth:0,miterLimit:void 0,fillColor:null,font:void 0,scale:void 0};this.ta="";this.ca=this.$=this.ra=this.ab=void 0;this.B={};this.l=void 0;this.opacity=this.scale=1}w(Xm,Nl);k=Xm.prototype;
k.Wb=function(a,b){if(this.ta){var c=null,d=2,e=2;switch(a.S()){case "Point":case "MultiPoint":c=a.da();d=c.length;e=a.pa();break;case "Circle":c=a.xa();break;case "LineString":c=a.Fe();break;case "MultiLineString":c=a.Ge();d=c.length;break;case "Polygon":c=a.Td();break;case "MultiPolygon":c=Ji(a),d=c.length}this.g.push(this.b.length);this.i.push(b);a=this.l;b=this.ta.split("\n");var f=Ym(this,b),g,h,l=Math.round(f[0]*this.ab-this.$),m=Math.round(f[1]*this.ra-this.ca),n=this.N.lineWidth/2*this.N.scale;
f=0;for(g=b.length;f<g;++f){var p=0;var q=a.height*f;var r=b[f].split("");var u=0;for(h=r.length;u<h;++u){var v=a.Bh;var z=r[u],A=Um(v.f,z);A?(v=Um(v.i,z),v=Vm(A,v)):v=null;if(v){A=v.image;this.D=l-p;this.C=m-q;this.T=0===u?v.offsetX-n:v.offsetX;this.O=v.offsetY;this.height=a.height;this.width=0===u||u===r.length-1?a.width[r[u]]+n:a.width[r[u]];this.oa=A.height;this.qa=A.width;0===this.c.length?this.c.push(A):(v=this.c[this.c.length-1],x(v)!=x(A)&&(this.v.push(this.b.length),this.c.push(A)));v=c;
z=d;var E=e;for(A=0;A<z;A+=E)Ol(this,v,z,E)}p+=this.width}}}};function Ym(a,b){var c=a.l,d=b.length*c.height;return[b.map(function(b){var d=0,e;var h=0;for(e=b.length;h<e;++h){var l=b[h];c.width[l]||Zm(a,l);d+=c.width[l]?c.width[l]:0}return d}).reduce(function(a,b){return Math.max(a,b)}),d]}
function Zm(a,b){if(1===b.length){var c=a.l,d=a.N;a=a.Ub.getContext("2d");a.font=d.font;a=Math.ceil(a.measureText(b).width*d.scale);c.Bh.add(b,a,c.height,function(a,c,g){a.font=d.font;a.fillStyle=d.fillColor;a.strokeStyle=d.strokeColor;a.lineWidth=d.lineWidth;a.lineCap=d.lineCap;a.lineJoin=d.lineJoin;a.miterLimit=d.miterLimit;a.textAlign="left";a.textBaseline="top";od&&d.lineDash&&(a.setLineDash(d.lineDash),a.lineDashOffset=d.lineDashOffset);1!==d.scale&&a.setTransform(d.scale,0,0,d.scale,0,0);d.strokeColor&&
a.strokeText(b,c,g);d.fillColor&&a.fillText(b,c,g)})&&(c.width[b]=a)}}k.gb=function(a){var b=a.b;this.v.push(this.b.length);this.o=this.v;this.s=new yl(this.a);this.j=new yl(this.b);Pl(this.ua,this.c,{},b);this.N={strokeColor:null,lineCap:void 0,lineDash:null,lineDashOffset:void 0,lineJoin:void 0,lineWidth:0,miterLimit:void 0,fillColor:null,font:void 0,scale:void 0};this.ta="";this.ca=this.$=this.ra=this.ab=void 0;this.c=null;this.B={};this.l=void 0;Nl.prototype.gb.call(this,a)};
k.nb=function(a){var b=this.N,c=a.Fa(),d=a.Ga();if(a&&a.Ka()&&(c||d)){c?(c=c.b,b.fillColor=zi(c?c:tl)):b.fillColor=null;d?(c=d.a,b.strokeColor=zi(c?c:vl),b.lineWidth=d.c||1,b.lineCap=d.f||"round",b.lineDashOffset=d.i||0,b.lineJoin=d.j||"round",b.miterLimit=d.l||10,d=d.g,b.lineDash=d?d.slice():ul):(b.strokeColor=null,b.lineWidth=0);b.font=a.a||"10px sans-serif";b.scale=a.b||1;this.ta=a.Ka();d=vj[a.f];c=vj[a.j];this.ab=void 0===d?.5:d;this.ra=void 0===c?.5:c;this.$=a.g||0;this.ca=a.c||0;this.rotateWithView=
!!a.l;this.rotation=a.i||0;a=[];for(var e in b)if(b[e]||0===b[e])Array.isArray(b[e])?a=a.concat(b[e]):a.push(b[e]);c="";e=0;for(d=a.length;e<d;++e)c+=a[e];e=c;this.B[e]||(a=this.Ub.getContext("2d"),a.font=b.font,a=Math.ceil((1.5*a.measureText("M").width+b.lineWidth/2)*b.scale),this.B[e]={Bh:new Tm({space:b.lineWidth+1}),width:{},height:a});this.l=this.B[e]}else this.ta=""};k.ig=function(){return this.ua};k.ag=function(){return this.ua};function $m(a,b,c){this.c=b;this.i=a;this.g=c;this.a={}}w($m,sj);k=$m.prototype;k.Vb=function(){};function an(a,b){var c=[],d;for(d in a.a){var e=a.a[d],f;for(f in e)c.push(e[f].Db(b))}return function(){for(var a=c.length,b,d=0;d<a;d++)b=c[d].apply(this,arguments);return b}}function bn(a,b){for(var c in a.a){var d=a.a[c],e;for(e in d)d[e].gb(b)}}k.Ja=function(a,b){var c=void 0!==a?a.toString():"0";a=this.a[c];void 0===a&&(a={},this.a[c]=a);c=a[b];void 0===c&&(c=new cn[b](this.i,this.c),a[b]=c);return c};
k.yg=function(){return nb(this.a)};k.Na=function(a,b,c,d,e,f,g,h){var l=Object.keys(this.a).map(Number);l.sort(dc);var m,n;var p=0;for(m=l.length;p<m;++p){var q=this.a[l[p].toString()];var r=0;for(n=uj.length;r<n;++r){var u=q[uj[r]];void 0!==u&&u.Na(a,b,c,d,e,f,g,h,void 0,!1)}}};
function dn(a,b,c,d,e,f,g,h,l,m,n){var p=en,q=Object.keys(a.a).map(Number);q.sort(function(a,b){return b-a});var r,u;var v=0;for(r=q.length;v<r;++v){var z=a.a[q[v].toString()];for(u=uj.length-1;0<=u;--u){var A=z[uj[u]];if(void 0!==A&&(A=A.Na(b,c,d,e,p,f,g,h,l,m,n)))return A}}}
k.wa=function(a,b,c,d,e,f,g,h,l,m){var n=b.b;n.bindFramebuffer(n.FRAMEBUFFER,Il(b));var p;void 0!==this.g&&(p=Fa(Pa(a),d*this.g));return dn(this,b,a,d,e,g,h,l,function(a){var b=new Uint8Array(4);n.readPixels(0,0,1,1,n.RGBA,n.UNSIGNED_BYTE,b);if(0<b[3]&&(a=m(a)))return a},!0,p)};function fn(a,b,c,d,e,f,g,h){var l=c.b;l.bindFramebuffer(l.FRAMEBUFFER,Il(c));return void 0!==dn(a,c,b,d,e,f,g,h,function(){var a=new Uint8Array(4);l.readPixels(0,0,1,1,l.RGBA,l.UNSIGNED_BYTE,a);return 0<a[3]},!1)}
var en=[1,1],cn={Circle:Al,Image:Ql,LineString:Vl,Polygon:Am,Text:Xm};function gn(a,b,c,d,e,f,g){this.b=a;this.g=b;this.c=f;this.i=g;this.l=e;this.j=d;this.f=c;this.a=this.s=this.v=this.o=null}w(gn,Ai);function hn(a,b,c){var d=a.b;b=b.Ja(0,"Text");b.nb(a.a);b.Wb(c,null);b.gb(d);b.Na(a.b,a.g,a.f,a.j,a.l,a.i,1,{},void 0,!1);b.Db(d)()}k=gn.prototype;k.Dd=function(a){this.Oa(a.Fa(),a.Ga());this.Zb(a.Y());this.nb(a.Ka())};
k.Hb=function(a){switch(a.S()){case "Point":this.yc(a,null);break;case "LineString":this.uc(a,null);break;case "Polygon":this.zc(a,null);break;case "MultiPoint":this.wc(a,null);break;case "MultiLineString":this.vc(a,null);break;case "MultiPolygon":this.xc(a,null);break;case "GeometryCollection":this.De(a);break;case "Circle":this.cc(a,null)}};k.Ce=function(a,b){(a=(0,b.cb)(a))&&hb(this.c,a.G())&&(this.Dd(b),this.Hb(a))};k.De=function(a){a=a.a;var b;var c=0;for(b=a.length;c<b;++c)this.Hb(a[c])};
k.yc=function(a,b){var c=this.b,d=new $m(1,this.c),e=d.Ja(0,"Image");e.Zb(this.o);e.yc(a,b);e.gb(c);e.Na(this.b,this.g,this.f,this.j,this.l,this.i,1,{},void 0,!1);e.Db(c)();this.a&&hn(this,d,a)};k.wc=function(a,b){var c=this.b,d=new $m(1,this.c),e=d.Ja(0,"Image");e.Zb(this.o);e.wc(a,b);e.gb(c);e.Na(this.b,this.g,this.f,this.j,this.l,this.i,1,{},void 0,!1);e.Db(c)();this.a&&hn(this,d,a)};
k.uc=function(a,b){var c=this.b,d=new $m(1,this.c),e=d.Ja(0,"LineString");e.Oa(null,this.s);e.uc(a,b);e.gb(c);e.Na(this.b,this.g,this.f,this.j,this.l,this.i,1,{},void 0,!1);e.Db(c)();this.a&&hn(this,d,a)};k.vc=function(a,b){var c=this.b,d=new $m(1,this.c),e=d.Ja(0,"LineString");e.Oa(null,this.s);e.vc(a,b);e.gb(c);e.Na(this.b,this.g,this.f,this.j,this.l,this.i,1,{},void 0,!1);e.Db(c)();this.a&&hn(this,d,a)};
k.zc=function(a,b){var c=this.b,d=new $m(1,this.c),e=d.Ja(0,"Polygon");e.Oa(this.v,this.s);e.zc(a,b);e.gb(c);e.Na(this.b,this.g,this.f,this.j,this.l,this.i,1,{},void 0,!1);e.Db(c)();this.a&&hn(this,d,a)};k.xc=function(a,b){var c=this.b,d=new $m(1,this.c),e=d.Ja(0,"Polygon");e.Oa(this.v,this.s);e.xc(a,b);e.gb(c);e.Na(this.b,this.g,this.f,this.j,this.l,this.i,1,{},void 0,!1);e.Db(c)();this.a&&hn(this,d,a)};
k.cc=function(a,b){var c=this.b,d=new $m(1,this.c),e=d.Ja(0,"Circle");e.Oa(this.v,this.s);e.cc(a,b);e.gb(c);e.Na(this.b,this.g,this.f,this.j,this.l,this.i,1,{},void 0,!1);e.Db(c)();this.a&&hn(this,d,a)};k.Zb=function(a){this.o=a};k.Oa=function(a,b){this.v=a;this.s=b};k.nb=function(a){this.a=a};var jn=new il("precision mediump float;varying vec2 a;uniform float f;uniform sampler2D g;void main(void){vec4 texColor=texture2D(g,a);gl_FragColor.rgb=texColor.rgb;gl_FragColor.a=texColor.a*f;}"),kn=new jl("varying vec2 a;attribute vec2 b;attribute vec2 c;uniform mat4 d;uniform mat4 e;void main(void){gl_Position=e*vec4(b,0.,1.);a=(d*vec4(c,0.,1.)).st;}");function ln(a,b){this.f=a.getUniformLocation(b,"d");this.c=a.getUniformLocation(b,"e");this.g=a.getUniformLocation(b,"f");this.i=a.getUniformLocation(b,"g");this.b=a.getAttribLocation(b,"b");this.a=a.getAttribLocation(b,"c")};function mn(a,b){Ki.call(this,b);this.c=a;this.V=new yl([-1,-1,0,0,1,-1,1,0,-1,1,0,1,1,1,1,1]);this.f=this.Mb=null;this.j=void 0;this.v=We();this.N=We();this.C=nl();this.o=null}w(mn,Ki);
function nn(a,b,c){var d=a.c.g;if(void 0===a.j||a.j!=c){b.postRenderFunctions.push(function(a,b,c){a.isContextLost()||(a.deleteFramebuffer(b),a.deleteTexture(c))}.bind(null,d,a.f,a.Mb));b=Jl(d,c,c);var e=d.createFramebuffer();d.bindFramebuffer(36160,e);d.framebufferTexture2D(36160,36064,3553,b,0);a.Mb=b;a.f=e;a.j=c}else d.bindFramebuffer(36160,a.f)}
mn.prototype.Zi=function(a,b,c){on(this,"precompose",c,a);rl(c,34962,this.V);var d=c.b,e=Cl(c,jn,kn);if(this.o)var f=this.o;else this.o=f=new ln(d,e);c.cd(e)&&(d.enableVertexAttribArray(f.b),d.vertexAttribPointer(f.b,2,5126,!1,16,0),d.enableVertexAttribArray(f.a),d.vertexAttribPointer(f.a,2,5126,!1,16,8),d.uniform1i(f.i,0));d.uniformMatrix4fv(f.f,!1,pl(this.C,this.v));d.uniformMatrix4fv(f.c,!1,pl(this.C,this.N));d.uniform1f(f.g,b.opacity);d.bindTexture(3553,this.Mb);d.drawArrays(5,0,4);on(this,"postcompose",
c,a)};function on(a,b,c,d){a=a.a;if(Tc(a,b)){var e=d.viewState;a.b(new bi(b,new gn(c,e.center,e.resolution,e.rotation,d.size,d.extent,d.pixelRatio),d,null,c))}}mn.prototype.Ag=function(){this.f=this.Mb=null;this.j=void 0};function pn(a,b){mn.call(this,a,b);this.l=this.i=this.M=null}w(pn,mn);pn.handles=function(a,b){return"webgl"===a&&"IMAGE"===b.S()};pn.create=function(a,b){return new pn(a,b)};function qn(a,b){b=b.Y();return Ml(a.c.g,b)}pn.prototype.wa=function(a,b,c,d,e){var f=this.a;return f.ha().wa(a,b.viewState.resolution,b.viewState.rotation,c,b.skippedFeatureUids,function(a){return d.call(e,a,f)})};
pn.prototype.Bg=function(a,b){var c=this.c.g,d=a.pixelRatio,e=a.viewState,f=e.center,g=e.resolution,h=e.rotation,l=this.M,m=this.Mb,n=this.a.ha(),p=a.viewHints,q=a.extent;void 0!==b.extent&&(q=gb(q,b.extent));p[0]||p[1]||bb(q)||(b=n.Y(q,g,d,e.projection))&&Si(this,b)&&(l=b,m=qn(this,b),this.Mb&&a.postRenderFunctions.push(function(a,b){a.isContextLost()||a.deleteTexture(b)}.bind(null,c,this.Mb)));l&&(c=this.c.i.j,rn(this,c.width,c.height,d,f,g,h,l.G()),this.l=null,d=this.v,Xe(d),cf(d,1,-1),df(d,0,
-1),this.M=l,this.Mb=m,Ui(a,n));return!!l};function rn(a,b,c,d,e,f,g,h){b*=f;c*=f;a=a.N;Xe(a);cf(a,2*d/b,2*d/c);bf(a,-g);df(a,h[0]-e[0],h[1]-e[1]);cf(a,(h[2]-h[0])/2,(h[3]-h[1])/2);df(a,1,1)}pn.prototype.cf=function(a,b){return void 0!==this.wa(a,b,0,Re,this)};
pn.prototype.zg=function(a,b,c,d){if(this.M&&this.M.Y())if(this.a.ha().wa!==ea){var e=af(b.pixelToCoordinateTransform,a.slice());if(this.wa(e,b,0,Re,this))return c.call(d,this.a,null)}else{e=[this.M.Y().width,this.M.Y().height];if(!this.l){var f=b.size;b=We();df(b,-1,-1);cf(b,2/f[0],2/f[1]);df(b,0,f[1]);cf(b,1,-1);f=ff(this.N.slice());var g=We();df(g,0,e[1]);cf(g,1,-1);cf(g,e[0]/2,e[1]/2);df(g,1,1);Ze(g,f);Ze(g,b);this.l=g}a=af(this.l,a.slice());if(!(0>a[0]||a[0]>e[0]||0>a[1]||a[1]>e[1])&&(this.i||
(this.i=hg(1,1)),this.i.clearRect(0,0,1,1),this.i.drawImage(this.M.Y(),a[0],a[1],1,1,0,0,1,1),e=this.i.getImageData(0,0,1,1).data,0<e[3]))return c.call(d,this.a,e)}};function sn(a,b){fj.call(this,a,b);this.b=document.createElement("CANVAS");this.b.style.width="100%";this.b.style.height="100%";this.b.style.display="block";this.b.className="ol-unselectable";a.insertBefore(this.b,a.childNodes[0]||null);this.N=this.D=0;this.C=hg();this.s=!0;this.g=gd(this.b,{antialias:!0,depth:!0,failIfMajorPerformanceCaveat:!0,preserveDrawingBuffer:!1,stencil:!0});this.i=new Hl(this.b,this.g);y(this.b,"webglcontextlost",this.Co,this);y(this.b,"webglcontextrestored",this.Do,this);
this.a=new ci;this.o=null;this.j=new ge(function(a){var b=a[1];a=a[2];var c=b[0]-this.o[0];b=b[1]-this.o[1];return 65536*Math.log(a)+Math.sqrt(c*c+b*b)/a}.bind(this),function(a){return a[0].lb()});this.B=function(){if(0!==this.j.b.length){ke(this.j);var a=he(this.j);tn(this,a[0],a[3],a[4])}return!1}.bind(this);this.f=0;un(this)}w(sn,fj);sn.handles=function(a){return hd&&"webgl"===a};sn.create=function(a,b){return new sn(a,b)};
function tn(a,b,c,d){var e=a.g,f=b.lb();if(a.a.a.hasOwnProperty(f))a=a.a.get(f),e.bindTexture(3553,a.Mb),9729!=a.hi&&(e.texParameteri(3553,10240,9729),a.hi=9729),9729!=a.ji&&(e.texParameteri(3553,10241,9729),a.ji=9729);else{var g=e.createTexture();e.bindTexture(3553,g);if(0<d){var h=a.C.canvas,l=a.C;a.D!==c[0]||a.N!==c[1]?(h.width=c[0],h.height=c[1],a.D=c[0],a.N=c[1]):l.clearRect(0,0,c[0],c[1]);l.drawImage(b.Y(),d,d,c[0],c[1],0,0,c[0],c[1]);e.texImage2D(3553,0,6408,6408,5121,h)}else e.texImage2D(3553,
0,6408,6408,5121,b.Y());e.texParameteri(3553,10240,9729);e.texParameteri(3553,10241,9729);e.texParameteri(3553,10242,33071);e.texParameteri(3553,10243,33071);a.a.set(f,{Mb:g,hi:9729,ji:9729})}}function vn(a,b,c){var d=a.l;if(Tc(d,b)){a=a.i;var e=c.viewState;d.b(new bi(b,new gn(a,e.center,e.resolution,e.rotation,c.size,c.extent,c.pixelRatio),c,null,a))}}k=sn.prototype;k.ia=function(){var a=this.g;a.isContextLost()||this.a.forEach(function(b){b&&a.deleteTexture(b.Mb)});Pc(this.i);fj.prototype.ia.call(this)};
k.Yk=function(a,b){a=this.g;for(var c;1024<this.a.i-this.f;){if(c=this.a.g.Pc)a.deleteTexture(c.Mb);else if(+this.a.g.jc==b.index)break;else--this.f;this.a.pop()}};k.S=function(){return"webgl"};k.Co=function(a){a.preventDefault();this.a.clear();this.f=0;a=this.c;for(var b in a)a[b].Ag()};k.Do=function(){un(this);this.l.render()};function un(a){a=a.g;a.activeTexture(33984);a.blendFuncSeparate(770,771,1,771);a.disable(2884);a.disable(2929);a.disable(3089);a.disable(2960)}
k.bh=function(a){var b=this.i,c=this.g;if(c.isContextLost())return!1;if(!a)return this.s&&(this.b.style.display="none",this.s=!1),!1;this.o=a.focus;this.a.set((-a.index).toString(),null);++this.f;vn(this,"precompose",a);var d=[],e=a.layerStatesArray;kc(e);var f=a.viewState.resolution,g;var h=0;for(g=e.length;h<g;++h){var l=e[h];if(yg(l,f)&&"ready"==l.Vj){var m=ij(this,l.layer);m.Bg(a,l,b)&&d.push(l)}}e=a.size[0]*a.pixelRatio;f=a.size[1]*a.pixelRatio;if(this.b.width!=e||this.b.height!=f)this.b.width=
e,this.b.height=f;c.bindFramebuffer(36160,null);c.clearColor(0,0,0,0);c.clear(16384);c.enable(3042);c.viewport(0,0,this.b.width,this.b.height);h=0;for(g=d.length;h<g;++h)l=d[h],m=ij(this,l.layer),m.Zi(a,l,b);this.s||(this.b.style.display="",this.s=!0);gj(a);1024<this.a.i-this.f&&a.postRenderFunctions.push(this.Yk.bind(this));0!==this.j.b.length&&(a.postRenderFunctions.push(this.B),a.animate=!0);vn(this,"postcompose",a);jj(this,a);a.postRenderFunctions.push(hj)};
k.wa=function(a,b,c,d,e,f,g){if(this.g.isContextLost())return!1;var h=b.viewState,l=b.layerStatesArray,m;for(m=l.length-1;0<=m;--m){var n=l[m];var p=n.layer;if(yg(n,h.resolution)&&f.call(g,p)&&(n=ij(this,p).wa(a,b,c,d,e)))return n}};k.Ui=function(a,b,c,d,e){c=!1;if(this.g.isContextLost())return!1;var f=b.viewState,g=b.layerStatesArray,h;for(h=g.length-1;0<=h;--h){var l=g[h],m=l.layer;if(yg(l,f.resolution)&&d.call(e,m)&&(c=ij(this,m).cf(a,b)))return!0}return c};
k.Ti=function(a,b,c,d,e){if(this.g.isContextLost())return!1;var f=b.viewState,g=b.layerStatesArray,h;for(h=g.length-1;0<=h;--h){var l=g[h];var m=l.layer;if(yg(l,f.resolution)&&e.call(d,m)&&(l=ij(this,m).zg(a,b,c,d)))return l}};var wn=new il("precision mediump float;varying vec2 a;uniform sampler2D e;void main(void){gl_FragColor=texture2D(e,a);}"),xn=new jl("varying vec2 a;attribute vec2 b;attribute vec2 c;uniform vec4 d;void main(void){gl_Position=vec4(b*d.xy+d.zw,0.,1.);a=c;}");function yn(a,b){this.c=a.getUniformLocation(b,"d");this.g=a.getUniformLocation(b,"e");this.b=a.getAttribLocation(b,"b");this.a=a.getAttribLocation(b,"c")};function zn(a,b){mn.call(this,a,b);this.T=wn;this.ca=xn;this.i=null;this.B=new yl([0,0,0,1,1,0,1,1,0,1,0,0,1,1,1,0]);this.D=this.l=null;this.s=-1;this.O=[0,0]}w(zn,mn);zn.handles=function(a,b){return"webgl"===a&&"TILE"===b.S()};zn.create=function(a,b){return new zn(a,b)};k=zn.prototype;k.ia=function(){Bl(this.c.i,this.B);mn.prototype.ia.call(this)};
k.Rf=function(a,b,c){var d=this.c;return function(e,f){return Li(a,b,e,f,function(a){var b=d.a.a.hasOwnProperty(a.lb());b&&(c[e]||(c[e]={}),c[e][a.ya.toString()]=a);return b})}};k.Ag=function(){mn.prototype.Ag.call(this);this.i=null};
k.Bg=function(a,b,c){var d=this.c,e=c.b,f=a.viewState,g=f.projection,h=this.a,l=h.ha(),m=l.eb(g),n=m.Dc(f.resolution),p=m.Ta(n),q=l.Zd(n,a.pixelRatio,g),r=q[0]/Ba(m.Za(n),this.O)[0],u=p/r,v=l.Xc(r)*l.Zf(g),z=f.center,A=a.extent,E=tc(m,A,n);if(this.l&&na(this.l,E)&&this.s==l.g)u=this.D;else{var S=[E.la-E.fa+1,E.ka-E.ea+1],Ia=ra(Math.max(S[0]*q[0],S[1]*q[1]));S=u*Ia;var ta=m.Ic(n),la=ta[0]+E.fa*q[0]*u;u=ta[1]+E.ea*q[1]*u;u=[la,u,la+S,u+S];nn(this,a,Ia);e.viewport(0,0,Ia,Ia);e.clearColor(0,0,0,0);e.clear(16384);
e.disable(3042);Ia=Cl(c,this.T,this.ca);c.cd(Ia);this.i||(this.i=new yn(e,Ia));rl(c,34962,this.B);e.enableVertexAttribArray(this.i.b);e.vertexAttribPointer(this.i.b,2,5126,!1,16,0);e.enableVertexAttribArray(this.i.a);e.vertexAttribPointer(this.i.a,2,5126,!1,16,8);e.uniform1i(this.i.g,0);c={};c[n]={};var ca=this.Rf(l,g,c),ia=h.i();Ia=!0;la=Da();var xa=new ja(0,0,0,0),Va,ic;for(Va=E.fa;Va<=E.la;++Va)for(ic=E.ea;ic<=E.ka;++ic){ta=l.ad(n,Va,ic,r,g);if(void 0!==b.extent){var Xa=m.Ma(ta.ya,la);if(!hb(Xa,
b.extent))continue}Xa=ta.getState();(Xa=2==Xa||4==Xa||3==Xa&&!ia)||(ta=pj(ta));Xa=ta.getState();if(2==Xa){if(d.a.a.hasOwnProperty(ta.lb())){c[n][ta.ya.toString()]=ta;continue}}else if(4==Xa||3==Xa&&!ia)continue;Ia=!1;Xa=uc(m,ta.ya,ca,xa,la);Xa||(ta=vc(m,ta.ya,xa,la))&&ca(n+1,ta)}b=Object.keys(c).map(Number);b.sort(dc);ca=new Float32Array(4);var Z;ia=0;for(xa=b.length;ia<xa;++ia)for(Z in Va=c[b[ia]],Va)ta=Va[Z],Xa=m.Ma(ta.ya,la),ca[0]=2*(Xa[2]-Xa[0])/S,ca[1]=2*(Xa[3]-Xa[1])/S,ca[2]=2*(Xa[0]-u[0])/
S-1,ca[3]=2*(Xa[1]-u[1])/S-1,e.uniform4fv(this.i.c,ca),tn(d,ta,q,v*r),e.drawArrays(5,0,4);Ia?(this.l=E,this.D=u,this.s=l.g):(this.D=this.l=null,this.s=-1,a.animate=!0)}Vi(a.usedTiles,l,n,E);var Zb=d.j;Wi(a,l,m,r,g,A,n,h.c(),function(a){2!=a.getState()||d.a.a.hasOwnProperty(a.lb())||a.lb()in Zb.a||Zb.i([a,yc(m,a.ya),m.Ta(a.ya[0]),q,v*r])},this);Ti(a,l);Ui(a,l);e=this.v;Xe(e);df(e,(Math.round(z[0]/p)*p-u[0])/(u[2]-u[0]),(Math.round(z[1]/p)*p-u[1])/(u[3]-u[1]));0!==f.rotation&&bf(e,f.rotation);cf(e,
a.size[0]*f.resolution/(u[2]-u[0]),a.size[1]*f.resolution/(u[3]-u[1]));df(e,-.5,-.5);return!0};k.zg=function(a,b,c,d){if(this.f){a=af(this.v,[a[0]/b.size[0],(b.size[1]-a[1])/b.size[1]].slice());a=[a[0]*this.j,a[1]*this.j];b=this.c.i.b;b.bindFramebuffer(b.FRAMEBUFFER,this.f);var e=new Uint8Array(4);b.readPixels(a[0],a[1],1,1,b.RGBA,b.UNSIGNED_BYTE,e);if(0<e[3])return c.call(d,this.a,e)}};function An(a,b){mn.call(this,a,b);this.s=!1;this.O=-1;this.T=NaN;this.D=Da();this.l=this.i=this.B=null}w(An,mn);An.handles=function(a,b){return"webgl"===a&&"VECTOR"===b.S()};An.create=function(a,b){return new An(a,b)};k=An.prototype;k.Zi=function(a,b,c){this.l=b;var d=a.viewState,e=this.i,f=a.size,g=a.pixelRatio,h=this.c.g;e&&!e.yg()&&(h.enable(h.SCISSOR_TEST),h.scissor(0,0,f[0]*g,f[1]*g),e.Na(c,d.center,d.resolution,d.rotation,f,g,b.opacity,b.Te?a.skippedFeatureUids:{}),h.disable(h.SCISSOR_TEST))};
k.ia=function(){var a=this.i;a&&(an(a,this.c.i)(),this.i=null);mn.prototype.ia.call(this)};k.wa=function(a,b,c,d,e){if(this.i&&this.l){c=b.viewState;var f=this.a,g={};return this.i.wa(a,this.c.i,c.center,c.resolution,c.rotation,b.size,b.pixelRatio,this.l.opacity,{},function(a){var b=x(a).toString();if(!(b in g))return g[b]=!0,d.call(e,a,f)})}};k.cf=function(a,b){if(this.i&&this.l){var c=b.viewState;return fn(this.i,a,this.c.i,c.resolution,c.rotation,b.pixelRatio,this.l.opacity,b.skippedFeatureUids)}return!1};
k.zg=function(a,b,c,d){a=af(b.pixelToCoordinateTransform,a.slice());if(this.cf(a,b))return c.call(d,this.a,null)};k.$i=function(){Mi(this)};
k.Bg=function(a,b,c){function d(a){var b=a.ib();if(b)var c=b.call(a,m);else(b=e.ib())&&(c=b(a,m));if(c){if(c){b=!1;if(Array.isArray(c))for(var d=c.length-1;0<=d;--d)b=ek(q,a,c[d],dk(m,n),this.$i,this)||b;else b=ek(q,a,c,dk(m,n),this.$i,this)||b;a=b}else a=!1;this.s=this.s||a}}var e=this.a;b=e.ha();Ui(a,b);var f=a.viewHints[0],g=a.viewHints[1],h=e.ca,l=e.ra;if(!this.s&&!h&&f||!l&&g)return!0;g=a.extent;h=a.viewState;f=h.projection;var m=h.resolution,n=a.pixelRatio;h=e.g;var p=e.f;l=e.get(ik);void 0===
l&&(l=ck);g=Fa(g,p*m);if(!this.s&&this.T==m&&this.O==h&&this.B==l&&La(this.D,g))return!0;this.i&&a.postRenderFunctions.push(an(this.i,c));this.s=!1;var q=new $m(.5*m/n,g,e.f);b.ae(g,m,f);if(l){var r=[];b.ec(g,function(a){r.push(a)},this);r.sort(l);r.forEach(d,this)}else b.ec(g,d,this);bn(q,c);this.T=m;this.O=h;this.B=l;this.D=g;this.i=q;return!0};qg("MAP_RENDERER",kj);rg([bj,mj,hk,jk]);qg("MAP_RENDERER",sn);rg([pn,zn,An]);function K(a){a=kb({},a);a.controls||(a.controls=Fg());a.interactions||(a.interactions=Zh());G.call(this,a)}w(K,G);function Bn(a){Vc.call(this);this.id=a.id;this.insertFirst=void 0!==a.insertFirst?a.insertFirst:!0;this.stopEvent=void 0!==a.stopEvent?a.stopEvent:!0;this.element=document.createElement("DIV");this.element.className=void 0!==a.className?a.className:"ol-overlay-container ol-selectable";this.element.style.position="absolute";this.autoPan=void 0!==a.autoPan?a.autoPan:!1;this.autoPanAnimation=a.autoPanAnimation||{};this.autoPanMargin=void 0!==a.autoPanMargin?a.autoPanMargin:20;this.a={ze:"",Se:"",xf:"",
Ef:"",visible:!0};this.c=null;y(this,Xc(Cn),this.am,this);y(this,Xc(Dn),this.km,this);y(this,Xc(En),this.om,this);y(this,Xc(Fn),this.qm,this);y(this,Xc(Gn),this.rm,this);void 0!==a.element&&this.Hj(a.element);this.Mj(void 0!==a.offset?a.offset:[0,0]);this.Pj(void 0!==a.positioning?a.positioning:"top-left");void 0!==a.position&&this.We(a.position)}w(Bn,Vc);k=Bn.prototype;k.Rd=function(){return this.get(Cn)};k.nn=function(){return this.id};k.Ve=function(){return this.get(Dn)};k.Xh=function(){return this.get(En)};
k.pi=function(){return this.get(Fn)};k.Yh=function(){return this.get(Gn)};k.am=function(){for(var a=this.element;a.lastChild;)a.removeChild(a.lastChild);(a=this.Rd())&&this.element.appendChild(a)};k.km=function(){this.c&&(jg(this.element),Gc(this.c),this.c=null);var a=this.Ve();a&&(this.c=y(a,"postrender",this.render,this),Hn(this),a=this.stopEvent?a.v:a.o,this.insertFirst?a.insertBefore(this.element,a.childNodes[0]||null):a.appendChild(this.element))};k.render=function(){Hn(this)};k.om=function(){Hn(this)};
k.qm=function(){Hn(this);if(this.get(Fn)&&this.autoPan){var a=this.Ve();if(a&&a.Cc()){var b=In(a.Cc(),a.Cb()),c=this.Rd(),d=c.offsetWidth,e=getComputedStyle(c);d+=parseInt(e.marginLeft,10)+parseInt(e.marginRight,10);e=c.offsetHeight;var f=getComputedStyle(c);e+=parseInt(f.marginTop,10)+parseInt(f.marginBottom,10);var g=In(c,[d,e]);c=this.autoPanMargin;La(b,g)||(d=g[0]-b[0],e=b[2]-g[2],f=g[1]-b[1],g=b[3]-g[3],b=[0,0],0>d?b[0]=d-c:0>e&&(b[0]=Math.abs(e)+c),0>f?b[1]=f-c:0>g&&(b[1]=Math.abs(g)+c),0===
b[0]&&0===b[1])||(c=a.aa().xa(),c=a.Ia(c),b=[c[0]+b[0],c[1]+b[1]],a.aa().animate({center:a.Ra(b),duration:this.autoPanAnimation.duration,easing:this.autoPanAnimation.easing}))}}};k.rm=function(){Hn(this)};k.Hj=function(a){this.set(Cn,a)};k.setMap=function(a){this.set(Dn,a)};k.Mj=function(a){this.set(En,a)};k.We=function(a){this.set(Fn,a)};function In(a,b){var c=a.getBoundingClientRect();a=c.left+window.pageXOffset;c=c.top+window.pageYOffset;return[a,c,a+b[0],c+b[1]]}k.Pj=function(a){this.set(Gn,a)};
function Jn(a,b){a.a.visible!==b&&(a.element.style.display=b?"":"none",a.a.visible=b)}
function Hn(a){var b=a.Ve(),c=a.pi();if(b&&b.c&&c){c=b.Ia(c);var d=b.Cb();b=a.element.style;var e=a.Xh(),f=a.Yh();Jn(a,!0);var g=e[0];e=e[1];if("bottom-right"==f||"center-right"==f||"top-right"==f)""!==a.a.Se&&(a.a.Se=b.left=""),g=Math.round(d[0]-c[0]-g)+"px",a.a.xf!=g&&(a.a.xf=b.right=g);else{""!==a.a.xf&&(a.a.xf=b.right="");if("bottom-center"==f||"center-center"==f||"top-center"==f)g-=a.element.offsetWidth/2;g=Math.round(c[0]+g)+"px";a.a.Se!=g&&(a.a.Se=b.left=g)}if("bottom-left"==f||"bottom-center"==
f||"bottom-right"==f)""!==a.a.Ef&&(a.a.Ef=b.top=""),c=Math.round(d[1]-c[1]-e)+"px",a.a.ze!=c&&(a.a.ze=b.bottom=c);else{""!==a.a.ze&&(a.a.ze=b.bottom="");if("center-left"==f||"center-center"==f||"center-right"==f)e-=a.element.offsetHeight/2;c=Math.round(c[1]+e)+"px";a.a.Ef!=c&&(a.a.Ef=b.top=c)}}else Jn(a,!1)}var Cn="element",Dn="map",En="offset",Fn="position",Gn="positioning";function Kn(a,b,c,d,e,f){cl.call(this,a,b,f);this.c=0;this.l=null;this.v=d;this.a=null;this.f={};this.C=e;this.N=c}w(Kn,cl);k=Kn.prototype;k.ia=function(){this.a=null;this.f={};this.state=5;this.u();cl.prototype.ia.call(this)};k.G=function(){return this.l||Ln};k.qn=function(){return this.v};k.pn=function(){return this.a};k.lb=function(){return this.N};k.rn=function(){return this.o};function ok(a,b,c){return a.f[x(b)+","+c]}
k.load=function(){0==this.state&&(oj(this,1),this.C(this,this.N),this.D(null,NaN,null))};k.Cp=function(a,b,c){this.vg(b);this.Ij(a);this.ri(c)};k.Bp=function(){oj(this,3)};k.ri=function(a){this.l=a};k.Ij=function(a){this.a=a;oj(this,2)};k.vg=function(a){this.o=a};k.ug=function(a){this.D=a};var Ln=[0,0,4096,4096];function Mn(a){a=a?a:{};this.c=void 0!==a.className?a.className:"ol-full-screen";var b=void 0!==a.label?a.label:"\u2922";this.l="string"===typeof b?document.createTextNode(b):b;b=void 0!==a.labelActive?a.labelActive:"\u00d7";this.v="string"===typeof b?document.createTextNode(b):b;var c=a.tipLabel?a.tipLabel:"Toggle full-screen";b=document.createElement("button");b.className=this.c+"-"+Nn();b.setAttribute("type","button");b.title=c;b.appendChild(this.l);y(b,"click",this.C,this);c=document.createElement("div");
c.className=this.c+" ol-unselectable ol-control "+(On()?"":"ol-unsupported");c.appendChild(b);vg.call(this,{element:c,target:a.target});this.D=void 0!==a.keys?a.keys:!1;this.j=a.source}w(Mn,vg);
Mn.prototype.C=function(a){a.preventDefault();On()&&(a=this.a)&&(Nn()?document.exitFullscreen?document.exitFullscreen():document.msExitFullscreen?document.msExitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitExitFullscreen&&document.webkitExitFullscreen():(a=this.j?"string"===typeof this.j?document.getElementById(this.j):this.j:a.Cc(),this.D?a.mozRequestFullScreenWithKeys?a.mozRequestFullScreenWithKeys():a.webkitRequestFullscreen?a.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT):
Pn(a):Pn(a)))};Mn.prototype.o=function(){var a=this.element.firstElementChild,b=this.a;Nn()?(a.className=this.c+"-true",ig(this.v,this.l)):(a.className=this.c+"-false",ig(this.l,this.v));b&&b.Oc()};Mn.prototype.setMap=function(a){vg.prototype.setMap.call(this,a);a&&this.s.push(y(document,Qn(),this.o,this))};
function On(){var a=document.body;return!!(a.webkitRequestFullscreen||a.mozRequestFullScreen&&document.mozFullScreenEnabled||a.msRequestFullscreen&&document.msFullscreenEnabled||a.requestFullscreen&&document.fullscreenEnabled)}function Nn(){return!!(document.webkitIsFullScreen||document.mozFullScreen||document.msFullscreenElement||document.fullscreenElement)}
function Pn(a){a.requestFullscreen?a.requestFullscreen():a.msRequestFullscreen?a.msRequestFullscreen():a.mozRequestFullScreen?a.mozRequestFullScreen():a.webkitRequestFullscreen&&a.webkitRequestFullscreen()}var Qn=function(){var a;return function(){if(!a){var b=document.body;b.webkitRequestFullscreen?a="webkitfullscreenchange":b.mozRequestFullScreen?a="mozfullscreenchange":b.msRequestFullscreen?a="MSFullscreenChange":b.requestFullscreen&&(a="fullscreenchange")}return a}}();function Rn(a){a=a?a:{};var b=document.createElement("DIV");b.className=void 0!==a.className?a.className:"ol-mouse-position";vg.call(this,{element:b,render:a.render?a.render:Sn,target:a.target});y(this,Xc(Tn),this.En,this);a.coordinateFormat&&this.Gj(a.coordinateFormat);a.projection&&this.ti(a.projection);this.o=void 0!==a.undefinedHTML?a.undefinedHTML:"";this.v=b.innerHTML;this.l=this.j=this.c=null}w(Rn,vg);
function Sn(a){a=a.frameState;a?this.c!=a.viewState.projection&&(this.c=a.viewState.projection,this.j=null):this.c=null;Un(this,this.l)}k=Rn.prototype;k.En=function(){this.j=null};k.Qh=function(){return this.get(Vn)};k.si=function(){return this.get(Tn)};k.mm=function(a){this.l=this.a.ud(a);Un(this,this.l)};k.nm=function(){Un(this,null);this.l=null};k.setMap=function(a){vg.prototype.setMap.call(this,a);a&&(a=a.a,this.s.push(y(a,"mousemove",this.mm,this),y(a,"mouseout",this.nm,this)))};
k.Gj=function(a){this.set(Vn,a)};k.ti=function(a){this.set(Tn,Ob(a))};function Un(a,b){var c=a.o;if(b&&a.c){if(!a.j){var d=a.si();a.j=d?Pb(a.c,d):$b}if(b=a.a.Ra(b))a.j(b,b),c=(c=a.Qh())?c(b):b.toString()}a.v&&c==a.v||(a.element.innerHTML=c,a.v=c)}var Tn="projection",Vn="coordinateFormat";function Wn(a){function b(a){a=h.Sd(a);l.a.aa().ub(a);window.removeEventListener("mousemove",c);window.removeEventListener("mouseup",b)}function c(a){a=h.Sd({clientX:a.clientX-n.offsetWidth/2,clientY:a.clientY+n.offsetHeight/2});m.We(a)}a=a?a:{};this.j=void 0!==a.collapsed?a.collapsed:!0;this.l=void 0!==a.collapsible?a.collapsible:!0;this.l||(this.j=!1);var d=void 0!==a.className?a.className:"ol-overviewmap",e=void 0!==a.tipLabel?a.tipLabel:"Overview map",f=void 0!==a.collapseLabel?a.collapseLabel:
"\u00ab";"string"===typeof f?(this.o=document.createElement("span"),this.o.textContent=f):this.o=f;f=void 0!==a.label?a.label:"\u00bb";"string"===typeof f?(this.D=document.createElement("span"),this.D.textContent=f):this.D=f;var g=this.l&&!this.j?this.o:this.D;f=document.createElement("button");f.setAttribute("type","button");f.title=e;f.appendChild(g);y(f,"click",this.Hn,this);this.C=document.createElement("DIV");this.C.className="ol-overviewmap-map";var h=this.c=new G({controls:new B,interactions:new B,
view:a.view});a.layers&&a.layers.forEach(function(a){h.xe(a)},this);e=document.createElement("DIV");e.className="ol-overviewmap-box";e.style.boxSizing="border-box";this.v=new Bn({position:[0,0],positioning:"bottom-left",element:e});this.c.ye(this.v);e=document.createElement("div");e.className=d+" ol-unselectable ol-control"+(this.j&&this.l?" ol-collapsed":"")+(this.l?"":" ol-uncollapsible");e.appendChild(this.C);e.appendChild(f);vg.call(this,{element:e,render:a.render?a.render:Xn,target:a.target});
var l=this,m=this.v,n=this.v.Rd();n.addEventListener("mousedown",function(){window.addEventListener("mousemove",c);window.addEventListener("mouseup",b)})}w(Wn,vg);k=Wn.prototype;k.setMap=function(a){var b=this.a;a!==b&&(b&&((b=b.aa())&&Mc(b,Xc("rotation"),this.Qe,this),this.c.Ad(null)),vg.prototype.setMap.call(this,a),a&&(this.c.Ad(this.C),this.s.push(y(a,"propertychange",this.lm,this)),0===this.c.Xe().kc()&&this.c.zf(a.hc()),a=a.aa()))&&(y(a,Xc("rotation"),this.Qe,this),ag(a)&&(this.c.Oc(),Yn(this)))};
k.lm=function(a){"view"===a.key&&((a=a.oldValue)&&Mc(a,Xc("rotation"),this.Qe,this),a=this.a.aa(),y(a,Xc("rotation"),this.Qe,this))};k.Qe=function(){this.c.aa().ce(this.a.aa().Sa())};function Xn(){var a=this.a,b=this.c;if(a.c&&b.c){var c=a.Cb();a=a.aa().qd(c);var d=b.Cb();c=b.aa().qd(d);var e=b.Ia($a(a)),f=b.Ia(Ya(a));b=Math.abs(e[0]-f[0]);e=Math.abs(e[1]-f[1]);f=d[0];d=d[1];b<.1*f||e<.1*d||b>.75*f||e>.75*d?Yn(this):La(c,a)||(a=this.c,c=this.a.aa(),a.aa().ub(c.xa()))}Zn(this)}
function Yn(a){var b=a.a;a=a.c;var c=b.Cb();b=b.aa().qd(c);a=a.aa();ib(b,1/(.1*Math.pow(2,Math.log(7.5)/Math.LN2/2)));a.Uf(b)}function Zn(a){var b=a.a,c=a.c;if(b.c&&c.c){var d=b.Cb(),e=b.aa(),f=c.aa();c=e.Sa();b=a.v;var g=a.v.Rd(),h=e.qd(d);d=f.Pa();e=Wa(h);f=Za(h);if(a=a.a.aa().xa()){var l=[e[0]-a[0],e[1]-a[1]];Fe(l,c);ze(l,a)}b.We(l);g&&(g.style.width=Math.abs((e[0]-f[0])/d)+"px",g.style.height=Math.abs((f[1]-e[1])/d)+"px")}}k.Hn=function(a){a.preventDefault();$n(this)};
function $n(a){a.element.classList.toggle("ol-collapsed");a.j?ig(a.o,a.D):ig(a.D,a.o);a.j=!a.j;var b=a.c;a.j||b.c||(b.Oc(),Yn(a),Lc(b,"postrender",function(){Zn(this)},a))}k.Gn=function(){return this.l};k.Jn=function(a){this.l!==a&&(this.l=a,this.element.classList.toggle("ol-uncollapsible"),!a&&this.j&&$n(this))};k.In=function(a){this.l&&this.j!==a&&$n(this)};k.Fn=function(){return this.j};k.Hl=function(){return this.c};function ao(a){a=a?a:{};var b=void 0!==a.className?a.className:"ol-scale-line";this.l=document.createElement("DIV");this.l.className=b+"-inner";this.c=document.createElement("DIV");this.c.className=b+" ol-unselectable";this.c.appendChild(this.l);this.o=null;this.v=void 0!==a.minWidth?a.minWidth:64;this.j=!1;this.B=void 0;this.D="";vg.call(this,{element:this.c,render:a.render?a.render:bo,target:a.target});y(this,Xc(co),this.V,this);this.O(a.units||"metric")}w(ao,vg);var eo=[1,2,5];ao.prototype.C=function(){return this.get(co)};
function bo(a){(a=a.frameState)?this.o=a.viewState:this.o=null;fo(this)}ao.prototype.V=function(){fo(this)};ao.prototype.O=function(a){this.set(co,a)};
function fo(a){var b=a.o;if(b){var c=b.center,d=b.projection,e=a.C();b=Nb(d,b.resolution,c,"degrees"==e?"degrees":"m");"degrees"!=e&&(b*=d.Bc());var f=a.v*b;c="";"degrees"==e?(c=ub.degrees,"degrees"==d.a?f*=c:b/=c,f<c/60?(c="\u2033",b*=3600):f<c?(c="\u2032",b*=60):c="\u00b0"):"imperial"==e?.9144>f?(c="in",b/=.0254):1609.344>f?(c="ft",b/=.3048):(c="mi",b/=1609.344):"nautical"==e?(b/=1852,c="nm"):"metric"==e?.001>f?(c="\u03bcm",b*=1E6):1>f?(c="mm",b*=1E3):1E3>f?c="m":(c="km",b/=1E3):"us"==e?.9144>f?
(c="in",b*=39.37):1609.344>f?(c="ft",b/=.30480061):(c="mi",b/=1609.3472):oa(!1,33);for(e=3*Math.floor(Math.log(a.v*b)/Math.log(10));;){f=eo[(e%3+3)%3]*Math.pow(10,Math.floor(e/3));d=Math.round(f/b);if(isNaN(d)){a.c.style.display="none";a.j=!1;return}if(d>=a.v)break;++e}b=f+" "+c;a.D!=b&&(a.l.innerHTML=b,a.D=b);a.B!=d&&(a.l.style.width=d+"px",a.B=d);a.j||(a.c.style.display="",a.j=!0)}else a.j&&(a.c.style.display="none",a.j=!1)}var co="units";function go(a){a=a?a:{};this.c=void 0;this.j=ho;this.D=this.v=0;this.O=null;this.$=!1;this.V=void 0!==a.duration?a.duration:200;var b=void 0!==a.className?a.className:"ol-zoomslider",c=document.createElement("button");c.setAttribute("type","button");c.className=b+"-thumb ol-unselectable";var d=document.createElement("div");d.className=b+" ol-unselectable ol-control";d.appendChild(c);this.l=new Xd(d);y(this.l,"pointerdown",this.$l,this);y(this.l,"pointermove",this.Yl,this);y(this.l,"pointerup",this.Zl,
this);y(d,"click",this.Xl,this);y(c,"click",Rc);vg.call(this,{element:d,render:a.render?a.render:io})}w(go,vg);go.prototype.ia=function(){Pc(this.l);vg.prototype.ia.call(this)};var ho=0;k=go.prototype;k.setMap=function(a){vg.prototype.setMap.call(this,a);a&&a.render()};
function io(a){if(a.frameState){if(!this.$){var b=this.element,c=b.offsetWidth,d=b.offsetHeight,e=b.firstElementChild,f=getComputedStyle(e);b=e.offsetWidth+parseFloat(f.marginRight)+parseFloat(f.marginLeft);e=e.offsetHeight+parseFloat(f.marginTop)+parseFloat(f.marginBottom);this.O=[b,e];c>d?(this.j=1,this.D=c-b):(this.j=ho,this.v=d-e);this.$=!0}a=a.frameState.viewState.resolution;a!==this.c&&(this.c=a,jo(this,a))}}
k.Xl=function(a){var b=this.a.aa();a=ko(this,pa(1===this.j?(a.offsetX-this.O[0]/2)/this.D:(a.offsetY-this.O[1]/2)/this.v,0,1));b.animate({resolution:b.constrainResolution(a),duration:this.V,easing:Oe})};k.$l=function(a){this.o||a.b.target!==this.element.firstElementChild||(bg(this.a.aa(),1,1),this.C=a.clientX,this.B=a.clientY,this.o=!0)};
k.Yl=function(a){if(this.o){var b=this.element.firstElementChild;this.c=ko(this,pa(1===this.j?(a.clientX-this.C+parseInt(b.style.left,10))/this.D:(a.clientY-this.B+parseInt(b.style.top,10))/this.v,0,1));this.a.aa().gd(this.c);jo(this,this.c);this.C=a.clientX;this.B=a.clientY}};k.Zl=function(){if(this.o){var a=this.a.aa();bg(a,1,-1);a.animate({resolution:a.constrainResolution(this.c),duration:this.V,easing:Oe});this.o=!1;this.B=this.C=void 0}};
function jo(a,b){b=1-gg(a.a.aa())(b);var c=a.element.firstElementChild;1==a.j?c.style.left=a.D*b+"px":c.style.top=a.v*b+"px"}function ko(a,b){return fg(a.a.aa())(1-b)};function lo(a){a=a?a:{};this.extent=a.extent?a.extent:null;var b=void 0!==a.className?a.className:"ol-zoom-extent",c=void 0!==a.label?a.label:"E",d=void 0!==a.tipLabel?a.tipLabel:"Fit to extent",e=document.createElement("button");e.setAttribute("type","button");e.title=d;e.appendChild("string"===typeof c?document.createTextNode(c):c);y(e,"click",this.c,this);c=document.createElement("div");c.className=b+" ol-unselectable ol-control";c.appendChild(e);vg.call(this,{element:c,target:a.target})}
w(lo,vg);lo.prototype.c=function(a){a.preventDefault();a=this.a.aa();var b=this.extent?this.extent:a.v.G();a.Uf(b)};var mo=document.implementation.createDocument("","",null);function no(a,b){return mo.createElementNS(a,b)}function oo(a,b){return po(a,b,[]).join("")}function po(a,b,c){if(a.nodeType==Node.CDATA_SECTION_NODE||a.nodeType==Node.TEXT_NODE)b?c.push(String(a.nodeValue).replace(/(\r\n|\r|\n)/g,"")):c.push(a.nodeValue);else for(a=a.firstChild;a;a=a.nextSibling)po(a,b,c);return c}function qo(a){return a instanceof Document}function ro(a){return a instanceof Node}
function so(a){return(new DOMParser).parseFromString(a,"application/xml")}function to(a,b){return function(c,d){c=a.call(b,c,d);void 0!==c&&gc(d[d.length-1],c)}}function uo(a,b){return function(c,d){c=a.call(void 0!==b?b:this,c,d);void 0!==c&&d[d.length-1].push(c)}}function vo(a,b){return function(c,d){c=a.call(void 0!==b?b:this,c,d);void 0!==c&&(d[d.length-1]=c)}}
function wo(a){return function(b,c){var d=a.call(this,b,c);if(void 0!==d){c=c[c.length-1];b=b.localName;var e;b in c?e=c[b]:e=c[b]=[];e.push(d)}}}function L(a,b){return function(c,d){var e=a.call(this,c,d);void 0!==e&&(d[d.length-1][void 0!==b?b:c.localName]=e)}}function M(a,b){return function(c,d,e){a.call(void 0!==b?b:this,c,d,e);e[e.length-1].node.appendChild(c)}}
function xo(a){var b,c;return function(d,e,f){if(void 0===b){b={};var g={};g[d.localName]=a;b[d.namespaceURI]=g;c=yo(d.localName)}zo(b,c,e,f)}}function yo(a,b){return function(c,d,e){c=d[d.length-1].node;d=a;void 0===d&&(d=e);e=b;void 0===b&&(e=c.namespaceURI);return no(e,d)}}var Ao=yo();function Bo(a,b){for(var c=b.length,d=Array(c),e=0;e<c;++e)d[e]=a[b[e]];return d}function N(a,b,c){c=void 0!==c?c:{};var d;var e=0;for(d=a.length;e<d;++e)c[a[e]]=b;return c}
function Co(a,b,c,d){for(b=b.firstElementChild;b;b=b.nextElementSibling){var e=a[b.namespaceURI];void 0!==e&&(e=e[b.localName],void 0!==e&&e.call(d,b,c))}}function O(a,b,c,d,e){d.push(a);Co(b,c,d,e);return d.pop()}function zo(a,b,c,d,e,f){for(var g=(void 0!==e?e:c).length,h,l,m=0;m<g;++m)h=c[m],void 0!==h&&(l=b.call(f,h,d,void 0!==e?e[m]:void 0),void 0!==l&&a[l.namespaceURI][l.localName].call(f,l,h,d))}function Do(a,b,c,d,e,f,g){e.push(a);zo(b,c,d,e,f,g);e.pop()};function Eo(a,b,c,d){return function(e,f,g){var h=new XMLHttpRequest;h.open("GET","function"===typeof a?a(e,f,g):a,!0);"arraybuffer"==b.S()&&(h.responseType="arraybuffer");h.onload=function(){if(!h.status||200<=h.status&&300>h.status){var a=b.S();if("json"==a||"text"==a)var e=h.responseText;else"xml"==a?(e=h.responseXML)||(e=so(h.responseText)):"arraybuffer"==a&&(e=h.response);e?c.call(this,b.Qa(e,{featureProjection:g}),b.sb(e),b.cg()):d.call(this)}else d.call(this)}.bind(this);h.onerror=function(){d.call(this)}.bind(this);
h.send()}}function Fo(a,b){return Eo(a,b,function(a){this.Qc(a)},ea)};function Go(){this.i=this.defaultDataProjection=null}function Ho(a,b,c){var d;c&&(d={dataProjection:c.dataProjection?c.dataProjection:a.sb(b),featureProjection:c.featureProjection});return Io(a,d)}function Io(a,b){return kb({dataProjection:a.defaultDataProjection,featureProjection:a.i},b)}Go.prototype.cg=function(){return null};
function Jo(a,b,c){var d=c?Ob(c.featureProjection):null,e=c?Ob(c.dataProjection):null,f;d&&e&&!Xb(d,e)?a instanceof gf?f=(b?a.clone():a).mb(b?d:e,b?e:d):f=bc(a,e,d):f=a;if(b&&c&&void 0!==c.decimals){var g=Math.pow(10,c.decimals);f===a&&(f=f.clone());f.Rc(function(a){for(var b=0,c=a.length;b<c;++b)a[b]=Math.round(a[b]*g)/g;return a})}return f};function Ko(){Go.call(this)}w(Ko,Go);function Lo(a){return"string"===typeof a?(a=JSON.parse(a))?a:null:null!==a?a:null}k=Ko.prototype;k.S=function(){return"json"};k.Yb=function(a,b){return this.dd(Lo(a),Ho(this,a,b))};k.Qa=function(a,b){return this.Mg(Lo(a),Ho(this,a,b))};k.ed=function(a,b){return this.Qg(Lo(a),Ho(this,a,b))};k.sb=function(a){return this.Tg(Lo(a))};k.Jd=function(a,b){return JSON.stringify(this.ld(a,b))};k.ac=function(a,b){return JSON.stringify(this.qe(a,b))};
k.md=function(a,b){return JSON.stringify(this.se(a,b))};function P(a,b){hf.call(this);this.c=[];this.j=this.o=-1;this.na(a,b)}w(P,hf);k=P.prototype;k.Gk=function(a){this.A?gc(this.A,a.da().slice()):this.A=a.da().slice();this.c.push(this.A.length);this.u()};k.clone=function(){var a=new P(null);a.ba(this.ja,this.A.slice(),this.c.slice());return a};k.Nb=function(a,b,c,d){if(d<Ha(this.G(),a,b))return d;this.j!=this.g&&(this.o=Math.sqrt(qf(this.A,0,this.c,this.a,0)),this.j=this.g);return uf(this.A,0,this.c,this.a,this.o,!1,a,b,c,d)};
k.Wn=function(a,b,c){return"XYM"!=this.ja&&"XYZM"!=this.ja||0===this.A.length?null:Tk(this.A,this.c,this.a,a,void 0!==b?b:!1,void 0!==c?c:!1)};k.W=function(){return zf(this.A,0,this.c,this.a)};k.pb=function(){return this.c};k.yl=function(a){if(0>a||this.c.length<=a)return null;var b=new I(null);b.ba(this.ja,this.A.slice(0===a?0:this.c[a-1],this.c[a]));return b};
k.wd=function(){var a=this.A,b=this.c,c=this.ja,d=[],e=0,f;var g=0;for(f=b.length;g<f;++g){var h=b[g],l=new I(null);l.ba(c,a.slice(e,h));d.push(l);e=h}return d};k.Ge=function(){var a=[],b=this.A,c=0,d=this.c,e=this.a,f;var g=0;for(f=d.length;g<f;++g){var h=d[g];c=Kk(b,c,h,e,.5);gc(a,c);c=h}return a};k.xd=function(a){var b=[],c=[],d=this.A,e=this.c,f=this.a,g=0,h=0,l;var m=0;for(l=e.length;m<l;++m){var n=e[m];h=Bf(d,g,n,f,a,b,h);c.push(h);g=n}b.length=h;a=new P(null);a.ba("XY",b,c);return a};k.S=function(){return"MultiLineString"};
k.$a=function(a){a:{var b=this.A,c=this.c,d=this.a,e=0,f;var g=0;for(f=c.length;g<f;++g){if(Kf(b,e,c[g],d,a)){a=!0;break a}e=c[g]}a=!1}return a};k.na=function(a,b){a?(lf(this,b,a,2),this.A||(this.A=[]),a=xf(this.A,0,a,this.a,this.c),this.A.length=0===a.length?0:a[a.length-1],this.u()):this.ba("XY",null,this.c)};k.ba=function(a,b,c){kf(this,a,b);this.c=c;this.u()};
function Mo(a,b){var c=a.ja,d=[],e=[],f;var g=0;for(f=b.length;g<f;++g){var h=b[g];0===g&&(c=h.ja);gc(d,h.da());e.push(d.length)}a.ba(c,d,e)};function No(a,b){hf.call(this);this.na(a,b)}w(No,hf);k=No.prototype;k.Ik=function(a){this.A?gc(this.A,a.da()):this.A=a.da().slice();this.u()};k.clone=function(){var a=new No(null);a.ba(this.ja,this.A.slice());return a};k.Nb=function(a,b,c,d){if(d<Ha(this.G(),a,b))return d;var e=this.A,f=this.a,g;var h=0;for(g=e.length;h<g;h+=f){var l=ua(a,b,e[h],e[h+1]);if(l<d){d=l;for(l=0;l<f;++l)c[l]=e[h+l];c.length=f}}return d};k.W=function(){return yf(this.A,0,this.A.length,this.a)};
k.Ll=function(a){var b=this.A?this.A.length/this.a:0;if(0>a||b<=a)return null;b=new C(null);b.ba(this.ja,this.A.slice(a*this.a,(a+1)*this.a));return b};k.de=function(){var a=this.A,b=this.ja,c=this.a,d=[],e;var f=0;for(e=a.length;f<e;f+=c){var g=new C(null);g.ba(b,a.slice(f,f+c));d.push(g)}return d};k.S=function(){return"MultiPoint"};k.$a=function(a){var b=this.A,c=this.a,d;var e=0;for(d=b.length;e<d;e+=c){var f=b[e];var g=b[e+1];if(Ka(a,f,g))return!0}return!1};
k.na=function(a,b){a?(lf(this,b,a,1),this.A||(this.A=[]),this.A.length=wf(this.A,0,a,this.a),this.u()):this.ba("XY",null)};k.ba=function(a,b){kf(this,a,b);this.u()};function Q(a,b){hf.call(this);this.c=[];this.o=-1;this.D=null;this.T=this.C=this.B=-1;this.j=null;this.na(a,b)}w(Q,hf);k=Q.prototype;k.Jk=function(a){if(this.A){var b=this.A.length;gc(this.A,a.da());a=a.pb().slice();var c;var d=0;for(c=a.length;d<c;++d)a[d]+=b}else this.A=a.da().slice(),a=a.pb().slice(),this.c.push();this.c.push(a);this.u()};k.clone=function(){for(var a=new Q(null),b=this.c.length,c=Array(b),d=0;d<b;++d)c[d]=this.c[d].slice();a.ba(this.ja,this.A.slice(),c);return a};
k.Nb=function(a,b,c,d){if(d<Ha(this.G(),a,b))return d;if(this.C!=this.g){var e=this.c,f=0,g=0,h;var l=0;for(h=e.length;l<h;++l){var m=e[l];g=qf(this.A,f,m,this.a,g);f=m[m.length-1]}this.B=Math.sqrt(g);this.C=this.g}e=Ii(this);f=this.c;g=this.a;l=this.B;h=0;m=[NaN,NaN];var n;var p=0;for(n=f.length;p<n;++p){var q=f[p];d=uf(e,h,q,g,l,!0,a,b,c,d,m);h=q[q.length-1]}return d};
k.Zc=function(a,b){a:{var c=Ii(this),d=this.c,e=0;if(0!==d.length){var f;var g=0;for(f=d.length;g<f;++g){var h=d[g];if(Hf(c,e,h,this.a,a,b)){a=!0;break a}e=h[h.length-1]}}a=!1}return a};k.Xn=function(){var a=Ii(this),b=this.c,c=0,d=0,e;var f=0;for(e=b.length;f<e;++f){var g=b[f];d+=nf(a,c,g,this.a);c=g[g.length-1]}return d};k.W=function(a){if(void 0!==a){var b=Ii(this).slice();Pf(b,this.c,this.a,a)}else b=this.A;return Af(b,0,this.c,this.a)};k.td=function(){return this.c};
function Ji(a){if(a.o!=a.g){var b=a.A,c=a.c,d=a.a,e=0,f=[],g;var h=0;for(g=c.length;h<g;++h){var l=c[h];e=Qa(b,e,l[0],d);f.push((e[0]+e[2])/2,(e[1]+e[3])/2);e=l[l.length-1]}b=Ii(a);c=a.c;d=a.a;h=0;g=[];l=0;for(e=c.length;l<e;++l){var m=c[l];g=If(b,h,m,d,f,2*l,g);h=m[m.length-1]}a.D=g;a.o=a.g}return a.D}k.ul=function(){var a=new No(null);a.ba("XYM",Ji(this).slice());return a};
function Ii(a){if(a.T!=a.g){var b=a.A;a:{var c=a.c;var d;var e=0;for(d=c.length;e<d;++e)if(!Nf(b,c[e],a.a,void 0)){c=!1;break a}c=!0}c?a.j=b:(a.j=b.slice(),a.j.length=Pf(a.j,a.c,a.a));a.T=a.g}return a.j}k.xd=function(a){var b=[],c=[],d=this.A,e=this.c,f=this.a;a=Math.sqrt(a);var g=0,h=0,l;var m=0;for(l=e.length;m<l;++m){var n=e[m],p=[];h=Cf(d,g,n,f,a,b,h,p);c.push(p);g=n[n.length-1]}b.length=h;d=new Q(null);d.ba("XY",b,c);return d};
k.Ml=function(a){if(0>a||this.c.length<=a)return null;if(0===a)var b=0;else b=this.c[a-1],b=b[b.length-1];a=this.c[a].slice();var c=a[a.length-1];if(0!==b){var d;var e=0;for(d=a.length;e<d;++e)a[e]-=b}e=new D(null);e.ba(this.ja,this.A.slice(b,c),a);return e};k.Vd=function(){var a=this.ja,b=this.A,c=this.c,d=[],e=0,f,g;var h=0;for(f=c.length;h<f;++h){var l=c[h].slice(),m=l[l.length-1];if(0!==e){var n=0;for(g=l.length;n<g;++n)l[n]-=e}n=new D(null);n.ba(a,b.slice(e,m),l);d.push(n);e=m}return d};
k.S=function(){return"MultiPolygon"};k.$a=function(a){a:{var b=Ii(this),c=this.c,d=this.a,e=0,f;var g=0;for(f=c.length;g<f;++g){var h=c[g];if(Lf(b,e,h,d,a)){a=!0;break a}e=h[h.length-1]}a=!1}return a};
k.na=function(a,b){if(a){lf(this,b,a,3);this.A||(this.A=[]);b=this.A;var c=this.a,d=this.c,e=0;d=d?d:[];var f=0,g;var h=0;for(g=a.length;h<g;++h)e=xf(b,e,a[h],c,d[f]),d[f++]=e,e=e[e.length-1];d.length=f;0===d.length?this.A.length=0:(a=d[d.length-1],this.A.length=0===a.length?0:a[a.length-1]);this.u()}else this.ba("XY",null,this.c)};k.ba=function(a,b,c){kf(this,a,b);this.c=c;this.u()};
function Oo(a,b){var c=a.ja,d=[],e=[],f;var g=0;for(f=b.length;g<f;++g){var h=b[g];0===g&&(c=h.ja);var l=d.length;var m=h.pb();var n;var p=0;for(n=m.length;p<n;++p)m[p]+=l;gc(d,h.da());e.push(m)}a.ba(c,d,e)};function Po(a){a=a?a:{};Go.call(this);this.b=a.geometryName}w(Po,Ko);
function Qo(a,b){if(!a)return null;if("number"===typeof a.x&&"number"===typeof a.y)var c="Point";else if(a.points)c="MultiPoint";else if(a.paths)c=1===a.paths.length?"LineString":"MultiLineString";else if(a.rings){var d=a.rings,e=Ro(a),f=[],g=[];c=[];var h;var l=0;for(h=d.length;l<h;++l)f.length=0,wf(f,0,d[l],e.length),Mf(f,0,f.length,e.length)?g.push([d[l]]):c.push(d[l]);for(;c.length;){d=c.shift();e=!1;for(l=g.length-1;0<=l;l--)if(La((new Df(g[l][0])).G(),(new Df(d)).G())){g[l].push(d);e=!0;break}e||
g.push([d.reverse()])}a=kb({},a);1===g.length?(c="Polygon",a.rings=g[0]):(c="MultiPolygon",a.rings=g)}return Jo((0,So[c])(a),!1,b)}function Ro(a){var b="XY";!0===a.hasZ&&!0===a.hasM?b="XYZM":!0===a.hasZ?b="XYZ":!0===a.hasM&&(b="XYM");return b}function To(a){a=a.ja;return{hasZ:"XYZ"===a||"XYZM"===a,hasM:"XYM"===a||"XYZM"===a}}
var So={Point:function(a){return void 0!==a.m&&void 0!==a.z?new C([a.x,a.y,a.z,a.m],"XYZM"):void 0!==a.z?new C([a.x,a.y,a.z],"XYZ"):void 0!==a.m?new C([a.x,a.y,a.m],"XYM"):new C([a.x,a.y])},LineString:function(a){return new I(a.paths[0],Ro(a))},Polygon:function(a){return new D(a.rings,Ro(a))},MultiPoint:function(a){return new No(a.points,Ro(a))},MultiLineString:function(a){return new P(a.paths,Ro(a))},MultiPolygon:function(a){return new Q(a.rings,Ro(a))}},Uo={Point:function(a){var b=a.W(),c;a=a.ja;
"XYZ"===a?c={x:b[0],y:b[1],z:b[2]}:"XYM"===a?c={x:b[0],y:b[1],m:b[2]}:"XYZM"===a?c={x:b[0],y:b[1],z:b[2],m:b[3]}:"XY"===a?c={x:b[0],y:b[1]}:oa(!1,34);return c},LineString:function(a){var b=To(a);return{hasZ:b.hasZ,hasM:b.hasM,paths:[a.W()]}},Polygon:function(a){var b=To(a);return{hasZ:b.hasZ,hasM:b.hasM,rings:a.W(!1)}},MultiPoint:function(a){var b=To(a);return{hasZ:b.hasZ,hasM:b.hasM,points:a.W()}},MultiLineString:function(a){var b=To(a);return{hasZ:b.hasZ,hasM:b.hasM,paths:a.W()}},MultiPolygon:function(a){var b=
To(a);a=a.W(!1);for(var c=[],d=0;d<a.length;d++)for(var e=a[d].length-1;0<=e;e--)c.push(a[d][e]);return{hasZ:b.hasZ,hasM:b.hasM,rings:c}}};k=Po.prototype;k.dd=function(a,b){var c=Qo(a.geometry,b),d=new Hk;this.b&&d.Lc(this.b);d.Va(c);b&&b.pg&&a.attributes[b.pg]&&d.qc(a.attributes[b.pg]);a.attributes&&d.H(a.attributes);return d};k.Mg=function(a,b){b=b?b:{};if(a.features){var c=[],d=a.features,e;b.pg=a.objectIdFieldName;a=0;for(e=d.length;a<e;++a)c.push(this.dd(d[a],b));return c}return[this.dd(a,b)]};
k.Qg=function(a,b){return Qo(a,b)};k.Tg=function(a){return a.spatialReference&&a.spatialReference.wkid?Ob("EPSG:"+a.spatialReference.wkid):null};function Vo(a,b){return(0,Uo[a.S()])(Jo(a,!0,b),b)}k.se=function(a,b){return Vo(a,Io(this,b))};k.ld=function(a,b){b=Io(this,b);var c={},d=a.U();d&&(c.geometry=Vo(d,b),b&&b.featureProjection&&(c.geometry.spatialReference={wkid:Ob(b.featureProjection).wb.split(":").pop()}));b=a.L();delete b[a.a];c.attributes=nb(b)?{}:b;return c};
k.qe=function(a,b){b=Io(this,b);var c=[],d;var e=0;for(d=a.length;e<d;++e)c.push(this.ld(a[e],b));return{features:c}};function Wo(){this.g=new XMLSerializer;Go.call(this)}w(Wo,Go);k=Wo.prototype;k.S=function(){return"xml"};k.Yb=function(a,b){return qo(a)?Xo(this,a,b):ro(a)?this.Lg(a,b):"string"===typeof a?(a=so(a),Xo(this,a,b)):null};function Xo(a,b,c){a=Yo(a,b,c);return 0<a.length?a[0]:null}k.Lg=function(){return null};k.Qa=function(a,b){return qo(a)?Yo(this,a,b):ro(a)?this.Kc(a,b):"string"===typeof a?(a=so(a),Yo(this,a,b)):[]};
function Yo(a,b,c){var d=[];for(b=b.firstChild;b;b=b.nextSibling)b.nodeType==Node.ELEMENT_NODE&&gc(d,a.Kc(b,c));return d}k.ed=function(a,b){if(qo(a))return null;if(ro(a))return this.vj(a,b);"string"===typeof a&&so(a);return null};k.vj=function(){return null};k.sb=function(a){return qo(a)?this.Sg(a):ro(a)?this.uf(a):"string"===typeof a?(a=so(a),this.Sg(a)):null};k.Sg=function(){return this.defaultDataProjection};k.uf=function(){return this.defaultDataProjection};k.Jd=function(){return this.g.serializeToString(this.mh())};
k.mh=function(){return null};k.ac=function(a,b){a=this.bc(a,b);return this.g.serializeToString(a)};k.bc=function(){return null};k.md=function(a,b){a=this.re(a,b);return this.g.serializeToString(a)};k.re=function(){return null};function Zo(a){a=a?a:{};this.featureType=a.featureType;this.featureNS=a.featureNS;this.srsName=a.srsName;this.schemaLocation="";this.b={};this.b["http://www.opengis.net/gml"]={featureMember:vo(Zo.prototype.ge),featureMembers:vo(Zo.prototype.ge)};Wo.call(this)}w(Zo,Wo);var $o=/^[\s\xa0]*$/;k=Zo.prototype;
k.ge=function(a,b){var c=a.localName,d=null;if("FeatureCollection"==c)"http://www.opengis.net/wfs"===a.namespaceURI?d=O([],this.b,a,b,this):d=O(null,this.b,a,b,this);else if("featureMembers"==c||"featureMember"==c){var e=b[0],f=e.featureType,g=e.featureNS,h;if(!f&&a.childNodes){f=[];g={};var l=0;for(h=a.childNodes.length;l<h;++l){var m=a.childNodes[l];if(1===m.nodeType){var n=m.nodeName.split(":").pop();if(-1===f.indexOf(n)){var p="",q=0;m=m.namespaceURI;for(var r in g){if(g[r]===m){p=r;break}++q}p||
(p="p"+q,g[p]=m);f.push(p+":"+n)}}}"featureMember"!=c&&(e.featureType=f,e.featureNS=g)}"string"===typeof g&&(l=g,g={},g.p0=l);e={};f=Array.isArray(f)?f:[f];for(var u in g){n={};l=0;for(h=f.length;l<h;++l)(-1===f[l].indexOf(":")?"p0":f[l].split(":")[0])===u&&(n[f[l].split(":").pop()]="featureMembers"==c?uo(this.Kg,this):vo(this.Kg,this));e[g[u]]=n}"featureMember"==c?d=O(void 0,e,a,b):d=O([],e,a,b)}null===d&&(d=[]);return d};
k.rf=function(a,b){var c=b[0];c.srsName=a.firstElementChild.getAttribute("srsName");c.srsDimension=a.firstElementChild.getAttribute("srsDimension");if(a=O(null,this.qh,a,b,this))return Jo(a,!1,c)};
k.Kg=function(a,b){var c;(c=a.getAttribute("fid"))||(c=a.getAttributeNS("http://www.opengis.net/gml","id")||"");var d={},e;for(a=a.firstElementChild;a;a=a.nextElementSibling){var f=a.localName;if(0===a.childNodes.length||1===a.childNodes.length&&(3===a.firstChild.nodeType||4===a.firstChild.nodeType)){var g=oo(a,!1);$o.test(g)&&(g=void 0);d[f]=g}else"boundedBy"!==f&&(e=f),d[f]=this.rf(a,b)}b=new Hk(d);e&&b.Lc(e);c&&b.qc(c);return b};
k.Aj=function(a,b){if(a=this.qf(a,b))return b=new C(null),b.ba("XYZ",a),b};k.yj=function(a,b){if(a=O([],this.kk,a,b,this))return new No(a)};k.xj=function(a,b){if(a=O([],this.jk,a,b,this))return b=new P(null),Mo(b,a),b};k.zj=function(a,b){if(a=O([],this.lk,a,b,this))return b=new Q(null),Oo(b,a),b};k.qj=function(a,b){Co(this.pk,a,b,this)};k.fi=function(a,b){Co(this.hk,a,b,this)};k.rj=function(a,b){Co(this.qk,a,b,this)};k.sf=function(a,b){if(a=this.qf(a,b))return b=new I(null),b.ba("XYZ",a),b};
k.Xp=function(a,b){if(a=O(null,this.te,a,b,this))return a};k.wj=function(a,b){if(a=this.qf(a,b))return b=new Df(null),Ef(b,"XYZ",a),b};k.tf=function(a,b){if((a=O([null],this.Gf,a,b,this))&&a[0]){b=new D(null);var c=a[0],d=[c.length],e;var f=1;for(e=a.length;f<e;++f)gc(c,a[f]),d.push(c.length);b.ba("XYZ",c,d);return b}};k.qf=function(a,b){return O(null,this.te,a,b,this)};k.kk={"http://www.opengis.net/gml":{pointMember:uo(Zo.prototype.qj),pointMembers:uo(Zo.prototype.qj)}};
k.jk={"http://www.opengis.net/gml":{lineStringMember:uo(Zo.prototype.fi),lineStringMembers:uo(Zo.prototype.fi)}};k.lk={"http://www.opengis.net/gml":{polygonMember:uo(Zo.prototype.rj),polygonMembers:uo(Zo.prototype.rj)}};k.pk={"http://www.opengis.net/gml":{Point:uo(Zo.prototype.qf)}};k.hk={"http://www.opengis.net/gml":{LineString:uo(Zo.prototype.sf)}};k.qk={"http://www.opengis.net/gml":{Polygon:uo(Zo.prototype.tf)}};k.ue={"http://www.opengis.net/gml":{LinearRing:vo(Zo.prototype.Xp)}};
k.vj=function(a,b){return(a=this.rf(a,[Ho(this,a,b?b:{})]))?a:null};k.Kc=function(a,b){var c={featureType:this.featureType,featureNS:this.featureNS};b&&kb(c,Ho(this,a,b));return this.ge(a,[c])||[]};k.uf=function(a){return Ob(this.srsName?this.srsName:a.firstElementChild.getAttribute("srsName"))};function ap(a){a=oo(a,!1);return bp(a)}function bp(a){if(a=/^\s*(true|1)|(false|0)\s*$/.exec(a))return void 0!==a[1]||!1}function cp(a){a=oo(a,!1);a=Date.parse(a);return isNaN(a)?void 0:a/1E3}function dp(a){a=oo(a,!1);return ep(a)}function ep(a){if(a=/^\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?)\s*$/i.exec(a))return parseFloat(a[1])}function fp(a){a=oo(a,!1);return gp(a)}function gp(a){if(a=/^\s*(\d+)\s*$/.exec(a))return parseInt(a[1],10)}function R(a){return oo(a,!1).trim()}
function hp(a,b){ip(a,b?"1":"0")}function Ip(a,b){a.appendChild(mo.createTextNode(b.toPrecision()))}function Jp(a,b){a.appendChild(mo.createTextNode(b.toString()))}function ip(a,b){a.appendChild(mo.createTextNode(b))};function Kp(a){a=a?a:{};Zo.call(this,a);this.s=void 0!==a.surface?a.surface:!1;this.c=void 0!==a.curve?a.curve:!1;this.f=void 0!==a.multiCurve?a.multiCurve:!0;this.j=void 0!==a.multiSurface?a.multiSurface:!0;this.schemaLocation=a.schemaLocation?a.schemaLocation:"http://www.opengis.net/gml http://schemas.opengis.net/gml/3.1.1/profiles/gmlsfProfile/1.0.0/gmlsf.xsd";this.hasZ=void 0!==a.hasZ?a.hasZ:!1}w(Kp,Zo);k=Kp.prototype;
k.aq=function(a,b){if(a=O([],this.ik,a,b,this))return b=new P(null),Mo(b,a),b};k.bq=function(a,b){if(a=O([],this.mk,a,b,this))return b=new Q(null),Oo(b,a),b};k.Gh=function(a,b){Co(this.ek,a,b,this)};k.Xj=function(a,b){Co(this.sk,a,b,this)};k.fq=function(a,b){return O([null],this.nk,a,b,this)};k.iq=function(a,b){return O([null],this.rk,a,b,this)};k.gq=function(a,b){return O([null],this.Gf,a,b,this)};k.$p=function(a,b){return O([null],this.te,a,b,this)};
k.Fm=function(a,b){(a=O(void 0,this.ue,a,b,this))&&b[b.length-1].push(a)};k.Zk=function(a,b){(a=O(void 0,this.ue,a,b,this))&&(b[b.length-1][0]=a)};k.Bj=function(a,b){if((a=O([null],this.tk,a,b,this))&&a[0]){b=new D(null);var c=a[0],d=[c.length],e;var f=1;for(e=a.length;f<e;++f)gc(c,a[f]),d.push(c.length);b.ba("XYZ",c,d);return b}};k.tj=function(a,b){if(a=O([null],this.fk,a,b,this))return b=new I(null),b.ba("XYZ",a),b};
k.Wp=function(a,b){a=O([null],this.gk,a,b,this);return Na(a[1][0],a[1][1],a[2][0],a[2][1])};k.Yp=function(a,b){var c=oo(a,!1),d=/^\s*([+\-]?\d*\.?\d+(?:[eE][+\-]?\d+)?)\s*/;a=[];for(var e;e=d.exec(c);)a.push(parseFloat(e[1])),c=c.substr(e[0].length);if(""===c){b=b[0].srsName;c="enu";b&&(c=Ob(b).b);if("neu"===c)for(b=0,c=a.length;b<c;b+=3)d=a[b],a[b]=a[b+1],a[b+1]=d;b=a.length;2==b&&a.push(0);if(0!==b)return a}};
k.Pg=function(a,b){var c=oo(a,!1).replace(/^\s*|\s*$/g,"");b=b[0];var d=b.srsName,e=b.srsDimension;b="enu";d&&(b=Ob(d).b);c=c.split(/\s+/);d=2;a.getAttribute("srsDimension")?d=gp(a.getAttribute("srsDimension")):a.getAttribute("dimension")?d=gp(a.getAttribute("dimension")):a.parentNode.getAttribute("srsDimension")?d=gp(a.parentNode.getAttribute("srsDimension")):e&&(d=gp(e));for(var f,g=[],h=0,l=c.length;h<l;h+=d)a=parseFloat(c[h]),e=parseFloat(c[h+1]),f=3===d?parseFloat(c[h+2]):0,"en"===b.substr(0,
2)?g.push(a,e,f):g.push(e,a,f);return g};k.te={"http://www.opengis.net/gml":{pos:vo(Kp.prototype.Yp),posList:vo(Kp.prototype.Pg)}};k.Gf={"http://www.opengis.net/gml":{interior:Kp.prototype.Fm,exterior:Kp.prototype.Zk}};
k.qh={"http://www.opengis.net/gml":{Point:vo(Zo.prototype.Aj),MultiPoint:vo(Zo.prototype.yj),LineString:vo(Zo.prototype.sf),MultiLineString:vo(Zo.prototype.xj),LinearRing:vo(Zo.prototype.wj),Polygon:vo(Zo.prototype.tf),MultiPolygon:vo(Zo.prototype.zj),Surface:vo(Kp.prototype.Bj),MultiSurface:vo(Kp.prototype.bq),Curve:vo(Kp.prototype.tj),MultiCurve:vo(Kp.prototype.aq),Envelope:vo(Kp.prototype.Wp)}};k.ik={"http://www.opengis.net/gml":{curveMember:uo(Kp.prototype.Gh),curveMembers:uo(Kp.prototype.Gh)}};
k.mk={"http://www.opengis.net/gml":{surfaceMember:uo(Kp.prototype.Xj),surfaceMembers:uo(Kp.prototype.Xj)}};k.ek={"http://www.opengis.net/gml":{LineString:uo(Zo.prototype.sf),Curve:uo(Kp.prototype.tj)}};k.sk={"http://www.opengis.net/gml":{Polygon:uo(Zo.prototype.tf),Surface:uo(Kp.prototype.Bj)}};k.tk={"http://www.opengis.net/gml":{patches:vo(Kp.prototype.fq)}};k.fk={"http://www.opengis.net/gml":{segments:vo(Kp.prototype.iq)}};k.gk={"http://www.opengis.net/gml":{lowerCorner:uo(Kp.prototype.Pg),upperCorner:uo(Kp.prototype.Pg)}};
k.nk={"http://www.opengis.net/gml":{PolygonPatch:vo(Kp.prototype.gq)}};k.rk={"http://www.opengis.net/gml":{LineStringSegment:vo(Kp.prototype.$p)}};function Lp(a,b,c){var d=c[c.length-1];c=d.hasZ;a.setAttribute("srsDimension",c?3:2);d=d.srsName;b=b.W();for(var e=b.length,f=Array(e),g,h=0;h<e;++h){g=b[h];var l=h,m=c,n="enu";d&&(n=Ob(d).b);n="en"===n.substr(0,2)?g[0]+" "+g[1]:g[1]+" "+g[0];m&&(n+=" "+(g[2]||0));f[l]=n}ip(a,f.join(" "))}
k.Hi=function(a,b,c){var d=c[c.length-1].srsName;d&&a.setAttribute("srsName",d);d=no(a.namespaceURI,"pos");a.appendChild(d);c=c[c.length-1];a=c.hasZ;d.setAttribute("srsDimension",a?3:2);var e=c.srsName;c="enu";e&&(c=Ob(e).b);b=b.W();c="en"===c.substr(0,2)?b[0]+" "+b[1]:b[1]+" "+b[0];a&&(c+=" "+(b[2]||0));ip(d,c)};var Mp={"http://www.opengis.net/gml":{lowerCorner:M(ip),upperCorner:M(ip)}};k=Kp.prototype;
k.Pn=function(a,b,c){var d=c[c.length-1].srsName;d&&a.setAttribute("srsName",d);Do({node:a},Mp,Ao,[b[0]+" "+b[1],b[2]+" "+b[3]],c,["lowerCorner","upperCorner"],this)};k.Ei=function(a,b,c){var d=c[c.length-1].srsName;d&&a.setAttribute("srsName",d);d=no(a.namespaceURI,"posList");a.appendChild(d);Lp(d,b,c)};k.On=function(a,b){a=b[b.length-1];b=a.node;var c=a.exteriorWritten;void 0===c&&(a.exteriorWritten=!0);return no(b.namespaceURI,void 0!==c?"interior":"exterior")};
k.af=function(a,b,c){var d=c[c.length-1],e=d.hasZ;d=d.srsName;"PolygonPatch"!==a.nodeName&&d&&a.setAttribute("srsName",d);"Polygon"===a.nodeName||"PolygonPatch"===a.nodeName?(b=b.Ud(),Do({node:a,hasZ:e,srsName:d},Np,this.On,b,c,void 0,this)):"Surface"===a.nodeName&&(e=no(a.namespaceURI,"patches"),a.appendChild(e),a=no(e.namespaceURI,"PolygonPatch"),e.appendChild(a),this.af(a,b,c))};
k.$e=function(a,b,c){var d=c[c.length-1].srsName;"LineStringSegment"!==a.nodeName&&d&&a.setAttribute("srsName",d);"LineString"===a.nodeName||"LineStringSegment"===a.nodeName?(d=no(a.namespaceURI,"posList"),a.appendChild(d),Lp(d,b,c)):"Curve"===a.nodeName&&(d=no(a.namespaceURI,"segments"),a.appendChild(d),a=no(d.namespaceURI,"LineStringSegment"),d.appendChild(a),this.$e(a,b,c))};
k.Gi=function(a,b,c){var d=c[c.length-1],e=d.hasZ,f=d.srsName;d=d.surface;f&&a.setAttribute("srsName",f);b=b.Vd();Do({node:a,hasZ:e,srsName:f,surface:d},Op,this.l,b,c,void 0,this)};k.Qn=function(a,b,c){var d=c[c.length-1],e=d.srsName;d=d.hasZ;e&&a.setAttribute("srsName",e);b=b.de();Do({node:a,hasZ:d,srsName:e},Pp,yo("pointMember"),b,c,void 0,this)};
k.Fi=function(a,b,c){var d=c[c.length-1],e=d.hasZ,f=d.srsName;d=d.curve;f&&a.setAttribute("srsName",f);b=b.wd();Do({node:a,hasZ:e,srsName:f,curve:d},Qp,this.l,b,c,void 0,this)};k.Ii=function(a,b,c){var d=no(a.namespaceURI,"LinearRing");a.appendChild(d);this.Ei(d,b,c)};k.Ji=function(a,b,c){var d=this.a(b,c);d&&(a.appendChild(d),this.af(d,b,c))};k.Rn=function(a,b,c){var d=no(a.namespaceURI,"Point");a.appendChild(d);this.Hi(d,b,c)};
k.Di=function(a,b,c){var d=this.a(b,c);d&&(a.appendChild(d),this.$e(d,b,c))};k.Yc=function(a,b,c){var d=c[c.length-1],e=kb({},d);e.node=a;var f;Array.isArray(b)?d.dataProjection?f=bc(b,d.featureProjection,d.dataProjection):f=b:f=Jo(b,!0,d);Do(e,Rp,this.a,[f],c,void 0,this)};
k.Ci=function(a,b,c){var d=b.c;d&&a.setAttribute("fid",d);d=c[c.length-1];var e=d.featureNS,f=b.a;d.tb||(d.tb={},d.tb[e]={});var g=b.L();b=[];var h=[];for(m in g){var l=g[m];null!==l&&(b.push(m),h.push(l),m==f||l instanceof gf?m in d.tb[e]||(d.tb[e][m]=M(this.Yc,this)):m in d.tb[e]||(d.tb[e][m]=M(ip)))}var m=kb({},d);m.node=a;Do(m,d.tb,yo(void 0,e),h,c,b)};
var Op={"http://www.opengis.net/gml":{surfaceMember:M(Kp.prototype.Ji),polygonMember:M(Kp.prototype.Ji)}},Pp={"http://www.opengis.net/gml":{pointMember:M(Kp.prototype.Rn)}},Qp={"http://www.opengis.net/gml":{lineStringMember:M(Kp.prototype.Di),curveMember:M(Kp.prototype.Di)}},Np={"http://www.opengis.net/gml":{exterior:M(Kp.prototype.Ii),interior:M(Kp.prototype.Ii)}},Rp={"http://www.opengis.net/gml":{Curve:M(Kp.prototype.$e),MultiCurve:M(Kp.prototype.Fi),Point:M(Kp.prototype.Hi),MultiPoint:M(Kp.prototype.Qn),
LineString:M(Kp.prototype.$e),MultiLineString:M(Kp.prototype.Fi),LinearRing:M(Kp.prototype.Ei),Polygon:M(Kp.prototype.af),MultiPolygon:M(Kp.prototype.Gi),Surface:M(Kp.prototype.af),MultiSurface:M(Kp.prototype.Gi),Envelope:M(Kp.prototype.Pn)}},Sp={MultiLineString:"lineStringMember",MultiCurve:"curveMember",MultiPolygon:"polygonMember",MultiSurface:"surfaceMember"};Kp.prototype.l=function(a,b){return no("http://www.opengis.net/gml",Sp[b[b.length-1].node.nodeName])};
Kp.prototype.a=function(a,b){var c=b[b.length-1];b=c.multiSurface;var d=c.surface,e=c.curve;c=c.multiCurve;Array.isArray(a)?a="Envelope":(a=a.S(),"MultiPolygon"===a&&!0===b?a="MultiSurface":"Polygon"===a&&!0===d?a="Surface":"LineString"===a&&!0===e?a="Curve":"MultiLineString"===a&&!0===c&&(a="MultiCurve"));return no("http://www.opengis.net/gml",a)};
Kp.prototype.re=function(a,b){b=Io(this,b);var c=no("http://www.opengis.net/gml","geom"),d={node:c,hasZ:this.hasZ,srsName:this.srsName,curve:this.c,surface:this.s,multiSurface:this.j,multiCurve:this.f};b&&kb(d,b);this.Yc(c,a,[d]);return c};
Kp.prototype.bc=function(a,b){b=Io(this,b);var c=no("http://www.opengis.net/gml","featureMembers");c.setAttributeNS("http://www.w3.org/2001/XMLSchema-instance","xsi:schemaLocation",this.schemaLocation);var d={srsName:this.srsName,hasZ:this.hasZ,curve:this.c,surface:this.s,multiSurface:this.j,multiCurve:this.f,featureNS:this.featureNS,featureType:this.featureType};b&&kb(d,b);b=[d];var e=b[b.length-1];d=e.featureType;var f=e.featureNS,g={};g[f]={};g[f][d]=M(this.Ci,this);e=kb({},e);e.node=c;Do(e,g,
yo(d,f),a,b);return c};function Tp(a){a=a?a:{};Zo.call(this,a);this.b["http://www.opengis.net/gml"].featureMember=uo(Zo.prototype.ge);this.schemaLocation=a.schemaLocation?a.schemaLocation:"http://www.opengis.net/gml http://schemas.opengis.net/gml/2.1.2/feature.xsd"}w(Tp,Zo);k=Tp.prototype;
k.uj=function(a,b){a=oo(a,!1).replace(/^\s*|\s*$/g,"");var c=b[0].srsName;b="enu";c&&(c=Ob(c))&&(b=c.b);a=a.trim().split(/\s+/);for(var d,e,f=[],g=0,h=a.length;g<h;g++)e=a[g].split(/,+/),c=parseFloat(e[0]),d=parseFloat(e[1]),e=3===e.length?parseFloat(e[2]):0,"en"===b.substr(0,2)?f.push(c,d,e):f.push(d,c,e);return f};k.Up=function(a,b){a=O([null],this.dk,a,b,this);return Na(a[1][0],a[1][1],a[1][3],a[1][4])};k.Dm=function(a,b){(a=O(void 0,this.ue,a,b,this))&&b[b.length-1].push(a)};
k.Ep=function(a,b){(a=O(void 0,this.ue,a,b,this))&&(b[b.length-1][0]=a)};k.te={"http://www.opengis.net/gml":{coordinates:vo(Tp.prototype.uj)}};k.Gf={"http://www.opengis.net/gml":{innerBoundaryIs:Tp.prototype.Dm,outerBoundaryIs:Tp.prototype.Ep}};k.dk={"http://www.opengis.net/gml":{coordinates:uo(Tp.prototype.uj)}};
k.qh={"http://www.opengis.net/gml":{Point:vo(Zo.prototype.Aj),MultiPoint:vo(Zo.prototype.yj),LineString:vo(Zo.prototype.sf),MultiLineString:vo(Zo.prototype.xj),LinearRing:vo(Zo.prototype.wj),Polygon:vo(Zo.prototype.tf),MultiPolygon:vo(Zo.prototype.zj),Box:vo(Tp.prototype.Up)}};
k.wg=function(a,b){var c=b[b.length-1];b=c.multiSurface;var d=c.surface;c=c.multiCurve;Array.isArray(a)?a="Envelope":(a=a.S(),"MultiPolygon"===a&&!0===b?a="MultiSurface":"Polygon"===a&&!0===d?a="Surface":"MultiLineString"===a&&!0===c&&(a="MultiCurve"));return no("http://www.opengis.net/gml",a)};k.ui=function(a,b,c){var d=c[c.length-1],e=kb({},d);e.node=a;var f;Array.isArray(b)?d.dataProjection?f=bc(b,d.featureProjection,d.dataProjection):f=b:f=Jo(b,!0,d);Do(e,Up,this.wg,[f],c,void 0,this)};
k.Ye=function(a,b,c){var d=c[c.length-1].srsName;"LineStringSegment"!==a.nodeName&&d&&a.setAttribute("srsName",d);"LineString"===a.nodeName||"LineStringSegment"===a.nodeName?(d=Vp(a.namespaceURI),a.appendChild(d),Wp(d,b,c)):"Curve"===a.nodeName&&(d=no(a.namespaceURI,"segments"),a.appendChild(d),a=no(d.namespaceURI,"LineStringSegment"),d.appendChild(a),this.Ye(a,b,c))};function Vp(a){a=no(a,"coordinates");a.setAttribute("decimal",".");a.setAttribute("cs",",");a.setAttribute("ts"," ");return a}
function Wp(a,b,c){var d=c[c.length-1];c=d.hasZ;d=d.srsName;b=b.W();for(var e=b.length,f=Array(e),g,h=0;h<e;++h)g=b[h],f[h]=Xp(g,d,c);ip(a,f.join(" "))}
k.Ze=function(a,b,c){var d=c[c.length-1],e=d.hasZ;d=d.srsName;"PolygonPatch"!==a.nodeName&&d&&a.setAttribute("srsName",d);"Polygon"===a.nodeName||"PolygonPatch"===a.nodeName?(b=b.Ud(),Do({node:a,hasZ:e,srsName:d},Yp,this.Kn,b,c,void 0,this)):"Surface"===a.nodeName&&(e=no(a.namespaceURI,"patches"),a.appendChild(e),a=no(e.namespaceURI,"PolygonPatch"),e.appendChild(a),this.Ze(a,b,c))};
k.Kn=function(a,b){a=b[b.length-1];b=a.node;var c=a.exteriorWritten;void 0===c&&(a.exteriorWritten=!0);return no(b.namespaceURI,void 0!==c?"innerBoundaryIs":"outerBoundaryIs")};k.Ai=function(a,b,c){var d=no(a.namespaceURI,"LinearRing");a.appendChild(d);this.wi(d,b,c)};function Xp(a,b,c){var d="enu";b&&(d=Ob(b).b);b="en"===d.substr(0,2)?a[0]+","+a[1]:a[1]+","+a[0];c&&(b+=","+(a[2]||0));return b}
k.xi=function(a,b,c){var d=c[c.length-1],e=d.hasZ,f=d.srsName;d=d.curve;f&&a.setAttribute("srsName",f);b=b.wd();Do({node:a,hasZ:e,srsName:f,curve:d},Zp,this.a,b,c,void 0,this)};k.zi=function(a,b,c){var d=c[c.length-1];c=d.hasZ;var e=d.srsName;e&&a.setAttribute("srsName",e);d=Vp(a.namespaceURI);a.appendChild(d);a=b.W();a=Xp(a,e,c);ip(d,a)};
k.Mn=function(a,b,c){var d=c[c.length-1],e=d.hasZ;(d=d.srsName)&&a.setAttribute("srsName",d);b=b.de();Do({node:a,hasZ:e,srsName:d},$p,yo("pointMember"),b,c,void 0,this)};k.Nn=function(a,b,c){var d=no(a.namespaceURI,"Point");a.appendChild(d);this.zi(d,b,c)};k.vi=function(a,b,c){var d=this.wg(b,c);d&&(a.appendChild(d),this.Ye(d,b,c))};k.wi=function(a,b,c){var d=c[c.length-1].srsName;d&&a.setAttribute("srsName",d);d=Vp(a.namespaceURI);a.appendChild(d);Wp(d,b,c)};
k.yi=function(a,b,c){var d=c[c.length-1],e=d.hasZ,f=d.srsName;d=d.surface;f&&a.setAttribute("srsName",f);b=b.Vd();Do({node:a,hasZ:e,srsName:f,surface:d},aq,this.a,b,c,void 0,this)};k.Bi=function(a,b,c){var d=this.wg(b,c);d&&(a.appendChild(d),this.Ze(d,b,c))};k.Ln=function(a,b,c){var d=c[c.length-1].srsName;d&&a.setAttribute("srsName",d);Do({node:a},bq,Ao,[b[0]+" "+b[1],b[2]+" "+b[3]],c,["lowerCorner","upperCorner"],this)};
var Up={"http://www.opengis.net/gml":{Curve:M(Tp.prototype.Ye),MultiCurve:M(Tp.prototype.xi),Point:M(Tp.prototype.zi),MultiPoint:M(Tp.prototype.Mn),LineString:M(Tp.prototype.Ye),MultiLineString:M(Tp.prototype.xi),LinearRing:M(Tp.prototype.wi),Polygon:M(Tp.prototype.Ze),MultiPolygon:M(Tp.prototype.yi),Surface:M(Tp.prototype.Ze),MultiSurface:M(Tp.prototype.yi),Envelope:M(Tp.prototype.Ln)}},Yp={"http://www.opengis.net/gml":{outerBoundaryIs:M(Tp.prototype.Ai),innerBoundaryIs:M(Tp.prototype.Ai)}},$p={"http://www.opengis.net/gml":{pointMember:M(Tp.prototype.Nn)}},
Zp={"http://www.opengis.net/gml":{lineStringMember:M(Tp.prototype.vi),curveMember:M(Tp.prototype.vi)}};Tp.prototype.a=function(a,b){return no("http://www.opengis.net/gml",cq[b[b.length-1].node.nodeName])};var cq={MultiLineString:"lineStringMember",MultiCurve:"curveMember",MultiPolygon:"polygonMember",MultiSurface:"surfaceMember"},aq={"http://www.opengis.net/gml":{surfaceMember:M(Tp.prototype.Bi),polygonMember:M(Tp.prototype.Bi)}},bq={"http://www.opengis.net/gml":{lowerCorner:M(ip),upperCorner:M(ip)}};function dq(a){a=a?a:{};Wo.call(this);this.defaultDataProjection=Ob("EPSG:4326");this.b=a.readExtensions}w(dq,Wo);var eq=[null,"http://www.topografix.com/GPX/1/0","http://www.topografix.com/GPX/1/1"];function fq(a,b,c,d){a.push(parseFloat(c.getAttribute("lon")),parseFloat(c.getAttribute("lat")));"ele"in d?(a.push(d.ele),delete d.ele,b.hasZ=!0):a.push(0);"time"in d?(a.push(d.time),delete d.time,b.hasM=!0):a.push(0);return a}
function gq(a,b,c){var d="XY",e=2;a.hasZ&&a.hasM?(d="XYZM",e=4):a.hasZ?(d="XYZ",e=3):a.hasM&&(d="XYM",e=3);if(4!==e){var f;var g=0;for(f=b.length/4;g<f;g++)b[g*e]=b[4*g],b[g*e+1]=b[4*g+1],a.hasZ&&(b[g*e+2]=b[4*g+2]),a.hasM&&(b[g*e+2]=b[4*g+3]);b.length=b.length/4*e;if(c)for(g=0,f=c.length;g<f;g++)c[g]=c[g]/4*e}return d}function hq(a,b){var c=b[b.length-1],d=a.getAttribute("href");null!==d&&(c.link=d);Co(iq,a,b)}function jq(a,b){b[b.length-1].extensionsNode_=a}
function kq(a,b){var c=b[0];if(a=O({flatCoordinates:[],layoutOptions:{}},lq,a,b)){b=a.flatCoordinates;delete a.flatCoordinates;var d=a.layoutOptions;delete a.layoutOptions;d=gq(d,b);var e=new I(null);e.ba(d,b);Jo(e,!1,c);c=new Hk(e);c.H(a);return c}}
function mq(a,b){var c=b[0];if(a=O({flatCoordinates:[],ends:[],layoutOptions:{}},nq,a,b)){b=a.flatCoordinates;delete a.flatCoordinates;var d=a.ends;delete a.ends;var e=a.layoutOptions;delete a.layoutOptions;e=gq(e,b,d);var f=new P(null);f.ba(e,b,d);Jo(f,!1,c);c=new Hk(f);c.H(a);return c}}function oq(a,b){var c=b[0];if(b=O({},pq,a,b)){var d={};a=fq([],d,a,b);d=gq(d,a);a=new C(a,d);Jo(a,!1,c);c=new Hk(a);c.H(b);return c}}
var qq={rte:kq,trk:mq,wpt:oq},rq=N(eq,{rte:uo(kq),trk:uo(mq),wpt:uo(oq)}),iq=N(eq,{text:L(R,"linkText"),type:L(R,"linkType")}),lq=N(eq,{name:L(R),cmt:L(R),desc:L(R),src:L(R),link:hq,number:L(fp),extensions:jq,type:L(R),rtept:function(a,b){var c=O({},sq,a,b);c&&(b=b[b.length-1],fq(b.flatCoordinates,b.layoutOptions,a,c))}}),sq=N(eq,{ele:L(dp),time:L(cp)}),nq=N(eq,{name:L(R),cmt:L(R),desc:L(R),src:L(R),link:hq,number:L(fp),type:L(R),extensions:jq,trkseg:function(a,b){var c=b[b.length-1];Co(tq,a,b);c.ends.push(c.flatCoordinates.length)}}),
tq=N(eq,{trkpt:function(a,b){var c=O({},uq,a,b);c&&(b=b[b.length-1],fq(b.flatCoordinates,b.layoutOptions,a,c))}}),uq=N(eq,{ele:L(dp),time:L(cp)}),pq=N(eq,{ele:L(dp),time:L(cp),magvar:L(dp),geoidheight:L(dp),name:L(R),cmt:L(R),desc:L(R),src:L(R),link:hq,sym:L(R),type:L(R),fix:L(R),sat:L(fp),hdop:L(dp),vdop:L(dp),pdop:L(dp),ageofdgpsdata:L(dp),dgpsid:L(fp),extensions:jq});
function vq(a,b){b||(b=[]);for(var c=0,d=b.length;c<d;++c){var e=b[c];if(a.b){var f=e.get("extensionsNode_")||null;a.b(e,f)}e.set("extensionsNode_",void 0)}}dq.prototype.Lg=function(a,b){if(!ec(eq,a.namespaceURI))return null;var c=qq[a.localName];if(!c)return null;a=c(a,[Ho(this,a,b)]);if(!a)return null;vq(this,[a]);return a};dq.prototype.Kc=function(a,b){return ec(eq,a.namespaceURI)?"gpx"==a.localName&&(a=O([],rq,a,[Ho(this,a,b)]))?(vq(this,a),a):[]:[]};
function wq(a,b,c){a.setAttribute("href",b);b=c[c.length-1].properties;Do({node:a},xq,Ao,[b.linkText,b.linkType],c,yq)}function zq(a,b,c){var d=c[c.length-1],e=d.node.namespaceURI,f=d.properties;a.setAttributeNS(null,"lat",b[1]);a.setAttributeNS(null,"lon",b[0]);switch(d.geometryLayout){case "XYZM":0!==b[3]&&(f.time=b[3]);case "XYZ":0!==b[2]&&(f.ele=b[2]);break;case "XYM":0!==b[2]&&(f.time=b[2])}b="rtept"==a.nodeName?Aq[e]:Bq[e];d=Bo(f,b);Do({node:a,properties:f},Cq,Ao,d,c,b)}
var yq=["text","type"],xq=N(eq,{text:M(ip),type:M(ip)}),Dq=N(eq,"name cmt desc src link number type rtept".split(" ")),Eq=N(eq,{name:M(ip),cmt:M(ip),desc:M(ip),src:M(ip),link:M(wq),number:M(Jp),type:M(ip),rtept:xo(M(zq))}),Aq=N(eq,["ele","time"]),Fq=N(eq,"name cmt desc src link number type trkseg".split(" ")),Iq=N(eq,{name:M(ip),cmt:M(ip),desc:M(ip),src:M(ip),link:M(wq),number:M(Jp),type:M(ip),trkseg:xo(M(function(a,b,c){Do({node:a,geometryLayout:b.ja,properties:{}},Gq,Hq,b.W(),c)}))}),Hq=yo("trkpt"),
Gq=N(eq,{trkpt:M(zq)}),Bq=N(eq,"ele time magvar geoidheight name cmt desc src link sym type fix sat hdop vdop pdop ageofdgpsdata dgpsid".split(" ")),Cq=N(eq,{ele:M(Ip),time:M(function(a,b){b=new Date(1E3*b);a.appendChild(mo.createTextNode(b.getUTCFullYear()+"-"+xe(b.getUTCMonth()+1)+"-"+xe(b.getUTCDate())+"T"+xe(b.getUTCHours())+":"+xe(b.getUTCMinutes())+":"+xe(b.getUTCSeconds())+"Z"))}),magvar:M(Ip),geoidheight:M(Ip),name:M(ip),cmt:M(ip),desc:M(ip),src:M(ip),link:M(wq),sym:M(ip),type:M(ip),fix:M(ip),
sat:M(Jp),hdop:M(Ip),vdop:M(Ip),pdop:M(Ip),ageofdgpsdata:M(Ip),dgpsid:M(Jp)}),Jq={Point:"wpt",LineString:"rte",MultiLineString:"trk"};function Kq(a,b){if(a=a.U())if(a=Jq[a.S()])return no(b[b.length-1].node.namespaceURI,a)}
var Lq=N(eq,{rte:M(function(a,b,c){var d=c[0],e=b.L();a={node:a,properties:e};if(b=b.U())b=Jo(b,!0,d),a.geometryLayout=b.ja,e.rtept=b.W();d=Dq[c[c.length-1].node.namespaceURI];e=Bo(e,d);Do(a,Eq,Ao,e,c,d)}),trk:M(function(a,b,c){var d=c[0],e=b.L();a={node:a,properties:e};if(b=b.U())b=Jo(b,!0,d),e.trkseg=b.wd();d=Fq[c[c.length-1].node.namespaceURI];e=Bo(e,d);Do(a,Iq,Ao,e,c,d)}),wpt:M(function(a,b,c){var d=c[0],e=c[c.length-1];e.properties=b.L();if(b=b.U())b=Jo(b,!0,d),e.geometryLayout=b.ja,zq(a,b.W(),
c)})});dq.prototype.bc=function(a,b){b=Io(this,b);var c=no("http://www.topografix.com/GPX/1/1","gpx");c.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:xsi","http://www.w3.org/2001/XMLSchema-instance");c.setAttributeNS("http://www.w3.org/2001/XMLSchema-instance","xsi:schemaLocation","http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd");c.setAttribute("version","1.1");c.setAttribute("creator","OpenLayers");Do({node:c},Lq,Kq,a,[b]);return c};function Mq(a){gf.call(this);this.a=a?a:null;Nq(this)}w(Mq,gf);function Oq(a){var b=[],c;var d=0;for(c=a.length;d<c;++d)b.push(a[d].clone());return b}function Pq(a){var b;if(a.a){var c=0;for(b=a.a.length;c<b;++c)Mc(a.a[c],"change",a.u,a)}}function Nq(a){var b;if(a.a){var c=0;for(b=a.a.length;c<b;++c)y(a.a[c],"change",a.u,a)}}k=Mq.prototype;k.clone=function(){var a=new Mq(null);a.Kj(this.a);return a};
k.Nb=function(a,b,c,d){if(d<Ha(this.G(),a,b))return d;var e=this.a,f;var g=0;for(f=e.length;g<f;++g)d=e[g].Nb(a,b,c,d);return d};k.Zc=function(a,b){var c=this.a,d;var e=0;for(d=c.length;e<d;++e)if(c[e].Zc(a,b))return!0;return!1};k.Ae=function(a){Oa(a);for(var b=this.a,c=0,d=b.length;c<d;++c)Ta(a,b[c].G());return a};k.vd=function(){return Oq(this.a)};
k.Wd=function(a){this.l!=this.g&&(lb(this.i),this.f=0,this.l=this.g);if(0>a||0!==this.f&&a<this.f)return this;var b=a.toString();if(this.i.hasOwnProperty(b))return this.i[b];var c=[],d=this.a,e=!1,f;var g=0;for(f=d.length;g<f;++g){var h=d[g],l=h.Wd(a);c.push(l);l!==h&&(e=!0)}if(e)return a=new Mq(null),Pq(a),a.a=c,Nq(a),a.u(),this.i[b]=a;this.f=a;return this};k.S=function(){return"GeometryCollection"};k.$a=function(a){var b=this.a,c;var d=0;for(c=b.length;d<c;++d)if(b[d].$a(a))return!0;return!1};
k.rotate=function(a,b){for(var c=this.a,d=0,e=c.length;d<e;++d)c[d].rotate(a,b);this.u()};k.scale=function(a,b,c){c||(c=eb(this.G()));for(var d=this.a,e=0,f=d.length;e<f;++e)d[e].scale(a,b,c);this.u()};k.Kj=function(a){a=Oq(a);Pq(this);this.a=a;Nq(this);this.u()};k.Rc=function(a){var b=this.a,c;var d=0;for(c=b.length;d<c;++d)b[d].Rc(a);this.u()};k.translate=function(a,b){var c=this.a,d;var e=0;for(d=c.length;e<d;++e)c[e].translate(a,b);this.u()};k.ia=function(){Pq(this);gf.prototype.ia.call(this)};function Qq(a){a=a?a:{};Go.call(this);this.defaultDataProjection=Ob(a.defaultDataProjection?a.defaultDataProjection:"EPSG:4326");a.featureProjection&&(this.i=Ob(a.featureProjection));this.b=a.geometryName;this.a=a.extractGeometryName}w(Qq,Ko);function Rq(a,b){return a?Jo((0,Sq[a.type])(a),!1,b):null}function Tq(a,b){return(0,Uq[a.S()])(Jo(a,!0,b),b)}
var Sq={Point:function(a){return new C(a.coordinates)},LineString:function(a){return new I(a.coordinates)},Polygon:function(a){return new D(a.coordinates)},MultiPoint:function(a){return new No(a.coordinates)},MultiLineString:function(a){return new P(a.coordinates)},MultiPolygon:function(a){return new Q(a.coordinates)},GeometryCollection:function(a,b){a=a.geometries.map(function(a){return Rq(a,b)});return new Mq(a)}},Uq={Point:function(a){return{type:"Point",coordinates:a.W()}},LineString:function(a){return{type:"LineString",
coordinates:a.W()}},Polygon:function(a,b){if(b)var c=b.rightHanded;return{type:"Polygon",coordinates:a.W(c)}},MultiPoint:function(a){return{type:"MultiPoint",coordinates:a.W()}},MultiLineString:function(a){return{type:"MultiLineString",coordinates:a.W()}},MultiPolygon:function(a,b){if(b)var c=b.rightHanded;return{type:"MultiPolygon",coordinates:a.W(c)}},GeometryCollection:function(a,b){return{type:"GeometryCollection",geometries:a.a.map(function(a){var c=kb({},b);delete c.featureProjection;return Tq(a,
c)})}},Circle:function(){return{type:"GeometryCollection",geometries:[]}}};k=Qq.prototype;k.dd=function(a,b){a="Feature"===a.type?a:{type:"Feature",geometry:a};b=Rq(a.geometry,b);var c=new Hk;this.b?c.Lc(this.b):this.a&&void 0!==a.geometry_name&&c.Lc(a.geometry_name);c.Va(b);void 0!==a.id&&c.qc(a.id);a.properties&&c.H(a.properties);return c};
k.Mg=function(a,b){if("FeatureCollection"===a.type){var c=[];a=a.features;var d;var e=0;for(d=a.length;e<d;++e)c.push(this.dd(a[e],b))}else c=[this.dd(a,b)];return c};k.Qg=function(a,b){return Rq(a,b)};k.Tg=function(a){a=a.crs;var b;a?"name"==a.type?b=Ob(a.properties.name):oa(!1,36):b=this.defaultDataProjection;return b};
k.ld=function(a,b){b=Io(this,b);var c={type:"Feature"},d=a.c;void 0!==d&&(c.id=d);(d=a.U())?c.geometry=Tq(d,b):c.geometry=null;b=a.L();delete b[a.a];nb(b)?c.properties=null:c.properties=b;return c};k.qe=function(a,b){b=Io(this,b);var c=[],d;var e=0;for(d=a.length;e<d;++e)c.push(this.ld(a[e],b));return{type:"FeatureCollection",features:c}};k.se=function(a,b){return Tq(a,Io(this,b))};function Vq(){Go.call(this)}w(Vq,Go);function Wq(a){return"string"===typeof a?a:""}k=Vq.prototype;k.S=function(){return"text"};k.Yb=function(a,b){return this.fe(Wq(a),Io(this,b))};k.Qa=function(a,b){return this.Ng(Wq(a),Io(this,b))};k.ed=function(a,b){return this.Gd(Wq(a),Io(this,b))};k.sb=function(){return this.defaultDataProjection};k.Jd=function(a,b){return this.pe(a,Io(this,b))};k.ac=function(a,b){return this.nh(a,Io(this,b))};k.md=function(a,b){return this.Kd(a,Io(this,b))};function Xq(a){a=a?a:{};Go.call(this);this.defaultDataProjection=Ob("EPSG:4326");this.b=a.altitudeMode?a.altitudeMode:"none"}w(Xq,Vq);var Yq=/^B(\d{2})(\d{2})(\d{2})(\d{2})(\d{5})([NS])(\d{3})(\d{5})([EW])([AV])(\d{5})(\d{5})/,Zq=/^H.([A-Z]{3}).*?:(.*)/,$q=/^HFDTE(\d{2})(\d{2})(\d{2})/,ar=/\r\n|\r|\n/;k=Xq.prototype;
k.fe=function(a,b){var c=this.b,d=a.split(ar);a={};var e=[],f=2E3,g=0,h=1,l=-1,m;var n=0;for(m=d.length;n<m;++n){var p=d[n],q;if("B"==p.charAt(0)){if(q=Yq.exec(p)){p=parseInt(q[1],10);var r=parseInt(q[2],10),u=parseInt(q[3],10),v=parseInt(q[4],10)+parseInt(q[5],10)/6E4;"S"==q[6]&&(v=-v);var z=parseInt(q[7],10)+parseInt(q[8],10)/6E4;"W"==q[9]&&(z=-z);e.push(z,v);"none"!=c&&e.push("gps"==c?parseInt(q[11],10):"barometric"==c?parseInt(q[12],10):0);q=Date.UTC(f,g,h,p,r,u);q<l&&(q=Date.UTC(f,g,h+1,p,r,
u));e.push(q/1E3);l=q}}else"H"==p.charAt(0)&&((q=$q.exec(p))?(h=parseInt(q[1],10),g=parseInt(q[2],10)-1,f=2E3+parseInt(q[3],10)):(q=Zq.exec(p))&&(a[q[1]]=q[2].trim()))}if(0===e.length)return null;d=new I(null);d.ba("none"==c?"XYM":"XYZM",e);b=new Hk(Jo(d,!1,b));b.H(a);return b};k.Ng=function(a,b){return(a=this.fe(a,b))?[a]:[]};k.pe=function(){};k.nh=function(){};k.Kd=function(){};k.Gd=function(){};function br(a,b,c,d,e,f){Sc.call(this);this.j=null;this.M=a?a:new Image;null!==d&&(this.M.crossOrigin=d);this.c=f?document.createElement("CANVAS"):null;this.f=f;this.i=null;this.g=e;this.a=c;this.l=b;this.s=!1;2==this.g&&cr(this)}w(br,Sc);function cr(a){var b=hg(1,1);try{b.drawImage(a.M,0,0),b.getImageData(0,0,1,1)}catch(c){a.s=!0}}br.prototype.v=function(){this.g=3;this.i.forEach(Gc);this.i=null;this.b("change")};
br.prototype.o=function(){this.g=2;this.a&&(this.M.width=this.a[0],this.M.height=this.a[1]);this.a=[this.M.width,this.M.height];this.i.forEach(Gc);this.i=null;cr(this);if(!this.s&&null!==this.f){this.c.width=this.M.width;this.c.height=this.M.height;var a=this.c.getContext("2d");a.drawImage(this.M,0,0);for(var b=a.getImageData(0,0,this.M.width,this.M.height),c=b.data,d=this.f[0]/255,e=this.f[1]/255,f=this.f[2]/255,g=0,h=c.length;g<h;g+=4)c[g]*=d,c[g+1]*=e,c[g+2]*=f;a.putImageData(b,0,0)}this.b("change")};
br.prototype.Y=function(){return this.c?this.c:this.M};br.prototype.load=function(){if(0==this.g){this.g=1;this.i=[Lc(this.M,"error",this.v,this),Lc(this.M,"load",this.o,this)];try{this.M.src=this.l}catch(a){this.v()}}};function dr(a){a=a||{};this.l=void 0!==a.anchor?a.anchor:[.5,.5];this.o=null;this.g=void 0!==a.anchorOrigin?a.anchorOrigin:"top-left";this.C=void 0!==a.anchorXUnits?a.anchorXUnits:"fraction";this.B=void 0!==a.anchorYUnits?a.anchorYUnits:"fraction";this.qa=void 0!==a.crossOrigin?a.crossOrigin:null;var b=void 0!==a.img?a.img:null,c=void 0!==a.imgSize?a.imgSize:null,d=a.src;oa(!(void 0!==d&&b),4);oa(!b||b&&c,5);void 0!==d&&0!==d.length||!b||(d=b.src||x(b).toString());oa(void 0!==d&&0<d.length,6);var e=
void 0!==a.src?0:2;this.j=void 0!==a.color?vi(a.color):null;var f=this.qa,g=this.j,h=ej.get(d,f,g);h||(h=new br(b,d,c,f,e,g),ej.set(d,f,g,h));this.b=h;this.oa=void 0!==a.offset?a.offset:[0,0];this.c=void 0!==a.offsetOrigin?a.offsetOrigin:"top-left";this.N=null;this.D=void 0!==a.size?a.size:null;vk.call(this,{opacity:void 0!==a.opacity?a.opacity:1,rotation:void 0!==a.rotation?a.rotation:0,scale:void 0!==a.scale?a.scale:1,snapToPixel:void 0!==a.snapToPixel?a.snapToPixel:!0,rotateWithView:void 0!==a.rotateWithView?
a.rotateWithView:!1})}w(dr,vk);k=dr.prototype;k.clone=function(){return new dr({anchor:this.l.slice(),anchorOrigin:this.g,anchorXUnits:this.C,anchorYUnits:this.B,crossOrigin:this.qa,color:this.j&&this.j.slice?this.j.slice():this.j||void 0,src:this.b.l,offset:this.oa.slice(),offsetOrigin:this.c,size:null!==this.D?this.D.slice():void 0,opacity:this.i,scale:this.a,snapToPixel:this.v,rotation:this.f,rotateWithView:this.s})};
k.Vc=function(){if(this.o)return this.o;var a=this.l,b=this.oc();if("fraction"==this.C||"fraction"==this.B){if(!b)return null;a=this.l.slice();"fraction"==this.C&&(a[0]*=b[0]);"fraction"==this.B&&(a[1]*=b[1])}if("top-left"!=this.g){if(!b)return null;a===this.l&&(a=this.l.slice());if("top-right"==this.g||"bottom-right"==this.g)a[0]=-a[0]+b[0];if("bottom-left"==this.g||"bottom-right"==this.g)a[1]=-a[1]+b[1]}return this.o=a};k.np=function(){return this.j};k.Y=function(a){return this.b.Y(a)};k.He=function(){return this.b.a};
k.gf=function(){return this.b.g};k.Eg=function(){var a=this.b;if(!a.j)if(a.s){var b=a.a[0],c=a.a[1],d=hg(b,c);d.fillRect(0,0,b,c);a.j=d.canvas}else a.j=a.M;return a.j};k.bd=function(){if(this.N)return this.N;var a=this.oa;if("top-left"!=this.c){var b=this.oc(),c=this.b.a;if(!b||!c)return null;a=a.slice();if("top-right"==this.c||"bottom-right"==this.c)a[0]=c[0]-b[0]-a[0];if("bottom-left"==this.c||"bottom-right"==this.c)a[1]=c[1]-b[1]-a[1]}return this.N=a};k.op=function(){return this.b.l};
k.oc=function(){return this.D?this.D:this.b.a};k.gi=function(a,b){y(this.b,"change",a,b)};k.load=function(){this.b.load()};k.Yj=function(a,b){Mc(this.b,"change",a,b)};function er(a){a=a?a:{};Wo.call(this);fr||(gr=[255,255,255,1],hr=new zk({color:gr}),ir=[20,2],jr=kr="pixels",lr=[64,64],mr="https://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png",nr=.5,or=new dr({anchor:ir,anchorOrigin:"bottom-left",anchorXUnits:kr,anchorYUnits:jr,crossOrigin:"anonymous",rotation:0,scale:nr,size:lr,src:mr}),pr="NO_IMAGE",qr=new Ak({color:gr,width:1}),rr=new Ak({color:[51,51,51,1],width:2}),sr=new J({font:"bold 16px Helvetica",fill:hr,stroke:rr,scale:.8}),tr=new Bk({fill:hr,
image:or,text:sr,stroke:qr,zIndex:0}),fr=[tr]);this.defaultDataProjection=Ob("EPSG:4326");this.a=a.defaultStyle?a.defaultStyle:fr;this.c=void 0!==a.extractStyles?a.extractStyles:!0;this.j=void 0!==a.writeStyles?a.writeStyles:!0;this.b={};this.f=void 0!==a.showPointNames?a.showPointNames:!0}var fr,gr,hr,ir,kr,jr,lr,mr,nr,or,pr,qr,rr,sr,tr;w(er,Wo);
var ur=["http://www.google.com/kml/ext/2.2"],vr=[null,"http://earth.google.com/kml/2.0","http://earth.google.com/kml/2.1","http://earth.google.com/kml/2.2","http://www.opengis.net/kml/2.2"],wr={fraction:"fraction",pixels:"pixels",insetPixels:"pixels"};
function xr(a,b){var c=[0,0],d="start";if(a.Y()){var e=a.Y().He();null===e&&(e=lr);2==e.length&&(d=a.Y().a,c[0]=d*e[0]/2,c[1]=-d*e[1]/2,d="left")}null!==a.Ka()?(e=a.Ka(),a=e.clone(),a.Jj(e.a||sr.a),a.lj(e.b||sr.b),a.yf(e.Fa()||sr.Fa()),a.Af(e.Ga()||rr)):a=sr.clone();a.Hd(b);a.Nj(c[0]);a.Oj(c[1]);a.Qj(d);return new Bk({text:a})}
function yr(a,b,c,d,e){return function(){var f=e,g="";f&&this.U()&&(f="Point"===this.U().S());f&&(g=this.get("name"),f=f&&g);if(a)return f?(f=xr(a[0],g),a.concat(f)):a;if(b){var h=zr(b,c,d);return f?(f=xr(h[0],g),h.concat(f)):h}return f?(f=xr(c[0],g),c.concat(f)):c}}function zr(a,b,c){return Array.isArray(a)?a:"string"===typeof a?(!(a in c)&&"#"+a in c&&(a="#"+a),zr(c[a],b,c)):b}
function Ar(a){a=oo(a,!1);if(a=/^\s*#?\s*([0-9A-Fa-f]{8})\s*$/.exec(a))return a=a[1],[parseInt(a.substr(6,2),16),parseInt(a.substr(4,2),16),parseInt(a.substr(2,2),16),parseInt(a.substr(0,2),16)/255]}function Br(a){a=oo(a,!1);for(var b=[],c=/^\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?)\s*,\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?)(?:\s*,\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?))?\s*/i,d;d=c.exec(a);)b.push(parseFloat(d[1]),parseFloat(d[2]),d[3]?parseFloat(d[3]):0),a=a.substr(d[0].length);if(""===a)return b}
function Cr(a){var b=oo(a,!1).trim();a=a.baseURI;a&&"about:blank"!=a||(a=window.location.href);return a?(new URL(b,a)).href:b}function Dr(a){return dp(a)}function Er(a,b){return O(null,Fr,a,b)}function Gr(a,b){if(b=O({A:[],ak:[]},Hr,a,b)){a=b.A;b=b.ak;var c;var d=0;for(c=Math.min(a.length,b.length);d<c;++d)a[4*d+3]=b[d];b=new I(null);b.ba("XYZM",a);return b}}function Ir(a,b){var c=O({},Jr,a,b);if(a=O(null,Kr,a,b))return b=new I(null),b.ba("XYZ",a),b.H(c),b}
function Lr(a,b){var c=O({},Jr,a,b);if(a=O(null,Kr,a,b))return b=new D(null),b.ba("XYZ",a,[a.length]),b.H(c),b}
function Mr(a,b){a=O([],Nr,a,b);if(!a)return null;if(0===a.length)return new Mq(a);var c=!0,d=a[0].S(),e;var f=1;for(e=a.length;f<e;++f)if(b=a[f],b.S()!=d){c=!1;break}if(c)if("Point"==d){var g=a[0];c=g.ja;d=g.da();f=1;for(e=a.length;f<e;++f)b=a[f],gc(d,b.da());g=new No(null);g.ba(c,d);Or(g,a)}else"LineString"==d?(g=new P(null),Mo(g,a),Or(g,a)):"Polygon"==d?(g=new Q(null),Oo(g,a),Or(g,a)):"GeometryCollection"==d?g=new Mq(a):oa(!1,37);else g=new Mq(a);return g}
function Pr(a,b){var c=O({},Jr,a,b);if(a=O(null,Kr,a,b))return b=new C(null),b.ba("XYZ",a),b.H(c),b}function Qr(a,b){var c=O({},Jr,a,b);if((a=O([null],Rr,a,b))&&a[0]){b=new D(null);var d=a[0],e=[d.length],f;var g=1;for(f=a.length;g<f;++g)gc(d,a[g]),e.push(d.length);b.ba("XYZ",d,e);b.H(c);return b}}
function Sr(a,b){b=O({},Tr,a,b);if(!b)return null;a="fillStyle"in b?b.fillStyle:hr;var c=b.fill;void 0===c||c||(a=null);c="imageStyle"in b?b.imageStyle:or;c==pr&&(c=void 0);var d="textStyle"in b?b.textStyle:sr,e="strokeStyle"in b?b.strokeStyle:qr;b=b.outline;void 0===b||b||(e=null);return[new Bk({fill:a,image:c,stroke:e,text:d,zIndex:void 0})]}
function Or(a,b){var c=b.length,d=Array(b.length),e=Array(b.length),f=Array(b.length),g,h,l;var m=h=l=!1;for(g=0;g<c;++g){var n=b[g];d[g]=n.get("extrude");e[g]=n.get("tessellate");f[g]=n.get("altitudeMode");m=m||void 0!==d[g];h=h||void 0!==e[g];l=l||f[g]}m&&a.set("extrude",d);h&&a.set("tessellate",e);l&&a.set("altitudeMode",f)}function Ur(a,b){Co(Vr,a,b)}function Wr(a,b){Co(Xr,a,b)}
var Yr=N(vr,{displayName:L(R),value:L(R)}),Vr=N(vr,{Data:function(a,b){var c=a.getAttribute("name");Co(Yr,a,b);a=b[b.length-1];null!==c?a[c]=a.value:null!==a.displayName&&(a[a.displayName]=a.value);delete a.value},SchemaData:function(a,b){Co(Zr,a,b)}}),Xr=N(vr,{LatLonAltBox:function(a,b){if(a=O({},$r,a,b))b=b[b.length-1],b.extent=[parseFloat(a.west),parseFloat(a.south),parseFloat(a.east),parseFloat(a.north)],b.altitudeMode=a.altitudeMode,b.minAltitude=parseFloat(a.minAltitude),b.maxAltitude=parseFloat(a.maxAltitude)},
Lod:function(a,b){if(a=O({},as,a,b))b=b[b.length-1],b.minLodPixels=parseFloat(a.minLodPixels),b.maxLodPixels=parseFloat(a.maxLodPixels),b.minFadeExtent=parseFloat(a.minFadeExtent),b.maxFadeExtent=parseFloat(a.maxFadeExtent)}}),$r=N(vr,{altitudeMode:L(R),minAltitude:L(dp),maxAltitude:L(dp),north:L(dp),south:L(dp),east:L(dp),west:L(dp)}),as=N(vr,{minLodPixels:L(dp),maxLodPixels:L(dp),minFadeExtent:L(dp),maxFadeExtent:L(dp)}),Jr=N(vr,{extrude:L(ap),tessellate:L(ap),altitudeMode:L(R)}),Fr=N(vr,{coordinates:vo(Br)}),
Rr=N(vr,{innerBoundaryIs:function(a,b){(a=O(void 0,bs,a,b))&&b[b.length-1].push(a)},outerBoundaryIs:function(a,b){(a=O(void 0,cs,a,b))&&(b[b.length-1][0]=a)}}),Hr=N(vr,{when:function(a,b){b=b[b.length-1].ak;a=oo(a,!1);a=Date.parse(a);b.push(isNaN(a)?0:a)}},N(ur,{coord:function(a,b){b=b[b.length-1].A;a=oo(a,!1);(a=/^\s*([+\-]?\d+(?:\.\d*)?(?:e[+\-]?\d*)?)\s+([+\-]?\d+(?:\.\d*)?(?:e[+\-]?\d*)?)\s+([+\-]?\d+(?:\.\d*)?(?:e[+\-]?\d*)?)\s*$/i.exec(a))?b.push(parseFloat(a[1]),parseFloat(a[2]),parseFloat(a[3]),
0):b.push(0,0,0,0)}})),Kr=N(vr,{coordinates:vo(Br)}),ds=N(vr,{href:L(Cr)},N(ur,{x:L(dp),y:L(dp),w:L(dp),h:L(dp)})),es=N(vr,{Icon:L(function(a,b){return(a=O({},ds,a,b))?a:null}),heading:L(dp),hotSpot:L(function(a){var b=a.getAttribute("xunits"),c=a.getAttribute("yunits");var d="insetPixels"!==b?"insetPixels"!==c?"bottom-left":"top-left":"insetPixels"!==c?"bottom-right":"top-right";return{x:parseFloat(a.getAttribute("x")),oh:wr[b],y:parseFloat(a.getAttribute("y")),ph:wr[c],origin:d}}),scale:L(Dr)}),
bs=N(vr,{LinearRing:vo(Er)}),fs=N(vr,{color:L(Ar),scale:L(Dr)}),gs=N(vr,{color:L(Ar),width:L(dp)}),Nr=N(vr,{LineString:uo(Ir),LinearRing:uo(Lr),MultiGeometry:uo(Mr),Point:uo(Pr),Polygon:uo(Qr)}),hs=N(ur,{Track:uo(Gr)}),js=N(vr,{ExtendedData:Ur,Region:Wr,Link:function(a,b){Co(is,a,b)},address:L(R),description:L(R),name:L(R),open:L(ap),phoneNumber:L(R),visibility:L(ap)}),is=N(vr,{href:L(Cr)}),cs=N(vr,{LinearRing:vo(Er)}),ks=N(vr,{Style:L(Sr),key:L(R),styleUrl:L(Cr)}),ms=N(vr,{ExtendedData:Ur,Region:Wr,
MultiGeometry:L(Mr,"geometry"),LineString:L(Ir,"geometry"),LinearRing:L(Lr,"geometry"),Point:L(Pr,"geometry"),Polygon:L(Qr,"geometry"),Style:L(Sr),StyleMap:function(a,b){if(a=O(void 0,ls,a,b))b=b[b.length-1],Array.isArray(a)?b.Style=a:"string"===typeof a?b.styleUrl=a:oa(!1,38)},address:L(R),description:L(R),name:L(R),open:L(ap),phoneNumber:L(R),styleUrl:L(Cr),visibility:L(ap)},N(ur,{MultiTrack:L(function(a,b){if(a=O([],hs,a,b))return b=new P(null),Mo(b,a),b},"geometry"),Track:L(Gr,"geometry")})),
ns=N(vr,{color:L(Ar),fill:L(ap),outline:L(ap)}),Zr=N(vr,{SimpleData:function(a,b){var c=a.getAttribute("name");null!==c&&(a=R(a),b[b.length-1][c]=a)}}),Tr=N(vr,{IconStyle:function(a,b){if(a=O({},es,a,b)){b=b[b.length-1];var c="Icon"in a?a.Icon:{},d=!("Icon"in a)||0<Object.keys(c).length,e,f=c.href;f?e=f:d&&(e=mr);f="bottom-left";var g=a.hotSpot;if(g){var h=[g.x,g.y];var l=g.oh;var m=g.ph;f=g.origin}else e===mr?(h=ir,l=kr,m=jr):/^http:\/\/maps\.(?:google|gstatic)\.com\//.test(e)&&(h=[.5,0],m=l="fraction");
var n;g=c.x;var p=c.y;void 0!==g&&void 0!==p&&(n=[g,p]);var q;g=c.w;c=c.h;void 0!==g&&void 0!==c&&(q=[g,c]);var r;c=a.heading;void 0!==c&&(r=va(c));a=a.scale;d?(e==mr&&(q=lr,void 0===a&&(a=nr)),e=new dr({anchor:h,anchorOrigin:f,anchorXUnits:l,anchorYUnits:m,crossOrigin:"anonymous",offset:n,offsetOrigin:"bottom-left",rotation:r,scale:a,size:q,src:e}),b.imageStyle=e):b.imageStyle=pr}},LabelStyle:function(a,b){(a=O({},fs,a,b))&&(b[b.length-1].textStyle=new J({fill:new zk({color:"color"in a?a.color:gr}),
scale:a.scale}))},LineStyle:function(a,b){(a=O({},gs,a,b))&&(b[b.length-1].strokeStyle=new Ak({color:"color"in a?a.color:gr,width:"width"in a?a.width:1}))},PolyStyle:function(a,b){if(a=O({},ns,a,b)){b=b[b.length-1];b.fillStyle=new zk({color:"color"in a?a.color:gr});var c=a.fill;void 0!==c&&(b.fill=c);a=a.outline;void 0!==a&&(b.outline=a)}}}),ls=N(vr,{Pair:function(a,b){if(a=O({},ks,a,b)){var c=a.key;c&&"normal"==c&&((c=a.styleUrl)&&(b[b.length-1]=c),(a=a.Style)&&(b[b.length-1]=a))}}});k=er.prototype;
k.Jg=function(a,b){var c=N(vr,{Document:to(this.Jg,this),Folder:to(this.Jg,this),Placemark:uo(this.Rg,this),Style:this.kq.bind(this),StyleMap:this.jq.bind(this)});if(a=O([],c,a,b,this))return a};k.Rg=function(a,b){var c=O({geometry:null},ms,a,b);if(c){var d=new Hk;a=a.getAttribute("id");null!==a&&d.qc(a);b=b[0];(a=c.geometry)&&Jo(a,!1,b);d.Va(a);delete c.geometry;this.c&&d.sg(yr(c.Style,c.styleUrl,this.a,this.b,this.f));delete c.Style;d.H(c);return d}};
k.kq=function(a,b){var c=a.getAttribute("id");null!==c&&(b=Sr(a,b))&&(a=a.baseURI,a&&"about:blank"!=a||(a=window.location.href),c=a?(new URL("#"+c,a)).href:"#"+c,this.b[c]=b)};k.jq=function(a,b){var c=a.getAttribute("id");null!==c&&(b=O(void 0,ls,a,b))&&(a=a.baseURI,a&&"about:blank"!=a||(a=window.location.href),c=a?(new URL("#"+c,a)).href:"#"+c,this.b[c]=b)};k.Lg=function(a,b){return ec(vr,a.namespaceURI)?(a=this.Rg(a,[Ho(this,a,b)]))?a:null:null};
k.Kc=function(a,b){if(!ec(vr,a.namespaceURI))return[];var c=a.localName;if("Document"==c||"Folder"==c)return(c=this.Jg(a,[Ho(this,a,b)]))?c:[];if("Placemark"==c)return(b=this.Rg(a,[Ho(this,a,b)]))?[b]:[];if("kml"==c){c=[];for(a=a.firstElementChild;a;a=a.nextElementSibling){var d=this.Kc(a,b);d&&gc(c,d)}return c}return[]};k.cq=function(a){if(qo(a))return os(this,a);if(ro(a))return ps(this,a);if("string"===typeof a)return a=so(a),os(this,a)};
function os(a,b){for(b=b.firstChild;b;b=b.nextSibling)if(b.nodeType==Node.ELEMENT_NODE){var c=ps(a,b);if(c)return c}}function ps(a,b){var c;for(c=b.firstElementChild;c;c=c.nextElementSibling)if(ec(vr,c.namespaceURI)&&"name"==c.localName)return R(c);for(c=b.firstElementChild;c;c=c.nextElementSibling)if(b=c.localName,ec(vr,c.namespaceURI)&&("Document"==b||"Folder"==b||"Placemark"==b||"kml"==b)&&(b=ps(a,c)))return b}
k.eq=function(a){var b=[];qo(a)?gc(b,qs(this,a)):ro(a)?gc(b,rs(this,a)):"string"===typeof a&&(a=so(a),gc(b,qs(this,a)));return b};function qs(a,b){var c=[];for(b=b.firstChild;b;b=b.nextSibling)b.nodeType==Node.ELEMENT_NODE&&gc(c,rs(a,b));return c}
function rs(a,b){var c,d=[];for(c=b.firstElementChild;c;c=c.nextElementSibling)if(ec(vr,c.namespaceURI)&&"NetworkLink"==c.localName){var e=O({},js,c,[]);d.push(e)}for(c=b.firstElementChild;c;c=c.nextElementSibling)b=c.localName,!ec(vr,c.namespaceURI)||"Document"!=b&&"Folder"!=b&&"kml"!=b||gc(d,rs(a,c));return d}k.hq=function(a){var b=[];qo(a)?gc(b,ss(this,a)):ro(a)?gc(b,this.vf(a)):"string"===typeof a&&(a=so(a),gc(b,ss(this,a)));return b};
function ss(a,b){var c=[];for(b=b.firstChild;b;b=b.nextSibling)b.nodeType==Node.ELEMENT_NODE&&gc(c,a.vf(b));return c}k.vf=function(a){var b,c=[];for(b=a.firstElementChild;b;b=b.nextElementSibling)if(ec(vr,b.namespaceURI)&&"Region"==b.localName){var d=O({},Xr,b,[]);c.push(d)}for(b=a.firstElementChild;b;b=b.nextElementSibling)a=b.localName,!ec(vr,b.namespaceURI)||"Document"!=a&&"Folder"!=a&&"kml"!=a||gc(c,this.vf(b));return c};
function ts(a,b){b=vi(b);b=[255*(4==b.length?b[3]:1),b[2],b[1],b[0]];var c;for(c=0;4>c;++c){var d=parseInt(b[c],10).toString(16);b[c]=1==d.length?"0"+d:d}ip(a,b.join(""))}function us(a,b,c){a={node:a};var d=b.S();if("GeometryCollection"==d){var e=b.vd();var f=vs}else"MultiPoint"==d?(e=b.de(),f=ws):"MultiLineString"==d?(e=b.wd(),f=xs):"MultiPolygon"==d?(e=b.Vd(),f=ys):oa(!1,39);Do(a,zs,f,e,c)}function As(a,b,c){Do({node:a},Bs,Cs,[b],c)}
function Ds(a,b,c){var d={node:a};b.c&&a.setAttribute("id",b.c);a=b.L();var e={address:1,description:1,name:1,open:1,phoneNumber:1,styleUrl:1,visibility:1};e[b.a]=1;var f=Object.keys(a||{}).sort().filter(function(a){return!e[a]});if(0<f.length){var g=Bo(a,f);Do(d,Es,Fs,[{names:f,values:g}],c)}if(f=b.ib())if(f=f.call(b,0))f=Array.isArray(f)?f[0]:f,this.j&&(a.Style=f),(f=f.Ka())&&(a.name=f.Ka());f=Gs[c[c.length-1].node.namespaceURI];a=Bo(a,f);Do(d,Es,Ao,a,c,f);a=c[0];(b=b.U())&&(b=Jo(b,!0,a));Do(d,
Es,vs,[b],c)}function Hs(a,b,c){var d=b.da();a={node:a};a.layout=b.ja;a.stride=b.pa();b=b.L();b.coordinates=d;d=Is[c[c.length-1].node.namespaceURI];b=Bo(b,d);Do(a,Js,Ao,b,c,d)}function Ks(a,b,c){b=b.Ud();var d=b.shift();a={node:a};Do(a,Ls,Ms,b,c);Do(a,Ls,Ns,[d],c)}function Os(a,b){Ip(a,Math.round(1E6*b)/1E6)}
var Ps=N(vr,["Document","Placemark"]),Ss=N(vr,{Document:M(function(a,b,c){Do({node:a},Qs,Rs,b,c,void 0,this)}),Placemark:M(Ds)}),Qs=N(vr,{Placemark:M(Ds)}),Ts=N(vr,{Data:M(function(a,b,c){a.setAttribute("name",b.name);a={node:a};b=b.value;"object"==typeof b?(null!==b&&b.displayName&&Do(a,Ts,Ao,[b.displayName],c,["displayName"]),null!==b&&b.value&&Do(a,Ts,Ao,[b.value],c,["value"])):Do(a,Ts,Ao,[b],c,["value"])}),value:M(function(a,b){ip(a,b)}),displayName:M(function(a,b){a.appendChild(mo.createCDATASection(b))})}),
Us={Point:"Point",LineString:"LineString",LinearRing:"LinearRing",Polygon:"Polygon",MultiPoint:"MultiGeometry",MultiLineString:"MultiGeometry",MultiPolygon:"MultiGeometry",GeometryCollection:"MultiGeometry"},Vs=N(vr,["href"],N(ur,["x","y","w","h"])),Ws=N(vr,{href:M(ip)},N(ur,{x:M(Ip),y:M(Ip),w:M(Ip),h:M(Ip)})),Xs=N(vr,["scale","heading","Icon","hotSpot"]),Zs=N(vr,{Icon:M(function(a,b,c){a={node:a};var d=Vs[c[c.length-1].node.namespaceURI],e=Bo(b,d);Do(a,Ws,Ao,e,c,d);d=Vs[ur[0]];e=Bo(b,d);Do(a,Ws,
Ys,e,c,d)}),heading:M(Ip),hotSpot:M(function(a,b){a.setAttribute("x",b.x);a.setAttribute("y",b.y);a.setAttribute("xunits",b.oh);a.setAttribute("yunits",b.ph)}),scale:M(Os)}),$s=N(vr,["color","scale"]),at=N(vr,{color:M(ts),scale:M(Os)}),bt=N(vr,["color","width"]),ct=N(vr,{color:M(ts),width:M(Ip)}),Bs=N(vr,{LinearRing:M(Hs)}),zs=N(vr,{LineString:M(Hs),Point:M(Hs),Polygon:M(Ks),GeometryCollection:M(us)}),Gs=N(vr,"name open visibility address phoneNumber description styleUrl Style".split(" ")),Es=N(vr,
{ExtendedData:M(function(a,b,c){a={node:a};var d=b.names;b=b.values;for(var e=d.length,f=0;f<e;f++)Do(a,Ts,dt,[{name:d[f],value:b[f]}],c)}),MultiGeometry:M(us),LineString:M(Hs),LinearRing:M(Hs),Point:M(Hs),Polygon:M(Ks),Style:M(function(a,b,c){a={node:a};var d={},e=b.Fa(),f=b.Ga(),g=b.Y();b=b.Ka();g instanceof dr&&(d.IconStyle=g);b&&(d.LabelStyle=b);f&&(d.LineStyle=f);e&&(d.PolyStyle=e);b=et[c[c.length-1].node.namespaceURI];d=Bo(d,b);Do(a,ft,Ao,d,c,b)}),address:M(ip),description:M(ip),name:M(ip),
open:M(hp),phoneNumber:M(ip),styleUrl:M(ip),visibility:M(hp)}),Is=N(vr,["extrude","tessellate","altitudeMode","coordinates"]),Js=N(vr,{extrude:M(hp),tessellate:M(hp),altitudeMode:M(ip),coordinates:M(function(a,b,c){c=c[c.length-1];var d=c.layout;c=c.stride;var e;"XY"==d||"XYM"==d?e=2:"XYZ"==d||"XYZM"==d?e=3:oa(!1,34);var f,g=b.length,h="";if(0<g){h+=b[0];for(d=1;d<e;++d)h+=","+b[d];for(f=c;f<g;f+=c)for(h+=" "+b[f],d=1;d<e;++d)h+=","+b[f+d]}ip(a,h)})}),Ls=N(vr,{outerBoundaryIs:M(As),innerBoundaryIs:M(As)}),
gt=N(vr,{color:M(ts)}),et=N(vr,["IconStyle","LabelStyle","LineStyle","PolyStyle"]),ft=N(vr,{IconStyle:M(function(a,b,c){a={node:a};var d={},e=b.oc(),f=b.He(),g={href:b.b.l};if(e){g.w=e[0];g.h=e[1];var h=b.Vc(),l=b.bd();l&&f&&0!==l[0]&&l[1]!==e[1]&&(g.x=l[0],g.y=f[1]-(l[1]+e[1]));!h||h[0]===e[0]/2&&h[1]===e[1]/2||(d.hotSpot={x:h[0],oh:"pixels",y:e[1]-h[1],ph:"pixels"})}d.Icon=g;e=b.a;1!==e&&(d.scale=e);b=b.f;0!==b&&(d.heading=b);b=Xs[c[c.length-1].node.namespaceURI];d=Bo(d,b);Do(a,Zs,Ao,d,c,b)}),LabelStyle:M(function(a,
b,c){a={node:a};var d={},e=b.Fa();e&&(d.color=e.b);(b=b.b)&&1!==b&&(d.scale=b);b=$s[c[c.length-1].node.namespaceURI];d=Bo(d,b);Do(a,at,Ao,d,c,b)}),LineStyle:M(function(a,b,c){a={node:a};var d=bt[c[c.length-1].node.namespaceURI];b=Bo({color:b.a,width:b.c},d);Do(a,ct,Ao,b,c,d)}),PolyStyle:M(function(a,b,c){Do({node:a},gt,ht,[b.b],c)})});function Ys(a,b,c){return no(ur[0],"gx:"+c)}function Rs(a,b){return no(b[b.length-1].node.namespaceURI,"Placemark")}
function vs(a,b){if(a)return no(b[b.length-1].node.namespaceURI,Us[a.S()])}var ht=yo("color"),dt=yo("Data"),Fs=yo("ExtendedData"),Ms=yo("innerBoundaryIs"),ws=yo("Point"),xs=yo("LineString"),Cs=yo("LinearRing"),ys=yo("Polygon"),Ns=yo("outerBoundaryIs");
er.prototype.bc=function(a,b){b=Io(this,b);var c=no(vr[4],"kml");c.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:gx",ur[0]);c.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:xsi","http://www.w3.org/2001/XMLSchema-instance");c.setAttributeNS("http://www.w3.org/2001/XMLSchema-instance","xsi:schemaLocation","http://www.opengis.net/kml/2.2 https://developers.google.com/kml/schema/kml22gx.xsd");var d={node:c},e={};1<a.length?e.Document=a:1==a.length&&(e.Placemark=a[0]);a=Ps[c.namespaceURI];
e=Bo(e,a);Do(d,Ss,Ao,e,[b],a,this);return c};rj.Ld=function(){};
(function(a){function b(a){this.tc=ArrayBuffer.isView&&ArrayBuffer.isView(a)?a:new Uint8Array(a||0);this.type=this.ga=0;this.length=this.tc.length}function c(a,b,c){var e=c.tc;var f=e[c.ga++];var g=(f&112)>>4;if(128>f)return d(a,g,b);f=e[c.ga++];g|=(f&127)<<3;if(128>f)return d(a,g,b);f=e[c.ga++];g|=(f&127)<<10;if(128>f)return d(a,g,b);f=e[c.ga++];g|=(f&127)<<17;if(128>f)return d(a,g,b);f=e[c.ga++];g|=(f&127)<<24;if(128>f)return d(a,g,b);f=e[c.ga++];if(128>f)return d(a,g|(f&1)<<31,b);throw Error("Expected varint not more than 10 bytes");
}function d(a,b,c){return c?4294967296*b+(a>>>0):4294967296*(b>>>0)+(a>>>0)}var e={read:function(a,b,c,d,e){var f=8*e-d-1;var g=(1<<f)-1,h=g>>1,l=-7;e=c?e-1:0;var m=c?-1:1,v=a[b+e];e+=m;c=v&(1<<-l)-1;v>>=-l;for(l+=f;0<l;c=256*c+a[b+e],e+=m,l-=8);f=c&(1<<-l)-1;c>>=-l;for(l+=d;0<l;f=256*f+a[b+e],e+=m,l-=8);if(0===c)c=1-h;else{if(c===g)return f?NaN:Infinity*(v?-1:1);f+=Math.pow(2,d);c-=h}return(v?-1:1)*f*Math.pow(2,c-d)},write:function(a,b,c,d,e,n){var f,g=8*n-e-1,h=(1<<g)-1,l=h>>1,m=23===e?Math.pow(2,
-24)-Math.pow(2,-77):0;n=d?0:n-1;var z=d?1:-1,A=0>b||0===b&&0>1/b?1:0;b=Math.abs(b);isNaN(b)||Infinity===b?(b=isNaN(b)?1:0,d=h):(d=Math.floor(Math.log(b)/Math.LN2),1>b*(f=Math.pow(2,-d))&&(d--,f*=2),b=1<=d+l?b+m/f:b+m*Math.pow(2,1-l),2<=b*f&&(d++,f/=2),d+l>=h?(b=0,d=h):1<=d+l?(b=(b*f-1)*Math.pow(2,e),d+=l):(b=b*Math.pow(2,l-1)*Math.pow(2,e),d=0));for(;8<=e;a[c+n]=b&255,n+=z,b/=256,e-=8);d=d<<e|b;for(g+=e;0<g;a[c+n]=d&255,n+=z,d/=256,g-=8);a[c+n-z]|=128*A}};b.c=0;b.g=1;b.b=2;b.a=5;b.prototype={Og:function(a,
b,c){for(c=c||this.length;this.ga<c;){var d=this.Ua(),e=d>>3,f=this.ga;this.type=d&7;a(e,b,this);this.ga===f&&this.Lq(d)}return b},Zp:function(){var a=e.read(this.tc,this.ga,!0,23,4);this.ga+=4;return a},Vp:function(){var a=e.read(this.tc,this.ga,!0,52,8);this.ga+=8;return a},Ua:function(a){var b=this.tc;var d=b[this.ga++];var e=d&127;if(128>d)return e;d=b[this.ga++];e|=(d&127)<<7;if(128>d)return e;d=b[this.ga++];e|=(d&127)<<14;if(128>d)return e;d=b[this.ga++];e|=(d&127)<<21;if(128>d)return e;d=b[this.ga];
return c(e|(d&15)<<28,a,this)},lq:function(){return this.Ua(!0)},Ug:function(){var a=this.Ua();return 1===a%2?(a+1)/-2:a/2},Tp:function(){return!!this.Ua()},Vg:function(){for(var a=this.Ua()+this.ga,b=this.tc,c="",d=this.ga;d<a;){var e=b[d],n=null,p=239<e?4:223<e?3:191<e?2:1;if(d+p>a)break;if(1===p)128>e&&(n=e);else if(2===p){var q=b[d+1];128===(q&192)&&(n=(e&31)<<6|q&63,127>=n&&(n=null))}else if(3===p){q=b[d+1];var r=b[d+2];128===(q&192)&&128===(r&192)&&(n=(e&15)<<12|(q&63)<<6|r&63,2047>=n||55296<=
n&&57343>=n)&&(n=null)}else if(4===p){q=b[d+1];r=b[d+2];var u=b[d+3];128===(q&192)&&128===(r&192)&&128===(u&192)&&(n=(e&15)<<18|(q&63)<<12|(r&63)<<6|u&63,65535>=n||1114112<=n)&&(n=null)}null===n?(n=65533,p=1):65535<n&&(n-=65536,c+=String.fromCharCode(n>>>10&1023|55296),n=56320|n&1023);c+=String.fromCharCode(n);d+=p}this.ga=a;return c},Lq:function(a){a&=7;if(a===b.c)for(;127<this.tc[this.ga++];);else if(a===b.b)this.ga=this.Ua()+this.ga;else if(a===b.a)this.ga+=4;else if(a===b.g)this.ga+=8;else throw Error("Unimplemented type: "+
a);}};a["default"]=b})(rj.Ld=rj.Ld||{});rj.Ld=rj.Ld.default;function it(a,b,c,d,e){this.l=e;this.f=a;this.b=b;this.a=this.c=null;this.g=c;this.j=d;this.s=We()}k=it.prototype;k.get=function(a){return this.j[a]};k.pb=it.prototype.td=function(){return this.g};k.G=function(){this.i||(this.i="Point"===this.f?Pa(this.b):Qa(this.b,0,this.b.length,2));return this.i};k.Td=function(){if(!this.c){var a=eb(this.G());this.c=If(this.b,0,this.g,2,a,0)}return this.c};k.Fe=function(){this.a||(this.a=Kk(this.b,0,this.b.length,2,.5));return this.a};
k.Ge=function(){if(!this.a){this.a=[];for(var a=this.b,b=0,c=this.g,d=0,e=c.length;d<e;++d){var f=c[d];b=Kk(a,b,f,2,.5);gc(this.a,b);b=f}}return this.a};k.Ao=function(){return this.l};k.Xb=function(){return this.b};k.da=it.prototype.Xb;k.U=function(){return this};k.Bo=function(){return this.j};k.Wd=it.prototype.U;k.pa=function(){return 2};k.ib=ea;k.S=function(){return this.f};k.mb=function(a){var b=a.G();a=a.oe;b=db(a)/db(b);var c=this.s;ef(c,a[0],a[3],b,-b,0,0,0);Te(this.b,0,this.b.length,2,c,this.b)};function jt(a){Go.call(this);a=a?a:{};this.defaultDataProjection=new wb({code:"EPSG:3857",units:"tile-pixels"});this.b=a.featureClass?a.featureClass:it;this.g=a.geometryName;this.f=a.layerName?a.layerName:"layer";this.c=a.layers?a.layers:null;this.a=null}w(jt,Go);function kt(a,b,c){if(3===a){a={keys:[],values:[],features:[]};var d=c.Ua()+c.ga;c.Og(lt,a,d);a.length=a.features.length;a.length&&(b[a.name]=a)}}
function lt(a,b,c){if(15===a)b.version=c.Ua();else if(1===a)b.name=c.Vg();else if(5===a)b.extent=c.Ua();else if(2===a)b.features.push(c.ga);else if(3===a)b.keys.push(c.Vg());else if(4===a){a=null;for(var d=c.Ua()+c.ga;c.ga<d;)a=c.Ua()>>3,a=1===a?c.Vg():2===a?c.Zp():3===a?c.Vp():4===a?c.lq():5===a?c.Ua():6===a?c.Ug():7===a?c.Tp():null;b.values.push(a)}}
function mt(a,b,c){if(1==a)b.id=c.Ua();else if(2==a)for(a=c.Ua()+c.ga;c.ga<a;){var d=b.layer.keys[c.Ua()],e=b.layer.values[c.Ua()];b.properties[d]=e}else 3==a?b.type=c.Ua():4==a&&(b.geometry=c.ga)}
function nt(a,b,c){var d=c.type;if(0===d)return null;var e=c.id,f=c.properties;f[a.f]=c.layer.name;var g=[];var h=[],l=h;b.ga=c.geometry;c=b.Ua()+b.ga;for(var m=1,n=0,p=0,q=0,r=0,u=0;b.ga<c;)n||(n=b.Ua(),m=n&7,n>>=3),n--,1===m||2===m?(p+=b.Ug(),q+=b.Ug(),1===m&&r>u&&(l.push(r),u=r),g.push(p,q),r+=2):7===m?r>u&&(g.push(g[u],g[u+1]),r+=2):oa(!1,59);r>u&&l.push(r);b=h.length;var v;1===d?v=1===b?"Point":"MultiPoint":2===d?v=1===b?"LineString":"MultiLineString":3===d&&(v="Polygon");d=v;if(a.b===it)g=new a.b(d,
g,h,f,e);else{if("Polygon"==d){d=[];l=b=v=0;for(c=h.length;l<c;++l)m=h[l],Mf(g,v,m,2)||(d.push(h.slice(b,l)),b=l),v=m;1<d.length?(h=d,d=new Q(null)):d=new D(null)}else d="Point"===d?new C(null):"LineString"===d?new I(null):"Polygon"===d?new D(null):"MultiPoint"===d?new No(null):"MultiLineString"===d?new P(null):null;d.ba("XY",g,h);g=new a.b;a.g&&g.Lc(a.g);a=Jo(d,!1,Io(a,void 0));g.Va(a);g.qc(e);g.H(f)}return g}k=jt.prototype;k.cg=function(){return this.a};k.S=function(){return"arraybuffer"};
k.Qa=function(a){var b=this.c;a=new rj.Ld(a);var c=a.Og(kt,{}),d=[],e;for(e in c)if(!b||-1!=b.indexOf(e)){var f=c[e];for(var g,h=0,l=f.length;h<l;++h){g=a;var m=f;g.ga=m.features[h];var n=g.Ua()+g.ga;m={layer:m,type:0,properties:{}};g.Og(mt,m,n);g=m;d.push(nt(this,a,g))}this.a=f?[0,0,f.extent,f.extent]:null}return d};k.sb=function(){return this.defaultDataProjection};k.Sn=function(a){this.c=a};k.Yb=function(){};k.ed=function(){};k.Jd=function(){};k.md=function(){};k.ac=function(){};function ot(){Wo.call(this);this.defaultDataProjection=Ob("EPSG:4326")}w(ot,Wo);function pt(a,b){b[b.length-1].le[a.getAttribute("k")]=a.getAttribute("v")}
var qt=[null],rt=N(qt,{nd:function(a,b){b[b.length-1].zd.push(a.getAttribute("ref"))},tag:pt}),tt=N(qt,{node:function(a,b){var c=b[0],d=b[b.length-1],e=a.getAttribute("id"),f=[parseFloat(a.getAttribute("lon")),parseFloat(a.getAttribute("lat"))];d.ki[e]=f;a=O({le:{}},st,a,b);nb(a.le)||(f=new C(f),Jo(f,!1,c),c=new Hk(f),c.qc(e),c.H(a.le),d.features.push(c))},way:function(a,b){var c=a.getAttribute("id");a=O({id:c,zd:[],le:{}},rt,a,b);b[b.length-1].lh.push(a)}}),st=N(qt,{tag:pt});
ot.prototype.Kc=function(a,b){b=Ho(this,a,b);if("osm"==a.localName){a=O({ki:{},lh:[],features:[]},tt,a,[b]);for(var c=0;c<a.lh.length;c++){for(var d=a.lh[c],e=[],f=0,g=d.zd.length;f<g;f++)gc(e,a.ki[d.zd[f]]);d.zd[0]==d.zd[d.zd.length-1]?(f=new D(null),f.ba("XY",e,[e.length])):(f=new I(null),f.ba("XY",e));Jo(f,!1,b);e=new Hk(f);e.qc(d.id);e.H(d.le);a.features.push(e)}if(a.features)return a.features}return[]};ot.prototype.mh=function(){};ot.prototype.bc=function(){};ot.prototype.re=function(){};function ut(a,b,c,d){var e;void 0!==d?e=d:e=[];for(var f=d=0;f<b;){var g=a[f++];e[d++]=a[f++];e[d++]=g;for(g=2;g<c;++g)e[d++]=a[f++]}e.length=d};function vt(a){a=a?a:{};Go.call(this);this.defaultDataProjection=Ob("EPSG:4326");this.b=a.factor?a.factor:1E5;this.a=a.geometryLayout?a.geometryLayout:"XY"}w(vt,Vq);function wt(a,b,c){var d,e=Array(b);for(d=0;d<b;++d)e[d]=0;var f;var g=0;for(f=a.length;g<f;)for(d=0;d<b;++d,++g){var h=a[g],l=h-e[d];e[d]=h;a[g]=l}return xt(a,c?c:1E5)}function yt(a,b,c){var d,e=Array(b);for(d=0;d<b;++d)e[d]=0;a=zt(a,c?c:1E5);var f;c=0;for(f=a.length;c<f;)for(d=0;d<b;++d,++c)e[d]+=a[c],a[c]=e[d];return a}
function xt(a,b){b=b?b:1E5;var c;var d=0;for(c=a.length;d<c;++d)a[d]=Math.round(a[d]*b);b=0;for(d=a.length;b<d;++b)c=a[b],a[b]=0>c?~(c<<1):c<<1;b="";d=0;for(c=a.length;d<c;++d){for(var e,f=a[d],g="";32<=f;)e=(32|f&31)+63,g+=String.fromCharCode(e),f>>=5;g+=String.fromCharCode(f+63);b+=g}return b}
function zt(a,b){b=b?b:1E5;var c=[],d=0,e=0,f;var g=0;for(f=a.length;g<f;++g){var h=a.charCodeAt(g)-63;d|=(h&31)<<e;32>h?(c.push(d),e=d=0):e+=5}a=0;for(d=c.length;a<d;++a)e=c[a],c[a]=e&1?~(e>>1):e>>1;a=0;for(d=c.length;a<d;++a)c[a]/=b;return c}k=vt.prototype;k.fe=function(a,b){a=this.Gd(a,b);return new Hk(a)};k.Ng=function(a,b){return[this.fe(a,b)]};k.Gd=function(a,b){var c=jf(this.a);a=yt(a,c,this.b);ut(a,a.length,c,a);c=yf(a,0,a.length,c);return Jo(new I(c,this.a),!1,Io(this,b))};
k.pe=function(a,b){if(a=a.U())return this.Kd(a,b);oa(!1,40);return""};k.nh=function(a,b){return this.pe(a[0],b)};k.Kd=function(a,b){a=Jo(a,!0,Io(this,b));b=a.da();a=a.pa();ut(b,b.length,a,b);return wt(b,a,this.b)};function At(a){a=a?a:{};Go.call(this);this.a=a.layerName;this.b=a.layers?a.layers:null;this.defaultDataProjection=Ob(a.defaultDataProjection?a.defaultDataProjection:"EPSG:4326")}w(At,Ko);function Bt(a,b){var c=[],d,e;var f=0;for(e=a.length;f<e;++f){var g=a[f];0<f&&c.pop();0<=g?d=b[g]:d=b[~g].slice().reverse();c.push.apply(c,d)}a=0;for(b=c.length;a<b;++a)c[a]=c[a].slice();return c}
function Ct(a,b,c,d,e,f,g){a=a.geometries;var h=[],l;var m=0;for(l=a.length;m<l;++m)h[m]=Dt(a[m],b,c,d,e,f,g);return h}function Dt(a,b,c,d,e,f,g){var h=a.type,l=Et[h];c="Point"===h||"MultiPoint"===h?l(a,c,d):l(a,b);b=new Hk;b.Va(Jo(c,!1,g));void 0!==a.id&&b.qc(a.id);a=a.properties;e&&(a||(a={}),a[e]=f);a&&b.H(a);return b}
At.prototype.Mg=function(a,b){if("Topology"==a.type){var c=null,d=null;if(a.transform){var e=a.transform;c=e.scale;d=e.translate}var f=a.arcs;if(e){e=c;var g=d,h;var l=0;for(h=f.length;l<h;++l){var m,n=f[l],p=e,q=g,r=0,u=0;var v=0;for(m=n.length;v<m;++v){var z=n[v];r+=z[0];u+=z[1];z[0]=r;z[1]=u;Ft(z,p,q)}}}e=[];a=a.objects;g=this.a;for(var A in a)this.b&&-1==this.b.indexOf(A)||("GeometryCollection"===a[A].type?(l=a[A],e.push.apply(e,Ct(l,f,c,d,g,A,b))):(l=a[A],e.push(Dt(l,f,c,d,g,A,b))));return e}return[]};
function Ft(a,b,c){a[0]=a[0]*b[0]+c[0];a[1]=a[1]*b[1]+c[1]}At.prototype.Tg=function(){return this.defaultDataProjection};
var Et={Point:function(a,b,c){a=a.coordinates;b&&c&&Ft(a,b,c);return new C(a)},LineString:function(a,b){a=Bt(a.arcs,b);return new I(a)},Polygon:function(a,b){var c=[],d;var e=0;for(d=a.arcs.length;e<d;++e)c[e]=Bt(a.arcs[e],b);return new D(c)},MultiPoint:function(a,b,c){a=a.coordinates;var d;if(b&&c){var e=0;for(d=a.length;e<d;++e)Ft(a[e],b,c)}return new No(a)},MultiLineString:function(a,b){var c=[],d;var e=0;for(d=a.arcs.length;e<d;++e)c[e]=Bt(a.arcs[e],b);return new P(c)},MultiPolygon:function(a,
b){var c=[],d,e;var f=0;for(e=a.arcs.length;f<e;++f){var g=a.arcs[f];var h=[];var l=0;for(d=g.length;l<d;++l)h[l]=Bt(g[l],b);c[f]=h}return new Q(c)}};k=At.prototype;k.ld=function(){};k.qe=function(){};k.se=function(){};k.Qg=function(){};k.dd=function(){};function Gt(a){this.rc=a};function Ht(a,b){this.rc=a;this.b=Array.prototype.slice.call(arguments,1);oa(2<=this.b.length,57)}w(Ht,Gt);function It(a){var b=["And"].concat(Array.prototype.slice.call(arguments));Ht.apply(this,b)}w(It,Ht);function Jt(a,b,c){this.rc="BBOX";this.geometryName=a;this.extent=b;this.srsName=c}w(Jt,Gt);function Kt(a,b,c,d){this.rc=a;this.geometryName=b||"the_geom";this.geometry=c;this.srsName=d}w(Kt,Gt);function Lt(a,b,c){Kt.call(this,"Contains",a,b,c)}w(Lt,Kt);function Mt(a,b){this.rc=a;this.b=b}w(Mt,Gt);function Nt(a,b,c){Mt.call(this,"During",a);this.a=b;this.g=c}w(Nt,Mt);function Ot(a,b,c,d){Mt.call(this,a,b);this.g=c;this.a=d}w(Ot,Mt);function Pt(a,b,c){Ot.call(this,"PropertyIsEqualTo",a,b,c)}w(Pt,Ot);function Qt(a,b){Ot.call(this,"PropertyIsGreaterThan",a,b)}w(Qt,Ot);function Rt(a,b){Ot.call(this,"PropertyIsGreaterThanOrEqualTo",a,b)}w(Rt,Ot);function St(a,b,c){Kt.call(this,"Intersects",a,b,c)}w(St,Kt);function Tt(a,b,c){Mt.call(this,"PropertyIsBetween",a);this.a=b;this.g=c}w(Tt,Mt);function Ut(a,b,c,d,e,f){Mt.call(this,"PropertyIsLike",a);this.c=b;this.f=void 0!==c?c:"*";this.i=void 0!==d?d:".";this.g=void 0!==e?e:"!";this.a=f}w(Ut,Mt);function Vt(a){Mt.call(this,"PropertyIsNull",a)}w(Vt,Mt);function Wt(a,b){Ot.call(this,"PropertyIsLessThan",a,b)}w(Wt,Ot);function Xt(a,b){Ot.call(this,"PropertyIsLessThanOrEqualTo",a,b)}w(Xt,Ot);function Yt(a){this.rc="Not";this.condition=a}w(Yt,Gt);function Zt(a,b,c){Ot.call(this,"PropertyIsNotEqualTo",a,b,c)}w(Zt,Ot);function $t(a){var b=["Or"].concat(Array.prototype.slice.call(arguments));Ht.apply(this,b)}w($t,Ht);function au(a,b,c){Kt.call(this,"Within",a,b,c)}w(au,Kt);function bu(a){var b=[null].concat(Array.prototype.slice.call(arguments));return new (Function.prototype.bind.apply(It,b))}function cu(a,b,c){return new Jt(a,b,c)};function du(a){a=a?a:{};this.c=a.featureType;this.a=a.featureNS;this.b=a.gmlFormat?a.gmlFormat:new Kp;this.l=a.schemaLocation?a.schemaLocation:eu["1.1.0"];Wo.call(this)}w(du,Wo);var eu={"1.1.0":"http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd","1.0.0":"http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/wfs.xsd"};
du.prototype.Kc=function(a,b){var c={featureType:this.c,featureNS:this.a};kb(c,Ho(this,a,b?b:{}));b=[c];this.b.b["http://www.opengis.net/gml"].featureMember=uo(Zo.prototype.ge);(a=O([],this.b.b,a,b,this.b))||(a=[]);return a};du.prototype.j=function(a){if(qo(a))return fu(a);if(ro(a))return O({},gu,a,[]);if("string"===typeof a)return a=so(a),fu(a)};du.prototype.f=function(a){if(qo(a))return hu(this,a);if(ro(a))return iu(this,a);if("string"===typeof a)return a=so(a),hu(this,a)};
function hu(a,b){for(b=b.firstChild;b;b=b.nextSibling)if(b.nodeType==Node.ELEMENT_NODE)return iu(a,b)}var ju={"http://www.opengis.net/gml":{boundedBy:L(Zo.prototype.rf,"bounds")}};function iu(a,b){var c={},d=gp(b.getAttribute("numberOfFeatures"));c.numberOfFeatures=d;return O(c,ju,b,[],a.b)}
var ku={"http://www.opengis.net/wfs":{totalInserted:L(fp),totalUpdated:L(fp),totalDeleted:L(fp)}},lu={"http://www.opengis.net/ogc":{FeatureId:uo(function(a){return a.getAttribute("fid")})}},mu={"http://www.opengis.net/wfs":{Feature:function(a,b){Co(lu,a,b)}}},gu={"http://www.opengis.net/wfs":{TransactionSummary:L(function(a,b){return O({},ku,a,b)},"transactionSummary"),InsertResults:L(function(a,b){return O([],mu,a,b)},"insertIds")}};
function fu(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType==Node.ELEMENT_NODE)return O({},gu,a,[])}var nu={"http://www.opengis.net/wfs":{PropertyName:M(ip)}};function ou(a,b){var c=no("http://www.opengis.net/ogc","Filter"),d=no("http://www.opengis.net/ogc","FeatureId");c.appendChild(d);d.setAttribute("fid",b);a.appendChild(c)}function pu(a,b){a=(a?a:"feature")+":";return 0===b.indexOf(a)?b:a+b}
var qu={"http://www.opengis.net/wfs":{Insert:M(function(a,b,c){var d=c[c.length-1],e=d.gmlVersion;d=no(d.featureNS,d.featureType);a.appendChild(d);if(2===e){a=Tp.prototype;(e=b.c)&&d.setAttribute("fid",e);e=c[c.length-1];var f=e.featureNS,g=b.a;e.tb||(e.tb={},e.tb[f]={});var h=b.L();b=[];var l=[];for(n in h){var m=h[n];null!==m&&(b.push(n),l.push(m),n==g||m instanceof gf?n in e.tb[f]||(e.tb[f][n]=M(a.ui,a)):n in e.tb[f]||(e.tb[f][n]=M(ip)))}var n=kb({},e);n.node=d;Do(n,e.tb,yo(void 0,f),l,c,b)}else Kp.prototype.Ci(d,
b,c)}),Update:M(function(a,b,c){var d=c[c.length-1];oa(void 0!==b.c,27);var e=d.featurePrefix,f=d.featureNS,g=b.a;a.setAttribute("typeName",pu(e,d.featureType));a.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:"+e,f);e=b.c;if(void 0!==e){f=b.P();for(var h=[],l=0,m=f.length;l<m;l++){var n=b.get(f[l]);if(void 0!==n){var p=f[l];n instanceof gf&&(p=g);h.push({name:p,value:n})}}Do({gmlVersion:d.gmlVersion,node:a,hasZ:d.hasZ,srsName:d.srsName},qu,yo("Property"),h,c);ou(a,e)}}),Delete:M(function(a,
b,c){c=c[c.length-1];oa(void 0!==b.c,26);var d=c.featurePrefix,e=c.featureNS;a.setAttribute("typeName",pu(d,c.featureType));a.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:"+d,e);b=b.c;void 0!==b&&ou(a,b)}),Property:M(function(a,b,c){var d=no("http://www.opengis.net/wfs","Name"),e=c[c.length-1].gmlVersion;a.appendChild(d);ip(d,b.name);void 0!==b.value&&null!==b.value&&(d=no("http://www.opengis.net/wfs","Value"),a.appendChild(d),b.value instanceof gf?2===e?Tp.prototype.ui(d,b.value,c):Kp.prototype.Yc(d,
b.value,c):ip(d,b.value))}),Native:M(function(a,b){b.Uq&&a.setAttribute("vendorId",b.Uq);void 0!==b.qq&&a.setAttribute("safeToIgnore",b.qq);void 0!==b.value&&ip(a,b.value)})}};function ru(a,b,c){a={node:a};b=b.b;for(var d=0,e=b.length;d<e;++d){var f=b[d];Do(a,su,yo(f.rc),[f],c)}}function tu(a,b){void 0!==b.a&&a.setAttribute("matchCase",b.a.toString());uu(a,b.b);vu(a,""+b.g)}function wu(a,b,c){a=no("http://www.opengis.net/ogc",a);ip(a,c);b.appendChild(a)}function uu(a,b){wu("PropertyName",a,b)}
function vu(a,b){wu("Literal",a,b)}function xu(a,b){var c=no("http://www.opengis.net/gml","TimeInstant");a.appendChild(c);a=no("http://www.opengis.net/gml","timePosition");c.appendChild(a);ip(a,b)}
var su={"http://www.opengis.net/wfs":{Query:M(function(a,b,c){var d=c[c.length-1],e=d.featurePrefix,f=d.featureNS,g=d.propertyNames,h=d.srsName;a.setAttribute("typeName",e?pu(e,b):b);h&&a.setAttribute("srsName",h);f&&a.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:"+e,f);b=kb({},d);b.node=a;Do(b,nu,yo("PropertyName"),g,c);if(d=d.filter)g=no("http://www.opengis.net/ogc","Filter"),a.appendChild(g),Do({node:g},su,yo(d.rc),[d],c)})},"http://www.opengis.net/ogc":{During:M(function(a,b){var c=no("http://www.opengis.net/fes",
"ValueReference");ip(c,b.b);a.appendChild(c);c=no("http://www.opengis.net/gml","TimePeriod");a.appendChild(c);a=no("http://www.opengis.net/gml","begin");c.appendChild(a);xu(a,b.a);a=no("http://www.opengis.net/gml","end");c.appendChild(a);xu(a,b.g)}),And:M(ru),Or:M(ru),Not:M(function(a,b,c){b=b.condition;Do({node:a},su,yo(b.rc),[b],c)}),BBOX:M(function(a,b,c){c[c.length-1].srsName=b.srsName;uu(a,b.geometryName);Kp.prototype.Yc(a,b.extent,c)}),Contains:M(function(a,b,c){c[c.length-1].srsName=b.srsName;
uu(a,b.geometryName);Kp.prototype.Yc(a,b.geometry,c)}),Intersects:M(function(a,b,c){c[c.length-1].srsName=b.srsName;uu(a,b.geometryName);Kp.prototype.Yc(a,b.geometry,c)}),Within:M(function(a,b,c){c[c.length-1].srsName=b.srsName;uu(a,b.geometryName);Kp.prototype.Yc(a,b.geometry,c)}),PropertyIsEqualTo:M(tu),PropertyIsNotEqualTo:M(tu),PropertyIsLessThan:M(tu),PropertyIsLessThanOrEqualTo:M(tu),PropertyIsGreaterThan:M(tu),PropertyIsGreaterThanOrEqualTo:M(tu),PropertyIsNull:M(function(a,b){uu(a,b.b)}),
PropertyIsBetween:M(function(a,b){uu(a,b.b);var c=no("http://www.opengis.net/ogc","LowerBoundary");a.appendChild(c);vu(c,""+b.a);c=no("http://www.opengis.net/ogc","UpperBoundary");a.appendChild(c);vu(c,""+b.g)}),PropertyIsLike:M(function(a,b){a.setAttribute("wildCard",b.f);a.setAttribute("singleChar",b.i);a.setAttribute("escapeChar",b.g);void 0!==b.a&&a.setAttribute("matchCase",b.a.toString());uu(a,b.b);vu(a,""+b.c)})}};
du.prototype.s=function(a){var b=no("http://www.opengis.net/wfs","GetFeature");b.setAttribute("service","WFS");b.setAttribute("version","1.1.0");if(a){a.handle&&b.setAttribute("handle",a.handle);a.outputFormat&&b.setAttribute("outputFormat",a.outputFormat);void 0!==a.maxFeatures&&b.setAttribute("maxFeatures",a.maxFeatures);a.resultType&&b.setAttribute("resultType",a.resultType);void 0!==a.startIndex&&b.setAttribute("startIndex",a.startIndex);void 0!==a.count&&b.setAttribute("count",a.count);var c=
a.filter;if(a.bbox){oa(a.geometryName,12);var d=cu(a.geometryName,a.bbox,a.srsName);c?c=bu(c,d):c=d}}b.setAttributeNS("http://www.w3.org/2001/XMLSchema-instance","xsi:schemaLocation",this.l);c={node:b,srsName:a.srsName,featureNS:a.featureNS?a.featureNS:this.a,featurePrefix:a.featurePrefix,geometryName:a.geometryName,filter:c,propertyNames:a.propertyNames?a.propertyNames:[]};oa(Array.isArray(a.featureTypes),11);a=a.featureTypes;c=[c];d=kb({},c[c.length-1]);d.node=b;Do(d,su,yo("Query"),a,c);return b};
du.prototype.v=function(a,b,c,d){var e=[],f=no("http://www.opengis.net/wfs","Transaction"),g=d.version?d.version:"1.1.0",h="1.0.0"===g?2:3;f.setAttribute("service","WFS");f.setAttribute("version",g);if(d){var l=d.gmlOptions?d.gmlOptions:{};d.handle&&f.setAttribute("handle",d.handle)}f.setAttributeNS("http://www.w3.org/2001/XMLSchema-instance","xsi:schemaLocation",eu[g]);var m=d.featurePrefix?d.featurePrefix:"feature";a&&(g={node:f,featureNS:d.featureNS,featureType:d.featureType,featurePrefix:m,gmlVersion:h,
hasZ:d.hasZ,srsName:d.srsName},kb(g,l),Do(g,qu,yo("Insert"),a,e));b&&(g={node:f,featureNS:d.featureNS,featureType:d.featureType,featurePrefix:m,gmlVersion:h,hasZ:d.hasZ,srsName:d.srsName},kb(g,l),Do(g,qu,yo("Update"),b,e));c&&Do({node:f,featureNS:d.featureNS,featureType:d.featureType,featurePrefix:m,gmlVersion:h,srsName:d.srsName},qu,yo("Delete"),c,e);d.nativeElements&&Do({node:f,featureNS:d.featureNS,featureType:d.featureType,featurePrefix:m,gmlVersion:h,srsName:d.srsName},qu,yo("Native"),d.nativeElements,
e);return f};du.prototype.Sg=function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType==Node.ELEMENT_NODE)return this.uf(a);return null};du.prototype.uf=function(a){if(a.firstElementChild&&a.firstElementChild.firstElementChild)for(a=a.firstElementChild.firstElementChild,a=a.firstElementChild;a;a=a.nextElementSibling)if(0!==a.childNodes.length&&(1!==a.childNodes.length||3!==a.firstChild.nodeType)){var b=[{}];this.b.rf(a,b);return Ob(b.pop().srsName)}return null};function Ku(a){a=a?a:{};Go.call(this);this.b=void 0!==a.splitCollection?a.splitCollection:!1}w(Ku,Vq);function Lu(a){a=a.W();return 0===a.length?"":a.join(" ")}function Mu(a){a=a.W();for(var b=[],c=0,d=a.length;c<d;++c)b.push(a[c].join(" "));return b.join(",")}function Nu(a){var b=[];a=a.Ud();for(var c=0,d=a.length;c<d;++c)b.push("("+Mu(a[c])+")");return b.join(",")}
function Ou(a){var b=a.S(),c=(0,Pu[b])(a);b=b.toUpperCase();if(a instanceof hf){a=a.ja;var d="";if("XYZ"===a||"XYZM"===a)d+="Z";if("XYM"===a||"XYZM"===a)d+="M";a=d;0<a.length&&(b+=" "+a)}return 0===c.length?b+" EMPTY":b+"("+c+")"}
var Pu={Point:Lu,LineString:Mu,Polygon:Nu,MultiPoint:function(a){var b=[];a=a.de();for(var c=0,d=a.length;c<d;++c)b.push("("+Lu(a[c])+")");return b.join(",")},MultiLineString:function(a){var b=[];a=a.wd();for(var c=0,d=a.length;c<d;++c)b.push("("+Mu(a[c])+")");return b.join(",")},MultiPolygon:function(a){var b=[];a=a.Vd();for(var c=0,d=a.length;c<d;++c)b.push("("+Nu(a[c])+")");return b.join(",")},GeometryCollection:function(a){var b=[];a=a.vd();for(var c=0,d=a.length;c<d;++c)b.push(Ou(a[c]));return b.join(",")}};
k=Ku.prototype;k.fe=function(a,b){return(a=this.Gd(a,b))?(b=new Hk,b.Va(a),b):null};k.Ng=function(a,b){var c=[];a=this.Gd(a,b);this.b&&"GeometryCollection"==a.S()?c=a.a:c=[a];b=[];for(var d=0,e=c.length;d<e;++d)a=new Hk,a.Va(c[d]),b.push(a);return b};k.Gd=function(a,b){a=new Qu(new Ru(a));Su(a);return(a=Tu(a))?Jo(a,!1,b):null};k.pe=function(a,b){return(a=a.U())?this.Kd(a,b):""};
k.nh=function(a,b){if(1==a.length)return this.pe(a[0],b);for(var c=[],d=0,e=a.length;d<e;++d)c.push(a[d].U());a=new Mq(c);return this.Kd(a,b)};k.Kd=function(a,b){return Ou(Jo(a,!0,b))};function Ru(a){this.a=a;this.b=-1}
function Uu(a){var b=a.a.charAt(++a.b),c={position:a.b,value:b};if("("==b)c.type=2;else if(","==b)c.type=5;else if(")"==b)c.type=3;else if("0"<=b&&"9">=b||"."==b||"-"==b){c.type=4;b=a.b;var d=!1,e=!1;do{if("."==f)d=!0;else if("e"==f||"E"==f)e=!0;var f=a.a.charAt(++a.b)}while("0"<=f&&"9">=f||"."==f&&(void 0===d||!d)||!e&&("e"==f||"E"==f)||e&&("-"==f||"+"==f));a=parseFloat(a.a.substring(b,a.b--));c.value=a}else if("a"<=b&&"z">=b||"A"<=b&&"Z">=b){c.type=1;b=a.b;do f=a.a.charAt(++a.b);while("a"<=f&&"z">=
f||"A"<=f&&"Z">=f);a=a.a.substring(b,a.b--).toUpperCase();c.value=a}else{if(" "==b||"\t"==b||"\r"==b||"\n"==b)return Uu(a);if(""===b)c.type=6;else throw Error("Unexpected character: "+b);}return c}function Qu(a){this.g=a;this.a="XY"}function Su(a){a.b=Uu(a.g)}function Vu(a,b){(b=a.b.type==b)&&Su(a);return b}
function Tu(a){var b=a.b;if(Vu(a,1)){b=b.value;var c="XY",d=a.b;1==a.b.type&&(d=d.value,"Z"===d?c="XYZ":"M"===d?c="XYM":"ZM"===d&&(c="XYZM"),"XY"!==c&&Su(a));a.a=c;if("GEOMETRYCOLLECTION"==b){a:{if(Vu(a,2)){b=[];do b.push(Tu(a));while(Vu(a,5));if(Vu(a,3)){a=b;break a}}else if(Wu(a)){a=[];break a}throw Error(Xu(a));}return new Mq(a)}d=Yu[b];c=Zu[b];if(!d||!c)throw Error("Invalid geometry type: "+b);b=d.call(a);return new c(b,a.a)}throw Error(Xu(a));}k=Qu.prototype;
k.Hg=function(){if(Vu(this,2)){var a=$u(this);if(Vu(this,3))return a}else if(Wu(this))return null;throw Error(Xu(this));};k.Gg=function(){if(Vu(this,2)){var a=av(this);if(Vu(this,3))return a}else if(Wu(this))return[];throw Error(Xu(this));};k.Ig=function(){if(Vu(this,2)){var a=bv(this);if(Vu(this,3))return a}else if(Wu(this))return[];throw Error(Xu(this));};
k.Hp=function(){if(Vu(this,2)){var a;if(2==this.b.type)for(a=[this.Hg()];Vu(this,5);)a.push(this.Hg());else a=av(this);if(Vu(this,3))return a}else if(Wu(this))return[];throw Error(Xu(this));};k.Gp=function(){if(Vu(this,2)){var a=bv(this);if(Vu(this,3))return a}else if(Wu(this))return[];throw Error(Xu(this));};k.Ip=function(){if(Vu(this,2)){for(var a=[this.Ig()];Vu(this,5);)a.push(this.Ig());if(Vu(this,3))return a}else if(Wu(this))return[];throw Error(Xu(this));};
function $u(a){for(var b=[],c=a.a.length,d=0;d<c;++d){var e=a.b;if(Vu(a,4))b.push(e.value);else break}if(b.length==c)return b;throw Error(Xu(a));}function av(a){for(var b=[$u(a)];Vu(a,5);)b.push($u(a));return b}function bv(a){for(var b=[a.Gg()];Vu(a,5);)b.push(a.Gg());return b}function Wu(a){var b=1==a.b.type&&"EMPTY"==a.b.value;b&&Su(a);return b}function Xu(a){return"Unexpected `"+a.b.value+"` at position "+a.b.position+" in `"+a.g.a+"`"}
var Zu={POINT:C,LINESTRING:I,POLYGON:D,MULTIPOINT:No,MULTILINESTRING:P,MULTIPOLYGON:Q},Yu={POINT:Qu.prototype.Hg,LINESTRING:Qu.prototype.Gg,POLYGON:Qu.prototype.Ig,MULTIPOINT:Qu.prototype.Hp,MULTILINESTRING:Qu.prototype.Gp,MULTIPOLYGON:Qu.prototype.Ip};function cv(a){return a.getAttributeNS("http://www.w3.org/1999/xlink","href")};function dv(){}dv.prototype.read=function(a){return qo(a)?this.a(a):ro(a)?this.b(a):"string"===typeof a?(a=so(a),this.a(a)):null};function ev(){this.version=void 0}w(ev,dv);ev.prototype.a=function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType==Node.ELEMENT_NODE)return this.b(a);return null};ev.prototype.b=function(a){this.version=a.getAttribute("version").trim();return(a=O({version:this.version},fv,a,[]))?a:null};function gv(a,b){return O({},hv,a,b)}function iv(a,b){return O({},jv,a,b)}function kv(a,b){if(b=gv(a,b))return a=[gp(a.getAttribute("width")),gp(a.getAttribute("height"))],b.size=a,b}
function lv(a,b){return O([],mv,a,b)}
var nv=[null,"http://www.opengis.net/wms"],fv=N(nv,{Service:L(function(a,b){return O({},ov,a,b)}),Capability:L(function(a,b){return O({},pv,a,b)})}),pv=N(nv,{Request:L(function(a,b){return O({},qv,a,b)}),Exception:L(function(a,b){return O([],rv,a,b)}),Layer:L(function(a,b){return O({},sv,a,b)})}),ov=N(nv,{Name:L(R),Title:L(R),Abstract:L(R),KeywordList:L(lv),OnlineResource:L(cv),ContactInformation:L(function(a,b){return O({},tv,a,b)}),Fees:L(R),AccessConstraints:L(R),LayerLimit:L(fp),MaxWidth:L(fp),
MaxHeight:L(fp)}),tv=N(nv,{ContactPersonPrimary:L(function(a,b){return O({},uv,a,b)}),ContactPosition:L(R),ContactAddress:L(function(a,b){return O({},vv,a,b)}),ContactVoiceTelephone:L(R),ContactFacsimileTelephone:L(R),ContactElectronicMailAddress:L(R)}),uv=N(nv,{ContactPerson:L(R),ContactOrganization:L(R)}),vv=N(nv,{AddressType:L(R),Address:L(R),City:L(R),StateOrProvince:L(R),PostCode:L(R),Country:L(R)}),rv=N(nv,{Format:uo(R)}),sv=N(nv,{Name:L(R),Title:L(R),Abstract:L(R),KeywordList:L(lv),CRS:wo(R),
EX_GeographicBoundingBox:L(function(a,b){var c=O({},wv,a,b);if(c){a=c.westBoundLongitude;b=c.southBoundLatitude;var d=c.eastBoundLongitude;c=c.northBoundLatitude;if(void 0!==a&&void 0!==b&&void 0!==d&&void 0!==c)return[a,b,d,c]}}),BoundingBox:wo(function(a){var b=[ep(a.getAttribute("minx")),ep(a.getAttribute("miny")),ep(a.getAttribute("maxx")),ep(a.getAttribute("maxy"))],c=[ep(a.getAttribute("resx")),ep(a.getAttribute("resy"))];return{crs:a.getAttribute("CRS"),extent:b,res:c}}),Dimension:wo(function(a){return{name:a.getAttribute("name"),
units:a.getAttribute("units"),unitSymbol:a.getAttribute("unitSymbol"),"default":a.getAttribute("default"),multipleValues:bp(a.getAttribute("multipleValues")),nearestValue:bp(a.getAttribute("nearestValue")),current:bp(a.getAttribute("current")),values:R(a)}}),Attribution:L(function(a,b){return O({},xv,a,b)}),AuthorityURL:wo(function(a,b){if(b=gv(a,b))return b.name=a.getAttribute("name"),b}),Identifier:wo(R),MetadataURL:wo(function(a,b){if(b=gv(a,b))return b.type=a.getAttribute("type"),b}),DataURL:wo(gv),
FeatureListURL:wo(gv),Style:wo(function(a,b){return O({},yv,a,b)}),MinScaleDenominator:L(dp),MaxScaleDenominator:L(dp),Layer:wo(function(a,b){var c=b[b.length-1],d=O({},sv,a,b);if(d)return b=bp(a.getAttribute("queryable")),void 0===b&&(b=c.queryable),d.queryable=void 0!==b?b:!1,b=gp(a.getAttribute("cascaded")),void 0===b&&(b=c.cascaded),d.cascaded=b,b=bp(a.getAttribute("opaque")),void 0===b&&(b=c.opaque),d.opaque=void 0!==b?b:!1,b=bp(a.getAttribute("noSubsets")),void 0===b&&(b=c.noSubsets),d.noSubsets=
void 0!==b?b:!1,(b=ep(a.getAttribute("fixedWidth")))||(b=c.fixedWidth),d.fixedWidth=b,(a=ep(a.getAttribute("fixedHeight")))||(a=c.fixedHeight),d.fixedHeight=a,["Style","CRS","AuthorityURL"].forEach(function(a){a in c&&(d[a]=(d[a]||[]).concat(c[a]))}),"EX_GeographicBoundingBox BoundingBox Dimension Attribution MinScaleDenominator MaxScaleDenominator".split(" ").forEach(function(a){a in d||(d[a]=c[a])}),d})}),xv=N(nv,{Title:L(R),OnlineResource:L(cv),LogoURL:L(kv)}),wv=N(nv,{westBoundLongitude:L(dp),
eastBoundLongitude:L(dp),southBoundLatitude:L(dp),northBoundLatitude:L(dp)}),qv=N(nv,{GetCapabilities:L(iv),GetMap:L(iv),GetFeatureInfo:L(iv)}),jv=N(nv,{Format:wo(R),DCPType:wo(function(a,b){return O({},zv,a,b)})}),zv=N(nv,{HTTP:L(function(a,b){return O({},Av,a,b)})}),Av=N(nv,{Get:L(gv),Post:L(gv)}),yv=N(nv,{Name:L(R),Title:L(R),Abstract:L(R),LegendURL:wo(kv),StyleSheetURL:L(gv),StyleURL:L(gv)}),hv=N(nv,{Format:L(R),OnlineResource:L(cv)}),mv=N(nv,{Keyword:uo(R)});function Bv(a){a=a?a:{};this.a="http://mapserver.gis.umn.edu/mapserver";this.b=new Tp;this.c=a.layers?a.layers:null;Wo.call(this)}w(Bv,Wo);
Bv.prototype.Kc=function(a,b){var c={};b&&kb(c,Ho(this,a,b));c=[c];a.setAttribute("namespaceURI",this.a);var d=a.localName;b=[];if(0!==a.childNodes.length){if("msGMLOutput"==d)for(var e=0,f=a.childNodes.length;e<f;e++){var g=a.childNodes[e];if(g.nodeType===Node.ELEMENT_NODE){var h=c[0],l=g.localName.replace("_layer","");if(!this.c||ec(this.c,l)){l+="_feature";h.featureType=l;h.featureNS=this.a;var m={};m[l]=uo(this.b.Kg,this.b);h=N([h.featureNS,null],m);g.setAttribute("namespaceURI",this.a);(g=O([],
h,g,c,this.b))&&gc(b,g)}}}"FeatureCollection"==d&&(a=O([],this.b.b,a,[{}],this.b))&&(b=a)}return b};Bv.prototype.mh=function(){};Bv.prototype.bc=function(){};Bv.prototype.re=function(){};function Cv(){}w(Cv,dv);Cv.prototype.a=function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType==Node.ELEMENT_NODE)return this.b(a);return null};Cv.prototype.b=function(a){return(a=O({},Dv,a,[]))?a:null};
var Ev=[null,"http://www.opengis.net/ows/1.1"],Dv=N(Ev,{ServiceIdentification:L(function(a,b){return O({},Fv,a,b)}),ServiceProvider:L(function(a,b){return O({},Gv,a,b)}),OperationsMetadata:L(function(a,b){return O({},Hv,a,b)})}),Iv=N(Ev,{DeliveryPoint:L(R),City:L(R),AdministrativeArea:L(R),PostalCode:L(R),Country:L(R),ElectronicMailAddress:L(R)}),Jv=N(Ev,{Value:wo(function(a){return R(a)})}),Kv=N(Ev,{AllowedValues:L(function(a,b){return O({},Jv,a,b)})}),Mv=N(Ev,{Phone:L(function(a,b){return O({},
Lv,a,b)}),Address:L(function(a,b){return O({},Iv,a,b)})}),Ov=N(Ev,{HTTP:L(function(a,b){return O({},Nv,a,b)})}),Nv=N(Ev,{Get:wo(function(a,b){var c=cv(a);if(c)return O({href:c},Pv,a,b)}),Post:void 0}),Qv=N(Ev,{DCP:L(function(a,b){return O({},Ov,a,b)})}),Hv=N(Ev,{Operation:function(a,b){var c=a.getAttribute("name");(a=O({},Qv,a,b))&&(b[b.length-1][c]=a)}}),Lv=N(Ev,{Voice:L(R),Facsimile:L(R)}),Pv=N(Ev,{Constraint:wo(function(a,b){var c=a.getAttribute("name");if(c)return O({name:c},Kv,a,b)})}),Rv=N(Ev,
{IndividualName:L(R),PositionName:L(R),ContactInfo:L(function(a,b){return O({},Mv,a,b)})}),Fv=N(Ev,{Abstract:L(R),AccessConstraints:L(R),Fees:L(R),Title:L(R),ServiceTypeVersion:L(R),ServiceType:L(R)}),Gv=N(Ev,{ProviderName:L(R),ProviderSite:L(cv),ServiceContact:L(function(a,b){return O({},Rv,a,b)})});function Sv(){this.g=new Cv}w(Sv,dv);Sv.prototype.a=function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType==Node.ELEMENT_NODE)return this.b(a);return null};Sv.prototype.b=function(a){var b=a.getAttribute("version").trim(),c=this.g.b(a);if(!c)return null;c.version=b;return(c=O(c,Tv,a,[]))?c:null};function Uv(a){var b=R(a).split(" ");if(b&&2==b.length&&(a=+b[0],b=+b[1],!isNaN(a)&&!isNaN(b)))return[a,b]}
var Vv=[null,"http://www.opengis.net/wmts/1.0"],Wv=[null,"http://www.opengis.net/ows/1.1"],Tv=N(Vv,{Contents:L(function(a,b){return O({},Xv,a,b)})}),Xv=N(Vv,{Layer:wo(function(a,b){return O({},Yv,a,b)}),TileMatrixSet:wo(function(a,b){return O({},Zv,a,b)})}),Yv=N(Vv,{Style:wo(function(a,b){if(b=O({},$v,a,b))return a="true"===a.getAttribute("isDefault"),b.isDefault=a,b}),Format:wo(R),TileMatrixSetLink:wo(function(a,b){return O({},aw,a,b)}),Dimension:wo(function(a,b){return O({},bw,a,b)}),ResourceURL:wo(function(a){var b=
a.getAttribute("format"),c=a.getAttribute("template");a=a.getAttribute("resourceType");var d={};b&&(d.format=b);c&&(d.template=c);a&&(d.resourceType=a);return d})},N(Wv,{Title:L(R),Abstract:L(R),WGS84BoundingBox:L(function(a,b){a=O([],cw,a,b);if(2==a.length)return Ca(a)}),Identifier:L(R)})),$v=N(Vv,{LegendURL:wo(function(a){var b={};b.format=a.getAttribute("format");b.href=cv(a);return b})},N(Wv,{Title:L(R),Identifier:L(R)})),aw=N(Vv,{TileMatrixSet:L(R),TileMatrixSetLimits:L(function(a,b){return O([],
dw,a,b)})}),dw=N(Vv,{TileMatrixLimits:uo(function(a,b){return O({},ew,a,b)})}),ew=N(Vv,{TileMatrix:L(R),MinTileRow:L(fp),MaxTileRow:L(fp),MinTileCol:L(fp),MaxTileCol:L(fp)}),bw=N(Vv,{Default:L(R),Value:wo(R)},N(Wv,{Identifier:L(R)})),cw=N(Wv,{LowerCorner:uo(Uv),UpperCorner:uo(Uv)}),Zv=N(Vv,{WellKnownScaleSet:L(R),TileMatrix:wo(function(a,b){return O({},fw,a,b)})},N(Wv,{SupportedCRS:L(R),Identifier:L(R)})),fw=N(Vv,{TopLeftCorner:L(Uv),ScaleDenominator:L(dp),TileWidth:L(fp),TileHeight:L(fp),MatrixWidth:L(fp),
MatrixHeight:L(fp)},N(Wv,{Identifier:L(R)}));function gw(a,b,c){hf.call(this);this.hh(a,b?b:0,c)}w(gw,hf);k=gw.prototype;k.clone=function(){var a=new gw(null);kf(a,this.ja,this.A.slice());a.u();return a};k.Nb=function(a,b,c,d){var e=this.A;a-=e[0];var f=b-e[1];b=a*a+f*f;if(b<d){if(0===b)for(d=0;d<this.a;++d)c[d]=e[d];else for(d=this.Bd()/Math.sqrt(b),c[0]=e[0]+d*a,c[1]=e[1]+d*f,d=2;d<this.a;++d)c[d]=e[d];c.length=this.a;return b}return d};k.Zc=function(a,b){var c=this.A;a-=c[0];b-=c[1];return a*a+b*b<=hw(this)};
k.xa=function(){return this.A.slice(0,this.a)};k.Ae=function(a){var b=this.A,c=b[this.a]-b[0];return Na(b[0]-c,b[1]-c,b[0]+c,b[1]+c,a)};k.Bd=function(){return Math.sqrt(hw(this))};function hw(a){var b=a.A[a.a]-a.A[0];a=a.A[a.a+1]-a.A[1];return b*b+a*a}k.S=function(){return"Circle"};k.$a=function(a){var b=this.G();return hb(a,b)?(b=this.xa(),a[0]<=b[0]&&a[2]>=b[0]||a[1]<=b[1]&&a[3]>=b[1]?!0:Ua(a,this.Bb,this)):!1};
k.ub=function(a){var b=this.a,c=a.slice();c[b]=c[0]+(this.A[b]-this.A[0]);var d;for(d=1;d<b;++d)c[b+d]=a[d];kf(this,this.ja,c);this.u()};k.hh=function(a,b,c){if(a){lf(this,c,a,0);this.A||(this.A=[]);c=this.A;a=vf(c,a);c[a++]=c[0]+b;var d;b=1;for(d=this.a;b<d;++b)c[a++]=c[b];c.length=a}else kf(this,"XY",null);this.u()};k.W=function(){};k.na=function(){};k.fd=function(a){this.A[this.a]=this.A[0]+a;this.u()};function iw(a){a=a?a:{};Jg.call(this,{handleEvent:Re});this.j=a.formatConstructors?a.formatConstructors:[];this.s=a.projection?Ob(a.projection):null;this.a=null;this.f=a.source||null;this.target=a.target?a.target:null}w(iw,Jg);function jw(a){a=a.dataTransfer.files;var b;var c=0;for(b=a.length;c<b;++c){var d=a.item(c);var e=new FileReader;e.addEventListener("load",this.l.bind(this,d));e.readAsText(d)}}function kw(a){a.stopPropagation();a.preventDefault();a.dataTransfer.dropEffect="copy"}
iw.prototype.l=function(a,b){b=b.target.result;var c=this.v,d=this.s;d||(d=c.aa().v);c=this.j;var e=[],f;var g=0;for(f=c.length;g<f;++g){var h=new c[g];var l={featureProjection:d};try{e=h.Qa(b,l)}catch(m){e=null}if(e&&0<e.length)break}this.f&&(this.f.clear(),this.f.Qc(e));this.b(new lw(mw,a,e,d))};function nw(a){var b=a.v;b&&(b=a.target?a.target:b.a,a.a=[y(b,"drop",jw,a),y(b,"dragenter",kw,a),y(b,"dragover",kw,a),y(b,"drop",kw,a)])}
iw.prototype.Ha=function(a){Jg.prototype.Ha.call(this,a);a?nw(this):ow(this)};iw.prototype.setMap=function(a){ow(this);Jg.prototype.setMap.call(this,a);this.c()&&nw(this)};function ow(a){a.a&&(a.a.forEach(Gc),a.a=null)}var mw="addfeatures";function lw(a,b,c,d){Qc.call(this,a);this.features=c;this.file=b;this.projection=d}w(lw,Qc);function pw(a){a=a?a:{};fh.call(this,{handleDownEvent:qw,handleDragEvent:rw,handleUpEvent:sw});this.s=a.condition?a.condition:bh;this.a=this.f=void 0;this.j=0;this.o=void 0!==a.duration?a.duration:400}w(pw,fh);
function rw(a){if(dh(a)){var b=a.map,c=b.Cb(),d=a.pixel;a=d[0]-c[0]/2;d=c[1]/2-d[1];c=Math.atan2(d,a);a=Math.sqrt(a*a+d*d);b=b.aa();b.l.rotation!==re&&void 0!==this.f&&(d=c-this.f,Kg(b,b.Sa()-d));this.f=c;void 0!==this.a&&(c=this.a*(b.Pa()/a),Tg(b,c));void 0!==this.a&&(this.j=this.a/a);this.a=a}}
function sw(a){if(!dh(a))return!0;a=a.map.aa();bg(a,1,-1);var b=this.j-1,c=a.Sa();c=a.constrainRotation(c,0);Kg(a,c,void 0,void 0);c=a.Pa();var d=this.o;c=a.constrainResolution(c,0,b);Tg(a,c,void 0,d);this.j=0;return!1}function qw(a){return dh(a)&&this.s(a)?(bg(a.map.aa(),1,1),this.a=this.f=void 0,!0):!1};function T(a){a=a?a:{};var b=kb({},a);delete b.style;delete b.renderBuffer;delete b.updateWhileAnimating;delete b.updateWhileInteracting;xg.call(this,b);this.D=void 0!==a.declutter?a.declutter:!1;this.f=void 0!==a.renderBuffer?a.renderBuffer:100;this.C=null;this.V=void 0;this.j(a.style);this.ca=void 0!==a.updateWhileAnimating?a.updateWhileAnimating:!1;this.ra=void 0!==a.updateWhileInteracting?a.updateWhileInteracting:!1;this.l=a.renderMode||"vector";this.type="VECTOR"}w(T,xg);T.prototype.B=function(){return this.C};
T.prototype.ib=function(){return this.V};T.prototype.j=function(a){this.C=void 0!==a?a:Fk;this.V=null===a?void 0:Dk(this.C);this.u()};var ik="renderOrder";function tw(){return[[-Infinity,-Infinity,Infinity,Infinity]]};function uw(a){Vc.call(this);this.c=Ob(a.projection);this.v=null;this.C=vw(this,a.attributions);this.T=a.logo;this.ra=void 0!==a.state?a.state:"ready";this.D=void 0!==a.wrapX?a.wrapX:!1}w(uw,Vc);
function vw(a,b){if(!b)return null;if(b instanceof Ec)return a.v=[b],function(){return[b.og]};if(Array.isArray(b)){if(b[0]instanceof Ec){a.v=b;var c=b.map(function(a){return a.og});return function(){return c}}a.v=b.map(function(a){return new Ec({html:a})});return function(){return b}}if("function"===typeof b)return b;a.v=[new Ec({html:b})];return function(){return[b]}}k=uw.prototype;k.wa=ea;k.za=function(){return this.v};k.Aa=function(){return this.T};k.Da=function(){return this.c};k.getState=function(){return this.ra};
k.sa=function(){this.u()};k.va=function(a){this.C=vw(this,a);this.u()};function ww(a,b){a.ra=b;a.u()};function U(a){a=a||{};uw.call(this,{attributions:a.attributions,logo:a.logo,projection:void 0,state:"ready",wrapX:void 0!==a.wrapX?a.wrapX:!0});this.o=ea;this.O=a.format;this.$=void 0==a.overlaps?!0:a.overlaps;this.V=a.url;void 0!==a.loader?this.o=a.loader:void 0!==this.V&&(oa(this.O,7),this.o=Fo(this.V,this.O));this.ca=void 0!==a.strategy?a.strategy:tw;var b=void 0!==a.useSpatialIndex?a.useSpatialIndex:!0;this.a=b?new um:null;this.B=new um;this.f={};this.j={};this.l={};this.s={};this.i=null;if(a.features instanceof
B){var c=a.features;var d=c.a}else Array.isArray(a.features)&&(d=a.features);b||void 0!==c||(c=new B(d));void 0!==d&&xw(this,d);void 0!==c&&yw(this,c)}w(U,uw);k=U.prototype;k.Gb=function(a){var b=x(a).toString();if(zw(this,b,a)){Aw(this,b,a);var c=a.U();c?(b=c.G(),this.a&&this.a.Ca(b,a)):this.f[b]=a;this.b(new Bw("addfeature",a))}this.u()};function Aw(a,b,c){a.s[b]=[y(c,"change",a.gj,a),y(c,"propertychange",a.gj,a)]}
function zw(a,b,c){var d=!0,e=c.c;void 0!==e?e.toString()in a.j?d=!1:a.j[e.toString()]=c:(oa(!(b in a.l),30),a.l[b]=c);return d}k.Qc=function(a){xw(this,a);this.u()};function xw(a,b){var c,d=[],e=[],f=[];var g=0;for(c=b.length;g<c;g++){var h=b[g];var l=x(h).toString();zw(a,l,h)&&e.push(h)}g=0;for(c=e.length;g<c;g++)h=e[g],l=x(h).toString(),Aw(a,l,h),(b=h.U())?(l=b.G(),d.push(l),f.push(h)):a.f[l]=h;a.a&&a.a.load(d,f);g=0;for(c=e.length;g<c;g++)a.b(new Bw("addfeature",e[g]))}
function yw(a,b){var c=!1;y(a,"addfeature",function(a){c||(c=!0,b.push(a.feature),c=!1)});y(a,"removefeature",function(a){c||(c=!0,b.remove(a.feature),c=!1)});y(b,"add",function(a){c||(c=!0,this.Gb(a.element),c=!1)},a);y(b,"remove",function(a){c||(c=!0,this.Lb(a.element),c=!1)},a);a.i=b}
k.clear=function(a){if(a){for(var b in this.s)this.s[b].forEach(Gc);this.i||(this.s={},this.j={},this.l={})}else if(this.a){this.a.forEach(this.Yg,this);for(var c in this.f)this.Yg(this.f[c])}this.i&&this.i.clear();this.a&&this.a.clear();this.B.clear();this.f={};this.b(new Bw("clear"));this.u()};k.Lh=function(a,b){if(this.a)return this.a.forEach(a,b);if(this.i)return this.i.forEach(a,b)};function Cw(a,b,c){a.ec([b[0],b[1],b[0],b[1]],function(a){if(a.U().Bb(b))return c.call(void 0,a)})}
k.ec=function(a,b,c){if(this.a)return zm(this.a,a,b,c);if(this.i)return this.i.forEach(b,c)};k.Mh=function(a,b,c){return this.ec(a,function(d){if(d.U().$a(a)&&(d=b.call(c,d)))return d})};k.Th=function(){return this.i};k.ee=function(){if(this.i)var a=this.i.a;else this.a&&(a=wm(this.a),nb(this.f)||gc(a,mb(this.f)));return a};k.Sh=function(a){var b=[];Cw(this,a,function(a){b.push(a)});return b};k.Yf=function(a){return xm(this.a,a)};
k.Oh=function(a,b){var c=a[0],d=a[1],e=null,f=[NaN,NaN],g=Infinity,h=[-Infinity,-Infinity,Infinity,Infinity],l=b?b:Re;zm(this.a,h,function(a){if(l(a)){var b=a.U(),m=g;g=b.Nb(c,d,f,g);g<m&&(e=a,a=Math.sqrt(g),h[0]=c-a,h[1]=d-a,h[2]=c+a,h[3]=d+a)}});return e};k.G=function(a){return this.a.G(a)};k.Rh=function(a){a=this.j[a.toString()];return void 0!==a?a:null};k.ej=function(){return this.O};k.fj=function(){return this.V};
k.gj=function(a){a=a.target;var b=x(a).toString(),c=a.U();c?(c=c.G(),b in this.f?(delete this.f[b],this.a&&this.a.Ca(c,a)):this.a&&vm(this.a,c,a)):b in this.f||(this.a&&this.a.remove(a),this.f[b]=a);c=a.c;void 0!==c?(c=c.toString(),b in this.l?(delete this.l[b],this.j[c]=a):this.j[c]!==a&&(Dw(this,a),this.j[c]=a)):b in this.l||(Dw(this,a),this.l[b]=a);this.u();this.b(new Bw("changefeature",a))};
k.ae=function(a,b,c){var d=this.B;a=this.ca(a,b);var e;var f=0;for(e=a.length;f<e;++f){var g=a[f];zm(d,g,function(a){return La(a.extent,g)})||(this.o.call(this,g,b,c),d.Ca(g,{extent:g.slice()}))}};k.Cj=function(a){var b=this.B,c;zm(b,a,function(b){if(Sa(b.extent,a))return c=b,!0});c&&b.remove(c)};k.Lb=function(a){var b=x(a).toString();b in this.f?delete this.f[b]:this.a&&this.a.remove(a);this.Yg(a);this.u()};
k.Yg=function(a){var b=x(a).toString();this.s[b].forEach(Gc);delete this.s[b];var c=a.c;void 0!==c?delete this.j[c.toString()]:delete this.l[b];this.b(new Bw("removefeature",a))};function Dw(a,b){for(var c in a.j)if(a.j[c]===b){delete a.j[c];break}}k.hj=function(a){this.o=a};function Bw(a,b){Qc.call(this,a);this.feature=b}w(Bw,Qc);function Ew(a){fh.call(this,{handleDownEvent:Fw,handleEvent:Gw,handleUpEvent:Hw});this.V=!1;this.ca=null;this.o=!1;this.ob=a.source?a.source:null;this.La=a.features?a.features:null;this.Xk=a.snapTolerance?a.snapTolerance:12;this.O=a.type;this.f=Iw(this.O);this.$k=!!a.stopClick;this.Ea=a.minPoints?a.minPoints:this.f===Jw?3:2;this.ua=a.maxPoints?a.maxPoints:Infinity;this.Md=a.finishCondition?a.finishCondition:Re;var b=a.geometryFunction;if(!b)if("Circle"===this.O)b=function(a,b){b=b?b:new gw([NaN,NaN]);
b.hh(a[0],Math.sqrt(He(a[0],a[1])));return b};else{var c,d=this.f;d===Kw?c=C:d===Lw?c=I:d===Jw&&(c=D);b=function(a,b){b?d===Jw?a[0].length?b.na([a[0].concat([a[0][0]])]):b.na([]):b.na(a):b=new c(a);return b}}this.cb=b;this.T=this.C=this.a=this.B=this.j=this.s=null;this.sc=a.clickTolerance?a.clickTolerance*a.clickTolerance:36;this.ra=new T({source:new U({useSpatialIndex:!1,wrapX:a.wrapX?a.wrapX:!1}),style:a.style?a.style:Mw()});this.bb=a.geometryName;this.Wk=a.condition?a.condition:ah;this.If=a.freehand?
Re:a.freehandCondition?a.freehandCondition:bh;y(this,Xc("active"),this.Ki,this)}w(Ew,fh);function Mw(){var a=Gk();return function(b){return a[b.U().S()]}}k=Ew.prototype;k.setMap=function(a){fh.prototype.setMap.call(this,a);this.Ki()};function Gw(a){this.o=this.f!==Kw&&this.If(a);var b=!0;this.o&&"pointerdrag"===a.type&&null!==this.j?(Nw(this,a),b=!1):this.o&&"pointerdown"===a.type?b=!1:"pointermove"===a.type?b=Ow(this,a):"dblclick"===a.type&&(b=!1);return gh.call(this,a)&&b}
function Fw(a){this.V=!this.o;return this.o?(this.ca=a.pixel,this.s||Pw(this,a),!0):this.Wk(a)?(this.ca=a.pixel,!0):!1}function Hw(a){var b=!0;Ow(this,a);var c=this.f===Qw;this.V?(this.s?this.o||c?this.Pd():Rw(this,a)?this.Md(a)&&this.Pd():Nw(this,a):(Pw(this,a),this.f===Kw&&this.Pd()),b=!1):this.o&&(this.s=null,Sw(this));!b&&this.$k&&a.stopPropagation();return b}
function Ow(a,b){if(a.ca&&(!a.o&&a.V||a.o&&!a.V)){var c=a.ca,d=b.pixel,e=c[0]-d[0];c=c[1]-d[1];e=e*e+c*c;a.V=a.o?e>a.sc:e<=a.sc}a.s?(e=b.coordinate,c=a.j.U(),a.f===Kw?d=a.a:a.f===Jw?(d=a.a[0],d=d[d.length-1],Rw(a,b)&&(e=a.s.slice())):(d=a.a,d=d[d.length-1]),d[0]=e[0],d[1]=e[1],a.cb(a.a,c),a.B&&a.B.U().na(e),c instanceof D&&a.f!==Jw?(a.C||(a.C=new Hk(new I(null))),e=c.Wh(0),b=a.C.U(),b.ba(e.ja,e.da())):a.T&&(b=a.C.U(),b.na(a.T)),Tw(a)):(b=b.coordinate.slice(),a.B?a.B.U().na(b):(a.B=new Hk(new C(b)),
Tw(a)));return!0}function Rw(a,b){var c=!1;if(a.j){var d=!1,e=[a.s];a.f===Lw?d=a.a.length>a.Ea:a.f===Jw&&(d=a.a[0].length>a.Ea,e=[a.a[0][0],a.a[0][a.a[0].length-2]]);if(d){d=b.map;for(var f=0,g=e.length;f<g;f++){var h=e[f],l=d.Ia(h),m=b.pixel;c=m[0]-l[0];l=m[1]-l[1];if(c=Math.sqrt(c*c+l*l)<=(a.o?1:a.Xk)){a.s=h;break}}}}return c}
function Pw(a,b){b=b.coordinate;a.s=b;a.f===Kw?a.a=b.slice():a.f===Jw?(a.a=[[b.slice(),b.slice()]],a.T=a.a[0]):(a.a=[b.slice(),b.slice()],a.f===Qw&&(a.T=a.a));a.T&&(a.C=new Hk(new I(a.T)));b=a.cb(a.a);a.j=new Hk;a.bb&&a.j.Lc(a.bb);a.j.Va(b);Tw(a);a.b(new Uw("drawstart",a.j))}
function Nw(a,b){b=b.coordinate;var c=a.j.U(),d;if(a.f===Lw){a.s=b.slice();var e=a.a;e.length>=a.ua&&(a.o?e.pop():d=!0);e.push(b.slice());a.cb(e,c)}else a.f===Jw&&(e=a.a[0],e.length>=a.ua&&(a.o?e.pop():d=!0),e.push(b.slice()),d&&(a.s=e[0]),a.cb(a.a,c));Tw(a);d&&a.Pd()}
k.nq=function(){if(this.j){var a=this.j.U();if(this.f===Lw){var b=this.a;b.splice(-2,1);this.cb(b,a);2<=b.length&&(this.s=b[b.length-2].slice())}else if(this.f===Jw){b=this.a[0];b.splice(-2,1);var c=this.C.U();c.na(b);this.cb(this.a,a)}0===b.length&&(this.s=null);Tw(this)}};
k.Pd=function(){var a=Sw(this),b=this.a,c=a.U();this.f===Lw?(b.pop(),this.cb(b,c)):this.f===Jw&&(b[0].pop(),this.cb(b,c),b=c.W());"MultiPoint"===this.O?a.Va(new No([b])):"MultiLineString"===this.O?a.Va(new P([b])):"MultiPolygon"===this.O&&a.Va(new Q([b]));this.b(new Uw("drawend",a));this.La&&this.La.push(a);this.ob&&this.ob.Gb(a)};function Sw(a){a.s=null;var b=a.j;b&&(a.j=null,a.B=null,a.C=null,a.ra.ha().clear(!0));return b}
k.Zn=function(a){var b=a.U();this.j=a;this.a=b.W();a=this.a[this.a.length-1];this.s=a.slice();this.a.push(a.slice());Tw(this);this.b(new Uw("drawstart",this.j))};k.jd=Se;function Tw(a){var b=[];a.j&&b.push(a.j);a.C&&b.push(a.C);a.B&&b.push(a.B);a=a.ra.ha();a.clear(!0);a.Qc(b)}k.Ki=function(){var a=this.v,b=this.c();a&&b||Sw(this);this.ra.setMap(b?a:null)};
function Iw(a){var b;"Point"===a||"MultiPoint"===a?b=Kw:"LineString"===a||"MultiLineString"===a?b=Lw:"Polygon"===a||"MultiPolygon"===a?b=Jw:"Circle"===a&&(b=Qw);return b}var Kw="Point",Lw="LineString",Jw="Polygon",Qw="Circle";function Uw(a,b){Qc.call(this,a);this.feature=b}w(Uw,Qc);function Vw(a){var b=a||{};this.a=this.j=null;this.C=void 0!==b.pixelTolerance?b.pixelTolerance:10;this.B=!1;this.T=this.s=null;a||(a={});fh.call(this,{handleDownEvent:Ww,handleDragEvent:Xw,handleEvent:Yw,handleUpEvent:Zw});this.o=new T({source:new U({useSpatialIndex:!1,wrapX:!!a.wrapX}),style:a.boxStyle?a.boxStyle:$w(),updateWhileAnimating:!0,updateWhileInteracting:!0});this.O=new T({source:new U({useSpatialIndex:!1,wrapX:!!a.wrapX}),style:a.pointerStyle?a.pointerStyle:ax(),updateWhileAnimating:!0,
updateWhileInteracting:!0});a.extent&&this.f(a.extent)}w(Vw,fh);function Yw(a){if(!(a instanceof Ad))return!0;if("pointermove"==a.type&&!this.D){var b=a.pixel,c=a.map,d=bx(this,b,c);d||(d=c.Ra(b));cx(this,d)}gh.call(this,a);return!1}
function Ww(a){function b(a){var b=null,c=null;a[0]==e[0]?b=e[2]:a[0]==e[2]&&(b=e[0]);a[1]==e[1]?c=e[3]:a[1]==e[3]&&(c=e[1]);return null!==b&&null!==c?[b,c]:null}var c=a.pixel,d=a.map,e=this.G();(a=bx(this,c,d))&&e?(c=a[0]==e[0]||a[0]==e[2]?a[0]:null,d=a[1]==e[1]||a[1]==e[3]?a[1]:null,null!==c&&null!==d?this.a=dx(b(a)):null!==c?this.a=ex(b([c,e[1]]),b([c,e[3]])):null!==d&&(this.a=ex(b([e[0],d]),b([e[2],d])))):(a=d.Ra(c),this.f([a[0],a[1],a[0],a[1]]),this.a=dx(a));return!0}
function Xw(a){this.a&&(a=a.coordinate,this.f(this.a(a)),cx(this,a));return!0}function Zw(){this.a=null;var a=this.G();a&&0!==ab(a)||this.f(null);return!1}function $w(){var a=Gk();return function(){return a.Polygon}}function ax(){var a=Gk();return function(){return a.Point}}function dx(a){return function(b){return Ca([a,b])}}function ex(a,b){return a[0]==b[0]?function(c){return Ca([a,[c[0],b[1]]])}:a[1]==b[1]?function(c){return Ca([a,[b[0],c[1]]])}:null}
function bx(a,b,c){function d(a,b){return Je(e,a)-Je(e,b)}var e=c.Ra(b),f=a.G();if(f){f=[[[f[0],f[1]],[f[0],f[3]]],[[f[0],f[3]],[f[2],f[3]]],[[f[2],f[3]],[f[2],f[1]]],[[f[2],f[1]],[f[0],f[1]]]];f.sort(d);f=f[0];var g=Be(e,f),h=c.Ia(g);if(Ie(b,h)<=a.C)return b=c.Ia(f[0]),c=c.Ia(f[1]),b=He(h,b),c=He(h,c),a.B=Math.sqrt(Math.min(b,c))<=a.C,a.B&&(g=b>c?f[1]:f[0]),g}return null}function cx(a,b){var c=a.T;c?c.U().na(b):(c=new Hk(new C(b)),a.T=c,a.O.ha().Gb(c))}
Vw.prototype.setMap=function(a){this.o.setMap(a);this.O.setMap(a);fh.prototype.setMap.call(this,a)};Vw.prototype.G=function(){return this.j};Vw.prototype.f=function(a){this.j=a?a:null;var b=this.s;b?a?b.Va(Rf(a)):b.Va(void 0):(this.s=b=a?new Hk(Rf(a)):new Hk({}),this.o.ha().Gb(b));this.b(new fx(this.j))};function fx(a){Qc.call(this,"extentchanged");this.extent=a}w(fx,Qc);function gx(a){fh.call(this,{handleDownEvent:hx,handleDragEvent:ix,handleEvent:jx,handleUpEvent:kx});this.Md=a.condition?a.condition:eh;this.bb=function(a){return Wg(a)&&$g(a)};this.ob=a.deleteCondition?a.deleteCondition:this.bb;this.sc=a.insertVertexCondition?a.insertVertexCondition:Re;this.La=this.f=null;this.Ea=[0,0];this.C=this.T=!1;this.a=new um;this.ra=void 0!==a.pixelTolerance?a.pixelTolerance:10;this.s=this.ua=!1;this.j=[];this.B=new T({source:new U({useSpatialIndex:!1,wrapX:!!a.wrapX}),style:a.style?
a.style:lx(),updateWhileAnimating:!0,updateWhileInteracting:!0});this.ca={Point:this.io,LineString:this.Mi,LinearRing:this.Mi,Polygon:this.jo,MultiPoint:this.fo,MultiLineString:this.eo,MultiPolygon:this.ho,Circle:this.bo,GeometryCollection:this.co};this.V=null;a.source?(this.V=a.source,a=new B(this.V.ee()),y(this.V,"addfeature",this.vm,this),y(this.V,"removefeature",this.xm,this)):a=a.features;if(!a)throw Error("The modify interaction requires features or a source");this.o=a;this.o.forEach(this.xg,
this);y(this.o,"add",this.$n,this);y(this.o,"remove",this.ao,this);this.O=null}w(gx,fh);k=gx.prototype;k.xg=function(a){var b=a.U();b&&b.S()in this.ca&&this.ca[b.S()].call(this,a,b);(b=this.v)&&b.c&&this.c()&&mx(this,this.Ea,b);y(a,"change",this.Li,this)};function nx(a,b){a.C||(a.C=!0,a.b(new ox("modifystart",a.o,b)))}function px(a,b){qx(a,b);a.f&&0===a.o.kc()&&(a.B.ha().Lb(a.f),a.f=null);Mc(b,"change",a.Li,a)}
function qx(a,b){a=a.a;var c=[];a.forEach(function(a){b===a.feature&&c.push(a)});for(var d=c.length-1;0<=d;--d)a.remove(c[d])}k.Ha=function(a){this.f&&!a&&(this.B.ha().Lb(this.f),this.f=null);fh.prototype.Ha.call(this,a)};k.setMap=function(a){this.B.setMap(a);fh.prototype.setMap.call(this,a)};k.vm=function(a){a.feature&&this.o.push(a.feature)};k.xm=function(a){a.feature&&this.o.remove(a.feature)};k.$n=function(a){this.xg(a.element)};k.Li=function(a){this.s||(a=a.target,px(this,a),this.xg(a))};
k.ao=function(a){px(this,a.element)};k.io=function(a,b){var c=b.W();a={feature:a,geometry:b,ma:[c,c]};this.a.Ca(b.G(),a)};k.fo=function(a,b){var c=b.W(),d;var e=0;for(d=c.length;e<d;++e){var f=c[e];f={feature:a,geometry:b,depth:[e],index:e,ma:[f,f]};this.a.Ca(b.G(),f)}};k.Mi=function(a,b){var c=b.W(),d;var e=0;for(d=c.length-1;e<d;++e){var f=c.slice(e,e+2);var g={feature:a,geometry:b,index:e,ma:f};this.a.Ca(Ca(f),g)}};
k.eo=function(a,b){var c=b.W(),d,e;var f=0;for(e=c.length;f<e;++f){var g=c[f];var h=0;for(d=g.length-1;h<d;++h){var l=g.slice(h,h+2);var m={feature:a,geometry:b,depth:[f],index:h,ma:l};this.a.Ca(Ca(l),m)}}};k.jo=function(a,b){var c=b.W(),d,e;var f=0;for(e=c.length;f<e;++f){var g=c[f];var h=0;for(d=g.length-1;h<d;++h){var l=g.slice(h,h+2);var m={feature:a,geometry:b,depth:[f],index:h,ma:l};this.a.Ca(Ca(l),m)}}};
k.ho=function(a,b){var c=b.W(),d,e,f;var g=0;for(f=c.length;g<f;++g){var h=c[g];var l=0;for(e=h.length;l<e;++l){var m=h[l];var n=0;for(d=m.length-1;n<d;++n){var p=m.slice(n,n+2);var q={feature:a,geometry:b,depth:[l,g],index:n,ma:p};this.a.Ca(Ca(p),q)}}}};k.bo=function(a,b){var c=b.xa(),d={feature:a,geometry:b,index:0,ma:[c,c]};a={feature:a,geometry:b,index:1,ma:[c,c]};d.Tf=a.Tf=[d,a];this.a.Ca(Pa(c),d);this.a.Ca(b.G(),a)};
k.co=function(a,b){var c=b.a;for(b=0;b<c.length;++b)this.ca[c[b].S()].call(this,a,c[b])};function rx(a,b){var c=a.f;c?c.U().na(b):(c=new Hk(new C(b)),a.f=c,a.B.ha().Gb(c))}function sx(a,b){return a.index-b.index}
function hx(a){if(!this.Md(a))return!1;mx(this,a.pixel,a.map);var b=a.map.Ra(a.pixel);this.j.length=0;this.C=!1;var c=this.f;if(c){var d=[];c=c.U().W();var e=Ca([c]);e=xm(this.a,e);var f={};e.sort(sx);for(var g=0,h=e.length;g<h;++g){var l=e[g],m=l.ma,n=x(l.feature),p=l.depth;p&&(n+="-"+p.join("-"));f[n]||(f[n]=Array(2));if("Circle"===l.geometry.S()&&1===l.index)m=tx(b,l),Ee(m,c)&&!f[n][0]&&(this.j.push([l,0]),f[n][0]=l);else if(Ee(m[0],c)&&!f[n][0])this.j.push([l,0]),f[n][0]=l;else if(Ee(m[1],c)&&
!f[n][1]){if("LineString"!==l.geometry.S()&&"MultiLineString"!==l.geometry.S()||!f[n][0]||0!==f[n][0].index)this.j.push([l,1]),f[n][1]=l}else this.sc(a)&&x(m)in this.La&&!f[n][0]&&!f[n][1]&&d.push([l,c])}d.length&&nx(this,a);for(a=d.length-1;0<=a;--a)this.Em.apply(this,d[a])}return!!this.f}
function ix(a){this.T=!1;nx(this,a);a=a.coordinate;for(var b=0,c=this.j.length;b<c;++b){var d=this.j[b],e=d[0],f=e.depth,g=e.geometry,h=e.ma;for(d=d[1];a.length<g.pa();)a.push(h[d][a.length]);switch(g.S()){case "Point":var l=a;h[0]=h[1]=a;break;case "MultiPoint":l=g.W();l[e.index]=a;h[0]=h[1]=a;break;case "LineString":l=g.W();l[e.index+d]=a;h[d]=a;break;case "MultiLineString":l=g.W();l[f[0]][e.index+d]=a;h[d]=a;break;case "Polygon":l=g.W();l[f[0]][e.index+d]=a;h[d]=a;break;case "MultiPolygon":l=g.W();
l[f[1]][f[0]][e.index+d]=a;h[d]=a;break;case "Circle":h[0]=h[1]=a,0===e.index?(this.s=!0,g.ub(a)):(this.s=!0,g.fd(Ie(g.xa(),a))),this.s=!1}l&&(e=g,f=l,this.s=!0,e.na(f),this.s=!1)}rx(this,a)}function kx(a){for(var b,c,d=this.j.length-1;0<=d;--d)if(b=this.j[d][0],c=b.geometry,"Circle"===c.S()){var e=c.xa(),f=b.Tf[0];b=b.Tf[1];f.ma[0]=f.ma[1]=e;b.ma[0]=b.ma[1]=e;vm(this.a,Pa(e),f);vm(this.a,c.G(),b)}else vm(this.a,Ca(b.ma),b);this.C&&(this.b(new ox("modifyend",this.o,a)),this.C=!1);return!1}
function jx(a){if(!(a instanceof Ad))return!0;this.O=a;var b;a.map.aa().Vh()||"pointermove"!=a.type||this.D||(this.Ea=a.pixel,mx(this,a.pixel,a.map));this.f&&this.ob(a)&&(b="singleclick"==a.type&&this.T?!0:this.Dj());"singleclick"==a.type&&(this.T=!1);return gh.call(this,a)&&!b}
function mx(a,b,c){function d(a,b){return ux(e,a)-ux(e,b)}var e=c.Ra(b),f=Fa(Pa(e),c.aa().Pa()*a.ra);f=xm(a.a,f);if(0<f.length){f.sort(d);var g=f[0],h=g.ma,l=tx(e,g),m=c.Ia(l),n=Ie(b,m);if(n<=a.ra){b={};if("Circle"===g.geometry.S()&&1===g.index)a.ua=!0,rx(a,l);else for(n=c.Ia(h[0]),g=c.Ia(h[1]),c=He(m,n),m=He(m,g),n=Math.sqrt(Math.min(c,m)),a.ua=n<=a.ra,a.ua&&(l=c>m?h[1]:h[0]),rx(a,l),m=1,c=f.length;m<c;++m)if(l=f[m].ma,Ee(h[0],l[0])&&Ee(h[1],l[1])||Ee(h[0],l[1])&&Ee(h[1],l[0]))b[x(l)]=!0;else break;
b[x(h)]=!0;a.La=b;return}}a.f&&(a.B.ha().Lb(a.f),a.f=null)}function ux(a,b){var c=b.geometry;return"Circle"===c.S()&&1===b.index?(a=He(c.xa(),a),c=Math.sqrt(a)-c.Bd(),c*c):Je(a,b.ma)}function tx(a,b){var c=b.geometry;return"Circle"===c.S()&&1===b.index?c.Ib(a):Be(a,b.ma)}
k.Em=function(a,b){for(var c=a.ma,d=a.feature,e=a.geometry,f=a.depth,g=a.index,h;b.length<e.pa();)b.push(0);switch(e.S()){case "MultiLineString":h=e.W();h[f[0]].splice(g+1,0,b);break;case "Polygon":h=e.W();h[f[0]].splice(g+1,0,b);break;case "MultiPolygon":h=e.W();h[f[1]][f[0]].splice(g+1,0,b);break;case "LineString":h=e.W();h.splice(g+1,0,b);break;default:return}this.s=!0;e.na(h);this.s=!1;h=this.a;h.remove(a);vx(this,e,g,f,1);a={ma:[c[0],b],feature:d,geometry:e,depth:f,index:g};h.Ca(Ca(a.ma),a);
this.j.push([a,1]);b={ma:[b,c[1]],feature:d,geometry:e,depth:f,index:g+1};h.Ca(Ca(b.ma),b);this.j.push([b,0]);this.T=!0};
k.Dj=function(){if(this.O&&"pointerdrag"!=this.O.type){var a=this.O;nx(this,a);var b=this.j,c={},d,e;for(e=b.length-1;0<=e;--e){var f=b[e];var g=f[0];var h=x(g.feature);g.depth&&(h+="-"+g.depth.join("-"));h in c||(c[h]={});0===f[1]?(c[h].right=g,c[h].index=g.index):1==f[1]&&(c[h].left=g,c[h].index=g.index+1)}for(h in c){var l=c[h].right;var m=c[h].left;e=c[h].index;var n=e-1;g=void 0!==m?m:l;0>n&&(n=0);f=g.geometry;var p=d=f.W();var q=!1;switch(f.S()){case "MultiLineString":2<d[g.depth[0]].length&&
(d[g.depth[0]].splice(e,1),q=!0);break;case "LineString":2<d.length&&(d.splice(e,1),q=!0);break;case "MultiPolygon":p=p[g.depth[1]];case "Polygon":p=p[g.depth[0]],4<p.length&&(e==p.length-1&&(e=0),p.splice(e,1),q=!0,0===e&&(p.pop(),p.push(p[0]),n=p.length-1))}q&&(q=f,this.s=!0,q.na(d),this.s=!1,d=[],void 0!==m&&(this.a.remove(m),d.push(m.ma[0])),void 0!==l&&(this.a.remove(l),d.push(l.ma[1])),void 0!==m&&void 0!==l&&(m={depth:g.depth,feature:g.feature,geometry:g.geometry,index:n,ma:d},this.a.Ca(Ca(m.ma),
m)),vx(this,f,e,g.depth,-1),this.f&&(this.B.ha().Lb(this.f),this.f=null),b.length=0)}this.b(new ox("modifyend",this.o,a));this.C=!1;return!0}return!1};function vx(a,b,c,d,e){zm(a.a,b.G(),function(a){a.geometry===b&&(void 0===d||void 0===a.depth||jc(a.depth,d))&&a.index>c&&(a.index+=e)})}function lx(){var a=Gk();return function(){return a.Point}}function ox(a,b,c){Qc.call(this,a);this.features=b;this.mapBrowserEvent=c}w(ox,Qc);function wx(a){Jg.call(this,{handleEvent:xx});a=a?a:{};this.C=a.condition?a.condition:$g;this.D=a.addCondition?a.addCondition:Se;this.B=a.removeCondition?a.removeCondition:Se;this.T=a.toggleCondition?a.toggleCondition:bh;this.s=a.multi?a.multi:!1;this.l=a.filter?a.filter:Re;this.j=a.hitTolerance?a.hitTolerance:0;this.f=new T({source:new U({useSpatialIndex:!1,features:a.features,wrapX:a.wrapX}),style:a.style?a.style:yx(),updateWhileAnimating:!0,updateWhileInteracting:!0});if(a.layers)if("function"===
typeof a.layers)a=a.layers;else{var b=a.layers;a=function(a){return ec(b,a)}}else a=Re;this.o=a;this.a={};a=this.f.ha().i;y(a,"add",this.ko,this);y(a,"remove",this.oo,this)}w(wx,Jg);k=wx.prototype;k.lo=function(){return this.f.ha().i};k.mo=function(){return this.j};k.no=function(a){a=x(a);return this.a[a]};
function xx(a){if(!this.C(a))return!0;var b=this.D(a),c=this.B(a),d=this.T(a),e=!b&&!c&&!d,f=a.map,g=this.f.ha().i,h=[],l=[];if(e){lb(this.a);f.Tc(a.pixel,function(a,b){if(this.l(a,b))return l.push(a),a=x(a),this.a[a]=b,!this.s}.bind(this),{layerFilter:this.o,hitTolerance:this.j});for(e=g.kc()-1;0<=e;--e){f=g.item(e);var m=l.indexOf(f);-1<m?l.splice(m,1):(g.remove(f),h.push(f))}0!==l.length&&g.qg(l)}else{f.Tc(a.pixel,function(a,e){if(this.l(a,e))return!b&&!d||ec(g.a,a)?(c||d)&&ec(g.a,a)&&(h.push(a),
e=x(a),delete this.a[e]):(l.push(a),a=x(a),this.a[a]=e),!this.s}.bind(this),{layerFilter:this.o,hitTolerance:this.j});for(e=h.length-1;0<=e;--e)g.remove(h[e]);g.qg(l)}(0<l.length||0<h.length)&&this.b(new zx(Ax,l,h,a));return Zg(a)}k.po=function(a){this.j=a};k.setMap=function(a){var b=this.v,c=this.f.ha().i;b&&c.forEach(b.Zj,b);Jg.prototype.setMap.call(this,a);this.f.setMap(a);a&&c.forEach(a.Uj,a)};
function yx(){var a=Gk();gc(a.Polygon,a.LineString);gc(a.GeometryCollection,a.LineString);return function(b){return b.U()?a[b.U().S()]:null}}k.ko=function(a){var b=this.v;b&&b.Uj(a.element)};k.oo=function(a){var b=this.v;b&&b.Zj(a.element)};function zx(a,b,c,d){Qc.call(this,a);this.selected=b;this.deselected=c;this.mapBrowserEvent=d}w(zx,Qc);var Ax="select";function Bx(a){fh.call(this,{handleEvent:Cx,handleDownEvent:Re,handleUpEvent:Dx});a=a?a:{};this.s=a.source?a.source:null;this.O=void 0!==a.vertex?a.vertex:!0;this.C=void 0!==a.edge?a.edge:!0;this.j=a.features?a.features:null;this.ra=[];this.B={};this.V={};this.o={};this.T=null;this.f=void 0!==a.pixelTolerance?a.pixelTolerance:10;this.ua=Ex.bind(this);this.a=new um;this.ca={Point:this.wo,LineString:this.Pi,LinearRing:this.Pi,Polygon:this.xo,MultiPoint:this.uo,MultiLineString:this.to,MultiPolygon:this.vo,
GeometryCollection:this.so,Circle:this.ro}}w(Bx,fh);k=Bx.prototype;k.Gb=function(a,b){b=void 0!==b?b:!0;var c=x(a),d=a.U();if(d){var e=this.ca[d.S()];e&&(this.V[c]=d.G(Da()),e.call(this,a,d))}b&&(this.B[c]=y(a,"change",this.qo,this))};k.bl=function(a){this.Gb(a)};k.cl=function(a){this.Lb(a)};k.Ni=function(a){if(a instanceof Bw)var b=a.feature;else a instanceof cd&&(b=a.element);this.Gb(b)};k.Oi=function(a){if(a instanceof Bw)var b=a.feature;else a instanceof cd&&(b=a.element);this.Lb(b)};
k.qo=function(a){a=a.target;if(this.D){var b=x(a);b in this.o||(this.o[b]=a)}else this.$j(a)};k.Lb=function(a,b){b=void 0!==b?b:!0;var c=x(a),d=this.V[c];if(d){var e=this.a,f=[];zm(e,d,function(b){a===b.feature&&f.push(b)});for(d=f.length-1;0<=d;--d)e.remove(f[d])}b&&(Gc(this.B[c]),delete this.B[c])};
k.setMap=function(a){var b=this.v,c=this.ra,d;this.j?d=this.j:this.s&&(d=this.s.ee());b&&(c.forEach(Gc),c.length=0,d.forEach(this.cl,this));fh.prototype.setMap.call(this,a);a&&(this.j?c.push(y(this.j,"add",this.Ni,this),y(this.j,"remove",this.Oi,this)):this.s&&c.push(y(this.s,"addfeature",this.Ni,this),y(this.s,"removefeature",this.Oi,this)),d.forEach(this.bl,this))};k.jd=Se;
function Fx(a,b,c,d){var e=d.Ra([b[0]-a.f,b[1]+a.f]),f=d.Ra([b[0]+a.f,b[1]-a.f]);e=Ca([e,f]);var g=xm(a.a,e);a.O&&!a.C&&(g=g.filter(function(a){return"Circle"!==a.feature.U().S()}));var h=!1;e=!1;var l=f=null;if(0<g.length){a.T=c;g.sort(a.ua);var m=g[0].ma;h="Circle"===g[0].feature.U().S();if(a.O&&!a.C){if(c=d.Ia(m[0]),h=d.Ia(m[1]),c=He(b,c),b=He(b,h),h=Math.sqrt(Math.min(c,b)),h=h<=a.f)e=!0,f=c>b?m[1]:m[0],l=d.Ia(f)}else a.C&&(f=h?Ae(c,g[0].feature.U()):Be(c,m),l=d.Ia(f),Ie(b,l)<=a.f&&(e=!0,a.O&&
!h&&(c=d.Ia(m[0]),h=d.Ia(m[1]),c=He(l,c),b=He(l,h),h=Math.sqrt(Math.min(c,b)),h=h<=a.f)))&&(f=c>b?m[1]:m[0],l=d.Ia(f));e&&(l=[Math.round(l[0]),Math.round(l[1])])}return{Mq:e,vertex:f,Vq:l}}k.$j=function(a){this.Lb(a,!1);this.Gb(a,!1)};k.ro=function(a,b){b=Sf(b).W()[0];var c;var d=0;for(c=b.length-1;d<c;++d){var e=b.slice(d,d+2);var f={feature:a,ma:e};this.a.Ca(Ca(e),f)}};k.so=function(a,b){var c=b.a;for(b=0;b<c.length;++b){var d=this.ca[c[b].S()];d&&d.call(this,a,c[b])}};
k.Pi=function(a,b){b=b.W();var c;var d=0;for(c=b.length-1;d<c;++d){var e=b.slice(d,d+2);var f={feature:a,ma:e};this.a.Ca(Ca(e),f)}};k.to=function(a,b){b=b.W();var c,d;var e=0;for(d=b.length;e<d;++e){var f=b[e];var g=0;for(c=f.length-1;g<c;++g){var h=f.slice(g,g+2);var l={feature:a,ma:h};this.a.Ca(Ca(h),l)}}};k.uo=function(a,b){var c=b.W(),d;var e=0;for(d=c.length;e<d;++e){var f=c[e];f={feature:a,ma:[f,f]};this.a.Ca(b.G(),f)}};
k.vo=function(a,b){b=b.W();var c,d,e;var f=0;for(e=b.length;f<e;++f){var g=b[f];var h=0;for(d=g.length;h<d;++h){var l=g[h];var m=0;for(c=l.length-1;m<c;++m){var n=l.slice(m,m+2);var p={feature:a,ma:n};this.a.Ca(Ca(n),p)}}}};k.wo=function(a,b){var c=b.W();a={feature:a,ma:[c,c]};this.a.Ca(b.G(),a)};k.xo=function(a,b){b=b.W();var c,d;var e=0;for(d=b.length;e<d;++e){var f=b[e];var g=0;for(c=f.length-1;g<c;++g){var h=f.slice(g,g+2);var l={feature:a,ma:h};this.a.Ca(Ca(h),l)}}};
function Cx(a){var b=Fx(this,a.pixel,a.coordinate,a.map);b.Mq&&(a.coordinate=b.vertex.slice(0,2),a.pixel=b.Vq);return gh.call(this,a)}function Dx(){var a=mb(this.o);a.length&&(a.forEach(this.$j,this),this.o={});return!1}function Ex(a,b){return Je(this.T,a.ma)-Je(this.T,b.ma)};function Gx(a){fh.call(this,{handleDownEvent:Hx,handleDragEvent:Ix,handleMoveEvent:Jx,handleUpEvent:Kx});a=a?a:{};this.a=null;this.j=void 0!==a.features?a.features:null;if(a.layers)if("function"===typeof a.layers)var b=a.layers;else{var c=a.layers;b=function(a){return ec(c,a)}}else b=Re;this.C=b;this.s=a.hitTolerance?a.hitTolerance:0;this.f=null;y(this,Xc("active"),this.o,this)}w(Gx,fh);
function Hx(a){this.f=Lx(this,a.pixel,a.map);if(!this.a&&this.f){this.a=a.coordinate;Jx.call(this,a);var b=this.j||new B([this.f]);this.b(new Mx("translatestart",b,a.coordinate));return!0}return!1}function Kx(a){if(this.a){this.a=null;Jx.call(this,a);var b=this.j||new B([this.f]);this.b(new Mx("translateend",b,a.coordinate));return!0}return!1}
function Ix(a){if(this.a){a=a.coordinate;var b=a[0]-this.a[0],c=a[1]-this.a[1],d=this.j||new B([this.f]);d.forEach(function(a){var d=a.U();d.translate(b,c);a.Va(d)});this.a=a;this.b(new Mx("translating",d,a))}}function Jx(a){var b=a.map.a;Lx(this,a.pixel,a.map)?(b.classList.remove(this.a?"ol-grab":"ol-grabbing"),b.classList.add(this.a?"ol-grabbing":"ol-grab")):b.classList.remove("ol-grab","ol-grabbing")}
function Lx(a,b,c){return c.Tc(b,function(a){if(!this.j||ec(this.j.a,a))return a}.bind(a),{layerFilter:a.C,hitTolerance:a.s})}Gx.prototype.B=function(){return this.s};Gx.prototype.T=function(a){this.s=a};Gx.prototype.setMap=function(a){var b=this.v;fh.prototype.setMap.call(this,a);Nx(this,b)};Gx.prototype.o=function(){Nx(this,null)};function Nx(a,b){var c=a.v;a=a.c();c&&a||(c=c||b)&&c.a.classList.remove("ol-grab","ol-grabbing")}
function Mx(a,b,c){Qc.call(this,a);this.features=b;this.coordinate=c}w(Mx,Qc);function V(a){a=a?a:{};var b=kb({},a);delete b.gradient;delete b.radius;delete b.blur;delete b.shadow;delete b.weight;T.call(this,b);this.c=null;this.$=void 0!==a.shadow?a.shadow:250;this.O=void 0;this.T=null;y(this,Xc(Ox),this.cm,this);this.Lj(a.gradient?a.gradient:Px);this.Fj(void 0!==a.blur?a.blur:15);this.fd(void 0!==a.radius?a.radius:8);y(this,Xc(Qx),this.mg,this);y(this,Xc(Rx),this.mg,this);this.mg();var c=a.weight?a.weight:"weight",d;"string"===typeof c?d=function(a){return a.get(c)}:d=c;this.j(function(a){a=
d(a);a=void 0!==a?pa(a,0,1):1;var b=255*a|0,c=this.T[b];c||(c=[new Bk({image:new dr({opacity:a,src:this.O})})],this.T[b]=c);return c}.bind(this));this.set(ik,null);y(this,"render",this.tm,this)}w(V,T);var Px=["#00f","#0ff","#0f0","#ff0","#f00"];k=V.prototype;k.Nh=function(){return this.get(Qx)};k.Uh=function(){return this.get(Ox)};k.Ri=function(){return this.get(Rx)};
k.cm=function(){for(var a=this.Uh(),b=hg(1,256),c=b.createLinearGradient(0,0,1,256),d=1/(a.length-1),e=0,f=a.length;e<f;++e)c.addColorStop(e*d,a[e]);b.fillStyle=c;b.fillRect(0,0,1,256);this.c=b.getImageData(0,0,1,256).data};k.mg=function(){var a=this.Ri(),b=this.Nh(),c=a+b+1,d=2*c;d=hg(d,d);d.shadowOffsetX=d.shadowOffsetY=this.$;d.shadowBlur=b;d.shadowColor="#000";d.beginPath();b=c-this.$;d.arc(b,b,a,0,2*Math.PI,!0);d.fill();this.O=d.canvas.toDataURL();this.T=Array(256);this.u()};
k.tm=function(a){a=a.context;var b=a.canvas;b=a.getImageData(0,0,b.width,b.height);var c=b.data,d,e;var f=0;for(d=c.length;f<d;f+=4)if(e=4*c[f+3])c[f]=this.c[e],c[f+1]=this.c[e+1],c[f+2]=this.c[e+2];a.putImageData(b,0,0)};k.Fj=function(a){this.set(Qx,a)};k.Lj=function(a){this.set(Ox,a)};k.fd=function(a){this.set(Rx,a)};var Qx="blur",Ox="gradient",Rx="radius";function Sx(a){xg.call(this,a?a:{});this.type="IMAGE"}w(Sx,xg);function Tx(a){a=a?a:{};var b=kb({},a);delete b.preload;delete b.useInterimTilesOnError;xg.call(this,b);this.j(void 0!==a.preload?a.preload:0);this.C(void 0!==a.useInterimTilesOnError?a.useInterimTilesOnError:!0);this.type="TILE"}w(Tx,xg);Tx.prototype.c=function(){return this.get("preload")};Tx.prototype.j=function(a){this.set("preload",a)};Tx.prototype.i=function(){return this.get("useInterimTilesOnError")};Tx.prototype.C=function(a){this.set("useInterimTilesOnError",a)};function W(a){a=a?a:{};var b=a.renderMode||"hybrid";oa(void 0==b||"image"==b||"hybrid"==b||"vector"==b,28);a.declutter&&"image"==b&&(b="hybrid");a.renderMode=b;b=kb({},a);delete b.preload;delete b.useInterimTilesOnError;T.call(this,b);this.T(a.preload?a.preload:0);this.O(a.useInterimTilesOnError?a.useInterimTilesOnError:!0);this.type="VECTOR_TILE"}w(W,T);W.prototype.c=function(){return this.get("preload")};W.prototype.i=function(){return this.get("useInterimTilesOnError")};
W.prototype.T=function(a){this.set("preload",a)};W.prototype.O=function(a){this.set("useInterimTilesOnError",a)};function Ux(a,b){var c=/\{z\}/g,d=/\{x\}/g,e=/\{y\}/g,f=/\{-y\}/g;return function(g){if(g)return a.replace(c,g[0].toString()).replace(d,g[1].toString()).replace(e,function(){return(-g[2]-1).toString()}).replace(f,function(){var a=b.a?b.a[g[0]]:null;oa(a,55);return(a.ka-a.ea+1+g[2]).toString()})}}function Vx(a,b){for(var c=a.length,d=Array(c),e=0;e<c;++e)d[e]=Ux(a[e],b);return Wx(d)}function Wx(a){return 1===a.length?a[0]:function(b,c,d){if(b)return a[wa((b[1]<<b[0])+b[2],a.length)](b,c,d)}}
function Xx(){}function Yx(a){var b=[],c=/\{([a-z])-([a-z])\}/.exec(a);if(c){var d=c[2].charCodeAt(0),e;for(e=c[1].charCodeAt(0);e<=d;++e)b.push(a.replace(c[0],String.fromCharCode(e)));return b}if(c=c=/\{(\d+)-(\d+)\}/.exec(a)){d=parseInt(c[2],10);for(e=parseInt(c[1],10);e<=d;e++)b.push(a.replace(c[0],e.toString()));return b}b.push(a);return b};function Zx(a,b,c,d){function e(){delete window[g];f.parentNode.removeChild(f)}var f=document.createElement("script"),g="olc_"+x(b);f.async=!0;f.src=a+(-1==a.indexOf("?")?"?":"&")+(d||"callback")+"="+g;var h=setTimeout(function(){e();c&&c()},1E4);window[g]=function(a){clearTimeout(h);e();b(a)};document.getElementsByTagName("head")[0].appendChild(f)};function $x(a){ci.call(this,a)}w($x,ci);$x.prototype.sd=function(a){for(var b,c;di(this);){b=this.g.Pc;c=b.ya[0].toString();var d;if(d=c in a)b=b.ya,d=ma(a[c],b[1],b[2]);if(d)break;else Pc(this.pop())}};function ay(a){if(0!==a.i){var b=a.c.jc.split("/").map(Number)[0];a.forEach(function(a){if(a.ya[0]!==b){var c=a.ya;this.remove(c[0]+"/"+c[1]+"/"+c[2]);Pc(a)}},a)}};function by(a,b,c,d){var e=ac(c,b,a);c=Nb(b,d,c);b=b.Bc();void 0!==b&&(c*=b);b=a.Bc();void 0!==b&&(c/=b);b=a.G();if(!b||Ja(b,e))a=Nb(a,c,e)/c,isFinite(a)&&0<a&&(c/=a);return c}function cy(a,b,c,d){a=c-a;b=d-b;var e=Math.sqrt(a*a+b*b);return[Math.round(c+a/e),Math.round(d+b/e)]}
function dy(a,b,c,d,e,f,g,h,l,m,n){var p=hg(Math.round(c*a),Math.round(c*b));if(0===l.length)return p.canvas;p.scale(c,c);var q=Da();l.forEach(function(a){Ta(q,a.extent)});var r=hg(Math.round(c*cb(q)/d),Math.round(c*db(q)/d)),u=c/d;l.forEach(function(a){r.drawImage(a.image,m,m,a.image.width-2*m,a.image.height-2*m,(a.extent[0]-q[0])*u,-(a.extent[3]-q[3])*u,cb(a.extent)*u,db(a.extent)*u)});var v=$a(g);h.c.forEach(function(a){var b=a.source,e=a.target,g=b[1][0],h=b[1][1],l=b[2][0],m=b[2][1];a=(e[0][0]-
v[0])/f;var n=-(e[0][1]-v[1])/f,u=(e[1][0]-v[0])/f,z=-(e[1][1]-v[1])/f,Va=(e[2][0]-v[0])/f,ic=-(e[2][1]-v[1])/f;e=b[0][0];b=b[0][1];g-=e;h-=b;l-=e;m-=b;a:{g=[[g,h,0,0,u-a],[l,m,0,0,Va-a],[0,0,g,h,z-n],[0,0,l,m,ic-n]];h=g.length;for(l=0;l<h;l++){m=l;for(var Xa=Math.abs(g[l][l]),Z=l+1;Z<h;Z++){var Zb=Math.abs(g[Z][l]);Zb>Xa&&(Xa=Zb,m=Z)}if(0===Xa){g=null;break a}Xa=g[m];g[m]=g[l];g[l]=Xa;for(m=l+1;m<h;m++)for(Xa=-g[m][l]/g[l][l],Z=l;Z<h+1;Z++)g[m][Z]=l==Z?0:g[m][Z]+Xa*g[l][Z]}l=Array(h);for(m=h-1;0<=
m;m--)for(l[m]=g[m][h]/g[m][m],Xa=m-1;0<=Xa;Xa--)g[Xa][h]-=g[Xa][m]*l[m];g=l}g&&(p.save(),p.beginPath(),l=(a+u+Va)/3,m=(n+z+ic)/3,h=cy(l,m,a,n),u=cy(l,m,u,z),Va=cy(l,m,Va,ic),p.moveTo(u[0],u[1]),p.lineTo(h[0],h[1]),p.lineTo(Va[0],Va[1]),p.clip(),p.transform(g[0],g[2],g[1],g[3],a,n),p.translate(q[0]-e,q[3]-b),p.scale(d/c,-d/c),p.drawImage(r.canvas,0,0),p.restore())});n&&(p.save(),p.strokeStyle="black",p.lineWidth=1,h.c.forEach(function(a){var b=a.target;a=(b[0][0]-v[0])/f;var c=-(b[0][1]-v[1])/f,d=
(b[1][0]-v[0])/f,e=-(b[1][1]-v[1])/f,g=(b[2][0]-v[0])/f;b=-(b[2][1]-v[1])/f;p.beginPath();p.moveTo(d,e);p.lineTo(a,c);p.lineTo(g,b);p.closePath();p.stroke()}),p.restore());return p.canvas};function ey(a,b,c,d,e){this.g=a;this.i=b;var f={},g=Yb(this.i,this.g);this.a=function(a){var b=a[0]+"/"+a[1];f[b]||(f[b]=g(a));return f[b]};this.f=d;this.v=e*e;this.c=[];this.l=!1;this.s=this.g.g&&!!d&&!!this.g.G()&&cb(d)==cb(this.g.G());this.b=this.g.G()?cb(this.g.G()):null;this.j=this.i.G()?cb(this.i.G()):null;a=$a(c);b=Za(c);d=Ya(c);c=Wa(c);e=this.a(a);var h=this.a(b),l=this.a(d),m=this.a(c);fy(this,a,b,d,c,e,h,l,m,10);if(this.l){var n=Infinity;this.c.forEach(function(a){n=Math.min(n,a.source[0][0],
a.source[1][0],a.source[2][0])});this.c.forEach(function(a){if(Math.max(a.source[0][0],a.source[1][0],a.source[2][0])-n>this.b/2){var b=[[a.source[0][0],a.source[0][1]],[a.source[1][0],a.source[1][1]],[a.source[2][0],a.source[2][1]]];b[0][0]-n>this.b/2&&(b[0][0]-=this.b);b[1][0]-n>this.b/2&&(b[1][0]-=this.b);b[2][0]-n>this.b/2&&(b[2][0]-=this.b);Math.max(b[0][0],b[1][0],b[2][0])-Math.min(b[0][0],b[1][0],b[2][0])<this.b/2&&(a.source=b)}},this)}f={}}
function fy(a,b,c,d,e,f,g,h,l,m){var n=Ca([f,g,h,l]),p=a.b?cb(n)/a.b:null,q=a.b,r=a.g.g&&.5<p&&1>p,u=!1;if(0<m){if(a.i.c&&a.j){var v=Ca([b,c,d,e]);u|=.25<cb(v)/a.j}!r&&a.g.c&&p&&(u|=.25<p)}if(u||!a.f||hb(n,a.f)){if(!(u||isFinite(f[0])&&isFinite(f[1])&&isFinite(g[0])&&isFinite(g[1])&&isFinite(h[0])&&isFinite(h[1])&&isFinite(l[0])&&isFinite(l[1])))if(0<m)u=!0;else return;if(0<m&&(u||(n=a.a([(b[0]+d[0])/2,(b[1]+d[1])/2]),q=r?(wa(f[0],q)+wa(h[0],q))/2-wa(n[0],q):(f[0]+h[0])/2-n[0],n=(f[1]+h[1])/2-n[1],
u=q*q+n*n>a.v),u)){Math.abs(b[0]-d[0])<=Math.abs(b[1]-d[1])?(r=[(c[0]+d[0])/2,(c[1]+d[1])/2],q=a.a(r),n=[(e[0]+b[0])/2,(e[1]+b[1])/2],p=a.a(n),fy(a,b,c,r,n,f,g,q,p,m-1),fy(a,n,r,d,e,p,q,h,l,m-1)):(r=[(b[0]+c[0])/2,(b[1]+c[1])/2],q=a.a(r),n=[(d[0]+e[0])/2,(d[1]+e[1])/2],p=a.a(n),fy(a,b,r,n,e,f,q,p,l,m-1),fy(a,r,c,d,n,q,g,h,p,m-1));return}if(r){if(!a.s)return;a.l=!0}a.c.push({source:[f,h,l],target:[b,d,e]});a.c.push({source:[f,g,h],target:[b,c,d]})}}
function gy(a){var b=Da();a.c.forEach(function(a){a=a.source;Ea(b,a[0]);Ea(b,a[1]);Ea(b,a[2])});return b};function hy(a,b,c,d,e,f,g,h,l,m,n){cl.call(this,e,0);this.B=void 0!==n?n:!1;this.C=g;this.D=h;this.N=null;this.c=b;this.l=d;this.v=f?f:e;this.a=[];this.Id=null;this.f=0;f=d.Ma(this.v);h=this.l.G();e=this.c.G();f=h?gb(f,h):f;if(0===ab(f))this.state=4;else if((h=a.G())&&(e?e=gb(e,h):e=h),d=by(a,c,eb(f),d.Ta(this.v[0])),!isFinite(d)||0>=d)this.state=4;else if(this.o=new ey(a,c,f,e,d*(void 0!==m?m:.5)),0===this.o.c.length)this.state=4;else if(this.f=b.Dc(d),c=gy(this.o),e&&(a.g?(c[1]=pa(c[1],e[1],e[3]),
c[3]=pa(c[3],e[1],e[3])):c=gb(c,e)),ab(c)){a=tc(b,c,this.f);for(b=a.fa;b<=a.la;b++)for(c=a.ea;c<=a.ka;c++)(m=l(this.f,b,c,g))&&this.a.push(m);0===this.a.length&&(this.state=4)}else this.state=4}w(hy,cl);hy.prototype.ia=function(){1==this.state&&(this.Id.forEach(Gc),this.Id=null);cl.prototype.ia.call(this)};hy.prototype.Y=function(){return this.N};
hy.prototype.he=function(){var a=[];this.a.forEach(function(b){b&&2==b.getState()&&a.push({extent:this.c.Ma(b.ya),image:b.Y()})},this);this.a.length=0;if(0===a.length)this.state=3;else{var b=this.v[0],c=this.l.Za(b),d="number"===typeof c?c:c[0];c="number"===typeof c?c:c[1];b=this.l.Ta(b);var e=this.c.Ta(this.f),f=this.l.Ma(this.v);this.N=dy(d,c,this.C,e,this.c.G(),b,f,this.o,a,this.D,this.B);this.state=2}this.u()};
hy.prototype.load=function(){if(0==this.state){this.state=1;this.u();var a=0;this.Id=[];this.a.forEach(function(b){var c=b.getState();if(0==c||1==c){a++;var d=y(b,"change",function(){var c=b.getState();if(2==c||3==c||4==c)Gc(d),a--,0===a&&(this.Id.forEach(Gc),this.Id=null,this.he())},this);this.Id.push(d)}},this);this.a.forEach(function(a){0==a.getState()&&a.load()});0===a&&setTimeout(this.he.bind(this),0)}};function iy(a){uw.call(this,{attributions:a.attributions,extent:a.extent,logo:a.logo,projection:a.projection,state:a.state,wrapX:a.wrapX});this.bb=void 0!==a.opaque?a.opaque:!1;this.sc=void 0!==a.tilePixelRatio?a.tilePixelRatio:1;this.tileGrid=void 0!==a.tileGrid?a.tileGrid:null;this.a=new $x(a.cacheSize);this.j=[0,0];this.jc="";this.Ea={transition:a.transition}}w(iy,uw);k=iy.prototype;k.cj=function(){return di(this.a)};k.sd=function(a,b){(a=this.Yd(a))&&a.sd(b)};
function Li(a,b,c,d,e){a=a.Yd(b);if(!a)return!1;b=!0;for(var f,g,h=d.fa;h<=d.la;++h)for(var l=d.ea;l<=d.ka;++l)f=c+"/"+h+"/"+l,g=!1,a.a.hasOwnProperty(f)&&(f=a.get(f),(g=2===f.getState())&&(g=!1!==e(f))),g||(b=!1);return b}k.Zf=function(){return 0};function jy(a,b){a.jc!==b&&(a.jc=b,a.u())}k.eg=function(){return this.bb};k.jb=function(){return this.tileGrid};k.eb=function(a){return this.tileGrid?this.tileGrid:zc(a)};k.Yd=function(a){var b=this.c;return b&&!Xb(b,a)?null:this.a};k.Xc=function(){return this.sc};
k.Zd=function(a,b,c){c=this.eb(c);b=this.Xc(b);a=Ba(c.Za(a),this.j);return 1==b?a:Aa(a,b,this.j)};function ky(a,b,c){var d=void 0!==c?c:a.c;c=a.eb(d);if(a.D&&d.c){var e=b;b=e[0];a=yc(c,e);d=Dc(d);Ja(d,a)?b=e:(e=cb(d),a[0]+=e*Math.ceil((d[0]-a[0])/e),b=c.jg(a,b))}e=b[0];d=b[1];a=b[2];if(c.minZoom>e||e>c.maxZoom)c=!1;else{var f=c.G();c=(c=f?tc(c,f,e):c.a?c.a[e]:null)?ma(c,d,a):!0}return c?b:null}k.sa=function(){this.a.clear();this.u()};k.kh=ea;function ly(a,b){Qc.call(this,a);this.tile=b}w(ly,Qc);function my(a){iy.call(this,{attributions:a.attributions,cacheSize:a.cacheSize,extent:a.extent,logo:a.logo,opaque:a.opaque,projection:a.projection,state:a.state,tileGrid:a.tileGrid,tilePixelRatio:a.tilePixelRatio,wrapX:a.wrapX,transition:a.transition});this.tileLoadFunction=a.tileLoadFunction;this.tileUrlFunction=this.dc?this.dc.bind(this):Xx;this.urls=null;a.urls?this.vb(a.urls):a.url&&this.rb(a.url);a.tileUrlFunction&&this.hb(a.tileUrlFunction);this.V={}}w(my,iy);k=my.prototype;k.yb=function(){return this.tileLoadFunction};
k.zb=function(){return this.tileUrlFunction};k.Ab=function(){return this.urls};k.dj=function(a){a=a.target;var b=x(a),c=a.getState();if(1==c){this.V[b]=!0;var d="tileloadstart"}else b in this.V&&(delete this.V[b],d=3==c?"tileloaderror":2==c||5==c?"tileloadend":void 0);void 0!=d&&this.b(new ly(d,a))};k.Fb=function(a){this.a.clear();this.tileLoadFunction=a;this.u()};k.hb=function(a,b){this.tileUrlFunction=a;ay(this.a);"undefined"!==typeof b?jy(this,b):this.u()};
k.rb=function(a){var b=this.urls=Yx(a);this.hb(this.dc?this.dc.bind(this):Vx(b,this.tileGrid),a)};k.vb=function(a){this.urls=a;var b=a.join("\n");this.hb(this.dc?this.dc.bind(this):Vx(a,this.tileGrid),b)};k.kh=function(a,b,c){a=a+"/"+b+"/"+c;this.a.a.hasOwnProperty(a)&&this.a.get(a)};function ny(a){my.call(this,{attributions:a.attributions,cacheSize:a.cacheSize,extent:a.extent,logo:a.logo,opaque:a.opaque,projection:a.projection,state:a.state,tileGrid:a.tileGrid,tileLoadFunction:a.tileLoadFunction?a.tileLoadFunction:oy,tilePixelRatio:a.tilePixelRatio,tileUrlFunction:a.tileUrlFunction,url:a.url,urls:a.urls,wrapX:a.wrapX,transition:a.transition});this.crossOrigin=void 0!==a.crossOrigin?a.crossOrigin:null;this.tileClass=void 0!==a.tileClass?a.tileClass:el;this.f={};this.s={};this.ob=
a.reprojectionErrorThreshold;this.O=!1}w(ny,my);k=ny.prototype;k.cj=function(){if(di(this.a))return!0;for(var a in this.f)if(di(this.f[a]))return!0;return!1};k.sd=function(a,b){a=this.Yd(a);this.a.sd(this.a==a?b:{});for(var c in this.f){var d=this.f[c];d.sd(d==a?b:{})}};k.Zf=function(a){return this.c&&a&&!Xb(this.c,a)?0:this.$f()};k.$f=function(){return 0};k.eg=function(a){return this.c&&a&&!Xb(this.c,a)?!1:my.prototype.eg.call(this,a)};
k.eb=function(a){var b=this.c;return!this.tileGrid||b&&!Xb(b,a)?(b=x(a).toString(),b in this.s||(this.s[b]=zc(a)),this.s[b]):this.tileGrid};k.Yd=function(a){var b=this.c;if(!b||Xb(b,a))return this.a;a=x(a).toString();a in this.f||(this.f[a]=new $x(this.a.highWaterMark));return this.f[a]};
function py(a,b,c,d,e,f,g){b=[b,c,d];e=(c=ky(a,b,f))?a.tileUrlFunction(c,e,f):void 0;e=new a.tileClass(b,void 0!==e?0:4,void 0!==e?e:"",a.crossOrigin,a.tileLoadFunction,a.Ea);e.key=g;y(e,"change",a.dj,a);return e}
k.ad=function(a,b,c,d,e){var f=this.c;if(f&&e&&!Xb(f,e)){var g=this.Yd(e);c=[a,b,c];var h;a=c[0]+"/"+c[1]+"/"+c[2];g.a.hasOwnProperty(a)&&(h=g.get(a));b=this.jc;if(h&&h.key==b)return h;var l=this.eb(f),m=this.eb(e),n=ky(this,c,e);d=new hy(f,l,e,m,c,n,this.Xc(d),this.$f(),function(a,b,c,d){return qy(this,a,b,c,d,f)}.bind(this),this.ob,this.O);d.key=b;h?(d.g=h,dl(d),g.replace(a,d)):g.set(a,d);return d}return qy(this,a,b,c,d,f||e)};
function qy(a,b,c,d,e,f){var g=b+"/"+c+"/"+d,h=a.jc;if(a.a.a.hasOwnProperty(g)){var l=a.a.get(g);if(l.key!=h){var m=l;l=py(a,b,c,d,e,f,h);0==m.getState()?l.g=m.g:l.g=m;dl(l);a.a.replace(g,l)}}else l=py(a,b,c,d,e,f,h),a.a.set(g,l);return l}k.Qb=function(a){if(this.O!=a){this.O=a;for(var b in this.f)this.f[b].clear();this.u()}};k.Rb=function(a,b){if(a=Ob(a))a=x(a).toString(),a in this.s||(this.s[a]=b)};function oy(a,b){a.Y().src=b};function ry(a){this.i=void 0!==a.hidpi?a.hidpi:!1;ny.call(this,{cacheSize:a.cacheSize,crossOrigin:"anonymous",opaque:!0,projection:Ob("EPSG:3857"),reprojectionErrorThreshold:a.reprojectionErrorThreshold,state:"loading",tileLoadFunction:a.tileLoadFunction,tilePixelRatio:this.i?2:1,wrapX:void 0!==a.wrapX?a.wrapX:!0,transition:a.transition});this.o=void 0!==a.culture?a.culture:"en-us";this.$=void 0!==a.maxZoom?a.maxZoom:-1;this.l=a.key;this.B=a.imagerySet;Zx("https://dev.virtualearth.net/REST/v1/Imagery/Metadata/"+
this.B+"?uriScheme=https&include=ImageryProviders&key="+this.l+"&c="+this.o,this.La.bind(this),void 0,"jsonp")}w(ry,ny);ry.prototype.ca=function(){return this.l};ry.prototype.ua=function(){return this.B};
ry.prototype.La=function(a){if(200!=a.statusCode||"OK"!=a.statusDescription||"ValidCredentials"!=a.authenticationResultCode||1!=a.resourceSets.length||1!=a.resourceSets[0].resources.length)ww(this,"error");else{var b=a.brandLogoUri;-1==b.indexOf("https")&&(b=b.replace("http","https"));var c=a.resourceSets[0].resources[0];a=-1==this.$?c.zoomMax:this.$;var d=Dc(this.c);this.tileGrid=Bc({extent:d,minZoom:c.zoomMin,maxZoom:a,tileSize:(c.imageWidth==c.imageHeight?c.imageWidth:[c.imageWidth,c.imageHeight])/
(this.i?2:1)});var e=this.o,f=this.i;this.tileUrlFunction=Wx(c.imageUrlSubdomains.map(function(a){var b=[0,0,0],d=c.imageUrl.replace("{subdomain}",a).replace("{culture}",e);return function(a){if(a)return oc(a[0],a[1],-a[2]-1,b),a=d,f&&(a+="&dpi=d1&device=mobile"),a.replace("{quadkey}",pc(b))}}));if(c.imageryProviders){var g=Pb(Ob("EPSG:4326"),this.c);this.va(function(a){var b=[],d=a.viewState.zoom;c.imageryProviders.map(function(c){for(var e=!1,f=c.coverageAreas,h=0,l=f.length;h<l;++h){var m=f[h];
if(d>=m.zoomMin&&d<=m.zoomMax&&(m=m.bbox,m=jb([m[1],m[0],m[3],m[2]],g),hb(m,a.extent))){e=!0;break}}e&&b.push(c.attribution)});b.push('<a class="ol-attribution-bing-tos" href="https://www.microsoft.com/maps/product/terms.html">Terms of Use</a>');return b})}this.T=b;ww(this,"ready")}};function sy(a){a=a||{};var b=void 0!==a.projection?a.projection:"EPSG:3857",c=void 0!==a.tileGrid?a.tileGrid:Bc({extent:Dc(b),maxZoom:a.maxZoom,minZoom:a.minZoom,tileSize:a.tileSize});ny.call(this,{attributions:a.attributions,cacheSize:a.cacheSize,crossOrigin:a.crossOrigin,logo:a.logo,opaque:a.opaque,projection:b,reprojectionErrorThreshold:a.reprojectionErrorThreshold,tileGrid:c,tileLoadFunction:a.tileLoadFunction,tilePixelRatio:a.tilePixelRatio,tileUrlFunction:a.tileUrlFunction,url:a.url,urls:a.urls,
wrapX:void 0!==a.wrapX?a.wrapX:!0,transition:a.transition})}w(sy,ny);function ty(a){this.o=a.account;this.B=a.map||"";this.i=a.config||{};this.l={};sy.call(this,{attributions:a.attributions,cacheSize:a.cacheSize,crossOrigin:a.crossOrigin,logo:a.logo,maxZoom:void 0!==a.maxZoom?a.maxZoom:18,minZoom:a.minZoom,projection:a.projection,state:"loading",wrapX:a.wrapX});uy(this)}w(ty,sy);k=ty.prototype;k.nl=function(){return this.i};k.Sq=function(a){kb(this.i,a);uy(this)};k.uq=function(a){this.i=a||{};uy(this)};
function uy(a){var b=JSON.stringify(a.i);if(a.l[b])vy(a,a.l[b]);else{var c="https://"+a.o+".carto.com/api/v1/map";a.B&&(c+="/named/"+a.B);var d=new XMLHttpRequest;d.addEventListener("load",a.em.bind(a,b));d.addEventListener("error",a.dm.bind(a));d.open("POST",c);d.setRequestHeader("Content-type","application/json");d.send(JSON.stringify(a.i))}}
k.em=function(a,b){b=b.target;if(!b.status||200<=b.status&&300>b.status){try{var c=JSON.parse(b.responseText)}catch(d){ww(this,"error");return}vy(this,c);this.l[a]=c;ww(this,"ready")}else ww(this,"error")};k.dm=function(){ww(this,"error")};function vy(a,b){a.rb("https://"+b.cdn_url.https+"/"+a.o+"/api/v1/map/"+b.layergroupid+"/{z}/{x}/{y}.png")};function X(a){U.call(this,{attributions:a.attributions,extent:a.extent,logo:a.logo,projection:a.projection,wrapX:a.wrapX});this.resolution=void 0;this.distance=void 0!==a.distance?a.distance:20;this.features=[];this.geometryFunction=a.geometryFunction||function(a){a=a.U();oa(a instanceof C,10);return a};this.source=a.source;this.source.I("change",X.prototype.sa,this)}w(X,U);k=X.prototype;k.Eo=function(){return this.distance};k.Fo=function(){return this.source};
k.ae=function(a,b,c){this.source.ae(a,b,c);b!==this.resolution&&(this.clear(),this.resolution=b,wy(this),this.Qc(this.features))};k.vq=function(a){this.distance=a;this.sa()};k.sa=function(){this.clear();wy(this);this.Qc(this.features);U.prototype.sa.call(this)};
function wy(a){if(void 0!==a.resolution){a.features.length=0;for(var b=Da(),c=a.distance*a.resolution,d=a.source.ee(),e={},f=0,g=d.length;f<g;f++){var h=d[f];x(h).toString()in e||!(h=a.geometryFunction(h))||(h=h.W(),Pa(h,b),Fa(b,c,b),h=a.source.Yf(b),h=h.filter(function(a){a=x(a).toString();return a in e?!1:e[a]=!0}),a.features.push(xy(a,h)))}}}
function xy(a,b){for(var c=[0,0],d=b.length-1;0<=d;--d){var e=a.geometryFunction(b[d]);e?ze(c,e.W()):b.splice(d,1)}Ge(c,1/b.length);a=new Hk(new C(c));a.set("features",b);return a};function yy(a,b,c,d,e,f){this.s=b;this.l=a.G();var g=b.G(),h=g?gb(c,g):c;g=by(a,b,eb(h),d);this.f=new ey(a,b,h,this.l,.5*g);this.c=d;this.g=c;a=gy(this.f);this.j=(this.Tb=f(a,g,e))?this.Tb.a:1;this.je=this.i=null;e=2;this.Tb&&(e=0);$h.call(this,c,d,this.j,e)}w(yy,$h);yy.prototype.ia=function(){1==this.state&&(Gc(this.je),this.je=null);$h.prototype.ia.call(this)};yy.prototype.Y=function(){return this.i};
yy.prototype.he=function(){var a=this.Tb.getState();2==a&&(this.i=dy(cb(this.g)/this.c,db(this.g)/this.c,this.j,this.Tb.resolution,0,this.c,this.g,this.f,[{extent:this.Tb.G(),image:this.Tb.Y()}],0));this.state=a;this.u()};yy.prototype.load=function(){if(0==this.state){this.state=1;this.u();var a=this.Tb.getState();2==a||3==a?this.he():(this.je=y(this.Tb,"change",function(){var a=this.Tb.getState();if(2==a||3==a)Gc(this.je),this.je=null,this.he()},this),this.Tb.load())}};function zy(a){uw.call(this,{attributions:a.attributions,extent:a.extent,logo:a.logo,projection:a.projection,state:a.state});this.o=void 0!==a.resolutions?a.resolutions:null;this.i=null;this.ua=0}w(zy,uw);function Ay(a,b){a.o&&(b=a.o[fc(a.o,b,0)]);return b}
zy.prototype.Y=function(a,b,c,d){var e=this.c;if(e&&d&&!Xb(e,d)){if(this.i){if(this.ua==this.g&&Xb(this.i.s,d)&&this.i.resolution==b&&Sa(this.i.G(),a))return this.i;Pc(this.i);this.i=null}this.i=new yy(e,d,a,b,c,function(a,b,c){return this.Wc(a,b,c,e)}.bind(this));this.ua=this.g;return this.i}e&&(d=e);return this.Wc(a,b,c,d)};zy.prototype.j=function(a){a=a.target;switch(a.getState()){case 1:this.b(new By(Cy,a));break;case 2:this.b(new By(Dy,a));break;case 3:this.b(new By(Ey,a))}};
function Fy(a,b){a.Y().src=b}function By(a,b){Qc.call(this,a);this.image=b}w(By,Qc);var Cy="imageloadstart",Dy="imageloadend",Ey="imageloaderror";function Gy(a,b){var c=[];Object.keys(b).forEach(function(a){null!==b[a]&&void 0!==b[a]&&c.push(a+"="+encodeURIComponent(b[a]))});var d=c.join("&");a=a.replace(/[?&]$/,"");a=-1===a.indexOf("?")?a+"?":a+"&";return a+d};function Hy(a){a=a||{};zy.call(this,{attributions:a.attributions,logo:a.logo,projection:a.projection,resolutions:a.resolutions});this.V=void 0!==a.crossOrigin?a.crossOrigin:null;this.$=void 0!==a.hidpi?a.hidpi:!0;this.a=a.url;this.f=void 0!==a.imageLoadFunction?a.imageLoadFunction:Fy;this.s=a.params||{};this.M=null;this.l=[0,0];this.O=0;this.B=void 0!==a.ratio?a.ratio:1.5}w(Hy,zy);k=Hy.prototype;k.Ho=function(){return this.s};
k.Wc=function(a,b,c,d){if(void 0===this.a)return null;b=Ay(this,b);c=this.$?c:1;var e=this.M;if(e&&this.O==this.g&&e.resolution==b&&e.a==c&&La(e.G(),a))return e;e={F:"image",FORMAT:"PNG32",TRANSPARENT:!0};kb(e,this.s);a=a.slice();var f=(a[0]+a[2])/2,g=(a[1]+a[3])/2;if(1!=this.B){var h=this.B*cb(a)/2,l=this.B*db(a)/2;a[0]=f-h;a[1]=g-l;a[2]=f+h;a[3]=g+l}h=b/c;l=Math.ceil(cb(a)/h);var m=Math.ceil(db(a)/h);a[0]=f-h*l/2;a[2]=f+h*l/2;a[1]=g-h*m/2;a[3]=g+h*m/2;this.l[0]=l;this.l[1]=m;f=a;g=this.l;h=c;d=
d.wb.split(":").pop();e.SIZE=g[0]+","+g[1];e.BBOX=f.join(",");e.BBOXSR=d;e.IMAGESR=d;e.DPI=Math.round(90*h);d=this.a;f=d.replace(/MapServer\/?$/,"MapServer/export").replace(/ImageServer\/?$/,"ImageServer/exportImage");f==d&&oa(!1,50);e=Gy(f,e);this.M=new bl(a,b,c,e,this.V,this.f);this.O=this.g;y(this.M,"change",this.j,this);return this.M};k.Go=function(){return this.f};k.Io=function(){return this.a};k.Jo=function(a){this.M=null;this.f=a;this.u()};
k.Ko=function(a){a!=this.a&&(this.a=a,this.M=null,this.u())};k.Lo=function(a){kb(this.s,a);this.M=null;this.u()};function Iy(a){zy.call(this,{attributions:a.attributions,logo:a.logo,projection:a.projection,resolutions:a.resolutions,state:a.state});this.Ea=a.canvasFunction;this.V=null;this.$=0;this.La=void 0!==a.ratio?a.ratio:1.5}w(Iy,zy);Iy.prototype.Wc=function(a,b,c,d){b=Ay(this,b);var e=this.V;if(e&&this.$==this.g&&e.resolution==b&&e.a==c&&La(e.G(),a))return e;a=a.slice();ib(a,this.La);(d=this.Ea(a,b,c,[cb(a)/b*c,db(a)/b*c],d))&&(e=new ai(a,b,c,d));this.V=e;this.$=this.g;return e};function Jy(a){zy.call(this,{projection:a.projection,resolutions:a.resolutions});this.V=void 0!==a.crossOrigin?a.crossOrigin:null;this.l=void 0!==a.displayDpi?a.displayDpi:96;this.f=a.params||{};this.O=a.url;this.a=void 0!==a.imageLoadFunction?a.imageLoadFunction:Fy;this.$=void 0!==a.hidpi?a.hidpi:!0;this.ca=void 0!==a.metersPerUnit?a.metersPerUnit:1;this.s=void 0!==a.ratio?a.ratio:1;this.Ea=void 0!==a.useOverlay?a.useOverlay:!1;this.M=null;this.B=0}w(Jy,zy);k=Jy.prototype;k.No=function(){return this.f};
k.Wc=function(a,b,c){b=Ay(this,b);c=this.$?c:1;var d=this.M;if(d&&this.B==this.g&&d.resolution==b&&d.a==c&&La(d.G(),a))return d;1!=this.s&&(a=a.slice(),ib(a,this.s));var e=[cb(a)/b*c,db(a)/b*c];if(void 0!==this.O){d=this.O;var f=eb(a),g=this.ca,h=cb(a),l=db(a),m=e[0],n=e[1],p=.0254/this.l;e={OPERATION:this.Ea?"GETDYNAMICMAPOVERLAYIMAGE":"GETMAPIMAGE",VERSION:"2.0.0",LOCALE:"en",CLIENTAGENT:"ol.source.ImageMapGuide source",CLIP:"1",SETDISPLAYDPI:this.l,SETDISPLAYWIDTH:Math.round(e[0]),SETDISPLAYHEIGHT:Math.round(e[1]),
SETVIEWSCALE:n*h>m*l?h*g/(m*p):l*g/(n*p),SETVIEWCENTERX:f[0],SETVIEWCENTERY:f[1]};kb(e,this.f);d=Gy(d,e);d=new bl(a,b,c,d,this.V,this.a);y(d,"change",this.j,this)}else d=null;this.M=d;this.B=this.g;return d};k.Mo=function(){return this.a};k.Po=function(a){kb(this.f,a);this.u()};k.Oo=function(a){this.M=null;this.a=a;this.u()};function Ky(a){var b=a.imageExtent,c=void 0!==a.crossOrigin?a.crossOrigin:null,d=void 0!==a.imageLoadFunction?a.imageLoadFunction:Fy;zy.call(this,{attributions:a.attributions,logo:a.logo,projection:Ob(a.projection)});this.M=new bl(b,void 0,1,a.url,c,d);this.a=a.imageSize?a.imageSize:null;y(this.M,"change",this.j,this)}w(Ky,zy);Ky.prototype.Wc=function(a){return hb(a,this.M.G())?this.M:null};
Ky.prototype.j=function(a){if(2==this.M.getState()){var b=this.M.G(),c=this.M.Y();if(this.a){var d=this.a[0];var e=this.a[1]}else d=c.width,e=c.height;b=Math.ceil(cb(b)/(db(b)/e));if(b!=d){b=hg(b,e);var f=b.canvas;b.drawImage(c,0,0,d,e,0,0,f.width,f.height);this.M.ih(f)}}zy.prototype.j.call(this,a)};function Ly(a){this.a=a.source;this.ob=We();this.f=hg();this.l=[0,0];this.ca=rj.Jc(9);this.bb=void 0==a.renderBuffer?100:a.renderBuffer;this.B=null;Iy.call(this,{attributions:a.attributions,canvasFunction:this.Mk.bind(this),logo:a.logo,projection:a.projection,ratio:a.ratio,resolutions:a.resolutions,state:this.a.getState()});this.O=null;this.s=void 0;this.aj(a.style);y(this.a,"change",this.To,this)}w(Ly,Iy);k=Ly.prototype;
k.Mk=function(a,b,c,d,e){var f=new Vj(.5*b/c,a,b,c,this.a.$,this.ca,this.bb);this.a.ae(a,b,e);var g=!1;this.a.ec(a,function(a){var d;if(!(d=g)){var e;(d=a.ib())?e=d.call(a,b):this.s&&(e=this.s(a,b));if(e){var h,p=!1;Array.isArray(e)||(e=[e]);d=0;for(h=e.length;d<h;++d)p=ek(f,a,e[d],dk(b,c),this.So,this)||p;d=p}else d=!1}g=d},this);Zj(f);if(g)return null;this.l[0]!=d[0]||this.l[1]!=d[1]?(this.f.canvas.width=d[0],this.f.canvas.height=d[1],this.l[0]=d[0],this.l[1]=d[1]):this.f.clearRect(0,0,d[0],d[1]);
this.ca.clear();a=My(this,eb(a),b,c,d);f.Na(this.f,a,0,{});this.B=f;return this.f.canvas};k.wa=function(a,b,c,d,e,f){if(this.B){var g={};return this.B.wa(a,b,0,d,e,function(a){var b=x(a).toString();if(!(b in g))return g[b]=!0,f(a)},null)}};k.Qo=function(){return this.a};k.Ro=function(){return this.O};k.ib=function(){return this.s};function My(a,b,c,d,e){c=d/c;return ef(a.ob,e[0]/2,e[1]/2,c,-c,0,-b[0],-b[1])}k.So=function(){this.u()};k.To=function(){ww(this,this.a.getState())};
k.aj=function(a){this.O=void 0!==a?a:Fk;this.s=a?Dk(this.O):void 0;this.u()};function Ny(a){a=a||{};zy.call(this,{attributions:a.attributions,logo:a.logo,projection:a.projection,resolutions:a.resolutions});this.ca=void 0!==a.crossOrigin?a.crossOrigin:null;this.f=a.url;this.s=void 0!==a.imageLoadFunction?a.imageLoadFunction:Fy;this.a=a.params||{};this.l=!0;Oy(this);this.$=a.serverType;this.Ea=void 0!==a.hidpi?a.hidpi:!0;this.M=null;this.B=[0,0];this.V=0;this.O=void 0!==a.ratio?a.ratio:1.5}w(Ny,zy);var Py=[101,101];k=Ny.prototype;
k.Uo=function(a,b,c,d){if(void 0!==this.f){c=Ob(c);var e=this.c;e&&e!==c&&(b=by(e,c,a,b),a=ac(a,c,e));var f=fb(a,b,0,Py),g={SERVICE:"WMS",VERSION:"1.3.0",REQUEST:"GetFeatureInfo",FORMAT:"image/png",TRANSPARENT:!0,QUERY_LAYERS:this.a.LAYERS};kb(g,this.a,d);d=Math.floor((f[3]-a[1])/b);g[this.l?"I":"X"]=Math.floor((a[0]-f[0])/b);g[this.l?"J":"Y"]=d;return Qy(this,f,Py,1,e||c,g)}};k.Wo=function(){return this.a};
k.Wc=function(a,b,c,d){if(void 0===this.f)return null;b=Ay(this,b);1==c||this.Ea&&void 0!==this.$||(c=1);var e=b/c,f=eb(a),g=fb(f,e,0,[Math.ceil(cb(a)/e),Math.ceil(db(a)/e)]);a=fb(f,e,0,[Math.ceil(this.O*cb(a)/e),Math.ceil(this.O*db(a)/e)]);if((f=this.M)&&this.V==this.g&&f.resolution==b&&f.a==c&&La(f.G(),g))return f;g={SERVICE:"WMS",VERSION:"1.3.0",REQUEST:"GetMap",FORMAT:"image/png",TRANSPARENT:!0};kb(g,this.a);this.B[0]=Math.round(cb(a)/e);this.B[1]=Math.round(db(a)/e);d=Qy(this,a,this.B,c,d,g);
this.M=new bl(a,b,c,d,this.ca,this.s);this.V=this.g;y(this.M,"change",this.j,this);return this.M};k.Vo=function(){return this.s};
function Qy(a,b,c,d,e,f){oa(void 0!==a.f,9);f[a.l?"CRS":"SRS"]=e.wb;"STYLES"in a.a||(f.STYLES="");if(1!=d)switch(a.$){case "geoserver":d=90*d+.5|0;f.FORMAT_OPTIONS="FORMAT_OPTIONS"in f?f.FORMAT_OPTIONS+(";dpi:"+d):"dpi:"+d;break;case "mapserver":f.MAP_RESOLUTION=90*d;break;case "carmentaserver":case "qgis":f.DPI=90*d;break;default:oa(!1,8)}f.WIDTH=c[0];f.HEIGHT=c[1];c=e.b;var g;a.l&&"ne"==c.substr(0,2)?g=[b[1],b[0],b[3],b[2]]:g=b;f.BBOX=g.join(",");return Gy(a.f,f)}k.Xo=function(){return this.f};
k.Yo=function(a){this.M=null;this.s=a;this.u()};k.Zo=function(a){a!=this.f&&(this.f=a,this.M=null,this.u())};k.$o=function(a){kb(this.a,a);Oy(this);this.M=null;this.u()};function Oy(a){a.l=0<=ye(a.a.VERSION||"1.3.0")};function Ry(a){a=a||{};var b;void 0!==a.attributions?b=a.attributions:b=['&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors.'];sy.call(this,{attributions:b,cacheSize:a.cacheSize,crossOrigin:void 0!==a.crossOrigin?a.crossOrigin:"anonymous",opaque:void 0!==a.opaque?a.opaque:!0,maxZoom:void 0!==a.maxZoom?a.maxZoom:19,reprojectionErrorThreshold:a.reprojectionErrorThreshold,tileLoadFunction:a.tileLoadFunction,url:void 0!==a.url?a.url:"https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
wrapX:a.wrapX})}w(Ry,sy);rj.nf={};rj.nf.Hf=function(){};
(function(a){function b(a,b,c){if(g)return new ImageData(a,b,c);b=h.createImageData(b,c);b.data.set(a);return b}function c(a){var b=!0;try{new ImageData(10,10)}catch(n){b=!1}return function(c){var d=c.buffers,e=c.meta,f=c.width,g=c.height,h=d.length,l=d[0].byteLength;if(c.imageOps){l=Array(h);for(c=0;c<h;++c){var m=c;var n=new Uint8ClampedArray(d[c]);var S=f,Ia=g;n=b?new ImageData(n,S,Ia):{data:n,width:S,height:Ia};l[m]=n}f=a(l,e).data}else{f=new Uint8ClampedArray(l);g=Array(h);m=Array(h);for(c=0;c<
h;++c)g[c]=new Uint8ClampedArray(d[c]),m[c]=[0,0,0,0];for(d=0;d<l;d+=4){for(c=0;c<h;++c)n=g[c],m[c][0]=n[d],m[c][1]=n[d+1],m[c][2]=n[d+2],m[c][3]=n[d+3];c=a(m,e);f[d]=c[0];f[d+1]=c[1];f[d+2]=c[2];f[d+3]=c[3]}}return f.buffer}}function d(a,b){var d=Object.keys(a.lib||{}).map(function(b){return"var "+b+" = "+a.lib[b].toString()+";"}).concat(["var __minion__ = ("+c.toString()+")(",a.operation.toString(),");",'self.addEventListener("message", function(event) {',"  var buffer = __minion__(event.data);",
"  self.postMessage({buffer: buffer, meta: event.data.meta}, [buffer]);","});"]);d=URL.createObjectURL(new Blob(d,{type:"text/javascript"}));d=new Worker(d);d.addEventListener("message",b);return d}function e(a,b){var d=c(a.operation);return{postMessage:function(a){setTimeout(function(){b({data:{buffer:d(a),meta:a.meta}})},0)}}}function f(a){this.Jf=!!a.Cm;var b;0===a.threads?b=0:this.Jf?b=1:b=a.threads||1;var c=[];if(b)for(var f=0;f<b;++f)c[f]=d(a,this.xh.bind(this,f));else c[0]=e(a,this.xh.bind(this,
0));this.we=c;this.Nd=[];this.Bk=a.Sp||Infinity;this.ve=0;this.od={};this.Kf=null}var g=!0;try{new ImageData(10,10)}catch(l){g=!1}var h=document.createElement("canvas").getContext("2d");f.prototype.Rp=function(a,b,c){this.zk({inputs:a,ii:b,callback:c});this.uh()};f.prototype.zk=function(a){for(this.Nd.push(a);this.Nd.length>this.Bk;)this.Nd.shift().callback(null,null)};f.prototype.uh=function(){if(0===this.ve&&0<this.Nd.length){var a=this.Kf=this.Nd.shift(),b=a.inputs[0].width,c=a.inputs[0].height,
d=a.inputs.map(function(a){return a.data.buffer}),e=this.we.length;this.ve=e;if(1===e)this.we[0].postMessage({buffers:d,meta:a.ii,imageOps:this.Jf,width:b,height:c},d);else for(var f=4*Math.ceil(a.inputs[0].data.length/4/e),g=0;g<e;++g){for(var h=g*f,z=[],A=0,E=d.length;A<E;++A)z.push(d[g].slice(h,h+f));this.we[g].postMessage({buffers:z,meta:a.ii,imageOps:this.Jf,width:b,height:c},z)}}};f.prototype.xh=function(a,b){this.hr||(this.od[a]=b.data,--this.ve,0===this.ve&&this.Ck())};f.prototype.Ck=function(){var a=
this.Kf,c=this.we.length;if(1===c){var d=new Uint8ClampedArray(this.od[0].buffer);var e=this.od[0].meta}else{var f=a.inputs[0].data.length;d=new Uint8ClampedArray(f);e=Array(f);f=4*Math.ceil(f/4/c);for(var g=0;g<c;++g){var h=g*f;d.set(new Uint8ClampedArray(this.od[g].buffer),h);e[g]=this.od[g].meta}}this.Kf=null;this.od={};a.callback(null,b(d,a.inputs[0].width,a.inputs[0].height),e);this.uh()};a["default"]={Hf:f};a.Hf=f})(rj.nf=rj.nf||{});function Sy(a){this.B=null;this.Ea=void 0!==a.operationType?a.operationType:"pixel";this.La=void 0!==a.threads?a.threads:1;this.f=Ty(a.sources);for(var b=0,c=this.f.length;b<c;++b)y(this.f[b],"change",this.u,this);this.$=new le(function(){return 1},this.u.bind(this));b=Uy(this.f);c={};for(var d=0,e=b.length;d<e;++d)c[x(b[d].layer)]=b[d];this.a=null;this.O={animate:!1,coordinateToPixelTransform:We(),extent:null,focus:null,index:0,layerStates:c,layerStatesArray:b,logos:{},pixelRatio:1,pixelToCoordinateTransform:We(),
postRenderFunctions:[],size:[0,0],skippedFeatureUids:{},tileQueue:this.$,time:Date.now(),usedTiles:{},viewState:{rotation:0},viewHints:[],wantedTiles:{}};zy.call(this,{});void 0!==a.operation&&this.s(a.operation,a.lib)}w(Sy,zy);Sy.prototype.s=function(a,b){this.B=new rj.nf.Hf({operation:a,Cm:"image"===this.Ea,Sp:1,lib:b,threads:this.La});this.u()};
Sy.prototype.Y=function(a,b,c,d){c=!0;for(var e,f=0,g=this.f.length;f<g;++f)if(e=this.f[f].a.ha(),"ready"!==e.getState()){c=!1;break}if(!c)return null;c=kb({},this.O);c.viewState=kb({},c.viewState);e=eb(a);c.extent=a.slice();c.focus=e;c.size[0]=Math.round(cb(a)/b);c.size[1]=Math.round(db(a)/b);c.time=Date.now();c.animate=!1;f=c.viewState;f.center=e;f.projection=d;f.resolution=b;this.l=c;this.a&&(d=this.a.resolution,e=this.a.G(),b===d&&Sa(a,e)||(this.a=null));if(!this.a||this.g!==this.V)a:{a=this.l;
d=this.f.length;b=Array(d);for(e=0;e<d;++e){f=this.f[e];g=a;var h=a.layerStatesArray[e];if(f.$c(g,h)){var l=g.size[0],m=g.size[1];if(Vy){var n=Vy.canvas;n.width!==l||n.height!==m?Vy=hg(l,m):Vy.clearRect(0,0,l,m)}else Vy=hg(l,m);f.df(g,h,Vy);f=Vy.getImageData(0,0,l,m)}else f=null;if(f)b[e]=f;else break a}d={};this.b(new Wy(Xy,a,d));this.B.Rp(b,d,this.ca.bind(this,a))}me(c.tileQueue,16,16);c.animate&&requestAnimationFrame(this.u.bind(this));return this.a};
Sy.prototype.ca=function(a,b,c,d){if(!b&&c){b=a.extent;var e=a.viewState.resolution;if(e===this.l.viewState.resolution&&Sa(b,this.l.extent)){if(this.a)var f=this.a.Y().getContext("2d");else f=hg(Math.round(cb(b)/e),Math.round(db(b)/e)),this.a=new ai(b,e,1,f.canvas);f.putImageData(c,0,0);this.u();this.V=this.g;this.b(new Wy(Yy,a,d))}}};var Vy=null;function Uy(a){return a.map(function(a){return lg(a.a)})}
function Ty(a){for(var b=a.length,c=Array(b),d=0;d<b;++d){var e=d,f=a[d],g=null;f instanceof iy?(f=new Tx({source:f}),g=new mj(f)):f instanceof zy&&(f=new Sx({source:f}),g=new bj(f));c[e]=g}return c}function Wy(a,b,c){Qc.call(this,a);this.extent=b.extent;this.resolution=b.viewState.resolution/b.pixelRatio;this.data=c}w(Wy,Qc);Sy.prototype.Wc=function(){return null};var Xy="beforeoperations",Yy="afteroperations";function Zy(a){var b=a.layer.indexOf("-");b=$y[-1==b?a.layer:a.layer.slice(0,b)];var c=az[a.layer];sy.call(this,{attributions:bz,cacheSize:a.cacheSize,crossOrigin:"anonymous",maxZoom:void 0!=a.maxZoom?a.maxZoom:b.maxZoom,minZoom:void 0!=a.minZoom?a.minZoom:b.minZoom,opaque:c.opaque,reprojectionErrorThreshold:a.reprojectionErrorThreshold,tileLoadFunction:a.tileLoadFunction,url:void 0!==a.url?a.url:"https://stamen-tiles-{a-d}.a.ssl.fastly.net/"+a.layer+"/{z}/{x}/{y}."+c.Ob,wrapX:a.wrapX})}w(Zy,sy);
var bz=['Map tiles by <a href="https://stamen.com/">Stamen Design</a>, under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>.','&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors.'],az={terrain:{Ob:"jpg",opaque:!0},"terrain-background":{Ob:"jpg",opaque:!0},"terrain-labels":{Ob:"png",opaque:!1},"terrain-lines":{Ob:"png",opaque:!1},"toner-background":{Ob:"png",opaque:!0},toner:{Ob:"png",opaque:!0},"toner-hybrid":{Ob:"png",opaque:!1},"toner-labels":{Ob:"png",
opaque:!1},"toner-lines":{Ob:"png",opaque:!1},"toner-lite":{Ob:"png",opaque:!0},watercolor:{Ob:"jpg",opaque:!0}},$y={terrain:{minZoom:4,maxZoom:18},toner:{minZoom:0,maxZoom:20},watercolor:{minZoom:1,maxZoom:16}};function cz(a){a=a||{};ny.call(this,{attributions:a.attributions,cacheSize:a.cacheSize,crossOrigin:a.crossOrigin,logo:a.logo,projection:a.projection,reprojectionErrorThreshold:a.reprojectionErrorThreshold,tileGrid:a.tileGrid,tileLoadFunction:a.tileLoadFunction,url:a.url,urls:a.urls,wrapX:void 0!==a.wrapX?a.wrapX:!0,transition:a.transition});this.i=a.params||{};this.l=Da();jy(this,dz(this))}w(cz,ny);function dz(a){var b=0,c=[],d;for(d in a.i)c[b++]=d+"-"+a.i[d];return c.join("/")}cz.prototype.o=function(){return this.i};
cz.prototype.Xc=function(a){return a};
cz.prototype.dc=function(a,b,c){var d=this.tileGrid;d||(d=this.eb(c));if(!(d.b.length<=a[0])){var e=d.Ma(a,this.l),f=Ba(d.Za(a[0]),this.j);1!=b&&(f=Aa(f,b,this.j));d={F:"image",FORMAT:"PNG32",TRANSPARENT:!0};kb(d,this.i);var g=this.urls;g?(c=c.wb.split(":").pop(),d.SIZE=f[0]+","+f[1],d.BBOX=e.join(","),d.BBOXSR=c,d.IMAGESR=c,d.DPI=Math.round(d.DPI?d.DPI*b:90*b),a=(1==g.length?g[0]:g[wa((a[1]<<a[0])+a[2],g.length)]).replace(/MapServer\/?$/,"MapServer/export").replace(/ImageServer\/?$/,"ImageServer/exportImage"),
a=Gy(a,d)):a=void 0;return a}};cz.prototype.B=function(a){kb(this.i,a);jy(this,dz(this))};function ez(a){iy.call(this,{opaque:!1,projection:a.projection,tileGrid:a.tileGrid,wrapX:void 0!==a.wrapX?a.wrapX:!0})}w(ez,iy);ez.prototype.ad=function(a,b,c){var d=a+"/"+b+"/"+c;if(this.a.a.hasOwnProperty(d))return this.a.get(d);var e=Ba(this.tileGrid.Za(a));a=[a,b,c];b=(b=ky(this,a))?ky(this,b).toString():"";e=new fz(a,e,b);this.a.set(d,e);return e};function fz(a,b,c){cl.call(this,a,2);this.c=b;this.ta=c;this.a=null}w(fz,cl);
fz.prototype.Y=function(){if(this.a)return this.a;var a=this.c,b=hg(a[0],a[1]);b.strokeStyle="black";b.strokeRect(.5,.5,a[0]+.5,a[1]+.5);b.fillStyle="black";b.textAlign="center";b.textBaseline="middle";b.font="24px sans-serif";b.fillText(this.ta,a[0]/2,a[1]/2);return this.a=b.canvas};fz.prototype.load=function(){};function gz(a){this.i=null;ny.call(this,{attributions:a.attributions,cacheSize:a.cacheSize,crossOrigin:a.crossOrigin,projection:Ob("EPSG:3857"),reprojectionErrorThreshold:a.reprojectionErrorThreshold,state:"loading",tileLoadFunction:a.tileLoadFunction,wrapX:void 0!==a.wrapX?a.wrapX:!0,transition:a.transition});if(a.url)if(a.jsonp)Zx(a.url,this.Cg.bind(this),this.ef.bind(this));else{var b=new XMLHttpRequest;b.addEventListener("load",this.bp.bind(this));b.addEventListener("error",this.ap.bind(this));
b.open("GET",a.url);b.send()}else a.tileJSON?this.Cg(a.tileJSON):oa(!1,51)}w(gz,ny);k=gz.prototype;k.bp=function(a){a=a.target;if(!a.status||200<=a.status&&300>a.status){try{var b=JSON.parse(a.responseText)}catch(c){this.ef();return}this.Cg(b)}else this.ef()};k.ap=function(){this.ef()};k.Sl=function(){return this.i};
k.Cg=function(a){var b=Ob("EPSG:4326"),c=this.c;if(void 0!==a.bounds){var d=Pb(b,c);d=jb(a.bounds,d)}var e=a.minzoom||0,f=a.maxzoom||22;this.tileGrid=c=Bc({extent:Dc(c),maxZoom:f,minZoom:e});this.tileUrlFunction=Vx(a.tiles,c);if(void 0!==a.attribution&&!this.C){var g=void 0!==d?d:b.G();this.va(function(b){return hb(g,b.extent)?[a.attribution]:null})}this.i=a;ww(this,"ready")};k.ef=function(){ww(this,"error")};function hz(a){iy.call(this,{projection:Ob("EPSG:3857"),state:"loading"});this.s=void 0!==a.preemptive?a.preemptive:!0;this.l=Xx;this.f=void 0;this.i=a.jsonp||!1;if(a.url)if(this.i)Zx(a.url,this.Dg.bind(this),this.ff.bind(this));else{var b=new XMLHttpRequest;b.addEventListener("load",this.gp.bind(this));b.addEventListener("error",this.fp.bind(this));b.open("GET",a.url);b.send()}else a.tileJSON?this.Dg(a.tileJSON):oa(!1,51)}w(hz,iy);k=hz.prototype;
k.gp=function(a){a=a.target;if(!a.status||200<=a.status&&300>a.status){try{var b=JSON.parse(a.responseText)}catch(c){this.ff();return}this.Dg(b)}else this.ff()};k.fp=function(){this.ff()};k.Pl=function(){return this.f};k.al=function(a,b,c,d,e){this.tileGrid?(b=this.tileGrid.Le(a,b),iz(this.ad(b[0],b[1],b[2],1,this.c),a,c,d,e)):!0===e?setTimeout(function(){c.call(d,null)},0):c.call(d,null)};k.ff=function(){ww(this,"error")};
k.Dg=function(a){var b=Ob("EPSG:4326"),c=this.c;if(void 0!==a.bounds){var d=Pb(b,c);d=jb(a.bounds,d)}var e=a.minzoom||0,f=a.maxzoom||22;this.tileGrid=c=Bc({extent:Dc(c),maxZoom:f,minZoom:e});this.f=a.template;if(e=a.grids){this.l=Vx(e,c);if(void 0!==a.attribution){var g=void 0!==d?d:b.G();this.va(function(b){return hb(g,b.extent)?[a.attribution]:null})}ww(this,"ready")}else ww(this,"error")};
k.ad=function(a,b,c,d,e){var f=a+"/"+b+"/"+c;if(this.a.a.hasOwnProperty(f))return this.a.get(f);a=[a,b,c];b=ky(this,a,e);d=this.l(b,d,e);d=new jz(a,void 0!==d?0:4,void 0!==d?d:"",this.tileGrid.Ma(a),this.s,this.i);this.a.set(f,d);return d};k.kh=function(a,b,c){a=a+"/"+b+"/"+c;this.a.a.hasOwnProperty(a)&&this.a.get(a)};function jz(a,b,c,d,e,f){cl.call(this,a,b);this.v=c;this.a=d;this.N=e;this.c=this.l=this.f=null;this.o=f}w(jz,cl);k=jz.prototype;k.Y=function(){return null};
k.getData=function(a){if(!this.f||!this.l)return null;var b=this.f[Math.floor((1-(a[1]-this.a[1])/(this.a[3]-this.a[1]))*this.f.length)];if("string"!==typeof b)return null;b=b.charCodeAt(Math.floor((a[0]-this.a[0])/(this.a[2]-this.a[0])*b.length));93<=b&&b--;35<=b&&b--;b-=32;a=null;b in this.l&&(b=this.l[b],this.c&&b in this.c?a=this.c[b]:a=b);return a};
function iz(a,b,c,d,e){0==a.state&&!0===e?(Lc(a,"change",function(){c.call(d,this.getData(b))},a),kz(a)):!0===e?setTimeout(function(){c.call(d,this.getData(b))}.bind(a),0):c.call(d,a.getData(b))}k.lb=function(){return this.v};k.Ne=function(){this.state=3;this.u()};k.bj=function(a){this.f=a.grid;this.l=a.keys;this.c=a.data;this.state=4;this.u()};
function kz(a){if(0==a.state)if(a.state=1,a.o)Zx(a.v,a.bj.bind(a),a.Ne.bind(a));else{var b=new XMLHttpRequest;b.addEventListener("load",a.ep.bind(a));b.addEventListener("error",a.cp.bind(a));b.open("GET",a.v);b.send()}}k.ep=function(a){a=a.target;if(!a.status||200<=a.status&&300>a.status){try{var b=JSON.parse(a.responseText)}catch(c){this.Ne();return}this.bj(b)}else this.Ne()};k.cp=function(){this.Ne()};k.load=function(){this.N&&kz(this)};function lz(a){a=a||{};var b=a.params||{};ny.call(this,{attributions:a.attributions,cacheSize:a.cacheSize,crossOrigin:a.crossOrigin,logo:a.logo,opaque:!("TRANSPARENT"in b?b.TRANSPARENT:1),projection:a.projection,reprojectionErrorThreshold:a.reprojectionErrorThreshold,tileClass:a.tileClass,tileGrid:a.tileGrid,tileLoadFunction:a.tileLoadFunction,url:a.url,urls:a.urls,wrapX:void 0!==a.wrapX?a.wrapX:!0,transition:a.transition});this.o=void 0!==a.gutter?a.gutter:0;this.i=b;this.l=!0;this.B=a.serverType;
this.$=void 0!==a.hidpi?a.hidpi:!0;this.ca=Da();mz(this);jy(this,nz(this))}w(lz,ny);k=lz.prototype;
k.hp=function(a,b,c,d){c=Ob(c);var e=this.c,f=this.tileGrid;f||(f=this.eb(c));b=f.Le(a,b);if(!(f.b.length<=b[0])){var g=f.Ta(b[0]),h=f.Ma(b,this.ca);f=Ba(f.Za(b[0]),this.j);var l=this.o;0!==l&&(f=za(f,l,this.j),h=Fa(h,g*l,h));e&&e!==c&&(g=by(e,c,a,g),h=bc(h,c,e),a=ac(a,c,e));l={SERVICE:"WMS",VERSION:"1.3.0",REQUEST:"GetFeatureInfo",FORMAT:"image/png",TRANSPARENT:!0,QUERY_LAYERS:this.i.LAYERS};kb(l,this.i,d);d=Math.floor((h[3]-a[1])/g);l[this.l?"I":"X"]=Math.floor((a[0]-h[0])/g);l[this.l?"J":"Y"]=
d;return oz(this,b,f,h,1,e||c,l)}};k.$f=function(){return this.o};k.ip=function(){return this.i};
function oz(a,b,c,d,e,f,g){var h=a.urls;if(h){g.WIDTH=c[0];g.HEIGHT=c[1];g[a.l?"CRS":"SRS"]=f.wb;"STYLES"in a.i||(g.STYLES="");if(1!=e)switch(a.B){case "geoserver":c=90*e+.5|0;g.FORMAT_OPTIONS="FORMAT_OPTIONS"in g?g.FORMAT_OPTIONS+(";dpi:"+c):"dpi:"+c;break;case "mapserver":g.MAP_RESOLUTION=90*e;break;case "carmentaserver":case "qgis":g.DPI=90*e;break;default:oa(!1,52)}f=f.b;a.l&&"ne"==f.substr(0,2)&&(a=d[0],d[0]=d[1],d[1]=a,a=d[2],d[2]=d[3],d[3]=a);g.BBOX=d.join(",");return Gy(1==h.length?h[0]:h[wa((b[1]<<
b[0])+b[2],h.length)],g)}}k.Xc=function(a){return this.$&&void 0!==this.B?a:1};function nz(a){var b=0,c=[],d;for(d in a.i)c[b++]=d+"-"+a.i[d];return c.join("/")}
k.dc=function(a,b,c){var d=this.tileGrid;d||(d=this.eb(c));if(!(d.b.length<=a[0])){1==b||this.$&&void 0!==this.B||(b=1);var e=d.Ta(a[0]),f=d.Ma(a,this.ca);d=Ba(d.Za(a[0]),this.j);var g=this.o;0!==g&&(d=za(d,g,this.j),f=Fa(f,e*g,f));1!=b&&(d=Aa(d,b,this.j));e={SERVICE:"WMS",VERSION:"1.3.0",REQUEST:"GetMap",FORMAT:"image/png",TRANSPARENT:!0};kb(e,this.i);return oz(this,a,d,f,b,c,e)}};k.jp=function(a){kb(this.i,a);mz(this);jy(this,nz(this))};function mz(a){a.l=0<=ye(a.i.VERSION||"1.3.0")};function pz(a,b,c,d,e,f,g,h,l,m,n,p,q,r,u){cl.call(this,a,b,u);this.v={};this.o={};this.c=m;this.a=[];this.D=c;this.l=f;this.f=[];this.N=[];if(f){var v=l.Ma(f),z=l.Ta(a[0]);h.Vf(v,h.Dc(z),function(a){var b=gb(v,h.Ma(a)),c=h.G();c&&(b=gb(b,c));.5<=cb(b)/z&&.5<=db(b)/z&&(b=a.toString(),c=m[b],c||(c=g(a,n,p),c=m[b]=new q(a,void 0==c?4:0,void 0==c?"":c,d,e),this.N.push(y(c,"change",r))),c.c++,this.a.push(b))}.bind(this))}}w(pz,cl);k=pz.prototype;
k.ia=function(){for(var a=0,b=this.a.length;a<b;++a){var c=this.a[a],d=this.c[c];d.c--;0==d.c&&(delete this.c[c],Pc(d))}this.a.length=0;this.c=null;this.f.forEach(Gc);this.f.length=0;this.g&&Pc(this.g);this.state=5;this.u();this.N.forEach(Gc);this.N.length=0;cl.prototype.ia.call(this)};function nk(a,b){b=x(b).toString();b in a.v||(a.v[b]=hg());return a.v[b]}k.Y=function(a){return-1==mk(this,a).fh?null:nk(this,a).canvas};
function mk(a,b){b=x(b).toString();b in a.o||(a.o[b]={Be:!1,eh:null,wf:-1,fh:-1});return a.o[b]}k.lb=function(){return this.a.join("/")+"-"+this.D};
k.load=function(){var a=0,b={};0==this.state&&oj(this,1);1==this.state&&this.a.forEach(function(c){var d=this.c[c];0==d.state&&(d.ug(this.C),d.load());1==d.state&&(c=y(d,"change",function(){var c=d.getState();if(2==c||3==c){var f=x(d);3==c?b[f]=!0:(--a,delete b[f]);0==a-Object.keys(b).length&&this.Kh()}}.bind(this)),this.f.push(c),++a)}.bind(this));0==a-Object.keys(b).length&&setTimeout(this.Kh.bind(this),0)};
k.Kh=function(){for(var a=this.a.length,b=0,c=a-1;0<=c;--c){var d=this.c[this.a[c]].getState();2!=d&&--a;4==d&&++b}a==this.a.length?(this.f.forEach(Gc),this.f.length=0,oj(this,2)):oj(this,b==this.a.length?4:3)};function qz(a,b){a.ug(Eo(b,a.v,a.Cp.bind(a),a.Bp.bind(a)))};function rz(a){var b=a.projection||"EPSG:3857",c=a.extent||Dc(b),d=a.tileGrid||Bc({extent:c,maxZoom:a.maxZoom||22,minZoom:a.minZoom,tileSize:a.tileSize||512});my.call(this,{attributions:a.attributions,cacheSize:void 0!==a.cacheSize?a.cacheSize:128,extent:c,logo:a.logo,opaque:!1,projection:b,state:a.state,tileGrid:d,tileLoadFunction:a.tileLoadFunction?a.tileLoadFunction:qz,tileUrlFunction:a.tileUrlFunction,url:a.url,urls:a.urls,wrapX:void 0===a.wrapX?!0:a.wrapX,transition:a.transition});this.l=a.format?
a.format:null;this.i={};this.s=void 0==a.overlaps?!0:a.overlaps;this.tileClass=a.tileClass?a.tileClass:Kn;this.f={}}w(rz,my);k=rz.prototype;k.clear=function(){this.a.clear();this.i={}};k.ad=function(a,b,c,d,e){var f=a+"/"+b+"/"+c;if(this.a.a.hasOwnProperty(f))return this.a.get(f);a=[a,b,c];b=ky(this,a,e);d=new pz(a,null!==b?0:4,this.g,this.l,this.tileLoadFunction,b,this.tileUrlFunction,this.tileGrid,this.eb(e),this.i,d,e,this.tileClass,this.dj.bind(this),this.Ea);this.a.set(f,d);return d};
k.eb=function(a){var b=a.wb,c=this.f[b];c||(c=this.tileGrid,c=this.f[b]=Ac(a,void 0,c?c.Za(c.minZoom):void 0));return c};k.Xc=function(a){return a};k.Zd=function(a,b,c){a=Ba(this.eb(c).Za(a));return[Math.round(a[0]*b),Math.round(a[1]*b)]};function sz(a){this.s=a.matrixIds;qc.call(this,{extent:a.extent,origin:a.origin,origins:a.origins,resolutions:a.resolutions,tileSize:a.tileSize,tileSizes:a.tileSizes,sizes:a.sizes})}w(sz,qc);sz.prototype.v=function(){return this.s};
function tz(a,b,c){var d=[],e=[],f=[],g=[],h=[],l=void 0!==c?c:[];c=a.SupportedCRS;c=Ob(c.replace(/urn:ogc:def:crs:(\w+):(.*:)?(\w+)$/,"$1:$3"))||Ob(c);var m=c.Bc(),n="ne"==c.b.substr(0,2);a.TileMatrix.sort(function(a,b){return b.ScaleDenominator-a.ScaleDenominator});a.TileMatrix.forEach(function(a){var b;0<l.length?b=hc(l,function(b){return a.Identifier==b.TileMatrix}):b=!0;if(b){e.push(a.Identifier);b=2.8E-4*a.ScaleDenominator/m;var c=a.TileWidth,p=a.TileHeight;n?f.push([a.TopLeftCorner[1],a.TopLeftCorner[0]]):
f.push(a.TopLeftCorner);d.push(b);g.push(c==p?c:[c,p]);h.push([a.MatrixWidth,-a.MatrixHeight])}});return new sz({extent:b,origins:f,resolutions:d,matrixIds:e,tileSizes:g,sizes:h})};function Y(a){this.La=void 0!==a.version?a.version:"1.0.0";this.B=void 0!==a.format?a.format:"image/jpeg";this.i=void 0!==a.dimensions?a.dimensions:{};this.$=a.layer;this.o=a.matrixSet;this.ca=a.style;var b=a.urls;void 0===b&&void 0!==a.url&&(b=Yx(a.url));var c=this.ua=void 0!==a.requestEncoding?a.requestEncoding:"KVP",d=a.tileGrid,e={layer:this.$,style:this.ca,tilematrixset:this.o};"KVP"==c&&kb(e,{Service:"WMTS",Request:"GetTile",Version:this.La,Format:this.B});var f=this.i;this.l=function(a){a=
"KVP"==c?Gy(a,e):a.replace(/\{(\w+?)\}/g,function(a,b){return b.toLowerCase()in e?e[b.toLowerCase()]:a});return function(b){if(b){var e={TileMatrix:d.s[b[0]],TileCol:b[1],TileRow:-b[2]-1};kb(e,f);b=a;return b="KVP"==c?Gy(b,e):b.replace(/\{(\w+?)\}/g,function(a,b){return e[b]})}}};var g=b&&0<b.length?Wx(b.map(this.l)):Xx;ny.call(this,{attributions:a.attributions,cacheSize:a.cacheSize,crossOrigin:a.crossOrigin,logo:a.logo,projection:a.projection,reprojectionErrorThreshold:a.reprojectionErrorThreshold,
tileClass:a.tileClass,tileGrid:d,tileLoadFunction:a.tileLoadFunction,tilePixelRatio:a.tilePixelRatio,tileUrlFunction:g,urls:b,wrapX:void 0!==a.wrapX?a.wrapX:!1,transition:a.transition});jy(this,uz(this))}w(Y,ny);k=Y.prototype;k.vb=function(a){this.urls=a;var b=a.join("\n");this.hb(this.dc?this.dc.bind(this):Wx(a.map(this.l.bind(this))),b)};k.ol=function(){return this.i};k.kp=function(){return this.B};k.lp=function(){return this.$};k.Al=function(){return this.o};k.Nl=function(){return this.ua};
k.mp=function(){return this.ca};k.Ul=function(){return this.La};function uz(a){var b=0,c=[],d;for(d in a.i)c[b++]=d+"-"+a.i[d];return c.join("/")}k.Tq=function(a){kb(this.i,a);jy(this,uz(this))};function vz(a){a=a||{};var b=a.size,c=b[0],d=b[1];b=a.extent||[0,-b[1],b[0],0];var e=[],f=a.tileSize||256,g=f;switch(void 0!==a.tierSizeCalculation?a.tierSizeCalculation:wz){case wz:for(;c>g||d>g;)e.push([Math.ceil(c/g),Math.ceil(d/g)]),g+=g;break;case xz:for(;c>g||d>g;)e.push([Math.ceil(c/g),Math.ceil(d/g)]),c>>=1,d>>=1;break;default:oa(!1,53)}e.push([1,1]);e.reverse();d=[1];var h=[0];g=1;for(c=e.length;g<c;g++)d.push(1<<g),h.push(e[g-1][0]*e[g-1][1]+h[g-1]);d.reverse();var l=new qc({tileSize:f,
extent:b,origin:$a(b),resolutions:d});(b=a.url)&&-1==b.indexOf("{TileGroup}")&&-1==b.indexOf("{tileIndex}")&&(b+="{TileGroup}/{z}-{x}-{y}.jpg");b=Yx(b);b=Wx(b.map(function(a){return function(b){if(b){var c=b[0],d=b[1];b=-b[2]-1;var f=d+b*e[c][0],g={z:c,x:d,y:b,tileIndex:f,TileGroup:"TileGroup"+((f+h[c])/l.Za(c)|0)};return a.replace(/\{(\w+?)\}/g,function(a,b){return g[b]})}}}));ny.call(this,{attributions:a.attributions,cacheSize:a.cacheSize,crossOrigin:a.crossOrigin,logo:a.logo,projection:a.projection,
reprojectionErrorThreshold:a.reprojectionErrorThreshold,tileClass:yz.bind(null,l),tileGrid:l,tileUrlFunction:b,transition:a.transition})}w(vz,ny);function yz(a,b,c,d,e,f,g){el.call(this,b,c,d,e,f,g);this.a=null;this.o=Ba(a.Za(b[0]))}w(yz,el);yz.prototype.Y=function(){if(this.a)return this.a;var a=el.prototype.Y.call(this);if(2==this.state){var b=this.o;if(a.width==b[0]&&a.height==b[1])return this.a=a;b=hg(b[0],b[1]);b.drawImage(a,0,0);return this.a=b.canvas}return a};var wz="default",xz="truncated";ha.prototype.code=ha.prototype.code;t("ol.Attribution",Ec);Ec.prototype.getHTML=Ec.prototype.b;t("ol.CanvasMap",H);t("ol.Collection",B);B.prototype.clear=B.prototype.clear;B.prototype.extend=B.prototype.qg;B.prototype.forEach=B.prototype.forEach;B.prototype.getArray=B.prototype.Xm;B.prototype.item=B.prototype.item;B.prototype.getLength=B.prototype.kc;B.prototype.insertAt=B.prototype.Re;B.prototype.pop=B.prototype.pop;B.prototype.push=B.prototype.push;B.prototype.remove=B.prototype.remove;
B.prototype.removeAt=B.prototype.Wg;B.prototype.setAt=B.prototype.rq;cd.prototype.element=cd.prototype.element;t("ol.color.asArray",vi);t("ol.color.asString",xi);t("ol.colorlike.asColorLike",zi);t("ol.control.defaults",Fg);t("ol.coordinate.add",ze);t("ol.coordinate.createStringXY",function(a){return function(b){return Ke(b,a)}});t("ol.coordinate.format",De);t("ol.coordinate.rotate",Fe);t("ol.coordinate.toStringHDMS",function(a,b){return a?Ce("NS",a[1],b)+" "+Ce("EW",a[0],b):""});
t("ol.coordinate.toStringXY",Ke);t("ol.DeviceOrientation",pk);pk.prototype.getAlpha=pk.prototype.Ym;pk.prototype.getBeta=pk.prototype.ll;pk.prototype.getGamma=pk.prototype.ql;pk.prototype.getHeading=pk.prototype.Zm;pk.prototype.getTracking=pk.prototype.li;pk.prototype.setTracking=pk.prototype.rg;t("ol.easing.easeIn",Me);t("ol.easing.easeOut",Oe);t("ol.easing.inAndOut",Pe);t("ol.easing.linear",Qe);t("ol.easing.upAndDown",function(a){return.5>a?Pe(2*a):1-Pe(2*(a-.5))});
t("ol.extent.boundingExtent",Ca);t("ol.extent.buffer",Fa);t("ol.extent.containsCoordinate",Ja);t("ol.extent.containsExtent",La);t("ol.extent.containsXY",Ka);t("ol.extent.createEmpty",Da);t("ol.extent.equals",Sa);t("ol.extent.extend",Ta);t("ol.extent.getArea",ab);t("ol.extent.getBottomLeft",Wa);t("ol.extent.getBottomRight",Ya);t("ol.extent.getCenter",eb);t("ol.extent.getHeight",db);t("ol.extent.getIntersection",gb);t("ol.extent.getSize",function(a){return[a[2]-a[0],a[3]-a[1]]});
t("ol.extent.getTopLeft",$a);t("ol.extent.getTopRight",Za);t("ol.extent.getWidth",cb);t("ol.extent.intersects",hb);t("ol.extent.isEmpty",bb);t("ol.extent.applyTransform",jb);t("ol.Feature",Hk);Hk.prototype.clone=Hk.prototype.clone;Hk.prototype.getGeometry=Hk.prototype.U;Hk.prototype.getId=Hk.prototype.an;Hk.prototype.getGeometryName=Hk.prototype.sl;Hk.prototype.getStyle=Hk.prototype.bn;Hk.prototype.getStyleFunction=Hk.prototype.ib;Hk.prototype.setGeometry=Hk.prototype.Va;Hk.prototype.setStyle=Hk.prototype.sg;
Hk.prototype.setId=Hk.prototype.qc;Hk.prototype.setGeometryName=Hk.prototype.Lc;t("ol.featureloader.xhr",Fo);t("ol.Geolocation",Jk);Jk.prototype.getAccuracy=Jk.prototype.el;Jk.prototype.getAccuracyGeometry=Jk.prototype.fl;Jk.prototype.getAltitude=Jk.prototype.gl;Jk.prototype.getAltitudeAccuracy=Jk.prototype.hl;Jk.prototype.getHeading=Jk.prototype.cn;Jk.prototype.getPosition=Jk.prototype.dn;Jk.prototype.getProjection=Jk.prototype.mi;Jk.prototype.getSpeed=Jk.prototype.Ol;Jk.prototype.getTracking=Jk.prototype.ni;
Jk.prototype.getTrackingOptions=Jk.prototype.ai;Jk.prototype.setProjection=Jk.prototype.oi;Jk.prototype.setTracking=Jk.prototype.Ue;Jk.prototype.setTrackingOptions=Jk.prototype.Rj;t("ol.Graticule",Xk);Xk.prototype.getMap=Xk.prototype.gn;Xk.prototype.getMeridians=Xk.prototype.Cl;Xk.prototype.getParallels=Xk.prototype.Jl;Xk.prototype.setMap=Xk.prototype.setMap;t("ol.has.DEVICE_PIXEL_RATIO",nd);t("ol.has.CANVAS",pd);t("ol.has.DEVICE_ORIENTATION",qd);t("ol.has.GEOLOCATION",rd);t("ol.has.TOUCH",sd);
t("ol.has.WEBGL",hd);bl.prototype.getImage=bl.prototype.Y;bl.prototype.load=bl.prototype.load;el.prototype.getImage=el.prototype.Y;t("ol.inherits",w);t("ol.interaction.defaults",Zh);t("ol.Kinetic",Gg);t("ol.loadingstrategy.all",tw);t("ol.loadingstrategy.bbox",function(a){return[a]});t("ol.loadingstrategy.tile",function(a){return function(b,c){c=a.Dc(c);b=tc(a,b,c);var d=[];c=[c,0,0];for(c[1]=b.fa;c[1]<=b.la;++c[1])for(c[2]=b.ea;c[2]<=b.ka;++c[2])d.push(a.Ma(c));return d}});t("ol.Map",K);
ed.prototype.originalEvent=ed.prototype.originalEvent;ed.prototype.pixel=ed.prototype.pixel;ed.prototype.coordinate=ed.prototype.coordinate;ed.prototype.dragging=ed.prototype.dragging;dd.prototype.map=dd.prototype.map;dd.prototype.frameState=dd.prototype.frameState;t("ol.Object",Vc);Vc.prototype.get=Vc.prototype.get;Vc.prototype.getKeys=Vc.prototype.P;Vc.prototype.getProperties=Vc.prototype.L;Vc.prototype.set=Vc.prototype.set;Vc.prototype.setProperties=Vc.prototype.H;Vc.prototype.unset=Vc.prototype.R;
Zc.prototype.key=Zc.prototype.key;Zc.prototype.oldValue=Zc.prototype.oldValue;t("ol.Observable",Uc);t("ol.Observable.unByKey",function(a){if(Array.isArray(a))for(var b=0,c=a.length;b<c;++b)Gc(a[b]);else Gc(a)});Uc.prototype.changed=Uc.prototype.u;Uc.prototype.dispatchEvent=Uc.prototype.b;Uc.prototype.getRevision=Uc.prototype.K;Uc.prototype.on=Uc.prototype.I;Uc.prototype.once=Uc.prototype.once;Uc.prototype.un=Uc.prototype.J;t("ol.Overlay",Bn);Bn.prototype.getElement=Bn.prototype.Rd;
Bn.prototype.getId=Bn.prototype.nn;Bn.prototype.getMap=Bn.prototype.Ve;Bn.prototype.getOffset=Bn.prototype.Xh;Bn.prototype.getPosition=Bn.prototype.pi;Bn.prototype.getPositioning=Bn.prototype.Yh;Bn.prototype.setElement=Bn.prototype.Hj;Bn.prototype.setMap=Bn.prototype.setMap;Bn.prototype.setOffset=Bn.prototype.Mj;Bn.prototype.setPosition=Bn.prototype.We;Bn.prototype.setPositioning=Bn.prototype.Pj;t("ol.PluggableMap",G);G.prototype.addControl=G.prototype.Mf;G.prototype.addInteraction=G.prototype.Nf;
G.prototype.addLayer=G.prototype.xe;G.prototype.addOverlay=G.prototype.ye;G.prototype.forEachFeatureAtPixel=G.prototype.Tc;G.prototype.getFeaturesAtPixel=G.prototype.Xf;G.prototype.forEachLayerAtPixel=G.prototype.tg;G.prototype.hasFeatureAtPixel=G.prototype.ng;G.prototype.getEventCoordinate=G.prototype.Sd;G.prototype.getEventPixel=G.prototype.ud;G.prototype.getTarget=G.prototype.Xd;G.prototype.getTargetElement=G.prototype.Cc;G.prototype.getCoordinateFromPixel=G.prototype.Ra;
G.prototype.getControls=G.prototype.Wf;G.prototype.getOverlays=G.prototype.gg;G.prototype.getOverlayById=G.prototype.fg;G.prototype.getInteractions=G.prototype.bg;G.prototype.getLayerGroup=G.prototype.hc;G.prototype.getLayers=G.prototype.Xe;G.prototype.getPixelFromCoordinate=G.prototype.Ia;G.prototype.getSize=G.prototype.Cb;G.prototype.getView=G.prototype.aa;G.prototype.getViewport=G.prototype.kg;G.prototype.renderSync=G.prototype.dh;G.prototype.render=G.prototype.render;
G.prototype.removeControl=G.prototype.Xg;G.prototype.removeInteraction=G.prototype.Zg;G.prototype.removeLayer=G.prototype.$g;G.prototype.removeOverlay=G.prototype.ah;G.prototype.setLayerGroup=G.prototype.zf;G.prototype.setSize=G.prototype.be;G.prototype.setTarget=G.prototype.Ad;G.prototype.setView=G.prototype.jh;G.prototype.updateSize=G.prototype.Oc;t("ol.proj.METERS_PER_UNIT",ub);t("ol.proj.setProj4",function(a){vb=a});t("ol.proj.getPointResolution",Nb);t("ol.proj.addEquivalentProjections",Qb);
t("ol.proj.addProjection",Rb);t("ol.proj.addCoordinateTransforms",Vb);t("ol.proj.fromLonLat",function(a,b){return ac(a,"EPSG:4326",void 0!==b?b:"EPSG:3857")});t("ol.proj.toLonLat",function(a,b){a=ac(a,void 0!==b?b:"EPSG:3857","EPSG:4326");b=a[0];if(-180>b||180<b)a[0]=wa(b+180,360)-180;return a});t("ol.proj.get",Ob);t("ol.proj.equivalent",Xb);t("ol.proj.getTransform",Yb);t("ol.proj.transform",ac);t("ol.proj.transformExtent",bc);
t("ol.render.toContext",function(a,b){var c=a.canvas,d=b?b:{};b=d.pixelRatio||nd;if(d=d.size)c.width=d[0]*b,c.height=d[1]*b,c.style.width=d[0]+"px",c.style.height=d[1]+"px";c=[0,0,c.width,c.height];d=cf(We(),b,b);return new Bi(a,b,c,d,0)});t("ol.size.toSize",Ba);t("ol.Sphere",ob);ob.prototype.geodesicArea=ob.prototype.a;ob.prototype.haversineDistance=ob.prototype.b;t("ol.Sphere.getLength",rb);t("ol.Sphere.getArea",tb);t("ol.style.iconImageCache",ej);cl.prototype.getTileCoord=cl.prototype.i;
cl.prototype.load=cl.prototype.load;t("ol.tilegrid.createXYZ",Bc);Kn.prototype.getExtent=Kn.prototype.G;Kn.prototype.getFormat=Kn.prototype.qn;Kn.prototype.getFeatures=Kn.prototype.pn;Kn.prototype.getProjection=Kn.prototype.rn;Kn.prototype.setExtent=Kn.prototype.ri;Kn.prototype.setFeatures=Kn.prototype.Ij;Kn.prototype.setProjection=Kn.prototype.vg;Kn.prototype.setLoader=Kn.prototype.ug;t("ol.View",F);F.prototype.animate=F.prototype.animate;F.prototype.getAnimating=F.prototype.Ac;
F.prototype.getInteracting=F.prototype.Vh;F.prototype.cancelAnimations=F.prototype.rd;F.prototype.constrainCenter=F.prototype.Sc;F.prototype.constrainResolution=F.prototype.constrainResolution;F.prototype.constrainRotation=F.prototype.constrainRotation;F.prototype.getCenter=F.prototype.xa;F.prototype.calculateExtent=F.prototype.qd;F.prototype.getMaxResolution=F.prototype.sn;F.prototype.getMinResolution=F.prototype.vn;F.prototype.getMaxZoom=F.prototype.tn;F.prototype.setMaxZoom=F.prototype.Cq;
F.prototype.getMinZoom=F.prototype.wn;F.prototype.setMinZoom=F.prototype.Dq;F.prototype.getProjection=F.prototype.xn;F.prototype.getResolution=F.prototype.Pa;F.prototype.getResolutions=F.prototype.yn;F.prototype.getResolutionForExtent=F.prototype.Je;F.prototype.getRotation=F.prototype.Sa;F.prototype.getZoom=F.prototype.lg;F.prototype.getZoomForResolution=F.prototype.Me;F.prototype.getResolutionForZoom=F.prototype.$h;F.prototype.fit=F.prototype.Uf;F.prototype.centerOn=F.prototype.Nk;
F.prototype.rotate=F.prototype.rotate;F.prototype.setCenter=F.prototype.ub;F.prototype.setResolution=F.prototype.gd;F.prototype.setRotation=F.prototype.ce;F.prototype.setZoom=F.prototype.Tj;t("ol.xml.getAllTextContent",oo);t("ol.xml.parse",so);Hl.prototype.getGL=Hl.prototype.yp;Hl.prototype.useProgram=Hl.prototype.cd;t("ol.tilegrid.TileGrid",qc);qc.prototype.forEachTileCoord=qc.prototype.Vf;qc.prototype.getMaxZoom=qc.prototype.mj;qc.prototype.getMinZoom=qc.prototype.nj;qc.prototype.getOrigin=qc.prototype.Ic;
qc.prototype.getResolution=qc.prototype.Ta;qc.prototype.getResolutions=qc.prototype.oj;qc.prototype.getTileCoordExtent=qc.prototype.Ma;qc.prototype.getTileCoordForCoordAndResolution=qc.prototype.Le;qc.prototype.getTileCoordForCoordAndZ=qc.prototype.jg;qc.prototype.getTileSize=qc.prototype.Za;qc.prototype.getZForResolution=qc.prototype.Dc;t("ol.tilegrid.WMTS",sz);sz.prototype.getMatrixIds=sz.prototype.v;t("ol.tilegrid.WMTS.createFromCapabilitiesMatrixSet",tz);t("ol.style.AtlasManager",Tm);
t("ol.style.Circle",yk);yk.prototype.setRadius=yk.prototype.fd;t("ol.style.Fill",zk);zk.prototype.clone=zk.prototype.clone;zk.prototype.getColor=zk.prototype.g;zk.prototype.setColor=zk.prototype.c;t("ol.style.Icon",dr);dr.prototype.clone=dr.prototype.clone;dr.prototype.getAnchor=dr.prototype.Vc;dr.prototype.getColor=dr.prototype.np;dr.prototype.getImage=dr.prototype.Y;dr.prototype.getOrigin=dr.prototype.bd;dr.prototype.getSrc=dr.prototype.op;dr.prototype.getSize=dr.prototype.oc;
dr.prototype.load=dr.prototype.load;cj.prototype.setSize=cj.prototype.c;t("ol.style.Image",vk);vk.prototype.getOpacity=vk.prototype.hf;vk.prototype.getRotateWithView=vk.prototype.jf;vk.prototype.getRotation=vk.prototype.kf;vk.prototype.getScale=vk.prototype.lf;vk.prototype.getSnapToPixel=vk.prototype.Ke;vk.prototype.setOpacity=vk.prototype.Ed;vk.prototype.setRotation=vk.prototype.mf;vk.prototype.setScale=vk.prototype.Fd;t("ol.style.RegularShape",wk);wk.prototype.clone=wk.prototype.clone;
wk.prototype.getAnchor=wk.prototype.Vc;wk.prototype.getAngle=wk.prototype.ij;wk.prototype.getFill=wk.prototype.Fa;wk.prototype.getImage=wk.prototype.Y;wk.prototype.getOrigin=wk.prototype.bd;wk.prototype.getPoints=wk.prototype.jj;wk.prototype.getRadius=wk.prototype.kj;wk.prototype.getRadius2=wk.prototype.Zh;wk.prototype.getSize=wk.prototype.oc;wk.prototype.getStroke=wk.prototype.Ga;t("ol.style.Stroke",Ak);Ak.prototype.clone=Ak.prototype.clone;Ak.prototype.getColor=Ak.prototype.pp;
Ak.prototype.getLineCap=Ak.prototype.vl;Ak.prototype.getLineDash=Ak.prototype.qp;Ak.prototype.getLineDashOffset=Ak.prototype.wl;Ak.prototype.getLineJoin=Ak.prototype.xl;Ak.prototype.getMiterLimit=Ak.prototype.Dl;Ak.prototype.getWidth=Ak.prototype.rp;Ak.prototype.setColor=Ak.prototype.sp;Ak.prototype.setLineCap=Ak.prototype.yq;Ak.prototype.setLineDash=Ak.prototype.setLineDash;Ak.prototype.setLineDashOffset=Ak.prototype.zq;Ak.prototype.setLineJoin=Ak.prototype.Aq;Ak.prototype.setMiterLimit=Ak.prototype.Eq;
Ak.prototype.setWidth=Ak.prototype.Kq;t("ol.style.Style",Bk);Bk.prototype.clone=Bk.prototype.clone;Bk.prototype.getRenderer=Bk.prototype.Ie;Bk.prototype.setRenderer=Bk.prototype.Iq;Bk.prototype.getGeometry=Bk.prototype.U;Bk.prototype.getGeometryFunction=Bk.prototype.rl;Bk.prototype.getFill=Bk.prototype.Fa;Bk.prototype.setFill=Bk.prototype.yf;Bk.prototype.getImage=Bk.prototype.Y;Bk.prototype.setImage=Bk.prototype.ih;Bk.prototype.getStroke=Bk.prototype.Ga;Bk.prototype.setStroke=Bk.prototype.Af;
Bk.prototype.getText=Bk.prototype.Ka;Bk.prototype.setText=Bk.prototype.Hd;Bk.prototype.getZIndex=Bk.prototype.Ba;Bk.prototype.setGeometry=Bk.prototype.Va;Bk.prototype.setZIndex=Bk.prototype.$b;t("ol.style.Text",J);J.prototype.clone=J.prototype.clone;J.prototype.getOverflow=J.prototype.Gl;J.prototype.getFont=J.prototype.pl;J.prototype.getMaxAngle=J.prototype.Bl;J.prototype.getPlacement=J.prototype.Kl;J.prototype.getOffsetX=J.prototype.El;J.prototype.getOffsetY=J.prototype.Fl;J.prototype.getFill=J.prototype.Fa;
J.prototype.getRotateWithView=J.prototype.tp;J.prototype.getRotation=J.prototype.up;J.prototype.getScale=J.prototype.vp;J.prototype.getStroke=J.prototype.Ga;J.prototype.getText=J.prototype.Ka;J.prototype.getTextAlign=J.prototype.Ql;J.prototype.getTextBaseline=J.prototype.Rl;J.prototype.getBackgroundFill=J.prototype.jl;J.prototype.getBackgroundStroke=J.prototype.kl;J.prototype.getPadding=J.prototype.Il;J.prototype.setOverflow=J.prototype.Fq;J.prototype.setFont=J.prototype.Jj;
J.prototype.setMaxAngle=J.prototype.Bq;J.prototype.setOffsetX=J.prototype.Nj;J.prototype.setOffsetY=J.prototype.Oj;J.prototype.setPlacement=J.prototype.Hq;J.prototype.setFill=J.prototype.yf;J.prototype.setRotation=J.prototype.wp;J.prototype.setScale=J.prototype.lj;J.prototype.setStroke=J.prototype.Af;J.prototype.setText=J.prototype.Hd;J.prototype.setTextAlign=J.prototype.Qj;J.prototype.setTextBaseline=J.prototype.Jq;J.prototype.setBackgroundFill=J.prototype.sq;J.prototype.setBackgroundStroke=J.prototype.tq;
J.prototype.setPadding=J.prototype.Gq;t("ol.source.BingMaps",ry);t("ol.source.BingMaps.TOS_ATTRIBUTION",'<a class="ol-attribution-bing-tos" href="https://www.microsoft.com/maps/product/terms.html">Terms of Use</a>');ry.prototype.getApiKey=ry.prototype.ca;ry.prototype.getImagerySet=ry.prototype.ua;t("ol.source.CartoDB",ty);ty.prototype.getConfig=ty.prototype.nl;ty.prototype.updateConfig=ty.prototype.Sq;ty.prototype.setConfig=ty.prototype.uq;t("ol.source.Cluster",X);X.prototype.getDistance=X.prototype.Eo;
X.prototype.getSource=X.prototype.Fo;X.prototype.setDistance=X.prototype.vq;t("ol.source.Image",zy);By.prototype.image=By.prototype.image;t("ol.source.ImageArcGISRest",Hy);Hy.prototype.getParams=Hy.prototype.Ho;Hy.prototype.getImageLoadFunction=Hy.prototype.Go;Hy.prototype.getUrl=Hy.prototype.Io;Hy.prototype.setImageLoadFunction=Hy.prototype.Jo;Hy.prototype.setUrl=Hy.prototype.Ko;Hy.prototype.updateParams=Hy.prototype.Lo;t("ol.source.ImageCanvas",Iy);t("ol.source.ImageMapGuide",Jy);
Jy.prototype.getParams=Jy.prototype.No;Jy.prototype.getImageLoadFunction=Jy.prototype.Mo;Jy.prototype.updateParams=Jy.prototype.Po;Jy.prototype.setImageLoadFunction=Jy.prototype.Oo;t("ol.source.ImageStatic",Ky);t("ol.source.ImageVector",Ly);Ly.prototype.getSource=Ly.prototype.Qo;Ly.prototype.getStyle=Ly.prototype.Ro;Ly.prototype.getStyleFunction=Ly.prototype.ib;Ly.prototype.setStyle=Ly.prototype.aj;t("ol.source.ImageWMS",Ny);Ny.prototype.getGetFeatureInfoUrl=Ny.prototype.Uo;
Ny.prototype.getParams=Ny.prototype.Wo;Ny.prototype.getImageLoadFunction=Ny.prototype.Vo;Ny.prototype.getUrl=Ny.prototype.Xo;Ny.prototype.setImageLoadFunction=Ny.prototype.Yo;Ny.prototype.setUrl=Ny.prototype.Zo;Ny.prototype.updateParams=Ny.prototype.$o;t("ol.source.OSM",Ry);t("ol.source.OSM.ATTRIBUTION",'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors.');t("ol.source.Raster",Sy);Sy.prototype.setOperation=Sy.prototype.s;Wy.prototype.extent=Wy.prototype.extent;
Wy.prototype.resolution=Wy.prototype.resolution;Wy.prototype.data=Wy.prototype.data;t("ol.source.Source",uw);uw.prototype.getAttributions=uw.prototype.za;uw.prototype.getLogo=uw.prototype.Aa;uw.prototype.getProjection=uw.prototype.Da;uw.prototype.getState=uw.prototype.getState;uw.prototype.refresh=uw.prototype.sa;uw.prototype.setAttributions=uw.prototype.va;t("ol.source.Stamen",Zy);t("ol.source.Tile",iy);iy.prototype.getTileGrid=iy.prototype.jb;ly.prototype.tile=ly.prototype.tile;
t("ol.source.TileArcGISRest",cz);cz.prototype.getParams=cz.prototype.o;cz.prototype.updateParams=cz.prototype.B;t("ol.source.TileDebug",ez);t("ol.source.TileImage",ny);ny.prototype.setRenderReprojectionEdges=ny.prototype.Qb;ny.prototype.setTileGridForProjection=ny.prototype.Rb;t("ol.source.TileJSON",gz);gz.prototype.getTileJSON=gz.prototype.Sl;t("ol.source.TileUTFGrid",hz);hz.prototype.getTemplate=hz.prototype.Pl;hz.prototype.forDataAtCoordinateAndResolution=hz.prototype.al;
t("ol.source.TileWMS",lz);lz.prototype.getGetFeatureInfoUrl=lz.prototype.hp;lz.prototype.getParams=lz.prototype.ip;lz.prototype.updateParams=lz.prototype.jp;my.prototype.getTileLoadFunction=my.prototype.yb;my.prototype.getTileUrlFunction=my.prototype.zb;my.prototype.getUrls=my.prototype.Ab;my.prototype.setTileLoadFunction=my.prototype.Fb;my.prototype.setTileUrlFunction=my.prototype.hb;my.prototype.setUrl=my.prototype.rb;my.prototype.setUrls=my.prototype.vb;t("ol.source.Vector",U);
U.prototype.addFeature=U.prototype.Gb;U.prototype.addFeatures=U.prototype.Qc;U.prototype.clear=U.prototype.clear;U.prototype.forEachFeature=U.prototype.Lh;U.prototype.forEachFeatureInExtent=U.prototype.ec;U.prototype.forEachFeatureIntersectingExtent=U.prototype.Mh;U.prototype.getFeaturesCollection=U.prototype.Th;U.prototype.getFeatures=U.prototype.ee;U.prototype.getFeaturesAtCoordinate=U.prototype.Sh;U.prototype.getFeaturesInExtent=U.prototype.Yf;U.prototype.getClosestFeatureToCoordinate=U.prototype.Oh;
U.prototype.getExtent=U.prototype.G;U.prototype.getFeatureById=U.prototype.Rh;U.prototype.getFormat=U.prototype.ej;U.prototype.getUrl=U.prototype.fj;U.prototype.removeLoadedExtent=U.prototype.Cj;U.prototype.removeFeature=U.prototype.Lb;U.prototype.setLoader=U.prototype.hj;Bw.prototype.feature=Bw.prototype.feature;t("ol.source.VectorTile",rz);rz.prototype.clear=rz.prototype.clear;t("ol.source.WMTS",Y);Y.prototype.getDimensions=Y.prototype.ol;Y.prototype.getFormat=Y.prototype.kp;
Y.prototype.getLayer=Y.prototype.lp;Y.prototype.getMatrixSet=Y.prototype.Al;Y.prototype.getRequestEncoding=Y.prototype.Nl;Y.prototype.getStyle=Y.prototype.mp;Y.prototype.getVersion=Y.prototype.Ul;Y.prototype.updateDimensions=Y.prototype.Tq;
t("ol.source.WMTS.optionsFromCapabilities",function(a,b){var c=hc(a.Contents.Layer,function(a){return a.Identifier==b.layer});if(null===c)return null;var d=a.Contents.TileMatrixSet;var e=1<c.TileMatrixSetLink.length?"projection"in b?mc(c.TileMatrixSetLink,function(a){var c=hc(d,function(b){return b.Identifier==a.TileMatrixSet}).SupportedCRS,e=Ob(c.replace(/urn:ogc:def:crs:(\w+):(.*:)?(\w+)$/,"$1:$3"))||Ob(c),f=Ob(b.projection);return e&&f?Xb(e,f):c==b.projection}):mc(c.TileMatrixSetLink,function(a){return a.TileMatrixSet==
b.matrixSet}):0;0>e&&(e=0);var f=c.TileMatrixSetLink[e].TileMatrixSet;var g=c.TileMatrixSetLink[e].TileMatrixSetLimits;var h=c.Format[0];"format"in b&&(h=b.format);e=mc(c.Style,function(a){return"style"in b?a.Title==b.style:a.isDefault});0>e&&(e=0);e=c.Style[e].Identifier;var l={};"Dimension"in c&&c.Dimension.forEach(function(a){var b=a.Identifier,c=a.Default;void 0===c&&(c=a.Value[0]);l[b]=c});var m=hc(a.Contents.TileMatrixSet,function(a){return a.Identifier==f}),n,p=m.SupportedCRS;p&&(n=Ob(p.replace(/urn:ogc:def:crs:(\w+):(.*:)?(\w+)$/,
"$1:$3"))||Ob(p));"projection"in b&&(p=Ob(b.projection),!p||n&&!Xb(p,n)||(n=p));p=c.WGS84BoundingBox;if(void 0!==p){var q=Ob("EPSG:4326").G();q=p[0]==q[0]&&p[2]==q[2];var r=bc(p,"EPSG:4326",n);(p=n.G())&&(La(p,r)||(r=void 0))}g=tz(m,r,g);var u=[];m=b.requestEncoding;m=void 0!==m?m:"";if("OperationsMetadata"in a&&"GetTile"in a.OperationsMetadata)for(a=a.OperationsMetadata.GetTile.DCP.HTTP.Get,r=0,p=a.length;r<p;++r)if(a[r].Constraint){var v=hc(a[r].Constraint,function(a){return"GetEncoding"==a.name}).AllowedValues.Value;
""===m&&(m=v[0]);if("KVP"===m)ec(v,"KVP")&&u.push(a[r].href);else break}else a[r].href&&(m="KVP",u.push(a[r].href));0===u.length&&(m="REST",c.ResourceURL.forEach(function(a){"tile"===a.resourceType&&(h=a.format,u.push(a.template))}));return{urls:u,layer:b.layer,matrixSet:f,format:h,projection:n,requestEncoding:m,tileGrid:g,style:e,dimensions:l,wrapX:q,crossOrigin:b.crossOrigin}});t("ol.source.XYZ",sy);t("ol.source.Zoomify",vz);t("ol.renderer.webgl.ImageLayer",pn);t("ol.renderer.webgl.Map",sn);
t("ol.renderer.webgl.TileLayer",zn);t("ol.renderer.webgl.VectorLayer",An);t("ol.renderer.canvas.ImageLayer",bj);t("ol.renderer.canvas.Map",kj);t("ol.renderer.canvas.TileLayer",mj);t("ol.renderer.canvas.VectorLayer",hk);t("ol.renderer.canvas.VectorTileLayer",jk);bi.prototype.vectorContext=bi.prototype.vectorContext;bi.prototype.frameState=bi.prototype.frameState;bi.prototype.context=bi.prototype.context;bi.prototype.glContext=bi.prototype.glContext;it.prototype.get=it.prototype.get;
it.prototype.getExtent=it.prototype.G;it.prototype.getId=it.prototype.Ao;it.prototype.getGeometry=it.prototype.U;it.prototype.getProperties=it.prototype.Bo;it.prototype.getType=it.prototype.S;t("ol.render.VectorContext",Ai);gn.prototype.setStyle=gn.prototype.Dd;gn.prototype.drawGeometry=gn.prototype.Hb;gn.prototype.drawFeature=gn.prototype.Ce;Bi.prototype.drawCircle=Bi.prototype.cc;Bi.prototype.setStyle=Bi.prototype.Dd;Bi.prototype.drawGeometry=Bi.prototype.Hb;Bi.prototype.drawFeature=Bi.prototype.Ce;
t("ol.proj.common.add",cc);t("ol.proj.Projection",wb);wb.prototype.getCode=wb.prototype.ml;wb.prototype.getExtent=wb.prototype.G;wb.prototype.getUnits=wb.prototype.zo;wb.prototype.getMetersPerUnit=wb.prototype.Bc;wb.prototype.getWorldExtent=wb.prototype.Vl;wb.prototype.getAxisOrientation=wb.prototype.il;wb.prototype.isGlobal=wb.prototype.Gm;wb.prototype.setGlobal=wb.prototype.xq;wb.prototype.setExtent=wb.prototype.Si;wb.prototype.setWorldExtent=wb.prototype.Sj;wb.prototype.setGetPointResolution=wb.prototype.wq;
t("ol.proj.Units.METERS_PER_UNIT",ub);t("ol.layer.Base",kg);kg.prototype.getExtent=kg.prototype.G;kg.prototype.getMaxResolution=kg.prototype.lc;kg.prototype.getMinResolution=kg.prototype.mc;kg.prototype.getOpacity=kg.prototype.nc;kg.prototype.getVisible=kg.prototype.Jb;kg.prototype.getZIndex=kg.prototype.Ba;kg.prototype.setExtent=kg.prototype.Fc;kg.prototype.setMaxResolution=kg.prototype.Mc;kg.prototype.setMinResolution=kg.prototype.Nc;kg.prototype.setOpacity=kg.prototype.Gc;
kg.prototype.setVisible=kg.prototype.Hc;kg.prototype.setZIndex=kg.prototype.$b;t("ol.layer.Group",mg);mg.prototype.getLayers=mg.prototype.Cd;mg.prototype.setLayers=mg.prototype.Qi;t("ol.layer.Heatmap",V);V.prototype.getBlur=V.prototype.Nh;V.prototype.getGradient=V.prototype.Uh;V.prototype.getRadius=V.prototype.Ri;V.prototype.setBlur=V.prototype.Fj;V.prototype.setGradient=V.prototype.Lj;V.prototype.setRadius=V.prototype.fd;t("ol.layer.Image",Sx);Sx.prototype.getSource=Sx.prototype.ha;
t("ol.layer.Layer",xg);xg.prototype.getSource=xg.prototype.ha;xg.prototype.setMap=xg.prototype.setMap;xg.prototype.setSource=xg.prototype.hd;t("ol.layer.Tile",Tx);Tx.prototype.getPreload=Tx.prototype.c;Tx.prototype.getSource=Tx.prototype.ha;Tx.prototype.setPreload=Tx.prototype.j;Tx.prototype.getUseInterimTilesOnError=Tx.prototype.i;Tx.prototype.setUseInterimTilesOnError=Tx.prototype.C;t("ol.layer.Vector",T);T.prototype.getSource=T.prototype.ha;T.prototype.getStyle=T.prototype.B;
T.prototype.getStyleFunction=T.prototype.ib;T.prototype.setStyle=T.prototype.j;t("ol.layer.VectorTile",W);W.prototype.getPreload=W.prototype.c;W.prototype.getUseInterimTilesOnError=W.prototype.i;W.prototype.setPreload=W.prototype.T;W.prototype.setUseInterimTilesOnError=W.prototype.O;W.prototype.getSource=W.prototype.ha;t("ol.interaction.DoubleClickZoom",Ug);t("ol.interaction.DoubleClickZoom.handleEvent",Vg);t("ol.interaction.DragAndDrop",iw);t("ol.interaction.DragAndDrop.handleEvent",Re);
lw.prototype.features=lw.prototype.features;lw.prototype.file=lw.prototype.file;lw.prototype.projection=lw.prototype.projection;t("ol.interaction.DragBox",th);th.prototype.getGeometry=th.prototype.U;yh.prototype.coordinate=yh.prototype.coordinate;yh.prototype.mapBrowserEvent=yh.prototype.mapBrowserEvent;t("ol.interaction.DragPan",ih);t("ol.interaction.DragRotate",mh);t("ol.interaction.DragRotateAndZoom",pw);t("ol.interaction.DragZoom",Ch);t("ol.interaction.Draw",Ew);
t("ol.interaction.Draw.handleEvent",Gw);Ew.prototype.removeLastPoint=Ew.prototype.nq;Ew.prototype.finishDrawing=Ew.prototype.Pd;Ew.prototype.extend=Ew.prototype.Zn;t("ol.interaction.Draw.createRegularPolygon",function(a,b){return function(c,d){var e=c[0];c=c[1];var f=Math.sqrt(He(e,c));d=d?d:Sf(new gw(e),a);Tf(d,e,f,b?b:Math.atan((c[1]-e[1])/(c[0]-e[0])));return d}});
t("ol.interaction.Draw.createBox",function(){return function(a,b){a=Ca(a);b=b||new D(null);b.na([[Wa(a),Ya(a),Za(a),$a(a),Wa(a)]]);return b}});Uw.prototype.feature=Uw.prototype.feature;t("ol.interaction.Extent",Vw);Vw.prototype.getExtent=Vw.prototype.G;Vw.prototype.setExtent=Vw.prototype.f;fx.prototype.extent=fx.prototype.extent;t("ol.interaction.Interaction",Jg);Jg.prototype.getActive=Jg.prototype.c;Jg.prototype.getMap=Jg.prototype.i;Jg.prototype.setActive=Jg.prototype.Ha;
t("ol.interaction.KeyboardPan",Dh);t("ol.interaction.KeyboardPan.handleEvent",Eh);t("ol.interaction.KeyboardZoom",Fh);t("ol.interaction.KeyboardZoom.handleEvent",Gh);t("ol.interaction.Modify",gx);t("ol.interaction.Modify.handleEvent",jx);gx.prototype.removePoint=gx.prototype.Dj;ox.prototype.features=ox.prototype.features;ox.prototype.mapBrowserEvent=ox.prototype.mapBrowserEvent;t("ol.interaction.MouseWheelZoom",Hh);t("ol.interaction.MouseWheelZoom.handleEvent",Ih);Hh.prototype.setMouseAnchor=Hh.prototype.V;
t("ol.interaction.PinchRotate",Rh);t("ol.interaction.PinchZoom",Vh);t("ol.interaction.Pointer",fh);t("ol.interaction.Pointer.handleEvent",gh);t("ol.interaction.Select",wx);wx.prototype.getFeatures=wx.prototype.lo;wx.prototype.getHitTolerance=wx.prototype.mo;wx.prototype.getLayer=wx.prototype.no;t("ol.interaction.Select.handleEvent",xx);wx.prototype.setHitTolerance=wx.prototype.po;wx.prototype.setMap=wx.prototype.setMap;zx.prototype.selected=zx.prototype.selected;zx.prototype.deselected=zx.prototype.deselected;
zx.prototype.mapBrowserEvent=zx.prototype.mapBrowserEvent;t("ol.interaction.Snap",Bx);Bx.prototype.addFeature=Bx.prototype.Gb;Bx.prototype.removeFeature=Bx.prototype.Lb;t("ol.interaction.Translate",Gx);Gx.prototype.getHitTolerance=Gx.prototype.B;Gx.prototype.setHitTolerance=Gx.prototype.T;Mx.prototype.features=Mx.prototype.features;Mx.prototype.coordinate=Mx.prototype.coordinate;t("ol.geom.Circle",gw);gw.prototype.clone=gw.prototype.clone;gw.prototype.getCenter=gw.prototype.xa;
gw.prototype.getRadius=gw.prototype.Bd;gw.prototype.getType=gw.prototype.S;gw.prototype.intersectsExtent=gw.prototype.$a;gw.prototype.setCenter=gw.prototype.ub;gw.prototype.setCenterAndRadius=gw.prototype.hh;gw.prototype.setRadius=gw.prototype.fd;gw.prototype.transform=gw.prototype.mb;t("ol.geom.Geometry",gf);gf.prototype.getClosestPoint=gf.prototype.Ib;gf.prototype.intersectsCoordinate=gf.prototype.Bb;gf.prototype.getExtent=gf.prototype.G;gf.prototype.rotate=gf.prototype.rotate;
gf.prototype.scale=gf.prototype.scale;gf.prototype.simplify=gf.prototype.Sb;gf.prototype.transform=gf.prototype.mb;t("ol.geom.GeometryCollection",Mq);Mq.prototype.clone=Mq.prototype.clone;Mq.prototype.getGeometries=Mq.prototype.vd;Mq.prototype.getType=Mq.prototype.S;Mq.prototype.intersectsExtent=Mq.prototype.$a;Mq.prototype.setGeometries=Mq.prototype.Kj;Mq.prototype.applyTransform=Mq.prototype.Rc;Mq.prototype.translate=Mq.prototype.translate;t("ol.geom.LinearRing",Df);Df.prototype.clone=Df.prototype.clone;
Df.prototype.getArea=Df.prototype.Vn;Df.prototype.getCoordinates=Df.prototype.W;Df.prototype.getType=Df.prototype.S;Df.prototype.setCoordinates=Df.prototype.na;t("ol.geom.LineString",I);I.prototype.appendCoordinate=I.prototype.Fk;I.prototype.clone=I.prototype.clone;I.prototype.forEachSegment=I.prototype.dl;I.prototype.getCoordinateAtM=I.prototype.Tn;I.prototype.getCoordinates=I.prototype.W;I.prototype.getCoordinateAt=I.prototype.Ph;I.prototype.getLength=I.prototype.Un;I.prototype.getType=I.prototype.S;
I.prototype.intersectsExtent=I.prototype.$a;I.prototype.setCoordinates=I.prototype.na;t("ol.geom.MultiLineString",P);P.prototype.appendLineString=P.prototype.Gk;P.prototype.clone=P.prototype.clone;P.prototype.getCoordinateAtM=P.prototype.Wn;P.prototype.getCoordinates=P.prototype.W;P.prototype.getLineString=P.prototype.yl;P.prototype.getLineStrings=P.prototype.wd;P.prototype.getType=P.prototype.S;P.prototype.intersectsExtent=P.prototype.$a;P.prototype.setCoordinates=P.prototype.na;
t("ol.geom.MultiPoint",No);No.prototype.appendPoint=No.prototype.Ik;No.prototype.clone=No.prototype.clone;No.prototype.getCoordinates=No.prototype.W;No.prototype.getPoint=No.prototype.Ll;No.prototype.getPoints=No.prototype.de;No.prototype.getType=No.prototype.S;No.prototype.intersectsExtent=No.prototype.$a;No.prototype.setCoordinates=No.prototype.na;t("ol.geom.MultiPolygon",Q);Q.prototype.appendPolygon=Q.prototype.Jk;Q.prototype.clone=Q.prototype.clone;Q.prototype.getArea=Q.prototype.Xn;
Q.prototype.getCoordinates=Q.prototype.W;Q.prototype.getInteriorPoints=Q.prototype.ul;Q.prototype.getPolygon=Q.prototype.Ml;Q.prototype.getPolygons=Q.prototype.Vd;Q.prototype.getType=Q.prototype.S;Q.prototype.intersectsExtent=Q.prototype.$a;Q.prototype.setCoordinates=Q.prototype.na;t("ol.geom.Point",C);C.prototype.clone=C.prototype.clone;C.prototype.getCoordinates=C.prototype.W;C.prototype.getType=C.prototype.S;C.prototype.intersectsExtent=C.prototype.$a;C.prototype.setCoordinates=C.prototype.na;
t("ol.geom.Polygon",D);D.prototype.appendLinearRing=D.prototype.Hk;D.prototype.clone=D.prototype.clone;D.prototype.getArea=D.prototype.Yn;D.prototype.getCoordinates=D.prototype.W;D.prototype.getInteriorPoint=D.prototype.tl;D.prototype.getLinearRingCount=D.prototype.zl;D.prototype.getLinearRing=D.prototype.Wh;D.prototype.getLinearRings=D.prototype.Ud;D.prototype.getType=D.prototype.S;D.prototype.intersectsExtent=D.prototype.$a;D.prototype.setCoordinates=D.prototype.na;
t("ol.geom.Polygon.circular",Qf);t("ol.geom.Polygon.fromExtent",Rf);t("ol.geom.Polygon.fromCircle",Sf);t("ol.geom.SimpleGeometry",hf);hf.prototype.getFirstCoordinate=hf.prototype.fc;hf.prototype.getLastCoordinate=hf.prototype.gc;hf.prototype.getLayout=hf.prototype.ic;hf.prototype.applyTransform=hf.prototype.Rc;hf.prototype.translate=hf.prototype.translate;t("ol.format.EsriJSON",Po);Po.prototype.readFeature=Po.prototype.Yb;Po.prototype.readFeatures=Po.prototype.Qa;Po.prototype.readGeometry=Po.prototype.ed;
Po.prototype.readProjection=Po.prototype.sb;Po.prototype.writeGeometry=Po.prototype.md;Po.prototype.writeGeometryObject=Po.prototype.se;Po.prototype.writeFeature=Po.prototype.Jd;Po.prototype.writeFeatureObject=Po.prototype.ld;Po.prototype.writeFeatures=Po.prototype.ac;Po.prototype.writeFeaturesObject=Po.prototype.qe;t("ol.format.Feature",Go);t("ol.format.filter.and",bu);
t("ol.format.filter.or",function(a){var b=[null].concat(Array.prototype.slice.call(arguments));return new (Function.prototype.bind.apply($t,b))});t("ol.format.filter.not",function(a){return new Yt(a)});t("ol.format.filter.bbox",cu);t("ol.format.filter.contains",function(a,b,c){return new Lt(a,b,c)});t("ol.format.filter.intersects",function(a,b,c){return new St(a,b,c)});t("ol.format.filter.within",function(a,b,c){return new au(a,b,c)});
t("ol.format.filter.equalTo",function(a,b,c){return new Pt(a,b,c)});t("ol.format.filter.notEqualTo",function(a,b,c){return new Zt(a,b,c)});t("ol.format.filter.lessThan",function(a,b){return new Wt(a,b)});t("ol.format.filter.lessThanOrEqualTo",function(a,b){return new Xt(a,b)});t("ol.format.filter.greaterThan",function(a,b){return new Qt(a,b)});t("ol.format.filter.greaterThanOrEqualTo",function(a,b){return new Rt(a,b)});t("ol.format.filter.isNull",function(a){return new Vt(a)});
t("ol.format.filter.between",function(a,b,c){return new Tt(a,b,c)});t("ol.format.filter.like",function(a,b,c,d,e,f){return new Ut(a,b,c,d,e,f)});t("ol.format.filter.during",function(a,b,c){return new Nt(a,b,c)});t("ol.format.GeoJSON",Qq);Qq.prototype.readFeature=Qq.prototype.Yb;Qq.prototype.readFeatures=Qq.prototype.Qa;Qq.prototype.readGeometry=Qq.prototype.ed;Qq.prototype.readProjection=Qq.prototype.sb;Qq.prototype.writeFeature=Qq.prototype.Jd;Qq.prototype.writeFeatureObject=Qq.prototype.ld;
Qq.prototype.writeFeatures=Qq.prototype.ac;Qq.prototype.writeFeaturesObject=Qq.prototype.qe;Qq.prototype.writeGeometry=Qq.prototype.md;Qq.prototype.writeGeometryObject=Qq.prototype.se;t("ol.format.GML",Kp);Kp.prototype.writeFeatures=Kp.prototype.ac;Kp.prototype.writeFeaturesNode=Kp.prototype.bc;t("ol.format.GML2",Tp);t("ol.format.GML3",Kp);Kp.prototype.writeGeometryNode=Kp.prototype.re;Kp.prototype.writeFeatures=Kp.prototype.ac;Kp.prototype.writeFeaturesNode=Kp.prototype.bc;
Zo.prototype.readFeatures=Zo.prototype.Qa;t("ol.format.GPX",dq);dq.prototype.readFeature=dq.prototype.Yb;dq.prototype.readFeatures=dq.prototype.Qa;dq.prototype.readProjection=dq.prototype.sb;dq.prototype.writeFeatures=dq.prototype.ac;dq.prototype.writeFeaturesNode=dq.prototype.bc;t("ol.format.IGC",Xq);Xq.prototype.readFeature=Xq.prototype.Yb;Xq.prototype.readFeatures=Xq.prototype.Qa;Xq.prototype.readProjection=Xq.prototype.sb;t("ol.format.KML",er);er.prototype.readFeature=er.prototype.Yb;
er.prototype.readFeatures=er.prototype.Qa;er.prototype.readName=er.prototype.cq;er.prototype.readNetworkLinks=er.prototype.eq;er.prototype.readRegion=er.prototype.hq;er.prototype.readRegionFromNode=er.prototype.vf;er.prototype.readProjection=er.prototype.sb;er.prototype.writeFeatures=er.prototype.ac;er.prototype.writeFeaturesNode=er.prototype.bc;t("ol.format.MVT",jt);jt.prototype.getLastExtent=jt.prototype.cg;jt.prototype.readFeatures=jt.prototype.Qa;jt.prototype.readProjection=jt.prototype.sb;
jt.prototype.setLayers=jt.prototype.Sn;t("ol.format.OSMXML",ot);ot.prototype.readFeatures=ot.prototype.Qa;ot.prototype.readProjection=ot.prototype.sb;t("ol.format.Polyline",vt);t("ol.format.Polyline.encodeDeltas",wt);t("ol.format.Polyline.decodeDeltas",yt);t("ol.format.Polyline.encodeFloats",xt);t("ol.format.Polyline.decodeFloats",zt);vt.prototype.readFeature=vt.prototype.Yb;vt.prototype.readFeatures=vt.prototype.Qa;vt.prototype.readGeometry=vt.prototype.ed;vt.prototype.readProjection=vt.prototype.sb;
vt.prototype.writeGeometry=vt.prototype.md;t("ol.format.TopoJSON",At);At.prototype.readFeatures=At.prototype.Qa;At.prototype.readProjection=At.prototype.sb;t("ol.format.WFS",du);du.prototype.readFeatures=du.prototype.Qa;du.prototype.readTransactionResponse=du.prototype.j;du.prototype.readFeatureCollectionMetadata=du.prototype.f;t("ol.format.WFS.writeFilter",function(a){var b=no("http://www.opengis.net/ogc","Filter");Do({node:b},su,yo(a.rc),[a],[]);return b});du.prototype.writeGetFeature=du.prototype.s;
du.prototype.writeTransaction=du.prototype.v;du.prototype.readProjection=du.prototype.sb;t("ol.format.WKT",Ku);Ku.prototype.readFeature=Ku.prototype.Yb;Ku.prototype.readFeatures=Ku.prototype.Qa;Ku.prototype.readGeometry=Ku.prototype.ed;Ku.prototype.writeFeature=Ku.prototype.Jd;Ku.prototype.writeFeatures=Ku.prototype.ac;Ku.prototype.writeGeometry=Ku.prototype.md;t("ol.format.WMSCapabilities",ev);ev.prototype.read=ev.prototype.read;t("ol.format.WMSGetFeatureInfo",Bv);Bv.prototype.readFeatures=Bv.prototype.Qa;
t("ol.format.WMTSCapabilities",Sv);Sv.prototype.read=Sv.prototype.read;t("ol.format.filter.And",It);t("ol.format.filter.Bbox",Jt);t("ol.format.filter.Comparison",Mt);t("ol.format.filter.ComparisonBinary",Ot);t("ol.format.filter.Contains",Lt);t("ol.format.filter.During",Nt);t("ol.format.filter.EqualTo",Pt);t("ol.format.filter.Filter",Gt);t("ol.format.filter.GreaterThan",Qt);t("ol.format.filter.GreaterThanOrEqualTo",Rt);t("ol.format.filter.Intersects",St);t("ol.format.filter.IsBetween",Tt);
t("ol.format.filter.IsLike",Ut);t("ol.format.filter.IsNull",Vt);t("ol.format.filter.LessThan",Wt);t("ol.format.filter.LessThanOrEqualTo",Xt);t("ol.format.filter.Not",Yt);t("ol.format.filter.NotEqualTo",Zt);t("ol.format.filter.Or",$t);t("ol.format.filter.Spatial",Kt);t("ol.format.filter.Within",au);t("ol.events.condition.altKeyOnly",Wg);t("ol.events.condition.altShiftKeysOnly",Xg);t("ol.events.condition.always",Re);t("ol.events.condition.click",function(a){return"click"==a.type});
t("ol.events.condition.never",Se);t("ol.events.condition.pointerMove",Zg);t("ol.events.condition.singleClick",$g);t("ol.events.condition.doubleClick",function(a){return"dblclick"==a.type});t("ol.events.condition.noModifierKeys",ah);t("ol.events.condition.platformModifierKeyOnly",function(a){a=a.originalEvent;return!a.altKey&&(md?a.metaKey:a.ctrlKey)&&!a.shiftKey});t("ol.events.condition.shiftKeyOnly",bh);t("ol.events.condition.targetNotEditable",ch);t("ol.events.condition.mouseOnly",dh);
t("ol.events.condition.primaryAction",eh);Qc.prototype.type=Qc.prototype.type;Qc.prototype.target=Qc.prototype.target;Qc.prototype.preventDefault=Qc.prototype.preventDefault;Qc.prototype.stopPropagation=Qc.prototype.stopPropagation;t("ol.control.Attribution",zg);t("ol.control.Attribution.render",Ag);zg.prototype.getCollapsible=zg.prototype.An;zg.prototype.setCollapsible=zg.prototype.Dn;zg.prototype.setCollapsed=zg.prototype.Cn;zg.prototype.getCollapsed=zg.prototype.zn;t("ol.control.Control",vg);
vg.prototype.getMap=vg.prototype.f;vg.prototype.setMap=vg.prototype.setMap;vg.prototype.setTarget=vg.prototype.i;t("ol.control.FullScreen",Mn);t("ol.control.MousePosition",Rn);t("ol.control.MousePosition.render",Sn);Rn.prototype.getCoordinateFormat=Rn.prototype.Qh;Rn.prototype.getProjection=Rn.prototype.si;Rn.prototype.setCoordinateFormat=Rn.prototype.Gj;Rn.prototype.setProjection=Rn.prototype.ti;t("ol.control.OverviewMap",Wn);t("ol.control.OverviewMap.render",Xn);Wn.prototype.getCollapsible=Wn.prototype.Gn;
Wn.prototype.setCollapsible=Wn.prototype.Jn;Wn.prototype.setCollapsed=Wn.prototype.In;Wn.prototype.getCollapsed=Wn.prototype.Fn;Wn.prototype.getOverviewMap=Wn.prototype.Hl;t("ol.control.Rotate",Cg);t("ol.control.Rotate.render",Dg);t("ol.control.ScaleLine",ao);ao.prototype.getUnits=ao.prototype.C;t("ol.control.ScaleLine.render",bo);ao.prototype.setUnits=ao.prototype.O;t("ol.control.Zoom",Eg);t("ol.control.ZoomSlider",go);t("ol.control.ZoomSlider.render",io);t("ol.control.ZoomToExtent",lo);
Vc.prototype.changed=Vc.prototype.u;Vc.prototype.dispatchEvent=Vc.prototype.b;Vc.prototype.getRevision=Vc.prototype.K;Vc.prototype.on=Vc.prototype.I;Vc.prototype.once=Vc.prototype.once;Vc.prototype.un=Vc.prototype.J;G.prototype.get=G.prototype.get;G.prototype.getKeys=G.prototype.P;G.prototype.getProperties=G.prototype.L;G.prototype.set=G.prototype.set;G.prototype.setProperties=G.prototype.H;G.prototype.unset=G.prototype.R;G.prototype.changed=G.prototype.u;G.prototype.dispatchEvent=G.prototype.b;
G.prototype.getRevision=G.prototype.K;G.prototype.on=G.prototype.I;G.prototype.once=G.prototype.once;G.prototype.un=G.prototype.J;H.prototype.addControl=H.prototype.Mf;H.prototype.addInteraction=H.prototype.Nf;H.prototype.addLayer=H.prototype.xe;H.prototype.addOverlay=H.prototype.ye;H.prototype.forEachFeatureAtPixel=H.prototype.Tc;H.prototype.getFeaturesAtPixel=H.prototype.Xf;H.prototype.forEachLayerAtPixel=H.prototype.tg;H.prototype.hasFeatureAtPixel=H.prototype.ng;
H.prototype.getEventCoordinate=H.prototype.Sd;H.prototype.getEventPixel=H.prototype.ud;H.prototype.getTarget=H.prototype.Xd;H.prototype.getTargetElement=H.prototype.Cc;H.prototype.getCoordinateFromPixel=H.prototype.Ra;H.prototype.getControls=H.prototype.Wf;H.prototype.getOverlays=H.prototype.gg;H.prototype.getOverlayById=H.prototype.fg;H.prototype.getInteractions=H.prototype.bg;H.prototype.getLayerGroup=H.prototype.hc;H.prototype.getLayers=H.prototype.Xe;H.prototype.getPixelFromCoordinate=H.prototype.Ia;
H.prototype.getSize=H.prototype.Cb;H.prototype.getView=H.prototype.aa;H.prototype.getViewport=H.prototype.kg;H.prototype.renderSync=H.prototype.dh;H.prototype.render=H.prototype.render;H.prototype.removeControl=H.prototype.Xg;H.prototype.removeInteraction=H.prototype.Zg;H.prototype.removeLayer=H.prototype.$g;H.prototype.removeOverlay=H.prototype.ah;H.prototype.setLayerGroup=H.prototype.zf;H.prototype.setSize=H.prototype.be;H.prototype.setTarget=H.prototype.Ad;H.prototype.setView=H.prototype.jh;
H.prototype.updateSize=H.prototype.Oc;H.prototype.get=H.prototype.get;H.prototype.getKeys=H.prototype.P;H.prototype.getProperties=H.prototype.L;H.prototype.set=H.prototype.set;H.prototype.setProperties=H.prototype.H;H.prototype.unset=H.prototype.R;H.prototype.changed=H.prototype.u;H.prototype.dispatchEvent=H.prototype.b;H.prototype.getRevision=H.prototype.K;H.prototype.on=H.prototype.I;H.prototype.once=H.prototype.once;H.prototype.un=H.prototype.J;B.prototype.get=B.prototype.get;
B.prototype.getKeys=B.prototype.P;B.prototype.getProperties=B.prototype.L;B.prototype.set=B.prototype.set;B.prototype.setProperties=B.prototype.H;B.prototype.unset=B.prototype.R;B.prototype.changed=B.prototype.u;B.prototype.dispatchEvent=B.prototype.b;B.prototype.getRevision=B.prototype.K;B.prototype.on=B.prototype.I;B.prototype.once=B.prototype.once;B.prototype.un=B.prototype.J;cd.prototype.type=cd.prototype.type;cd.prototype.target=cd.prototype.target;cd.prototype.preventDefault=cd.prototype.preventDefault;
cd.prototype.stopPropagation=cd.prototype.stopPropagation;pk.prototype.get=pk.prototype.get;pk.prototype.getKeys=pk.prototype.P;pk.prototype.getProperties=pk.prototype.L;pk.prototype.set=pk.prototype.set;pk.prototype.setProperties=pk.prototype.H;pk.prototype.unset=pk.prototype.R;pk.prototype.changed=pk.prototype.u;pk.prototype.dispatchEvent=pk.prototype.b;pk.prototype.getRevision=pk.prototype.K;pk.prototype.on=pk.prototype.I;pk.prototype.once=pk.prototype.once;pk.prototype.un=pk.prototype.J;
Hk.prototype.get=Hk.prototype.get;Hk.prototype.getKeys=Hk.prototype.P;Hk.prototype.getProperties=Hk.prototype.L;Hk.prototype.set=Hk.prototype.set;Hk.prototype.setProperties=Hk.prototype.H;Hk.prototype.unset=Hk.prototype.R;Hk.prototype.changed=Hk.prototype.u;Hk.prototype.dispatchEvent=Hk.prototype.b;Hk.prototype.getRevision=Hk.prototype.K;Hk.prototype.on=Hk.prototype.I;Hk.prototype.once=Hk.prototype.once;Hk.prototype.un=Hk.prototype.J;Jk.prototype.get=Jk.prototype.get;Jk.prototype.getKeys=Jk.prototype.P;
Jk.prototype.getProperties=Jk.prototype.L;Jk.prototype.set=Jk.prototype.set;Jk.prototype.setProperties=Jk.prototype.H;Jk.prototype.unset=Jk.prototype.R;Jk.prototype.changed=Jk.prototype.u;Jk.prototype.dispatchEvent=Jk.prototype.b;Jk.prototype.getRevision=Jk.prototype.K;Jk.prototype.on=Jk.prototype.I;Jk.prototype.once=Jk.prototype.once;Jk.prototype.un=Jk.prototype.J;el.prototype.getTileCoord=el.prototype.i;el.prototype.load=el.prototype.load;K.prototype.addControl=K.prototype.Mf;
K.prototype.addInteraction=K.prototype.Nf;K.prototype.addLayer=K.prototype.xe;K.prototype.addOverlay=K.prototype.ye;K.prototype.forEachFeatureAtPixel=K.prototype.Tc;K.prototype.getFeaturesAtPixel=K.prototype.Xf;K.prototype.forEachLayerAtPixel=K.prototype.tg;K.prototype.hasFeatureAtPixel=K.prototype.ng;K.prototype.getEventCoordinate=K.prototype.Sd;K.prototype.getEventPixel=K.prototype.ud;K.prototype.getTarget=K.prototype.Xd;K.prototype.getTargetElement=K.prototype.Cc;
K.prototype.getCoordinateFromPixel=K.prototype.Ra;K.prototype.getControls=K.prototype.Wf;K.prototype.getOverlays=K.prototype.gg;K.prototype.getOverlayById=K.prototype.fg;K.prototype.getInteractions=K.prototype.bg;K.prototype.getLayerGroup=K.prototype.hc;K.prototype.getLayers=K.prototype.Xe;K.prototype.getPixelFromCoordinate=K.prototype.Ia;K.prototype.getSize=K.prototype.Cb;K.prototype.getView=K.prototype.aa;K.prototype.getViewport=K.prototype.kg;K.prototype.renderSync=K.prototype.dh;
K.prototype.render=K.prototype.render;K.prototype.removeControl=K.prototype.Xg;K.prototype.removeInteraction=K.prototype.Zg;K.prototype.removeLayer=K.prototype.$g;K.prototype.removeOverlay=K.prototype.ah;K.prototype.setLayerGroup=K.prototype.zf;K.prototype.setSize=K.prototype.be;K.prototype.setTarget=K.prototype.Ad;K.prototype.setView=K.prototype.jh;K.prototype.updateSize=K.prototype.Oc;K.prototype.get=K.prototype.get;K.prototype.getKeys=K.prototype.P;K.prototype.getProperties=K.prototype.L;
K.prototype.set=K.prototype.set;K.prototype.setProperties=K.prototype.H;K.prototype.unset=K.prototype.R;K.prototype.changed=K.prototype.u;K.prototype.dispatchEvent=K.prototype.b;K.prototype.getRevision=K.prototype.K;K.prototype.on=K.prototype.I;K.prototype.once=K.prototype.once;K.prototype.un=K.prototype.J;dd.prototype.type=dd.prototype.type;dd.prototype.target=dd.prototype.target;dd.prototype.preventDefault=dd.prototype.preventDefault;dd.prototype.stopPropagation=dd.prototype.stopPropagation;
ed.prototype.map=ed.prototype.map;ed.prototype.frameState=ed.prototype.frameState;ed.prototype.type=ed.prototype.type;ed.prototype.target=ed.prototype.target;ed.prototype.preventDefault=ed.prototype.preventDefault;ed.prototype.stopPropagation=ed.prototype.stopPropagation;Ad.prototype.originalEvent=Ad.prototype.originalEvent;Ad.prototype.pixel=Ad.prototype.pixel;Ad.prototype.coordinate=Ad.prototype.coordinate;Ad.prototype.dragging=Ad.prototype.dragging;Ad.prototype.preventDefault=Ad.prototype.preventDefault;
Ad.prototype.stopPropagation=Ad.prototype.stopPropagation;Ad.prototype.map=Ad.prototype.map;Ad.prototype.frameState=Ad.prototype.frameState;Ad.prototype.type=Ad.prototype.type;Ad.prototype.target=Ad.prototype.target;Zc.prototype.type=Zc.prototype.type;Zc.prototype.target=Zc.prototype.target;Zc.prototype.preventDefault=Zc.prototype.preventDefault;Zc.prototype.stopPropagation=Zc.prototype.stopPropagation;Bn.prototype.get=Bn.prototype.get;Bn.prototype.getKeys=Bn.prototype.P;
Bn.prototype.getProperties=Bn.prototype.L;Bn.prototype.set=Bn.prototype.set;Bn.prototype.setProperties=Bn.prototype.H;Bn.prototype.unset=Bn.prototype.R;Bn.prototype.changed=Bn.prototype.u;Bn.prototype.dispatchEvent=Bn.prototype.b;Bn.prototype.getRevision=Bn.prototype.K;Bn.prototype.on=Bn.prototype.I;Bn.prototype.once=Bn.prototype.once;Bn.prototype.un=Bn.prototype.J;pz.prototype.getTileCoord=pz.prototype.i;pz.prototype.load=pz.prototype.load;Kn.prototype.getTileCoord=Kn.prototype.i;
Kn.prototype.load=Kn.prototype.load;F.prototype.get=F.prototype.get;F.prototype.getKeys=F.prototype.P;F.prototype.getProperties=F.prototype.L;F.prototype.set=F.prototype.set;F.prototype.setProperties=F.prototype.H;F.prototype.unset=F.prototype.R;F.prototype.changed=F.prototype.u;F.prototype.dispatchEvent=F.prototype.b;F.prototype.getRevision=F.prototype.K;F.prototype.on=F.prototype.I;F.prototype.once=F.prototype.once;F.prototype.un=F.prototype.J;sz.prototype.forEachTileCoord=sz.prototype.Vf;
sz.prototype.getMaxZoom=sz.prototype.mj;sz.prototype.getMinZoom=sz.prototype.nj;sz.prototype.getOrigin=sz.prototype.Ic;sz.prototype.getResolution=sz.prototype.Ta;sz.prototype.getResolutions=sz.prototype.oj;sz.prototype.getTileCoordExtent=sz.prototype.Ma;sz.prototype.getTileCoordForCoordAndResolution=sz.prototype.Le;sz.prototype.getTileCoordForCoordAndZ=sz.prototype.jg;sz.prototype.getTileSize=sz.prototype.Za;sz.prototype.getZForResolution=sz.prototype.Dc;wk.prototype.getOpacity=wk.prototype.hf;
wk.prototype.getRotateWithView=wk.prototype.jf;wk.prototype.getRotation=wk.prototype.kf;wk.prototype.getScale=wk.prototype.lf;wk.prototype.getSnapToPixel=wk.prototype.Ke;wk.prototype.setOpacity=wk.prototype.Ed;wk.prototype.setRotation=wk.prototype.mf;wk.prototype.setScale=wk.prototype.Fd;yk.prototype.clone=yk.prototype.clone;yk.prototype.getAngle=yk.prototype.ij;yk.prototype.getFill=yk.prototype.Fa;yk.prototype.getPoints=yk.prototype.jj;yk.prototype.getRadius=yk.prototype.kj;
yk.prototype.getRadius2=yk.prototype.Zh;yk.prototype.getStroke=yk.prototype.Ga;yk.prototype.getOpacity=yk.prototype.hf;yk.prototype.getRotateWithView=yk.prototype.jf;yk.prototype.getRotation=yk.prototype.kf;yk.prototype.getScale=yk.prototype.lf;yk.prototype.getSnapToPixel=yk.prototype.Ke;yk.prototype.setOpacity=yk.prototype.Ed;yk.prototype.setRotation=yk.prototype.mf;yk.prototype.setScale=yk.prototype.Fd;dr.prototype.getOpacity=dr.prototype.hf;dr.prototype.getRotateWithView=dr.prototype.jf;
dr.prototype.getRotation=dr.prototype.kf;dr.prototype.getScale=dr.prototype.lf;dr.prototype.getSnapToPixel=dr.prototype.Ke;dr.prototype.setOpacity=dr.prototype.Ed;dr.prototype.setRotation=dr.prototype.mf;dr.prototype.setScale=dr.prototype.Fd;uw.prototype.get=uw.prototype.get;uw.prototype.getKeys=uw.prototype.P;uw.prototype.getProperties=uw.prototype.L;uw.prototype.set=uw.prototype.set;uw.prototype.setProperties=uw.prototype.H;uw.prototype.unset=uw.prototype.R;uw.prototype.changed=uw.prototype.u;
uw.prototype.dispatchEvent=uw.prototype.b;uw.prototype.getRevision=uw.prototype.K;uw.prototype.on=uw.prototype.I;uw.prototype.once=uw.prototype.once;uw.prototype.un=uw.prototype.J;iy.prototype.getAttributions=iy.prototype.za;iy.prototype.getLogo=iy.prototype.Aa;iy.prototype.getProjection=iy.prototype.Da;iy.prototype.getState=iy.prototype.getState;iy.prototype.refresh=iy.prototype.sa;iy.prototype.setAttributions=iy.prototype.va;iy.prototype.get=iy.prototype.get;iy.prototype.getKeys=iy.prototype.P;
iy.prototype.getProperties=iy.prototype.L;iy.prototype.set=iy.prototype.set;iy.prototype.setProperties=iy.prototype.H;iy.prototype.unset=iy.prototype.R;iy.prototype.changed=iy.prototype.u;iy.prototype.dispatchEvent=iy.prototype.b;iy.prototype.getRevision=iy.prototype.K;iy.prototype.on=iy.prototype.I;iy.prototype.once=iy.prototype.once;iy.prototype.un=iy.prototype.J;my.prototype.getTileGrid=my.prototype.jb;my.prototype.refresh=my.prototype.sa;my.prototype.getAttributions=my.prototype.za;
my.prototype.getLogo=my.prototype.Aa;my.prototype.getProjection=my.prototype.Da;my.prototype.getState=my.prototype.getState;my.prototype.setAttributions=my.prototype.va;my.prototype.get=my.prototype.get;my.prototype.getKeys=my.prototype.P;my.prototype.getProperties=my.prototype.L;my.prototype.set=my.prototype.set;my.prototype.setProperties=my.prototype.H;my.prototype.unset=my.prototype.R;my.prototype.changed=my.prototype.u;my.prototype.dispatchEvent=my.prototype.b;my.prototype.getRevision=my.prototype.K;
my.prototype.on=my.prototype.I;my.prototype.once=my.prototype.once;my.prototype.un=my.prototype.J;ny.prototype.getTileLoadFunction=ny.prototype.yb;ny.prototype.getTileUrlFunction=ny.prototype.zb;ny.prototype.getUrls=ny.prototype.Ab;ny.prototype.setTileLoadFunction=ny.prototype.Fb;ny.prototype.setTileUrlFunction=ny.prototype.hb;ny.prototype.setUrl=ny.prototype.rb;ny.prototype.setUrls=ny.prototype.vb;ny.prototype.getTileGrid=ny.prototype.jb;ny.prototype.refresh=ny.prototype.sa;
ny.prototype.getAttributions=ny.prototype.za;ny.prototype.getLogo=ny.prototype.Aa;ny.prototype.getProjection=ny.prototype.Da;ny.prototype.getState=ny.prototype.getState;ny.prototype.setAttributions=ny.prototype.va;ny.prototype.get=ny.prototype.get;ny.prototype.getKeys=ny.prototype.P;ny.prototype.getProperties=ny.prototype.L;ny.prototype.set=ny.prototype.set;ny.prototype.setProperties=ny.prototype.H;ny.prototype.unset=ny.prototype.R;ny.prototype.changed=ny.prototype.u;ny.prototype.dispatchEvent=ny.prototype.b;
ny.prototype.getRevision=ny.prototype.K;ny.prototype.on=ny.prototype.I;ny.prototype.once=ny.prototype.once;ny.prototype.un=ny.prototype.J;ry.prototype.setRenderReprojectionEdges=ry.prototype.Qb;ry.prototype.setTileGridForProjection=ry.prototype.Rb;ry.prototype.getTileLoadFunction=ry.prototype.yb;ry.prototype.getTileUrlFunction=ry.prototype.zb;ry.prototype.getUrls=ry.prototype.Ab;ry.prototype.setTileLoadFunction=ry.prototype.Fb;ry.prototype.setTileUrlFunction=ry.prototype.hb;ry.prototype.setUrl=ry.prototype.rb;
ry.prototype.setUrls=ry.prototype.vb;ry.prototype.getTileGrid=ry.prototype.jb;ry.prototype.refresh=ry.prototype.sa;ry.prototype.getAttributions=ry.prototype.za;ry.prototype.getLogo=ry.prototype.Aa;ry.prototype.getProjection=ry.prototype.Da;ry.prototype.getState=ry.prototype.getState;ry.prototype.setAttributions=ry.prototype.va;ry.prototype.get=ry.prototype.get;ry.prototype.getKeys=ry.prototype.P;ry.prototype.getProperties=ry.prototype.L;ry.prototype.set=ry.prototype.set;
ry.prototype.setProperties=ry.prototype.H;ry.prototype.unset=ry.prototype.R;ry.prototype.changed=ry.prototype.u;ry.prototype.dispatchEvent=ry.prototype.b;ry.prototype.getRevision=ry.prototype.K;ry.prototype.on=ry.prototype.I;ry.prototype.once=ry.prototype.once;ry.prototype.un=ry.prototype.J;sy.prototype.setRenderReprojectionEdges=sy.prototype.Qb;sy.prototype.setTileGridForProjection=sy.prototype.Rb;sy.prototype.getTileLoadFunction=sy.prototype.yb;sy.prototype.getTileUrlFunction=sy.prototype.zb;
sy.prototype.getUrls=sy.prototype.Ab;sy.prototype.setTileLoadFunction=sy.prototype.Fb;sy.prototype.setTileUrlFunction=sy.prototype.hb;sy.prototype.setUrl=sy.prototype.rb;sy.prototype.setUrls=sy.prototype.vb;sy.prototype.getTileGrid=sy.prototype.jb;sy.prototype.refresh=sy.prototype.sa;sy.prototype.getAttributions=sy.prototype.za;sy.prototype.getLogo=sy.prototype.Aa;sy.prototype.getProjection=sy.prototype.Da;sy.prototype.getState=sy.prototype.getState;sy.prototype.setAttributions=sy.prototype.va;
sy.prototype.get=sy.prototype.get;sy.prototype.getKeys=sy.prototype.P;sy.prototype.getProperties=sy.prototype.L;sy.prototype.set=sy.prototype.set;sy.prototype.setProperties=sy.prototype.H;sy.prototype.unset=sy.prototype.R;sy.prototype.changed=sy.prototype.u;sy.prototype.dispatchEvent=sy.prototype.b;sy.prototype.getRevision=sy.prototype.K;sy.prototype.on=sy.prototype.I;sy.prototype.once=sy.prototype.once;sy.prototype.un=sy.prototype.J;ty.prototype.setRenderReprojectionEdges=ty.prototype.Qb;
ty.prototype.setTileGridForProjection=ty.prototype.Rb;ty.prototype.getTileLoadFunction=ty.prototype.yb;ty.prototype.getTileUrlFunction=ty.prototype.zb;ty.prototype.getUrls=ty.prototype.Ab;ty.prototype.setTileLoadFunction=ty.prototype.Fb;ty.prototype.setTileUrlFunction=ty.prototype.hb;ty.prototype.setUrl=ty.prototype.rb;ty.prototype.setUrls=ty.prototype.vb;ty.prototype.getTileGrid=ty.prototype.jb;ty.prototype.refresh=ty.prototype.sa;ty.prototype.getAttributions=ty.prototype.za;
ty.prototype.getLogo=ty.prototype.Aa;ty.prototype.getProjection=ty.prototype.Da;ty.prototype.getState=ty.prototype.getState;ty.prototype.setAttributions=ty.prototype.va;ty.prototype.get=ty.prototype.get;ty.prototype.getKeys=ty.prototype.P;ty.prototype.getProperties=ty.prototype.L;ty.prototype.set=ty.prototype.set;ty.prototype.setProperties=ty.prototype.H;ty.prototype.unset=ty.prototype.R;ty.prototype.changed=ty.prototype.u;ty.prototype.dispatchEvent=ty.prototype.b;ty.prototype.getRevision=ty.prototype.K;
ty.prototype.on=ty.prototype.I;ty.prototype.once=ty.prototype.once;ty.prototype.un=ty.prototype.J;U.prototype.getAttributions=U.prototype.za;U.prototype.getLogo=U.prototype.Aa;U.prototype.getProjection=U.prototype.Da;U.prototype.getState=U.prototype.getState;U.prototype.refresh=U.prototype.sa;U.prototype.setAttributions=U.prototype.va;U.prototype.get=U.prototype.get;U.prototype.getKeys=U.prototype.P;U.prototype.getProperties=U.prototype.L;U.prototype.set=U.prototype.set;
U.prototype.setProperties=U.prototype.H;U.prototype.unset=U.prototype.R;U.prototype.changed=U.prototype.u;U.prototype.dispatchEvent=U.prototype.b;U.prototype.getRevision=U.prototype.K;U.prototype.on=U.prototype.I;U.prototype.once=U.prototype.once;U.prototype.un=U.prototype.J;X.prototype.addFeature=X.prototype.Gb;X.prototype.addFeatures=X.prototype.Qc;X.prototype.clear=X.prototype.clear;X.prototype.forEachFeature=X.prototype.Lh;X.prototype.forEachFeatureInExtent=X.prototype.ec;
X.prototype.forEachFeatureIntersectingExtent=X.prototype.Mh;X.prototype.getFeaturesCollection=X.prototype.Th;X.prototype.getFeatures=X.prototype.ee;X.prototype.getFeaturesAtCoordinate=X.prototype.Sh;X.prototype.getFeaturesInExtent=X.prototype.Yf;X.prototype.getClosestFeatureToCoordinate=X.prototype.Oh;X.prototype.getExtent=X.prototype.G;X.prototype.getFeatureById=X.prototype.Rh;X.prototype.getFormat=X.prototype.ej;X.prototype.getUrl=X.prototype.fj;X.prototype.removeLoadedExtent=X.prototype.Cj;
X.prototype.removeFeature=X.prototype.Lb;X.prototype.setLoader=X.prototype.hj;X.prototype.getAttributions=X.prototype.za;X.prototype.getLogo=X.prototype.Aa;X.prototype.getProjection=X.prototype.Da;X.prototype.getState=X.prototype.getState;X.prototype.refresh=X.prototype.sa;X.prototype.setAttributions=X.prototype.va;X.prototype.get=X.prototype.get;X.prototype.getKeys=X.prototype.P;X.prototype.getProperties=X.prototype.L;X.prototype.set=X.prototype.set;X.prototype.setProperties=X.prototype.H;
X.prototype.unset=X.prototype.R;X.prototype.changed=X.prototype.u;X.prototype.dispatchEvent=X.prototype.b;X.prototype.getRevision=X.prototype.K;X.prototype.on=X.prototype.I;X.prototype.once=X.prototype.once;X.prototype.un=X.prototype.J;zy.prototype.getAttributions=zy.prototype.za;zy.prototype.getLogo=zy.prototype.Aa;zy.prototype.getProjection=zy.prototype.Da;zy.prototype.getState=zy.prototype.getState;zy.prototype.refresh=zy.prototype.sa;zy.prototype.setAttributions=zy.prototype.va;
zy.prototype.get=zy.prototype.get;zy.prototype.getKeys=zy.prototype.P;zy.prototype.getProperties=zy.prototype.L;zy.prototype.set=zy.prototype.set;zy.prototype.setProperties=zy.prototype.H;zy.prototype.unset=zy.prototype.R;zy.prototype.changed=zy.prototype.u;zy.prototype.dispatchEvent=zy.prototype.b;zy.prototype.getRevision=zy.prototype.K;zy.prototype.on=zy.prototype.I;zy.prototype.once=zy.prototype.once;zy.prototype.un=zy.prototype.J;By.prototype.type=By.prototype.type;By.prototype.target=By.prototype.target;
By.prototype.preventDefault=By.prototype.preventDefault;By.prototype.stopPropagation=By.prototype.stopPropagation;Hy.prototype.getAttributions=Hy.prototype.za;Hy.prototype.getLogo=Hy.prototype.Aa;Hy.prototype.getProjection=Hy.prototype.Da;Hy.prototype.getState=Hy.prototype.getState;Hy.prototype.refresh=Hy.prototype.sa;Hy.prototype.setAttributions=Hy.prototype.va;Hy.prototype.get=Hy.prototype.get;Hy.prototype.getKeys=Hy.prototype.P;Hy.prototype.getProperties=Hy.prototype.L;Hy.prototype.set=Hy.prototype.set;
Hy.prototype.setProperties=Hy.prototype.H;Hy.prototype.unset=Hy.prototype.R;Hy.prototype.changed=Hy.prototype.u;Hy.prototype.dispatchEvent=Hy.prototype.b;Hy.prototype.getRevision=Hy.prototype.K;Hy.prototype.on=Hy.prototype.I;Hy.prototype.once=Hy.prototype.once;Hy.prototype.un=Hy.prototype.J;Iy.prototype.getAttributions=Iy.prototype.za;Iy.prototype.getLogo=Iy.prototype.Aa;Iy.prototype.getProjection=Iy.prototype.Da;Iy.prototype.getState=Iy.prototype.getState;Iy.prototype.refresh=Iy.prototype.sa;
Iy.prototype.setAttributions=Iy.prototype.va;Iy.prototype.get=Iy.prototype.get;Iy.prototype.getKeys=Iy.prototype.P;Iy.prototype.getProperties=Iy.prototype.L;Iy.prototype.set=Iy.prototype.set;Iy.prototype.setProperties=Iy.prototype.H;Iy.prototype.unset=Iy.prototype.R;Iy.prototype.changed=Iy.prototype.u;Iy.prototype.dispatchEvent=Iy.prototype.b;Iy.prototype.getRevision=Iy.prototype.K;Iy.prototype.on=Iy.prototype.I;Iy.prototype.once=Iy.prototype.once;Iy.prototype.un=Iy.prototype.J;
Jy.prototype.getAttributions=Jy.prototype.za;Jy.prototype.getLogo=Jy.prototype.Aa;Jy.prototype.getProjection=Jy.prototype.Da;Jy.prototype.getState=Jy.prototype.getState;Jy.prototype.refresh=Jy.prototype.sa;Jy.prototype.setAttributions=Jy.prototype.va;Jy.prototype.get=Jy.prototype.get;Jy.prototype.getKeys=Jy.prototype.P;Jy.prototype.getProperties=Jy.prototype.L;Jy.prototype.set=Jy.prototype.set;Jy.prototype.setProperties=Jy.prototype.H;Jy.prototype.unset=Jy.prototype.R;Jy.prototype.changed=Jy.prototype.u;
Jy.prototype.dispatchEvent=Jy.prototype.b;Jy.prototype.getRevision=Jy.prototype.K;Jy.prototype.on=Jy.prototype.I;Jy.prototype.once=Jy.prototype.once;Jy.prototype.un=Jy.prototype.J;Ky.prototype.getAttributions=Ky.prototype.za;Ky.prototype.getLogo=Ky.prototype.Aa;Ky.prototype.getProjection=Ky.prototype.Da;Ky.prototype.getState=Ky.prototype.getState;Ky.prototype.refresh=Ky.prototype.sa;Ky.prototype.setAttributions=Ky.prototype.va;Ky.prototype.get=Ky.prototype.get;Ky.prototype.getKeys=Ky.prototype.P;
Ky.prototype.getProperties=Ky.prototype.L;Ky.prototype.set=Ky.prototype.set;Ky.prototype.setProperties=Ky.prototype.H;Ky.prototype.unset=Ky.prototype.R;Ky.prototype.changed=Ky.prototype.u;Ky.prototype.dispatchEvent=Ky.prototype.b;Ky.prototype.getRevision=Ky.prototype.K;Ky.prototype.on=Ky.prototype.I;Ky.prototype.once=Ky.prototype.once;Ky.prototype.un=Ky.prototype.J;Ly.prototype.getAttributions=Ly.prototype.za;Ly.prototype.getLogo=Ly.prototype.Aa;Ly.prototype.getProjection=Ly.prototype.Da;
Ly.prototype.getState=Ly.prototype.getState;Ly.prototype.refresh=Ly.prototype.sa;Ly.prototype.setAttributions=Ly.prototype.va;Ly.prototype.get=Ly.prototype.get;Ly.prototype.getKeys=Ly.prototype.P;Ly.prototype.getProperties=Ly.prototype.L;Ly.prototype.set=Ly.prototype.set;Ly.prototype.setProperties=Ly.prototype.H;Ly.prototype.unset=Ly.prototype.R;Ly.prototype.changed=Ly.prototype.u;Ly.prototype.dispatchEvent=Ly.prototype.b;Ly.prototype.getRevision=Ly.prototype.K;Ly.prototype.on=Ly.prototype.I;
Ly.prototype.once=Ly.prototype.once;Ly.prototype.un=Ly.prototype.J;Ny.prototype.getAttributions=Ny.prototype.za;Ny.prototype.getLogo=Ny.prototype.Aa;Ny.prototype.getProjection=Ny.prototype.Da;Ny.prototype.getState=Ny.prototype.getState;Ny.prototype.refresh=Ny.prototype.sa;Ny.prototype.setAttributions=Ny.prototype.va;Ny.prototype.get=Ny.prototype.get;Ny.prototype.getKeys=Ny.prototype.P;Ny.prototype.getProperties=Ny.prototype.L;Ny.prototype.set=Ny.prototype.set;Ny.prototype.setProperties=Ny.prototype.H;
Ny.prototype.unset=Ny.prototype.R;Ny.prototype.changed=Ny.prototype.u;Ny.prototype.dispatchEvent=Ny.prototype.b;Ny.prototype.getRevision=Ny.prototype.K;Ny.prototype.on=Ny.prototype.I;Ny.prototype.once=Ny.prototype.once;Ny.prototype.un=Ny.prototype.J;Ry.prototype.setRenderReprojectionEdges=Ry.prototype.Qb;Ry.prototype.setTileGridForProjection=Ry.prototype.Rb;Ry.prototype.getTileLoadFunction=Ry.prototype.yb;Ry.prototype.getTileUrlFunction=Ry.prototype.zb;Ry.prototype.getUrls=Ry.prototype.Ab;
Ry.prototype.setTileLoadFunction=Ry.prototype.Fb;Ry.prototype.setTileUrlFunction=Ry.prototype.hb;Ry.prototype.setUrl=Ry.prototype.rb;Ry.prototype.setUrls=Ry.prototype.vb;Ry.prototype.getTileGrid=Ry.prototype.jb;Ry.prototype.refresh=Ry.prototype.sa;Ry.prototype.getAttributions=Ry.prototype.za;Ry.prototype.getLogo=Ry.prototype.Aa;Ry.prototype.getProjection=Ry.prototype.Da;Ry.prototype.getState=Ry.prototype.getState;Ry.prototype.setAttributions=Ry.prototype.va;Ry.prototype.get=Ry.prototype.get;
Ry.prototype.getKeys=Ry.prototype.P;Ry.prototype.getProperties=Ry.prototype.L;Ry.prototype.set=Ry.prototype.set;Ry.prototype.setProperties=Ry.prototype.H;Ry.prototype.unset=Ry.prototype.R;Ry.prototype.changed=Ry.prototype.u;Ry.prototype.dispatchEvent=Ry.prototype.b;Ry.prototype.getRevision=Ry.prototype.K;Ry.prototype.on=Ry.prototype.I;Ry.prototype.once=Ry.prototype.once;Ry.prototype.un=Ry.prototype.J;Sy.prototype.getAttributions=Sy.prototype.za;Sy.prototype.getLogo=Sy.prototype.Aa;
Sy.prototype.getProjection=Sy.prototype.Da;Sy.prototype.getState=Sy.prototype.getState;Sy.prototype.refresh=Sy.prototype.sa;Sy.prototype.setAttributions=Sy.prototype.va;Sy.prototype.get=Sy.prototype.get;Sy.prototype.getKeys=Sy.prototype.P;Sy.prototype.getProperties=Sy.prototype.L;Sy.prototype.set=Sy.prototype.set;Sy.prototype.setProperties=Sy.prototype.H;Sy.prototype.unset=Sy.prototype.R;Sy.prototype.changed=Sy.prototype.u;Sy.prototype.dispatchEvent=Sy.prototype.b;Sy.prototype.getRevision=Sy.prototype.K;
Sy.prototype.on=Sy.prototype.I;Sy.prototype.once=Sy.prototype.once;Sy.prototype.un=Sy.prototype.J;Wy.prototype.type=Wy.prototype.type;Wy.prototype.target=Wy.prototype.target;Wy.prototype.preventDefault=Wy.prototype.preventDefault;Wy.prototype.stopPropagation=Wy.prototype.stopPropagation;Zy.prototype.setRenderReprojectionEdges=Zy.prototype.Qb;Zy.prototype.setTileGridForProjection=Zy.prototype.Rb;Zy.prototype.getTileLoadFunction=Zy.prototype.yb;Zy.prototype.getTileUrlFunction=Zy.prototype.zb;
Zy.prototype.getUrls=Zy.prototype.Ab;Zy.prototype.setTileLoadFunction=Zy.prototype.Fb;Zy.prototype.setTileUrlFunction=Zy.prototype.hb;Zy.prototype.setUrl=Zy.prototype.rb;Zy.prototype.setUrls=Zy.prototype.vb;Zy.prototype.getTileGrid=Zy.prototype.jb;Zy.prototype.refresh=Zy.prototype.sa;Zy.prototype.getAttributions=Zy.prototype.za;Zy.prototype.getLogo=Zy.prototype.Aa;Zy.prototype.getProjection=Zy.prototype.Da;Zy.prototype.getState=Zy.prototype.getState;Zy.prototype.setAttributions=Zy.prototype.va;
Zy.prototype.get=Zy.prototype.get;Zy.prototype.getKeys=Zy.prototype.P;Zy.prototype.getProperties=Zy.prototype.L;Zy.prototype.set=Zy.prototype.set;Zy.prototype.setProperties=Zy.prototype.H;Zy.prototype.unset=Zy.prototype.R;Zy.prototype.changed=Zy.prototype.u;Zy.prototype.dispatchEvent=Zy.prototype.b;Zy.prototype.getRevision=Zy.prototype.K;Zy.prototype.on=Zy.prototype.I;Zy.prototype.once=Zy.prototype.once;Zy.prototype.un=Zy.prototype.J;ly.prototype.type=ly.prototype.type;ly.prototype.target=ly.prototype.target;
ly.prototype.preventDefault=ly.prototype.preventDefault;ly.prototype.stopPropagation=ly.prototype.stopPropagation;cz.prototype.setRenderReprojectionEdges=cz.prototype.Qb;cz.prototype.setTileGridForProjection=cz.prototype.Rb;cz.prototype.getTileLoadFunction=cz.prototype.yb;cz.prototype.getTileUrlFunction=cz.prototype.zb;cz.prototype.getUrls=cz.prototype.Ab;cz.prototype.setTileLoadFunction=cz.prototype.Fb;cz.prototype.setTileUrlFunction=cz.prototype.hb;cz.prototype.setUrl=cz.prototype.rb;
cz.prototype.setUrls=cz.prototype.vb;cz.prototype.getTileGrid=cz.prototype.jb;cz.prototype.refresh=cz.prototype.sa;cz.prototype.getAttributions=cz.prototype.za;cz.prototype.getLogo=cz.prototype.Aa;cz.prototype.getProjection=cz.prototype.Da;cz.prototype.getState=cz.prototype.getState;cz.prototype.setAttributions=cz.prototype.va;cz.prototype.get=cz.prototype.get;cz.prototype.getKeys=cz.prototype.P;cz.prototype.getProperties=cz.prototype.L;cz.prototype.set=cz.prototype.set;
cz.prototype.setProperties=cz.prototype.H;cz.prototype.unset=cz.prototype.R;cz.prototype.changed=cz.prototype.u;cz.prototype.dispatchEvent=cz.prototype.b;cz.prototype.getRevision=cz.prototype.K;cz.prototype.on=cz.prototype.I;cz.prototype.once=cz.prototype.once;cz.prototype.un=cz.prototype.J;ez.prototype.getTileGrid=ez.prototype.jb;ez.prototype.refresh=ez.prototype.sa;ez.prototype.getAttributions=ez.prototype.za;ez.prototype.getLogo=ez.prototype.Aa;ez.prototype.getProjection=ez.prototype.Da;
ez.prototype.getState=ez.prototype.getState;ez.prototype.setAttributions=ez.prototype.va;ez.prototype.get=ez.prototype.get;ez.prototype.getKeys=ez.prototype.P;ez.prototype.getProperties=ez.prototype.L;ez.prototype.set=ez.prototype.set;ez.prototype.setProperties=ez.prototype.H;ez.prototype.unset=ez.prototype.R;ez.prototype.changed=ez.prototype.u;ez.prototype.dispatchEvent=ez.prototype.b;ez.prototype.getRevision=ez.prototype.K;ez.prototype.on=ez.prototype.I;ez.prototype.once=ez.prototype.once;
ez.prototype.un=ez.prototype.J;gz.prototype.setRenderReprojectionEdges=gz.prototype.Qb;gz.prototype.setTileGridForProjection=gz.prototype.Rb;gz.prototype.getTileLoadFunction=gz.prototype.yb;gz.prototype.getTileUrlFunction=gz.prototype.zb;gz.prototype.getUrls=gz.prototype.Ab;gz.prototype.setTileLoadFunction=gz.prototype.Fb;gz.prototype.setTileUrlFunction=gz.prototype.hb;gz.prototype.setUrl=gz.prototype.rb;gz.prototype.setUrls=gz.prototype.vb;gz.prototype.getTileGrid=gz.prototype.jb;
gz.prototype.refresh=gz.prototype.sa;gz.prototype.getAttributions=gz.prototype.za;gz.prototype.getLogo=gz.prototype.Aa;gz.prototype.getProjection=gz.prototype.Da;gz.prototype.getState=gz.prototype.getState;gz.prototype.setAttributions=gz.prototype.va;gz.prototype.get=gz.prototype.get;gz.prototype.getKeys=gz.prototype.P;gz.prototype.getProperties=gz.prototype.L;gz.prototype.set=gz.prototype.set;gz.prototype.setProperties=gz.prototype.H;gz.prototype.unset=gz.prototype.R;gz.prototype.changed=gz.prototype.u;
gz.prototype.dispatchEvent=gz.prototype.b;gz.prototype.getRevision=gz.prototype.K;gz.prototype.on=gz.prototype.I;gz.prototype.once=gz.prototype.once;gz.prototype.un=gz.prototype.J;hz.prototype.getTileGrid=hz.prototype.jb;hz.prototype.refresh=hz.prototype.sa;hz.prototype.getAttributions=hz.prototype.za;hz.prototype.getLogo=hz.prototype.Aa;hz.prototype.getProjection=hz.prototype.Da;hz.prototype.getState=hz.prototype.getState;hz.prototype.setAttributions=hz.prototype.va;hz.prototype.get=hz.prototype.get;
hz.prototype.getKeys=hz.prototype.P;hz.prototype.getProperties=hz.prototype.L;hz.prototype.set=hz.prototype.set;hz.prototype.setProperties=hz.prototype.H;hz.prototype.unset=hz.prototype.R;hz.prototype.changed=hz.prototype.u;hz.prototype.dispatchEvent=hz.prototype.b;hz.prototype.getRevision=hz.prototype.K;hz.prototype.on=hz.prototype.I;hz.prototype.once=hz.prototype.once;hz.prototype.un=hz.prototype.J;lz.prototype.setRenderReprojectionEdges=lz.prototype.Qb;lz.prototype.setTileGridForProjection=lz.prototype.Rb;
lz.prototype.getTileLoadFunction=lz.prototype.yb;lz.prototype.getTileUrlFunction=lz.prototype.zb;lz.prototype.getUrls=lz.prototype.Ab;lz.prototype.setTileLoadFunction=lz.prototype.Fb;lz.prototype.setTileUrlFunction=lz.prototype.hb;lz.prototype.setUrl=lz.prototype.rb;lz.prototype.setUrls=lz.prototype.vb;lz.prototype.getTileGrid=lz.prototype.jb;lz.prototype.refresh=lz.prototype.sa;lz.prototype.getAttributions=lz.prototype.za;lz.prototype.getLogo=lz.prototype.Aa;lz.prototype.getProjection=lz.prototype.Da;
lz.prototype.getState=lz.prototype.getState;lz.prototype.setAttributions=lz.prototype.va;lz.prototype.get=lz.prototype.get;lz.prototype.getKeys=lz.prototype.P;lz.prototype.getProperties=lz.prototype.L;lz.prototype.set=lz.prototype.set;lz.prototype.setProperties=lz.prototype.H;lz.prototype.unset=lz.prototype.R;lz.prototype.changed=lz.prototype.u;lz.prototype.dispatchEvent=lz.prototype.b;lz.prototype.getRevision=lz.prototype.K;lz.prototype.on=lz.prototype.I;lz.prototype.once=lz.prototype.once;
lz.prototype.un=lz.prototype.J;Bw.prototype.type=Bw.prototype.type;Bw.prototype.target=Bw.prototype.target;Bw.prototype.preventDefault=Bw.prototype.preventDefault;Bw.prototype.stopPropagation=Bw.prototype.stopPropagation;rz.prototype.getTileLoadFunction=rz.prototype.yb;rz.prototype.getTileUrlFunction=rz.prototype.zb;rz.prototype.getUrls=rz.prototype.Ab;rz.prototype.setTileLoadFunction=rz.prototype.Fb;rz.prototype.setTileUrlFunction=rz.prototype.hb;rz.prototype.setUrl=rz.prototype.rb;
rz.prototype.setUrls=rz.prototype.vb;rz.prototype.getTileGrid=rz.prototype.jb;rz.prototype.refresh=rz.prototype.sa;rz.prototype.getAttributions=rz.prototype.za;rz.prototype.getLogo=rz.prototype.Aa;rz.prototype.getProjection=rz.prototype.Da;rz.prototype.getState=rz.prototype.getState;rz.prototype.setAttributions=rz.prototype.va;rz.prototype.get=rz.prototype.get;rz.prototype.getKeys=rz.prototype.P;rz.prototype.getProperties=rz.prototype.L;rz.prototype.set=rz.prototype.set;
rz.prototype.setProperties=rz.prototype.H;rz.prototype.unset=rz.prototype.R;rz.prototype.changed=rz.prototype.u;rz.prototype.dispatchEvent=rz.prototype.b;rz.prototype.getRevision=rz.prototype.K;rz.prototype.on=rz.prototype.I;rz.prototype.once=rz.prototype.once;rz.prototype.un=rz.prototype.J;Y.prototype.setRenderReprojectionEdges=Y.prototype.Qb;Y.prototype.setTileGridForProjection=Y.prototype.Rb;Y.prototype.getTileLoadFunction=Y.prototype.yb;Y.prototype.getTileUrlFunction=Y.prototype.zb;
Y.prototype.getUrls=Y.prototype.Ab;Y.prototype.setTileLoadFunction=Y.prototype.Fb;Y.prototype.setTileUrlFunction=Y.prototype.hb;Y.prototype.setUrl=Y.prototype.rb;Y.prototype.setUrls=Y.prototype.vb;Y.prototype.getTileGrid=Y.prototype.jb;Y.prototype.refresh=Y.prototype.sa;Y.prototype.getAttributions=Y.prototype.za;Y.prototype.getLogo=Y.prototype.Aa;Y.prototype.getProjection=Y.prototype.Da;Y.prototype.getState=Y.prototype.getState;Y.prototype.setAttributions=Y.prototype.va;Y.prototype.get=Y.prototype.get;
Y.prototype.getKeys=Y.prototype.P;Y.prototype.getProperties=Y.prototype.L;Y.prototype.set=Y.prototype.set;Y.prototype.setProperties=Y.prototype.H;Y.prototype.unset=Y.prototype.R;Y.prototype.changed=Y.prototype.u;Y.prototype.dispatchEvent=Y.prototype.b;Y.prototype.getRevision=Y.prototype.K;Y.prototype.on=Y.prototype.I;Y.prototype.once=Y.prototype.once;Y.prototype.un=Y.prototype.J;vz.prototype.setRenderReprojectionEdges=vz.prototype.Qb;vz.prototype.setTileGridForProjection=vz.prototype.Rb;
vz.prototype.getTileLoadFunction=vz.prototype.yb;vz.prototype.getTileUrlFunction=vz.prototype.zb;vz.prototype.getUrls=vz.prototype.Ab;vz.prototype.setTileLoadFunction=vz.prototype.Fb;vz.prototype.setTileUrlFunction=vz.prototype.hb;vz.prototype.setUrl=vz.prototype.rb;vz.prototype.setUrls=vz.prototype.vb;vz.prototype.getTileGrid=vz.prototype.jb;vz.prototype.refresh=vz.prototype.sa;vz.prototype.getAttributions=vz.prototype.za;vz.prototype.getLogo=vz.prototype.Aa;vz.prototype.getProjection=vz.prototype.Da;
vz.prototype.getState=vz.prototype.getState;vz.prototype.setAttributions=vz.prototype.va;vz.prototype.get=vz.prototype.get;vz.prototype.getKeys=vz.prototype.P;vz.prototype.getProperties=vz.prototype.L;vz.prototype.set=vz.prototype.set;vz.prototype.setProperties=vz.prototype.H;vz.prototype.unset=vz.prototype.R;vz.prototype.changed=vz.prototype.u;vz.prototype.dispatchEvent=vz.prototype.b;vz.prototype.getRevision=vz.prototype.K;vz.prototype.on=vz.prototype.I;vz.prototype.once=vz.prototype.once;
vz.prototype.un=vz.prototype.J;hy.prototype.getTileCoord=hy.prototype.i;hy.prototype.load=hy.prototype.load;Ki.prototype.changed=Ki.prototype.u;Ki.prototype.dispatchEvent=Ki.prototype.b;Ki.prototype.getRevision=Ki.prototype.K;Ki.prototype.on=Ki.prototype.I;Ki.prototype.once=Ki.prototype.once;Ki.prototype.un=Ki.prototype.J;mn.prototype.changed=mn.prototype.u;mn.prototype.dispatchEvent=mn.prototype.b;mn.prototype.getRevision=mn.prototype.K;mn.prototype.on=mn.prototype.I;mn.prototype.once=mn.prototype.once;
mn.prototype.un=mn.prototype.J;pn.prototype.changed=pn.prototype.u;pn.prototype.dispatchEvent=pn.prototype.b;pn.prototype.getRevision=pn.prototype.K;pn.prototype.on=pn.prototype.I;pn.prototype.once=pn.prototype.once;pn.prototype.un=pn.prototype.J;zn.prototype.changed=zn.prototype.u;zn.prototype.dispatchEvent=zn.prototype.b;zn.prototype.getRevision=zn.prototype.K;zn.prototype.on=zn.prototype.I;zn.prototype.once=zn.prototype.once;zn.prototype.un=zn.prototype.J;An.prototype.changed=An.prototype.u;
An.prototype.dispatchEvent=An.prototype.b;An.prototype.getRevision=An.prototype.K;An.prototype.on=An.prototype.I;An.prototype.once=An.prototype.once;An.prototype.un=An.prototype.J;Xi.prototype.changed=Xi.prototype.u;Xi.prototype.dispatchEvent=Xi.prototype.b;Xi.prototype.getRevision=Xi.prototype.K;Xi.prototype.on=Xi.prototype.I;Xi.prototype.once=Xi.prototype.once;Xi.prototype.un=Xi.prototype.J;aj.prototype.changed=aj.prototype.u;aj.prototype.dispatchEvent=aj.prototype.b;aj.prototype.getRevision=aj.prototype.K;
aj.prototype.on=aj.prototype.I;aj.prototype.once=aj.prototype.once;aj.prototype.un=aj.prototype.J;bj.prototype.changed=bj.prototype.u;bj.prototype.dispatchEvent=bj.prototype.b;bj.prototype.getRevision=bj.prototype.K;bj.prototype.on=bj.prototype.I;bj.prototype.once=bj.prototype.once;bj.prototype.un=bj.prototype.J;mj.prototype.changed=mj.prototype.u;mj.prototype.dispatchEvent=mj.prototype.b;mj.prototype.getRevision=mj.prototype.K;mj.prototype.on=mj.prototype.I;mj.prototype.once=mj.prototype.once;
mj.prototype.un=mj.prototype.J;hk.prototype.changed=hk.prototype.u;hk.prototype.dispatchEvent=hk.prototype.b;hk.prototype.getRevision=hk.prototype.K;hk.prototype.on=hk.prototype.I;hk.prototype.once=hk.prototype.once;hk.prototype.un=hk.prototype.J;jk.prototype.changed=jk.prototype.u;jk.prototype.dispatchEvent=jk.prototype.b;jk.prototype.getRevision=jk.prototype.K;jk.prototype.on=jk.prototype.I;jk.prototype.once=jk.prototype.once;jk.prototype.un=jk.prototype.J;bi.prototype.type=bi.prototype.type;
bi.prototype.target=bi.prototype.target;bi.prototype.preventDefault=bi.prototype.preventDefault;bi.prototype.stopPropagation=bi.prototype.stopPropagation;Md.prototype.type=Md.prototype.type;Md.prototype.target=Md.prototype.target;Md.prototype.preventDefault=Md.prototype.preventDefault;Md.prototype.stopPropagation=Md.prototype.stopPropagation;kg.prototype.get=kg.prototype.get;kg.prototype.getKeys=kg.prototype.P;kg.prototype.getProperties=kg.prototype.L;kg.prototype.set=kg.prototype.set;
kg.prototype.setProperties=kg.prototype.H;kg.prototype.unset=kg.prototype.R;kg.prototype.changed=kg.prototype.u;kg.prototype.dispatchEvent=kg.prototype.b;kg.prototype.getRevision=kg.prototype.K;kg.prototype.on=kg.prototype.I;kg.prototype.once=kg.prototype.once;kg.prototype.un=kg.prototype.J;mg.prototype.getExtent=mg.prototype.G;mg.prototype.getMaxResolution=mg.prototype.lc;mg.prototype.getMinResolution=mg.prototype.mc;mg.prototype.getOpacity=mg.prototype.nc;mg.prototype.getVisible=mg.prototype.Jb;
mg.prototype.getZIndex=mg.prototype.Ba;mg.prototype.setExtent=mg.prototype.Fc;mg.prototype.setMaxResolution=mg.prototype.Mc;mg.prototype.setMinResolution=mg.prototype.Nc;mg.prototype.setOpacity=mg.prototype.Gc;mg.prototype.setVisible=mg.prototype.Hc;mg.prototype.setZIndex=mg.prototype.$b;mg.prototype.get=mg.prototype.get;mg.prototype.getKeys=mg.prototype.P;mg.prototype.getProperties=mg.prototype.L;mg.prototype.set=mg.prototype.set;mg.prototype.setProperties=mg.prototype.H;mg.prototype.unset=mg.prototype.R;
mg.prototype.changed=mg.prototype.u;mg.prototype.dispatchEvent=mg.prototype.b;mg.prototype.getRevision=mg.prototype.K;mg.prototype.on=mg.prototype.I;mg.prototype.once=mg.prototype.once;mg.prototype.un=mg.prototype.J;xg.prototype.getExtent=xg.prototype.G;xg.prototype.getMaxResolution=xg.prototype.lc;xg.prototype.getMinResolution=xg.prototype.mc;xg.prototype.getOpacity=xg.prototype.nc;xg.prototype.getVisible=xg.prototype.Jb;xg.prototype.getZIndex=xg.prototype.Ba;xg.prototype.setExtent=xg.prototype.Fc;
xg.prototype.setMaxResolution=xg.prototype.Mc;xg.prototype.setMinResolution=xg.prototype.Nc;xg.prototype.setOpacity=xg.prototype.Gc;xg.prototype.setVisible=xg.prototype.Hc;xg.prototype.setZIndex=xg.prototype.$b;xg.prototype.get=xg.prototype.get;xg.prototype.getKeys=xg.prototype.P;xg.prototype.getProperties=xg.prototype.L;xg.prototype.set=xg.prototype.set;xg.prototype.setProperties=xg.prototype.H;xg.prototype.unset=xg.prototype.R;xg.prototype.changed=xg.prototype.u;xg.prototype.dispatchEvent=xg.prototype.b;
xg.prototype.getRevision=xg.prototype.K;xg.prototype.on=xg.prototype.I;xg.prototype.once=xg.prototype.once;xg.prototype.un=xg.prototype.J;T.prototype.setMap=T.prototype.setMap;T.prototype.setSource=T.prototype.hd;T.prototype.getExtent=T.prototype.G;T.prototype.getMaxResolution=T.prototype.lc;T.prototype.getMinResolution=T.prototype.mc;T.prototype.getOpacity=T.prototype.nc;T.prototype.getVisible=T.prototype.Jb;T.prototype.getZIndex=T.prototype.Ba;T.prototype.setExtent=T.prototype.Fc;
T.prototype.setMaxResolution=T.prototype.Mc;T.prototype.setMinResolution=T.prototype.Nc;T.prototype.setOpacity=T.prototype.Gc;T.prototype.setVisible=T.prototype.Hc;T.prototype.setZIndex=T.prototype.$b;T.prototype.get=T.prototype.get;T.prototype.getKeys=T.prototype.P;T.prototype.getProperties=T.prototype.L;T.prototype.set=T.prototype.set;T.prototype.setProperties=T.prototype.H;T.prototype.unset=T.prototype.R;T.prototype.changed=T.prototype.u;T.prototype.dispatchEvent=T.prototype.b;
T.prototype.getRevision=T.prototype.K;T.prototype.on=T.prototype.I;T.prototype.once=T.prototype.once;T.prototype.un=T.prototype.J;V.prototype.getSource=V.prototype.ha;V.prototype.getStyle=V.prototype.B;V.prototype.getStyleFunction=V.prototype.ib;V.prototype.setStyle=V.prototype.j;V.prototype.setMap=V.prototype.setMap;V.prototype.setSource=V.prototype.hd;V.prototype.getExtent=V.prototype.G;V.prototype.getMaxResolution=V.prototype.lc;V.prototype.getMinResolution=V.prototype.mc;
V.prototype.getOpacity=V.prototype.nc;V.prototype.getVisible=V.prototype.Jb;V.prototype.getZIndex=V.prototype.Ba;V.prototype.setExtent=V.prototype.Fc;V.prototype.setMaxResolution=V.prototype.Mc;V.prototype.setMinResolution=V.prototype.Nc;V.prototype.setOpacity=V.prototype.Gc;V.prototype.setVisible=V.prototype.Hc;V.prototype.setZIndex=V.prototype.$b;V.prototype.get=V.prototype.get;V.prototype.getKeys=V.prototype.P;V.prototype.getProperties=V.prototype.L;V.prototype.set=V.prototype.set;
V.prototype.setProperties=V.prototype.H;V.prototype.unset=V.prototype.R;V.prototype.changed=V.prototype.u;V.prototype.dispatchEvent=V.prototype.b;V.prototype.getRevision=V.prototype.K;V.prototype.on=V.prototype.I;V.prototype.once=V.prototype.once;V.prototype.un=V.prototype.J;Sx.prototype.setMap=Sx.prototype.setMap;Sx.prototype.setSource=Sx.prototype.hd;Sx.prototype.getExtent=Sx.prototype.G;Sx.prototype.getMaxResolution=Sx.prototype.lc;Sx.prototype.getMinResolution=Sx.prototype.mc;
Sx.prototype.getOpacity=Sx.prototype.nc;Sx.prototype.getVisible=Sx.prototype.Jb;Sx.prototype.getZIndex=Sx.prototype.Ba;Sx.prototype.setExtent=Sx.prototype.Fc;Sx.prototype.setMaxResolution=Sx.prototype.Mc;Sx.prototype.setMinResolution=Sx.prototype.Nc;Sx.prototype.setOpacity=Sx.prototype.Gc;Sx.prototype.setVisible=Sx.prototype.Hc;Sx.prototype.setZIndex=Sx.prototype.$b;Sx.prototype.get=Sx.prototype.get;Sx.prototype.getKeys=Sx.prototype.P;Sx.prototype.getProperties=Sx.prototype.L;Sx.prototype.set=Sx.prototype.set;
Sx.prototype.setProperties=Sx.prototype.H;Sx.prototype.unset=Sx.prototype.R;Sx.prototype.changed=Sx.prototype.u;Sx.prototype.dispatchEvent=Sx.prototype.b;Sx.prototype.getRevision=Sx.prototype.K;Sx.prototype.on=Sx.prototype.I;Sx.prototype.once=Sx.prototype.once;Sx.prototype.un=Sx.prototype.J;Tx.prototype.setMap=Tx.prototype.setMap;Tx.prototype.setSource=Tx.prototype.hd;Tx.prototype.getExtent=Tx.prototype.G;Tx.prototype.getMaxResolution=Tx.prototype.lc;Tx.prototype.getMinResolution=Tx.prototype.mc;
Tx.prototype.getOpacity=Tx.prototype.nc;Tx.prototype.getVisible=Tx.prototype.Jb;Tx.prototype.getZIndex=Tx.prototype.Ba;Tx.prototype.setExtent=Tx.prototype.Fc;Tx.prototype.setMaxResolution=Tx.prototype.Mc;Tx.prototype.setMinResolution=Tx.prototype.Nc;Tx.prototype.setOpacity=Tx.prototype.Gc;Tx.prototype.setVisible=Tx.prototype.Hc;Tx.prototype.setZIndex=Tx.prototype.$b;Tx.prototype.get=Tx.prototype.get;Tx.prototype.getKeys=Tx.prototype.P;Tx.prototype.getProperties=Tx.prototype.L;Tx.prototype.set=Tx.prototype.set;
Tx.prototype.setProperties=Tx.prototype.H;Tx.prototype.unset=Tx.prototype.R;Tx.prototype.changed=Tx.prototype.u;Tx.prototype.dispatchEvent=Tx.prototype.b;Tx.prototype.getRevision=Tx.prototype.K;Tx.prototype.on=Tx.prototype.I;Tx.prototype.once=Tx.prototype.once;Tx.prototype.un=Tx.prototype.J;W.prototype.getStyle=W.prototype.B;W.prototype.getStyleFunction=W.prototype.ib;W.prototype.setStyle=W.prototype.j;W.prototype.setMap=W.prototype.setMap;W.prototype.setSource=W.prototype.hd;
W.prototype.getExtent=W.prototype.G;W.prototype.getMaxResolution=W.prototype.lc;W.prototype.getMinResolution=W.prototype.mc;W.prototype.getOpacity=W.prototype.nc;W.prototype.getVisible=W.prototype.Jb;W.prototype.getZIndex=W.prototype.Ba;W.prototype.setExtent=W.prototype.Fc;W.prototype.setMaxResolution=W.prototype.Mc;W.prototype.setMinResolution=W.prototype.Nc;W.prototype.setOpacity=W.prototype.Gc;W.prototype.setVisible=W.prototype.Hc;W.prototype.setZIndex=W.prototype.$b;W.prototype.get=W.prototype.get;
W.prototype.getKeys=W.prototype.P;W.prototype.getProperties=W.prototype.L;W.prototype.set=W.prototype.set;W.prototype.setProperties=W.prototype.H;W.prototype.unset=W.prototype.R;W.prototype.changed=W.prototype.u;W.prototype.dispatchEvent=W.prototype.b;W.prototype.getRevision=W.prototype.K;W.prototype.on=W.prototype.I;W.prototype.once=W.prototype.once;W.prototype.un=W.prototype.J;Jg.prototype.get=Jg.prototype.get;Jg.prototype.getKeys=Jg.prototype.P;Jg.prototype.getProperties=Jg.prototype.L;
Jg.prototype.set=Jg.prototype.set;Jg.prototype.setProperties=Jg.prototype.H;Jg.prototype.unset=Jg.prototype.R;Jg.prototype.changed=Jg.prototype.u;Jg.prototype.dispatchEvent=Jg.prototype.b;Jg.prototype.getRevision=Jg.prototype.K;Jg.prototype.on=Jg.prototype.I;Jg.prototype.once=Jg.prototype.once;Jg.prototype.un=Jg.prototype.J;Ug.prototype.getActive=Ug.prototype.c;Ug.prototype.getMap=Ug.prototype.i;Ug.prototype.setActive=Ug.prototype.Ha;Ug.prototype.get=Ug.prototype.get;Ug.prototype.getKeys=Ug.prototype.P;
Ug.prototype.getProperties=Ug.prototype.L;Ug.prototype.set=Ug.prototype.set;Ug.prototype.setProperties=Ug.prototype.H;Ug.prototype.unset=Ug.prototype.R;Ug.prototype.changed=Ug.prototype.u;Ug.prototype.dispatchEvent=Ug.prototype.b;Ug.prototype.getRevision=Ug.prototype.K;Ug.prototype.on=Ug.prototype.I;Ug.prototype.once=Ug.prototype.once;Ug.prototype.un=Ug.prototype.J;iw.prototype.getActive=iw.prototype.c;iw.prototype.getMap=iw.prototype.i;iw.prototype.setActive=iw.prototype.Ha;iw.prototype.get=iw.prototype.get;
iw.prototype.getKeys=iw.prototype.P;iw.prototype.getProperties=iw.prototype.L;iw.prototype.set=iw.prototype.set;iw.prototype.setProperties=iw.prototype.H;iw.prototype.unset=iw.prototype.R;iw.prototype.changed=iw.prototype.u;iw.prototype.dispatchEvent=iw.prototype.b;iw.prototype.getRevision=iw.prototype.K;iw.prototype.on=iw.prototype.I;iw.prototype.once=iw.prototype.once;iw.prototype.un=iw.prototype.J;lw.prototype.type=lw.prototype.type;lw.prototype.target=lw.prototype.target;
lw.prototype.preventDefault=lw.prototype.preventDefault;lw.prototype.stopPropagation=lw.prototype.stopPropagation;fh.prototype.getActive=fh.prototype.c;fh.prototype.getMap=fh.prototype.i;fh.prototype.setActive=fh.prototype.Ha;fh.prototype.get=fh.prototype.get;fh.prototype.getKeys=fh.prototype.P;fh.prototype.getProperties=fh.prototype.L;fh.prototype.set=fh.prototype.set;fh.prototype.setProperties=fh.prototype.H;fh.prototype.unset=fh.prototype.R;fh.prototype.changed=fh.prototype.u;
fh.prototype.dispatchEvent=fh.prototype.b;fh.prototype.getRevision=fh.prototype.K;fh.prototype.on=fh.prototype.I;fh.prototype.once=fh.prototype.once;fh.prototype.un=fh.prototype.J;th.prototype.getActive=th.prototype.c;th.prototype.getMap=th.prototype.i;th.prototype.setActive=th.prototype.Ha;th.prototype.get=th.prototype.get;th.prototype.getKeys=th.prototype.P;th.prototype.getProperties=th.prototype.L;th.prototype.set=th.prototype.set;th.prototype.setProperties=th.prototype.H;th.prototype.unset=th.prototype.R;
th.prototype.changed=th.prototype.u;th.prototype.dispatchEvent=th.prototype.b;th.prototype.getRevision=th.prototype.K;th.prototype.on=th.prototype.I;th.prototype.once=th.prototype.once;th.prototype.un=th.prototype.J;yh.prototype.type=yh.prototype.type;yh.prototype.target=yh.prototype.target;yh.prototype.preventDefault=yh.prototype.preventDefault;yh.prototype.stopPropagation=yh.prototype.stopPropagation;ih.prototype.getActive=ih.prototype.c;ih.prototype.getMap=ih.prototype.i;
ih.prototype.setActive=ih.prototype.Ha;ih.prototype.get=ih.prototype.get;ih.prototype.getKeys=ih.prototype.P;ih.prototype.getProperties=ih.prototype.L;ih.prototype.set=ih.prototype.set;ih.prototype.setProperties=ih.prototype.H;ih.prototype.unset=ih.prototype.R;ih.prototype.changed=ih.prototype.u;ih.prototype.dispatchEvent=ih.prototype.b;ih.prototype.getRevision=ih.prototype.K;ih.prototype.on=ih.prototype.I;ih.prototype.once=ih.prototype.once;ih.prototype.un=ih.prototype.J;mh.prototype.getActive=mh.prototype.c;
mh.prototype.getMap=mh.prototype.i;mh.prototype.setActive=mh.prototype.Ha;mh.prototype.get=mh.prototype.get;mh.prototype.getKeys=mh.prototype.P;mh.prototype.getProperties=mh.prototype.L;mh.prototype.set=mh.prototype.set;mh.prototype.setProperties=mh.prototype.H;mh.prototype.unset=mh.prototype.R;mh.prototype.changed=mh.prototype.u;mh.prototype.dispatchEvent=mh.prototype.b;mh.prototype.getRevision=mh.prototype.K;mh.prototype.on=mh.prototype.I;mh.prototype.once=mh.prototype.once;mh.prototype.un=mh.prototype.J;
pw.prototype.getActive=pw.prototype.c;pw.prototype.getMap=pw.prototype.i;pw.prototype.setActive=pw.prototype.Ha;pw.prototype.get=pw.prototype.get;pw.prototype.getKeys=pw.prototype.P;pw.prototype.getProperties=pw.prototype.L;pw.prototype.set=pw.prototype.set;pw.prototype.setProperties=pw.prototype.H;pw.prototype.unset=pw.prototype.R;pw.prototype.changed=pw.prototype.u;pw.prototype.dispatchEvent=pw.prototype.b;pw.prototype.getRevision=pw.prototype.K;pw.prototype.on=pw.prototype.I;
pw.prototype.once=pw.prototype.once;pw.prototype.un=pw.prototype.J;Ch.prototype.getGeometry=Ch.prototype.U;Ch.prototype.getActive=Ch.prototype.c;Ch.prototype.getMap=Ch.prototype.i;Ch.prototype.setActive=Ch.prototype.Ha;Ch.prototype.get=Ch.prototype.get;Ch.prototype.getKeys=Ch.prototype.P;Ch.prototype.getProperties=Ch.prototype.L;Ch.prototype.set=Ch.prototype.set;Ch.prototype.setProperties=Ch.prototype.H;Ch.prototype.unset=Ch.prototype.R;Ch.prototype.changed=Ch.prototype.u;
Ch.prototype.dispatchEvent=Ch.prototype.b;Ch.prototype.getRevision=Ch.prototype.K;Ch.prototype.on=Ch.prototype.I;Ch.prototype.once=Ch.prototype.once;Ch.prototype.un=Ch.prototype.J;Ew.prototype.getActive=Ew.prototype.c;Ew.prototype.getMap=Ew.prototype.i;Ew.prototype.setActive=Ew.prototype.Ha;Ew.prototype.get=Ew.prototype.get;Ew.prototype.getKeys=Ew.prototype.P;Ew.prototype.getProperties=Ew.prototype.L;Ew.prototype.set=Ew.prototype.set;Ew.prototype.setProperties=Ew.prototype.H;Ew.prototype.unset=Ew.prototype.R;
Ew.prototype.changed=Ew.prototype.u;Ew.prototype.dispatchEvent=Ew.prototype.b;Ew.prototype.getRevision=Ew.prototype.K;Ew.prototype.on=Ew.prototype.I;Ew.prototype.once=Ew.prototype.once;Ew.prototype.un=Ew.prototype.J;Uw.prototype.type=Uw.prototype.type;Uw.prototype.target=Uw.prototype.target;Uw.prototype.preventDefault=Uw.prototype.preventDefault;Uw.prototype.stopPropagation=Uw.prototype.stopPropagation;Vw.prototype.getActive=Vw.prototype.c;Vw.prototype.getMap=Vw.prototype.i;
Vw.prototype.setActive=Vw.prototype.Ha;Vw.prototype.get=Vw.prototype.get;Vw.prototype.getKeys=Vw.prototype.P;Vw.prototype.getProperties=Vw.prototype.L;Vw.prototype.set=Vw.prototype.set;Vw.prototype.setProperties=Vw.prototype.H;Vw.prototype.unset=Vw.prototype.R;Vw.prototype.changed=Vw.prototype.u;Vw.prototype.dispatchEvent=Vw.prototype.b;Vw.prototype.getRevision=Vw.prototype.K;Vw.prototype.on=Vw.prototype.I;Vw.prototype.once=Vw.prototype.once;Vw.prototype.un=Vw.prototype.J;fx.prototype.type=fx.prototype.type;
fx.prototype.target=fx.prototype.target;fx.prototype.preventDefault=fx.prototype.preventDefault;fx.prototype.stopPropagation=fx.prototype.stopPropagation;Dh.prototype.getActive=Dh.prototype.c;Dh.prototype.getMap=Dh.prototype.i;Dh.prototype.setActive=Dh.prototype.Ha;Dh.prototype.get=Dh.prototype.get;Dh.prototype.getKeys=Dh.prototype.P;Dh.prototype.getProperties=Dh.prototype.L;Dh.prototype.set=Dh.prototype.set;Dh.prototype.setProperties=Dh.prototype.H;Dh.prototype.unset=Dh.prototype.R;
Dh.prototype.changed=Dh.prototype.u;Dh.prototype.dispatchEvent=Dh.prototype.b;Dh.prototype.getRevision=Dh.prototype.K;Dh.prototype.on=Dh.prototype.I;Dh.prototype.once=Dh.prototype.once;Dh.prototype.un=Dh.prototype.J;Fh.prototype.getActive=Fh.prototype.c;Fh.prototype.getMap=Fh.prototype.i;Fh.prototype.setActive=Fh.prototype.Ha;Fh.prototype.get=Fh.prototype.get;Fh.prototype.getKeys=Fh.prototype.P;Fh.prototype.getProperties=Fh.prototype.L;Fh.prototype.set=Fh.prototype.set;
Fh.prototype.setProperties=Fh.prototype.H;Fh.prototype.unset=Fh.prototype.R;Fh.prototype.changed=Fh.prototype.u;Fh.prototype.dispatchEvent=Fh.prototype.b;Fh.prototype.getRevision=Fh.prototype.K;Fh.prototype.on=Fh.prototype.I;Fh.prototype.once=Fh.prototype.once;Fh.prototype.un=Fh.prototype.J;gx.prototype.getActive=gx.prototype.c;gx.prototype.getMap=gx.prototype.i;gx.prototype.setActive=gx.prototype.Ha;gx.prototype.get=gx.prototype.get;gx.prototype.getKeys=gx.prototype.P;
gx.prototype.getProperties=gx.prototype.L;gx.prototype.set=gx.prototype.set;gx.prototype.setProperties=gx.prototype.H;gx.prototype.unset=gx.prototype.R;gx.prototype.changed=gx.prototype.u;gx.prototype.dispatchEvent=gx.prototype.b;gx.prototype.getRevision=gx.prototype.K;gx.prototype.on=gx.prototype.I;gx.prototype.once=gx.prototype.once;gx.prototype.un=gx.prototype.J;ox.prototype.type=ox.prototype.type;ox.prototype.target=ox.prototype.target;ox.prototype.preventDefault=ox.prototype.preventDefault;
ox.prototype.stopPropagation=ox.prototype.stopPropagation;Hh.prototype.getActive=Hh.prototype.c;Hh.prototype.getMap=Hh.prototype.i;Hh.prototype.setActive=Hh.prototype.Ha;Hh.prototype.get=Hh.prototype.get;Hh.prototype.getKeys=Hh.prototype.P;Hh.prototype.getProperties=Hh.prototype.L;Hh.prototype.set=Hh.prototype.set;Hh.prototype.setProperties=Hh.prototype.H;Hh.prototype.unset=Hh.prototype.R;Hh.prototype.changed=Hh.prototype.u;Hh.prototype.dispatchEvent=Hh.prototype.b;Hh.prototype.getRevision=Hh.prototype.K;
Hh.prototype.on=Hh.prototype.I;Hh.prototype.once=Hh.prototype.once;Hh.prototype.un=Hh.prototype.J;Rh.prototype.getActive=Rh.prototype.c;Rh.prototype.getMap=Rh.prototype.i;Rh.prototype.setActive=Rh.prototype.Ha;Rh.prototype.get=Rh.prototype.get;Rh.prototype.getKeys=Rh.prototype.P;Rh.prototype.getProperties=Rh.prototype.L;Rh.prototype.set=Rh.prototype.set;Rh.prototype.setProperties=Rh.prototype.H;Rh.prototype.unset=Rh.prototype.R;Rh.prototype.changed=Rh.prototype.u;Rh.prototype.dispatchEvent=Rh.prototype.b;
Rh.prototype.getRevision=Rh.prototype.K;Rh.prototype.on=Rh.prototype.I;Rh.prototype.once=Rh.prototype.once;Rh.prototype.un=Rh.prototype.J;Vh.prototype.getActive=Vh.prototype.c;Vh.prototype.getMap=Vh.prototype.i;Vh.prototype.setActive=Vh.prototype.Ha;Vh.prototype.get=Vh.prototype.get;Vh.prototype.getKeys=Vh.prototype.P;Vh.prototype.getProperties=Vh.prototype.L;Vh.prototype.set=Vh.prototype.set;Vh.prototype.setProperties=Vh.prototype.H;Vh.prototype.unset=Vh.prototype.R;Vh.prototype.changed=Vh.prototype.u;
Vh.prototype.dispatchEvent=Vh.prototype.b;Vh.prototype.getRevision=Vh.prototype.K;Vh.prototype.on=Vh.prototype.I;Vh.prototype.once=Vh.prototype.once;Vh.prototype.un=Vh.prototype.J;wx.prototype.getActive=wx.prototype.c;wx.prototype.getMap=wx.prototype.i;wx.prototype.setActive=wx.prototype.Ha;wx.prototype.get=wx.prototype.get;wx.prototype.getKeys=wx.prototype.P;wx.prototype.getProperties=wx.prototype.L;wx.prototype.set=wx.prototype.set;wx.prototype.setProperties=wx.prototype.H;wx.prototype.unset=wx.prototype.R;
wx.prototype.changed=wx.prototype.u;wx.prototype.dispatchEvent=wx.prototype.b;wx.prototype.getRevision=wx.prototype.K;wx.prototype.on=wx.prototype.I;wx.prototype.once=wx.prototype.once;wx.prototype.un=wx.prototype.J;zx.prototype.type=zx.prototype.type;zx.prototype.target=zx.prototype.target;zx.prototype.preventDefault=zx.prototype.preventDefault;zx.prototype.stopPropagation=zx.prototype.stopPropagation;Bx.prototype.getActive=Bx.prototype.c;Bx.prototype.getMap=Bx.prototype.i;
Bx.prototype.setActive=Bx.prototype.Ha;Bx.prototype.get=Bx.prototype.get;Bx.prototype.getKeys=Bx.prototype.P;Bx.prototype.getProperties=Bx.prototype.L;Bx.prototype.set=Bx.prototype.set;Bx.prototype.setProperties=Bx.prototype.H;Bx.prototype.unset=Bx.prototype.R;Bx.prototype.changed=Bx.prototype.u;Bx.prototype.dispatchEvent=Bx.prototype.b;Bx.prototype.getRevision=Bx.prototype.K;Bx.prototype.on=Bx.prototype.I;Bx.prototype.once=Bx.prototype.once;Bx.prototype.un=Bx.prototype.J;Gx.prototype.getActive=Gx.prototype.c;
Gx.prototype.getMap=Gx.prototype.i;Gx.prototype.setActive=Gx.prototype.Ha;Gx.prototype.get=Gx.prototype.get;Gx.prototype.getKeys=Gx.prototype.P;Gx.prototype.getProperties=Gx.prototype.L;Gx.prototype.set=Gx.prototype.set;Gx.prototype.setProperties=Gx.prototype.H;Gx.prototype.unset=Gx.prototype.R;Gx.prototype.changed=Gx.prototype.u;Gx.prototype.dispatchEvent=Gx.prototype.b;Gx.prototype.getRevision=Gx.prototype.K;Gx.prototype.on=Gx.prototype.I;Gx.prototype.once=Gx.prototype.once;Gx.prototype.un=Gx.prototype.J;
Mx.prototype.type=Mx.prototype.type;Mx.prototype.target=Mx.prototype.target;Mx.prototype.preventDefault=Mx.prototype.preventDefault;Mx.prototype.stopPropagation=Mx.prototype.stopPropagation;gf.prototype.get=gf.prototype.get;gf.prototype.getKeys=gf.prototype.P;gf.prototype.getProperties=gf.prototype.L;gf.prototype.set=gf.prototype.set;gf.prototype.setProperties=gf.prototype.H;gf.prototype.unset=gf.prototype.R;gf.prototype.changed=gf.prototype.u;gf.prototype.dispatchEvent=gf.prototype.b;
gf.prototype.getRevision=gf.prototype.K;gf.prototype.on=gf.prototype.I;gf.prototype.once=gf.prototype.once;gf.prototype.un=gf.prototype.J;hf.prototype.getClosestPoint=hf.prototype.Ib;hf.prototype.intersectsCoordinate=hf.prototype.Bb;hf.prototype.getExtent=hf.prototype.G;hf.prototype.rotate=hf.prototype.rotate;hf.prototype.scale=hf.prototype.scale;hf.prototype.simplify=hf.prototype.Sb;hf.prototype.transform=hf.prototype.mb;hf.prototype.get=hf.prototype.get;hf.prototype.getKeys=hf.prototype.P;
hf.prototype.getProperties=hf.prototype.L;hf.prototype.set=hf.prototype.set;hf.prototype.setProperties=hf.prototype.H;hf.prototype.unset=hf.prototype.R;hf.prototype.changed=hf.prototype.u;hf.prototype.dispatchEvent=hf.prototype.b;hf.prototype.getRevision=hf.prototype.K;hf.prototype.on=hf.prototype.I;hf.prototype.once=hf.prototype.once;hf.prototype.un=hf.prototype.J;gw.prototype.getFirstCoordinate=gw.prototype.fc;gw.prototype.getLastCoordinate=gw.prototype.gc;gw.prototype.getLayout=gw.prototype.ic;
gw.prototype.rotate=gw.prototype.rotate;gw.prototype.scale=gw.prototype.scale;gw.prototype.getClosestPoint=gw.prototype.Ib;gw.prototype.intersectsCoordinate=gw.prototype.Bb;gw.prototype.getExtent=gw.prototype.G;gw.prototype.simplify=gw.prototype.Sb;gw.prototype.get=gw.prototype.get;gw.prototype.getKeys=gw.prototype.P;gw.prototype.getProperties=gw.prototype.L;gw.prototype.set=gw.prototype.set;gw.prototype.setProperties=gw.prototype.H;gw.prototype.unset=gw.prototype.R;gw.prototype.changed=gw.prototype.u;
gw.prototype.dispatchEvent=gw.prototype.b;gw.prototype.getRevision=gw.prototype.K;gw.prototype.on=gw.prototype.I;gw.prototype.once=gw.prototype.once;gw.prototype.un=gw.prototype.J;Mq.prototype.getClosestPoint=Mq.prototype.Ib;Mq.prototype.intersectsCoordinate=Mq.prototype.Bb;Mq.prototype.getExtent=Mq.prototype.G;Mq.prototype.rotate=Mq.prototype.rotate;Mq.prototype.scale=Mq.prototype.scale;Mq.prototype.simplify=Mq.prototype.Sb;Mq.prototype.transform=Mq.prototype.mb;Mq.prototype.get=Mq.prototype.get;
Mq.prototype.getKeys=Mq.prototype.P;Mq.prototype.getProperties=Mq.prototype.L;Mq.prototype.set=Mq.prototype.set;Mq.prototype.setProperties=Mq.prototype.H;Mq.prototype.unset=Mq.prototype.R;Mq.prototype.changed=Mq.prototype.u;Mq.prototype.dispatchEvent=Mq.prototype.b;Mq.prototype.getRevision=Mq.prototype.K;Mq.prototype.on=Mq.prototype.I;Mq.prototype.once=Mq.prototype.once;Mq.prototype.un=Mq.prototype.J;Df.prototype.getFirstCoordinate=Df.prototype.fc;Df.prototype.getLastCoordinate=Df.prototype.gc;
Df.prototype.getLayout=Df.prototype.ic;Df.prototype.rotate=Df.prototype.rotate;Df.prototype.scale=Df.prototype.scale;Df.prototype.getClosestPoint=Df.prototype.Ib;Df.prototype.intersectsCoordinate=Df.prototype.Bb;Df.prototype.getExtent=Df.prototype.G;Df.prototype.simplify=Df.prototype.Sb;Df.prototype.transform=Df.prototype.mb;Df.prototype.get=Df.prototype.get;Df.prototype.getKeys=Df.prototype.P;Df.prototype.getProperties=Df.prototype.L;Df.prototype.set=Df.prototype.set;Df.prototype.setProperties=Df.prototype.H;
Df.prototype.unset=Df.prototype.R;Df.prototype.changed=Df.prototype.u;Df.prototype.dispatchEvent=Df.prototype.b;Df.prototype.getRevision=Df.prototype.K;Df.prototype.on=Df.prototype.I;Df.prototype.once=Df.prototype.once;Df.prototype.un=Df.prototype.J;I.prototype.getFirstCoordinate=I.prototype.fc;I.prototype.getLastCoordinate=I.prototype.gc;I.prototype.getLayout=I.prototype.ic;I.prototype.rotate=I.prototype.rotate;I.prototype.scale=I.prototype.scale;I.prototype.getClosestPoint=I.prototype.Ib;
I.prototype.intersectsCoordinate=I.prototype.Bb;I.prototype.getExtent=I.prototype.G;I.prototype.simplify=I.prototype.Sb;I.prototype.transform=I.prototype.mb;I.prototype.get=I.prototype.get;I.prototype.getKeys=I.prototype.P;I.prototype.getProperties=I.prototype.L;I.prototype.set=I.prototype.set;I.prototype.setProperties=I.prototype.H;I.prototype.unset=I.prototype.R;I.prototype.changed=I.prototype.u;I.prototype.dispatchEvent=I.prototype.b;I.prototype.getRevision=I.prototype.K;I.prototype.on=I.prototype.I;
I.prototype.once=I.prototype.once;I.prototype.un=I.prototype.J;P.prototype.getFirstCoordinate=P.prototype.fc;P.prototype.getLastCoordinate=P.prototype.gc;P.prototype.getLayout=P.prototype.ic;P.prototype.rotate=P.prototype.rotate;P.prototype.scale=P.prototype.scale;P.prototype.getClosestPoint=P.prototype.Ib;P.prototype.intersectsCoordinate=P.prototype.Bb;P.prototype.getExtent=P.prototype.G;P.prototype.simplify=P.prototype.Sb;P.prototype.transform=P.prototype.mb;P.prototype.get=P.prototype.get;
P.prototype.getKeys=P.prototype.P;P.prototype.getProperties=P.prototype.L;P.prototype.set=P.prototype.set;P.prototype.setProperties=P.prototype.H;P.prototype.unset=P.prototype.R;P.prototype.changed=P.prototype.u;P.prototype.dispatchEvent=P.prototype.b;P.prototype.getRevision=P.prototype.K;P.prototype.on=P.prototype.I;P.prototype.once=P.prototype.once;P.prototype.un=P.prototype.J;No.prototype.getFirstCoordinate=No.prototype.fc;No.prototype.getLastCoordinate=No.prototype.gc;No.prototype.getLayout=No.prototype.ic;
No.prototype.rotate=No.prototype.rotate;No.prototype.scale=No.prototype.scale;No.prototype.getClosestPoint=No.prototype.Ib;No.prototype.intersectsCoordinate=No.prototype.Bb;No.prototype.getExtent=No.prototype.G;No.prototype.simplify=No.prototype.Sb;No.prototype.transform=No.prototype.mb;No.prototype.get=No.prototype.get;No.prototype.getKeys=No.prototype.P;No.prototype.getProperties=No.prototype.L;No.prototype.set=No.prototype.set;No.prototype.setProperties=No.prototype.H;No.prototype.unset=No.prototype.R;
No.prototype.changed=No.prototype.u;No.prototype.dispatchEvent=No.prototype.b;No.prototype.getRevision=No.prototype.K;No.prototype.on=No.prototype.I;No.prototype.once=No.prototype.once;No.prototype.un=No.prototype.J;Q.prototype.getFirstCoordinate=Q.prototype.fc;Q.prototype.getLastCoordinate=Q.prototype.gc;Q.prototype.getLayout=Q.prototype.ic;Q.prototype.rotate=Q.prototype.rotate;Q.prototype.scale=Q.prototype.scale;Q.prototype.getClosestPoint=Q.prototype.Ib;Q.prototype.intersectsCoordinate=Q.prototype.Bb;
Q.prototype.getExtent=Q.prototype.G;Q.prototype.simplify=Q.prototype.Sb;Q.prototype.transform=Q.prototype.mb;Q.prototype.get=Q.prototype.get;Q.prototype.getKeys=Q.prototype.P;Q.prototype.getProperties=Q.prototype.L;Q.prototype.set=Q.prototype.set;Q.prototype.setProperties=Q.prototype.H;Q.prototype.unset=Q.prototype.R;Q.prototype.changed=Q.prototype.u;Q.prototype.dispatchEvent=Q.prototype.b;Q.prototype.getRevision=Q.prototype.K;Q.prototype.on=Q.prototype.I;Q.prototype.once=Q.prototype.once;
Q.prototype.un=Q.prototype.J;C.prototype.getFirstCoordinate=C.prototype.fc;C.prototype.getLastCoordinate=C.prototype.gc;C.prototype.getLayout=C.prototype.ic;C.prototype.rotate=C.prototype.rotate;C.prototype.scale=C.prototype.scale;C.prototype.getClosestPoint=C.prototype.Ib;C.prototype.intersectsCoordinate=C.prototype.Bb;C.prototype.getExtent=C.prototype.G;C.prototype.simplify=C.prototype.Sb;C.prototype.transform=C.prototype.mb;C.prototype.get=C.prototype.get;C.prototype.getKeys=C.prototype.P;
C.prototype.getProperties=C.prototype.L;C.prototype.set=C.prototype.set;C.prototype.setProperties=C.prototype.H;C.prototype.unset=C.prototype.R;C.prototype.changed=C.prototype.u;C.prototype.dispatchEvent=C.prototype.b;C.prototype.getRevision=C.prototype.K;C.prototype.on=C.prototype.I;C.prototype.once=C.prototype.once;C.prototype.un=C.prototype.J;D.prototype.getFirstCoordinate=D.prototype.fc;D.prototype.getLastCoordinate=D.prototype.gc;D.prototype.getLayout=D.prototype.ic;D.prototype.rotate=D.prototype.rotate;
D.prototype.scale=D.prototype.scale;D.prototype.getClosestPoint=D.prototype.Ib;D.prototype.intersectsCoordinate=D.prototype.Bb;D.prototype.getExtent=D.prototype.G;D.prototype.simplify=D.prototype.Sb;D.prototype.transform=D.prototype.mb;D.prototype.get=D.prototype.get;D.prototype.getKeys=D.prototype.P;D.prototype.getProperties=D.prototype.L;D.prototype.set=D.prototype.set;D.prototype.setProperties=D.prototype.H;D.prototype.unset=D.prototype.R;D.prototype.changed=D.prototype.u;
D.prototype.dispatchEvent=D.prototype.b;D.prototype.getRevision=D.prototype.K;D.prototype.on=D.prototype.I;D.prototype.once=D.prototype.once;D.prototype.un=D.prototype.J;Kp.prototype.readFeatures=Kp.prototype.Qa;Tp.prototype.readFeatures=Tp.prototype.Qa;Kp.prototype.readFeatures=Kp.prototype.Qa;vg.prototype.get=vg.prototype.get;vg.prototype.getKeys=vg.prototype.P;vg.prototype.getProperties=vg.prototype.L;vg.prototype.set=vg.prototype.set;vg.prototype.setProperties=vg.prototype.H;
vg.prototype.unset=vg.prototype.R;vg.prototype.changed=vg.prototype.u;vg.prototype.dispatchEvent=vg.prototype.b;vg.prototype.getRevision=vg.prototype.K;vg.prototype.on=vg.prototype.I;vg.prototype.once=vg.prototype.once;vg.prototype.un=vg.prototype.J;zg.prototype.getMap=zg.prototype.f;zg.prototype.setMap=zg.prototype.setMap;zg.prototype.setTarget=zg.prototype.i;zg.prototype.get=zg.prototype.get;zg.prototype.getKeys=zg.prototype.P;zg.prototype.getProperties=zg.prototype.L;zg.prototype.set=zg.prototype.set;
zg.prototype.setProperties=zg.prototype.H;zg.prototype.unset=zg.prototype.R;zg.prototype.changed=zg.prototype.u;zg.prototype.dispatchEvent=zg.prototype.b;zg.prototype.getRevision=zg.prototype.K;zg.prototype.on=zg.prototype.I;zg.prototype.once=zg.prototype.once;zg.prototype.un=zg.prototype.J;Mn.prototype.getMap=Mn.prototype.f;Mn.prototype.setMap=Mn.prototype.setMap;Mn.prototype.setTarget=Mn.prototype.i;Mn.prototype.get=Mn.prototype.get;Mn.prototype.getKeys=Mn.prototype.P;
Mn.prototype.getProperties=Mn.prototype.L;Mn.prototype.set=Mn.prototype.set;Mn.prototype.setProperties=Mn.prototype.H;Mn.prototype.unset=Mn.prototype.R;Mn.prototype.changed=Mn.prototype.u;Mn.prototype.dispatchEvent=Mn.prototype.b;Mn.prototype.getRevision=Mn.prototype.K;Mn.prototype.on=Mn.prototype.I;Mn.prototype.once=Mn.prototype.once;Mn.prototype.un=Mn.prototype.J;Rn.prototype.getMap=Rn.prototype.f;Rn.prototype.setMap=Rn.prototype.setMap;Rn.prototype.setTarget=Rn.prototype.i;Rn.prototype.get=Rn.prototype.get;
Rn.prototype.getKeys=Rn.prototype.P;Rn.prototype.getProperties=Rn.prototype.L;Rn.prototype.set=Rn.prototype.set;Rn.prototype.setProperties=Rn.prototype.H;Rn.prototype.unset=Rn.prototype.R;Rn.prototype.changed=Rn.prototype.u;Rn.prototype.dispatchEvent=Rn.prototype.b;Rn.prototype.getRevision=Rn.prototype.K;Rn.prototype.on=Rn.prototype.I;Rn.prototype.once=Rn.prototype.once;Rn.prototype.un=Rn.prototype.J;Wn.prototype.getMap=Wn.prototype.f;Wn.prototype.setMap=Wn.prototype.setMap;
Wn.prototype.setTarget=Wn.prototype.i;Wn.prototype.get=Wn.prototype.get;Wn.prototype.getKeys=Wn.prototype.P;Wn.prototype.getProperties=Wn.prototype.L;Wn.prototype.set=Wn.prototype.set;Wn.prototype.setProperties=Wn.prototype.H;Wn.prototype.unset=Wn.prototype.R;Wn.prototype.changed=Wn.prototype.u;Wn.prototype.dispatchEvent=Wn.prototype.b;Wn.prototype.getRevision=Wn.prototype.K;Wn.prototype.on=Wn.prototype.I;Wn.prototype.once=Wn.prototype.once;Wn.prototype.un=Wn.prototype.J;Cg.prototype.getMap=Cg.prototype.f;
Cg.prototype.setMap=Cg.prototype.setMap;Cg.prototype.setTarget=Cg.prototype.i;Cg.prototype.get=Cg.prototype.get;Cg.prototype.getKeys=Cg.prototype.P;Cg.prototype.getProperties=Cg.prototype.L;Cg.prototype.set=Cg.prototype.set;Cg.prototype.setProperties=Cg.prototype.H;Cg.prototype.unset=Cg.prototype.R;Cg.prototype.changed=Cg.prototype.u;Cg.prototype.dispatchEvent=Cg.prototype.b;Cg.prototype.getRevision=Cg.prototype.K;Cg.prototype.on=Cg.prototype.I;Cg.prototype.once=Cg.prototype.once;
Cg.prototype.un=Cg.prototype.J;ao.prototype.getMap=ao.prototype.f;ao.prototype.setMap=ao.prototype.setMap;ao.prototype.setTarget=ao.prototype.i;ao.prototype.get=ao.prototype.get;ao.prototype.getKeys=ao.prototype.P;ao.prototype.getProperties=ao.prototype.L;ao.prototype.set=ao.prototype.set;ao.prototype.setProperties=ao.prototype.H;ao.prototype.unset=ao.prototype.R;ao.prototype.changed=ao.prototype.u;ao.prototype.dispatchEvent=ao.prototype.b;ao.prototype.getRevision=ao.prototype.K;ao.prototype.on=ao.prototype.I;
ao.prototype.once=ao.prototype.once;ao.prototype.un=ao.prototype.J;Eg.prototype.getMap=Eg.prototype.f;Eg.prototype.setMap=Eg.prototype.setMap;Eg.prototype.setTarget=Eg.prototype.i;Eg.prototype.get=Eg.prototype.get;Eg.prototype.getKeys=Eg.prototype.P;Eg.prototype.getProperties=Eg.prototype.L;Eg.prototype.set=Eg.prototype.set;Eg.prototype.setProperties=Eg.prototype.H;Eg.prototype.unset=Eg.prototype.R;Eg.prototype.changed=Eg.prototype.u;Eg.prototype.dispatchEvent=Eg.prototype.b;
Eg.prototype.getRevision=Eg.prototype.K;Eg.prototype.on=Eg.prototype.I;Eg.prototype.once=Eg.prototype.once;Eg.prototype.un=Eg.prototype.J;go.prototype.getMap=go.prototype.f;go.prototype.setMap=go.prototype.setMap;go.prototype.setTarget=go.prototype.i;go.prototype.get=go.prototype.get;go.prototype.getKeys=go.prototype.P;go.prototype.getProperties=go.prototype.L;go.prototype.set=go.prototype.set;go.prototype.setProperties=go.prototype.H;go.prototype.unset=go.prototype.R;go.prototype.changed=go.prototype.u;
go.prototype.dispatchEvent=go.prototype.b;go.prototype.getRevision=go.prototype.K;go.prototype.on=go.prototype.I;go.prototype.once=go.prototype.once;go.prototype.un=go.prototype.J;lo.prototype.getMap=lo.prototype.f;lo.prototype.setMap=lo.prototype.setMap;lo.prototype.setTarget=lo.prototype.i;lo.prototype.get=lo.prototype.get;lo.prototype.getKeys=lo.prototype.P;lo.prototype.getProperties=lo.prototype.L;lo.prototype.set=lo.prototype.set;lo.prototype.setProperties=lo.prototype.H;lo.prototype.unset=lo.prototype.R;
lo.prototype.changed=lo.prototype.u;lo.prototype.dispatchEvent=lo.prototype.b;lo.prototype.getRevision=lo.prototype.K;lo.prototype.on=lo.prototype.I;lo.prototype.once=lo.prototype.once;lo.prototype.un=lo.prototype.J;
  return OPENLAYERS.ol;
}));



/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(13);
exports = module.exports = __webpack_require__(3)(false);
// imports
exports.i(__webpack_require__(14), "");

// module
exports.push([module.i, ".overlay-btn {\r\n    display: block;\r\n    margin-top: 2px;\r\n    width: 20px;\r\n    height: 20px;\r\n    background-color: #0af;\r\n    color: #fff;\r\n    text-align: center;\r\n    font-size: 12px;\r\n    line-height: 20px;\r\n    cursor: pointer;\r\n}\r\n.overlay-btn.false {\r\n    display: none;\r\n}\r\n.overlay-btn:last-child {\r\n    font-size: 14px;\r\n}\r\n/*冒泡样式*/\r\n.bubble .small{\r\n    position: absolute;\r\n    top: 0.5rem;\r\n    left: 0.5rem;\r\n    height:1.5rem;\r\n    width:1.5rem;\r\n    transform: scale(0.5);\r\n    animation: myfirst 3s;\r\n    animation-iteration-count: infinite;\r\n}\r\n.bubble .big{\r\n    position: relative;\r\n    height:2.5rem;\r\n    width:2.5rem;\r\n    transform: scale(0.5);\r\n    animation: mysecond 3s;\r\n    animation-iteration-count: infinite;\r\n}\r\n\r\n@keyframes myfirst{\r\n    to{\r\n        transform: scale(1.5);\r\n    }\r\n}\r\n@keyframes mysecond{\r\n    to{\r\n        transform: scale(1.5);\r\n    }\r\n}\r\n.ol-bigscreen-tooltip {\r\n    width: 255px;\r\n    min-height: 80px;\r\n    padding: 10px 10px 10px 20px;\r\n    border-radius: 5px;\r\n    font-size: 12px;\r\n    color: #fff;\r\n    background: url(" + escape(__webpack_require__(15)) + ") no-repeat;\r\n    background-size: 96% 100%;\r\n}\r\n.ol-normal-tooltip {\r\n    width: 255px;\r\n    min-height: 80px;\r\n    padding: 10px 10px 10px 20px;\r\n    border-radius: 5px;\r\n    font-size: 12px;\r\n    background: #fff;\r\n    color: #333;\r\n    border: 1px solid #8d8a8a;\r\n}", ""]);

// exports


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHEAAABsCAYAAABdNl2VAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QThFRjMwRTUzMjJGMTFFNjgyMjNDODE5NzEzRjZDM0IiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QThFRjMwRTYzMjJGMTFFNjgyMjNDODE5NzEzRjZDM0IiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBOEVGMzBFMzMyMkYxMUU2ODIyM0M4MTk3MTNGNkMzQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBOEVGMzBFNDMyMkYxMUU2ODIyM0M4MTk3MTNGNkMzQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmvokjUAABOYSURBVHja7F1XzG1FFV67nHOJhaYxImINikZRwQc1FjBRE8VKDAoWQGNFHjS2B0swKpDog71EJXZDTFT0ATSAhhgflChCaFESLoIx5iIQjPc/uzjjP+O/7rqrzT7nb8okK+fsU/aevb5ZdWbPqsbLvwu7sNWBHhbosYEeHuiodHxEogek39w/UBOoD3RvoDHQPYHuTHR7oDsC3RboT+l42FWcOPm10O6Srh4a6MRATwn0pEDHBTqk4P9NOkdshyXgufavQDcEujbQHwL9LtDdO505OxnEY+M4C/TsBFrt/N+YSGpVIq7FgfHURK9LUhlBvSrQFYFuvg9Eu0UJOSXQiwIdo/xuSEDR1xEBCQTMinmt0uCgr1htPzHRWwLtDXRpoJ8mFXwfiIhRzwv0mkAnCFIyIOoTOD0D4CiAyYFXMUA26LVGlFscWG8O9KZAVwf6QaArt9uObieI80CvDHRGcko44PpEA/M6OEDU1GklSGONQMSvDQK0Sjb6xOQMfSfQjwLt/38BcRbo1YHeEOjBzPcdAq8TwMNSiEEcGAkciXRXSANUBDwqhRjEFoGJ+RYH4HsDnRXom4EuDrT4XwUxMuiFgd7OeIdjAqwj4OX3AyON1CYOjGOjqVMg4FEQMZgUwPzaonPFAfnuQKcF+kKgywyNsOtAfHSg9wd6OgPeQgAQA8lJo6ZSQWAgZxepKq0FVUoBxEDO0LmPDvTxQK8KdH6gW3Y7iPFGz040I99l8DCIEoA9I4WWYzM67aHm2DQMUQDb1N8ZucdoL2Mm5euJ+t0I4qMCnZfcc9z6BNyCAbATAORUqqZKvSByKlVTpQ0DYKbc11n6Tbb/bw30nEAfDfTn3QTiS5P6PIR4mx0D4EIAETs12w1irUhhVqc9AbJF3uwTk9NzQaBLdjqIswTeKxiPc8HQVBC3Mk70gNgTaeyRem1RNugjKRt0/io92FWCeGSgC1MncVtDoK05pbFXbKLm2ECBJILh2GTgOqRGOwbEGQJtEBywOerDywM9MtD7Au3bSSDGTMbnkmeG1ecCgbg2URIt7xSEtNto5E0rkmYr8U57RuroMR1oM3StONC/EeiclMrbdhAflwA8kjgvGDxNGjslzPA6NZIt5NQpCOrU49x0yBuVJFELg+bI6YkD/muB3hXoxu0E8bgU2B5K7N8aAY+CSMHTYsVBUaejAqI3TrRiRQxelsJGSQnOmAGG388R3+PA/2Kgdwa6fjtA5ADMQO0nrxyIVI0uEHCdAmAvMEmbwdBmMmpH6g0DiZ2YgfRxhvrSk/7RvuWYMvLv88sA2S5hAz/LALimALgmODYLR5yoSaFkF60UIGcPNWls0CCjXumMyeHOhbAH9xED+ZmUFNm7FSAekS54hADgmkCaTaSS2AvqdBTyph6nxnJupFCjYYL+QfGW+wQgZ7M5DTEjfI1A3rmZIMYLfgoOnLDtGAA5aVxDv+UA7Ig6lWwOBnIsCPStgL9CwHXE/tXofZuu2QggUs3gUfEt0nCfSlmexWaB+MFAxzNe6JoA4JoRYnjTbssE+V7nJktiR4DkVGqPwByI/ZMGlzWgstd6fOLzeZsBYlw28TISB+4X1OZ+Q51yUiiFGJrbLgX6Xu+UOjcVkrqaeKINkUSpL4Mz/Uf7cQiy0ZHPceXAT1cJYpxK+gCJv6jDsqbYRc2x0aSwU1SWlanxhhhW5qZHNnEwVKnXLoMwJbYH9Sny+zrPVFbrBPpjJJm9UEBaGI4Ndm6k8EKzh1MS31MS4XRKaiDSOAoq1HKyJFucrztHkhn5fmbiyVIgnpViQgrgggkrOBso2cTOGV5YsWEpgOBIhNeCOqWS1zrBqxTPmKb8KuSxHpf4/9VlQHxEOgmXD5Vs3ZoDQEmdlsSH3olgusbGO0GcmTqg18FQ76PDmQIl5VeRlF8WorhM8tapIL6XZOCpFC0YNbkw1KjmlVJV2imx4VRV6lGpQGLFilx3UAbMqORsJQBxYmGRXvek38/TjMc5U0B8bqBnCmqUSqAWzE+dvbBmLYYCh8br4GAQByKJIzr2aAEOvJqReGkarEZq9RkJj1+VgFgT5AdDHS4UiZMS35IqlUD0ZGmmxon5eEDMHdExBnFU0mkeqQcmT7tQpsDyoIp4XAXMQmUJxBcHegzJynSOGXppdmLB/F/zSr0LhQdGlZWCCMRTHATbiEGUku5gTHdxUrdQZk46ZM4iHi8BZnlHK0jh2UQKOdu1cEhnp6jPhXMSuMQWSnOJ0pwiZvZIJGUkEklB1DxRyYEB50oCTC1xcn5GpZED8fnJK6XOzMIAQgK4M9SoFuB7VnqX2kOPXRyJLayUuM/rxFTAL4fkAFyQVN8eFC1EfH5hgXi6IYULAbDOQb0gdVNUqfYUlFedahJZMWA2ggRKqtPznIcEIOYbXtpxugXi40iCuyukEkCt2FCasRidoYWkTkdHqFEJUghOL9RK53ES2ZHkO6U5SpBHnG7C9g+3Uxkp7CcAIk0raSvZuCWK2ux+LySfrbk+KXGtXYPrj+deetDXDnl52hE7eCp1YgAFlS8QpJDrZKd0SlKZnaJKB2YimLOLHPOl7AlHErCjcB2q3rn+ltwnxycvr3N7AU7CYBCfSZZb9AWjRJO4ThjhXFpNAsRitAVUye/pABkdEi3dU2/wpUQy8bMcEadncSCeTADslQv0DlXSMaO3N5gwGoyXwBiE9xJgoxJ3atekA0sahNzyks6hhj28zu0k6tjUGFlDcjzE2ZXeOB6hbHEw5/J7QwzqsFTC9xXJ0lAHZkCMzb/vmZmQmqzNmcLPHs2mQMLrP2nALIlPgIMX/3YCKIMBzOCYlbdUFwZHS7GVTsKCkuGRzjkwx5aK16TTyz9JiHI7MuH2X3V6IvFKNV3fG0sotI4MihodGcmzANTAW+Z3owAcpxmsexsM/mj8lHwHwLhlEJ/G2MPB6YwMoK9K02waOG2aNzvj+Y8VV47GwNHW91haRhvoXscPS+MJ2CY+mZFEaq+suIu74FioUkdl0ZM3sNckjgv6K2eCYCTvB5LVqZCdxDyoEYCNk3eWVAPGLYL4kECHC+p0MLww6ZkDzwMv2vdTMjNjoT0EJvENSlaGpuAomLUiuR7+aKZoENTpYXDF9x5SpxQOMLbIcu8HY66PzjiULjP02jOA6btUjA7p1Z62Gh1mAZx80uZMud/k9viazFiME7Iig2H4vU8wleZClwXQOs/oANWym9Lsi/a9J5uE+/aICOLDGVVqZUUstTAW3LD3+80A0APkqu/DY4Y8vM7t6AjiURNGmmW7ph57gFk1gLDk9Vdx31MGfm4PjSA+yBh9mpMypRMlKqxkmmmVQFp9GJcA1iMEHhOU24NqkvQelyAwwgNwqCwPQ7eieW2y1e/RcOCW5Xdsh9ewvhOv96KWxzY6Yj1LwqwU2rgNAHr6V3LfYwFPLd4dVgO/o29pUrmE8VslTdvVxsIBsez56rzZ+TIMHlcgKeOKfrNVErmT+HW/Gu5ru75FEO8l6aXSVhnHU84x9TerbJvVp2rFfftnDfz+1dWEm6mcF63+xwXDe6+Vg2+e8/1nUvhuAQz6nru49bnnfemNVdsogVb/vPddFfDU4t1dEcS7lJOVkPeilZMx1TaqVM+1tXv3CsWy/P4viPuUzkk7LmkbF2gSqd2wxqitArNymopKkUAw7p/jLYC+11ylDPa/xx/cbkjilE5MPYYCG1FtEoCl11/FfZcIAQXyr3FS+DbirUrLzqUnXD0jp3KqEE36uJn5akXxY+VQmVPvw6PZpvA6t7/Eg1tJp7VnyGvhe1qipy5UDZWhMjwqbDMABAeoJSZIerxNe/xb4mVut8YPbiKSWClgaQ+ISN9zKqNewgteJZDW/0u9RukePXySvpd+k9uN8eBvgf7BqFRu89aGGSG10SFN+jQVUjnBtNSwFddWTvAqQ91pUlk7zVCj8JyrXXUXnPzav+UPrmVAbIQTWADjY00dS5Luia+sx8kqZ0hQFapLEPpbGfypBP7UDv5wWOT2R0AfXI2+aIQLNgqwXIGsStHptUMNeb1ZD1AWwCXhQe0EkvoUlcCnuoDX+TPAuOV1p78T1Cl3Qrw1Vid0DK+xxM8hDMz5AXma+NkFvAUJ/o13NqGaaBet/VCp49YYYGgDnfKT4zN3fsC45Q+uJ0G/dAKpA1qpOq8qbQS1WjtSV9UE58Z7zloAtAHfXjQaTzT+SYKU276E2wEb7/xaUKmNIZGNA/Ta+L9kN7xxVOWIUUv+o12fs/fafVmgNIX8zu3XWUth0bxSkUSuNpLUkRb4eoOadDaEMVZMWi8B5BSbxvWnUZyVRuGBxTuLzwfh1RJkY/nyByIgW4NwxRb8/BzeYjnvRIif05MW/zTcVAuyqXT5/bhCezil8InljGiDuRWOWwXM3O7BmhNLYty26zJ0rI0G7gLcsfQfTnLxTXOebj0hm1QZqrJ2eNBUe3D9LblPjW8Wr3O7LOF1kCTG9kPY2JmhBrvAFZbAgUgm3Q/UegIKYOOxrXxe/OSttVi5muixegJ7T13FxiFxJZJH/1cTnEACMabgroGNvWykE0sg0hpJ2jbPGsMrpEoBDn6UzLMZkTdV56nmptWP8mgmrlRfW0i5XUNSpeyOUt9FINYg1wrEIFq7X3geIuVsEo4Z6bOBAJu3LZhVMLoFf5VTDcCZE+Ca4AMWiJenmY38tBStSNaTC0qbLHgfiuHUXA8Hb4xQk4TBqjfoK9kPXAMN102cMZ+1yu/pZ7TE7a0JHxPEyKRYFu4jijS2gurUHnEr3ZVwIK8YzM3cKrNElWL1ORMkaiYAw1FrSOFFULDfadyO8fWwsecpp06HQjXqqRFRCyBKD2DWE9SqJ6ywQJQclJmgLjXJtMDMLdYjZutkSCBGJsWaiJ9Go3QG8uPItNwcwLSSP3QXYPoMPHZ4Nnv7aC19ptUW1qRuLgAm/R5L4eeBX16q7gEe95v+DazvPw2K+pSclsHphUpeIVajePcJDcTN3Mi9ZbIxmo2bM8C15HgOG/UUuf/kFnH4pXQj1m78sUbw92FjMzjs5MxA3zcNBHtlTQfhnZgq4DdU926mXrqhrKcgZmOoUk7C5og4iZwz/8FJmAs1kCwQozf09UBvI2rVqo8EoFfYBiFD0jHM287iJlVBbMipRg4sDkgKMlaj3wClJoYHxHyS50Hagoqxf4PgHZaAWAlA0vKv21lmqC7wSueGFOb3e5jfYim8PgkRLAtiZN6HA30LNupFzaCs1JxnbU1HJoZ7BChXZGurCn5JAX6rqNNWAG4uSOScAfBfie/9KkCM7Zaklz+Mbnpu2EHPRCzHrJ5I43aU3vNML2lZGEkS50j6OGAr4o/c4gGnpH7iT2C9PvzLkPrZY6hSUNap1IZd7Mn01lYVwfQkvDl1qoUUc0X6MrDYDl6S+A2rBjG2TwZ6FMqtNrBRP3d0jHouKyJV0pZ2cGxh88vReu0hJ4UzFDZQ+zcTJLEhCe5PlIBSCmLcaf89ydgeg85RUg4dFLvTE4eGbuSOZ1C2szA0B6IVC0pqFWOwN/F3sZkgxhYrT5+bgDwCOTqaFFLPbyGASFVpw0hkC5tfot2aO2wdMSIXTuxhvFLK1ztLAZkCYh4x56ZU0KEESO0hkzoFr1Sd5poaeclHB3o5hdHwUqFQO2jTTlQaV6FOaUB/T+Ln3ilgTAUxxzDvDPQF2FiXM2MYRSUQg7cgDOvg4HWt2s7F1qZ/XqfGytLUzOy8luSeG85NSwB8R+InbDWIGci3B/oMbOwh3oL+HAItN0fVFlajGEip9JA2U2IlGrR+SpPAGoiaTZwxTsy+JIE3LAPCsiBC6sCb0qzH0chr3QN2uTksjbRSWUecGaso5lRJ9MxaWDP3UphBbeIBzxXCek3EvcsCsAoQs408KwWoTyVxZKUkkhfktSFSWFok2poC82RqPAuiLAA5acTtD7Be6nffKpi/KhCzaoi6/f2BXo4+n4Nc9FGSRKl21NRqbt4gX1Kly8wjUh7/ONAFgJYc7iQQ87RJrA3/+wTmIeg63MjmAJwCojfg9yS+p4AohRk1yYVeAEwl0p0GIk4bXZcAfTxi1pwB0lOObyeAaK0ZxQDSlew3BvoQrC+xgN0CIqQOvzE5PWeiuGgKiFpdRe8EsWciuJlgE1thMjdnuC4K9DU4sOrargERUse/HOjngT4AqRgHiilbkGsLW9VNNbtY6p16Zi+sBVJ05UB8APT8zZK+rQQRS+VbA70wJQgeRqa0ZqAXi+Qq4VgTxJZj450ItuJECt7tKZN1GWzR9p5bBWJm6KWwvvj11UnFHokYO0NgSgUyS1Nv+b20aNiTcpOWKXLeeVSdF5cmsHcTiNhOxKXo8aGQVwQ6A0kmoBGuVTpbZq1N6TMXNP1G2x2Bvh3oR4H2bwM/twXE3OIN/yCN3JMCnZZsJlV1dFXd1MnhKZPB2vbaV6f+XwnCetD/BxABpcwuTxQLrZwS6EWwMV8JDDO1kjzgABFAX/GtZaaiSYgrsW+DHdJa2FktMuZLiY6F9RK5zw50HGEuXuDLSYl3UtgzwGJu+KpAVwS6GXZga2HntpsTfQXW5yyfDuvLQo5PCYQ9KwCJU/ExML8m0W/hwE194T4Qp7e7kcrNkhhnTB6bVPBRiaK3ezhsTFQ/EDYeBbgnfRZf70ze5B2Jogb4E6zPLAywy9q/BRgAbm5kHXA4fn0AAAAASUVORK5CYII="

/***/ }),
/* 3 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAbCAYAAABm409WAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N0MyNkFEQzE5QUJGMTFFNzg1OEJGRTBGMjlBREZBOTIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6N0MyNkFEQzI5QUJGMTFFNzg1OEJGRTBGMjlBREZBOTIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3QzI2QURCRjlBQkYxMUU3ODU4QkZFMEYyOUFERkE5MiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3QzI2QURDMDlBQkYxMUU3ODU4QkZFMEYyOUFERkE5MiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnT1dTcAAAFtSURBVHjatNbPKwRhHMfx2SFJSEjKgZODC8lFbQ4iHCUpF1dxcHGQk4s/gD/AZePouOXgR21cpBwcRMpJ7eKC2jC7j/c3z9akeXZnxjyferVzeb6f2Z3teSallHJqZBhzmEE/GvGCSxziCE/G1VJgMIYM8viEh7L6jXx+o4hrbKIraE7Q4Fbs4ktFyx1maxV040TFj3zLdVOB3PmpSiYrQQU7Krl8YNRfkNYPLcnk0ODyR6rDKuqdZJPGpBQMYcKxkwUpmEebpYJBKZiCa6mgJ8WDeOei2VKBJwWeftA2ouSnycuFpYKiFFyhZKng2dVbbtlSwaMUZHFrqeBYCgo4sDD8DfuVvagd9wnvRdt/d9PpGIeMKedoCTpwllH65/Ab9FU7MpfwGnP4mX+4qUCMIBthsLwYbKEpzKFfIdvIOPbwEDBUDqgLbKDXNKdagV+HHubPWpi1YQvEAAp6eCbsuigFYlG/1nSGXfMjwADvQh1159Y7/wAAAABJRU5ErkJggg=="

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAbCAYAAACTHcTmAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTM1OTg0RjMwQTUyMTFFOEE2NDE5QTI0NDlFNzc4N0IiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTM1OTg0RjQwQTUyMTFFOEE2NDE5QTI0NDlFNzc4N0IiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxMzU5ODRGMTBBNTIxMUU4QTY0MTlBMjQ0OUU3Nzg3QiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxMzU5ODRGMjBBNTIxMUU4QTY0MTlBMjQ0OUU3Nzg3QiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PoIhSbwAAALVSURBVHjapJVNSFRhFIa/OzrNjDNWFNJCQjOCFGrRD1SLiH6pIKpNICQIBa0L+gOXtjDKRZFQIFFBJrTQRbRoYxBFEP24aFGkSRpBRSVpmnNv7zu9V063OzrUgYfzfeee+97v99yE7/sujiAI0mA3uAU+BL9tCvSDVtAAou8UiIjlw4fbQS8YlVDUfoAh0AZqZhAtCGYQvBAjNACeapQfI8/egr0xogXBFALdJvk7uIT4NlAHFoJFYCXiTaDP5E6ARiM6PeXzJumZ7wdrwyTAD2ZEUmuZhT8pwXAQ66dHisYm8FMPnyO2BP4EuIF2PXwZmAsqDRX64GHz7mMuYTiKHgW/Ao7wlBl1PxKXKa8yQg4zoka7yW9kYKvEaO1I2gifj2zGVU07FyOc1MyGlduTcM41gSzgjnfD5wDjoeXBoGKe+9vSnucNwN9Tv56Jm0EZGALDzgWPJEKbAM0ucK3wSVfcqPNA7Wp2qtX5DL7hq/RdinEDHmJ8+cjo40TfqV3BTqCOJ7jTnfAjXAp8hLcmpVGHNgZGwaSJefYLb9SuAgtAOYRewZ9RfB/6HdwQtMcleARcR2y5+j6oVf4od79Duz2Fnd8F74Es2iwoneYE9OrMsi6MKTaI2AYdqy7FXjrdgk8K4LAHCR2VDF6YB3/FCH9RkbHWh3dWwb9X/yZvFNfwmgLcmD26KRRO4/kc+EPgdRBvl837tB3hNV0Nxs2U1kg4K5i3GP40eKG8SXAOtJhryiUqtwW2JVLO9jNBa5zS/WfufEyXgzgAzpqCwsEs/aOeokOB20bYB3dY5vC8AdTyOgLWhuOsZCaXs9wSW/kRqOLuxawbRzNiNjRqx2b4nRQerDMFphRjefRM7XXFfnrNJQo+0bFzpYiSi7MI8l+1Iio4myjP6f0igtzEg3YdSxUldTpeUWsL//n/Ikp2mrNIu6tz+1+i5KiEeTZr7LO4934JMACqQGU5TfXuWQAAAABJRU5ErkJggg=="

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAcCAYAAACOGPReAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Mzk1QUFEMDMwQTUyMTFFODlGRkFFQ0U5MTEzMUM5ODEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Mzk1QUFEMDQwQTUyMTFFODlGRkFFQ0U5MTEzMUM5ODEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozOTVBQUQwMTBBNTIxMUU4OUZGQUVDRTkxMTMxQzk4MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozOTVBQUQwMjBBNTIxMUU4OUZGQUVDRTkxMTMxQzk4MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PsSSgA0AAAPQSURBVHjalFZbaFRXFL3nzitzJz4S02BQfIAYtRVKax/mw/j4EL/yVRBEkOqHKArav1bqh1j86JcUqn+ClioFjWILVqgiPn5Eq4IKhjqTZCbznsnMvXPnvmZcO9lHr2nTyZywsu85Z591zt1n7X1HaTabyiwQwCBwDhgDTKAKPAa+B1bNtnY2ws+AC0ABsJv/brTBK+A4sGgupEcAXa5u4A8txySv0TdmbPAE2OjnEFPM79pJ4FvZgcvVXD1/0XDNl0JRikKIILz7eiLdn3cGY1/D5SN2LQNDwJ3phe922OPbPV+0SrsdzwlxbCXe+k/U0r1uwz3jW0NxX+Z/fepkeLKUrmW28bgGqEljomvMSK4DPgbWgLAL4+GyVVbrnnXCR3yJNpekp2QIC1ZpL49FcdJIwSoewPNdoAJ4QBG4/081TrcfKlrFIOJ82Uc8QIuXAyN8KX/BROiElmd32J59li+K2iPgJvA3jSWN1ACRAgFssAFjFfY7S6QHpWyyZm6X1Cgu6CAT6hkzuzNppBekzUwHQvFBQh/7Il5NUMhiwLy6WxcIwzUmfUgEN7iTi+tj62nnrJnvpEki1R3jB94oxFC5T280n0jpEJN25QjzZIIQQD/LIgvPAmxDd/VlPUr3EqEIxXBrN7VAFNb4KhaKbcEiB9ISZXvydld44RX4R4AAxhPM00mkUe544PDoQQg1BBNktVp0MhBugt2nCpX0q4TVkIvJS0xKYzbzBFT8K3EnIoQShlVFUynglJO0WAtqn6qqqsT10Z9TZma703CGyRnRNpT3m8bWIdKHUxshUxCaxTS6ROtLml793vS7xA6NGuOfrOxc/mSp1ven2/RGebHwEbp4gw/5uUQBHwJqU6q3yt/IS4hXR/thn3PwC5DXbzXXPE8XShdoOLWfZILk6wUNYw/Y95bCNygHXqSMNFWdKBCEGtbBXqT9Gs2GLC5UUG5BVjsoq6ZTNjOEOYc5jsmM2i8rEiT0I4+RBiOTVkWDNldDw4PQ7uaEPr4WJ+tmwhCk1Av7lAnLwFJJGuXiS8Retp4/CkFLLcbYBhlh9hcZM0dF5bovRY/OrKdfcn5PNeT9mdfVxEquTiT4AFsVpwukahNUdO77CIdlYsysp4eA075+ChL6w27Y9yqOPg5tRiCx/oga3orb3ob5DvYbAQbJf2Y9lfil2V6jC9rS6nPSAzxrg/S7uX74NkrttmjDHOs5kRIOtyCMA73tfKLld//XWQip/u5o97svsdCXqv527P/WtSIlDPh/B6D9/l9xbJdUpnGNfzisaOX/RoABANm7kFgFFjo5AAAAAElFTkSuQmCC"

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAcCAYAAACOGPReAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NEUyRENBQTMwQTUyMTFFOEEwQjRFRUUwM0RBNDE0MjUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NEUyRENBQTQwQTUyMTFFOEEwQjRFRUUwM0RBNDE0MjUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0RTJEQ0FBMTBBNTIxMUU4QTBCNEVFRTAzREE0MTQyNSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0RTJEQ0FBMjBBNTIxMUU4QTBCNEVFRTAzREE0MTQyNSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrMzcqgAAAQ8SURBVHjahJVdbBRVFMfPnZ3Z2ZbSdhtKqV9PlqDxi/CATXygMfIgaoz6VNFoeFAEJSZEJCEhhUACCS/6JAGNJsboA7IxkqDgR4gv8kJCKhFpCIXdLdDa3WW/ZmbnXv9n5u7u7G7X3uS3Z+7Xueece+5ZkclkKE4eif5RSq6wSFCjWWATeAs8C0aAD/4Cp8DXs3ML/wypPOVqMVo1PEKJRCLcyUrnMzdooeiSVIpUyDPgO5ADrupsZTADplxfrp7PFUh6Xn1vRGkpUBrjhaBa3y1D5sEMuAGqMqLdl+oKxCZPNgwiE3rJJEnCMNjwT8F27T5P/Qi+wXlX0MnxUiFotM+icXxvA2OGoHXQlzIFvQp95wTHj63MLJb4hN0R6+YgJqueiuvTLZAANjB4LFdVo5CfydY9Y2wx3UnP8qYnMJjXk3c8X42rZny74tYky0MRxT8sVpVhOvYgu/o+rO7HGTXInTisjLEDoEzdm2XFRB73e7QvTuvQfwW8MGjTBHm+fByHZPRhZwrV4LIeA9OwuH5RHbh+sH4v1tsVT23EWFHr+MIwDfE6ThiGlcpXdBKBHkJ/KzybNI3gooLcjcIeWAZNQs6utGmPW1MXMf6b9mA9x+SyjkcWwR8rOGoY3yUMnXVqai3kCdmao2kwAbbKMIc/V7UgR3frdQucR2u1NXOcDBhAllAB35vjMfrS9ekT9A+p0Iqr4GWwAf2vRPjqKvCK2zVt6aCJn7jueMDF4gQ1E/VpKE5BbsNln8fexZigN9H/MPKcSQTJ2bhUg5XmwQBYwWCD1Ad5WHoC8m3I77Evhe+HwTj6f0AuYO1LrM4IH85Q3TjuXWKjsOBByPtE+M1W7wAXeQ/oB2+wQr0xgbQ7iLVneU4YgaVP6rl5DvB7qvmeP0CKDELiyaldUv1vm8a73wL5PC64H/JPPX5BlBx/tDdunMMJj4LpvEPjCZMeQiyPizAM/lKZz7HH/O+oC7t6LHoN4flWhF5NiZvZu/TAmlV70Tmswiw4VnBoHz4GSDUKS+RW9IhADcLFwvOBXovOYOQRDBcQu6col71ORcdPwtW/db7yW9lTcYP3zcWjZwm4uFDeUfdD/hoJyUdFT9fTuXSaFTwHKvUainay5KoxSKGVN7jnKBtrXsT3pYjCFA6xuNCL+t+J3zdCq1fa++DGwYizt8F5cIH/JIANuHhshj0bdfKjuNM1V9JEIka3Wv5O/i0HT80Ep9uvub2YtM057OU9t1kSjcZt8t8BSp/Oz5n2u2krKNG5A0WPfu6zmmPGEtmSBu/wk6VlGuw4Xa7RkajCVqWtJnAc9y+j8Dpyc3uvGXjXRWlnOwZSXRLfhcJ3dWWj7kpVx5yn/1mvUmccp6o1+qmbNcYyYctqxZXIWCrv0pEes/smk5Zvv4CPwVE4M43Xt9MsZP3bsnk7nEbJZJJs2w76/wkwAL2rsQ6IUPQfAAAAAElFTkSuQmCC"

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAfCAYAAAASsGZ+AAAACXBIWXMAAAsTAAALEwEAmpwYAAAKTWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167+3t+9f7vOec5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQyDwdHAoLC+0lYqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHiNLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv/mPQCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5+ASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw+S3FDrFiOJMCaIkUqSUEko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC/pdLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7OUndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1+rTfaetq+2mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS+Kc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw+lXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00umxvJXcM970H08PdY4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+Hvqa+It89viN+1n6Zfgf8nvs7+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww+FUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrORZ+2e9jvGPqYy5O9tqtnJ2Z6xqbFJsY+ybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWYEpeyP+WDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT1IreZEZkrkj801WRNberM/ZcdktOZSclJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/PbFWyFTNGjtFKuUA4WTC+oK3hbGFt4uEi9SFrUM99m/ur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk626s91m/r0q9akHV0IbwDa0b8Y3lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e+2Sba1r/dd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+yCW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9+mfHvjUOihzsPcw83fmX+39QjrSHkr0jq/dawto22gPaG97+iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8mWtdUV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1tv62X3y+1XPK509E3rO9Hv03/6asDVc9f41y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r/y+2v3qB/oP6n+0/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJHzEfVI0YjjY+dHx8bDRq98mTOk+GnsqcTz8p+Vv9563Or59/94vtLz1j82PAL+YvPv655qfNy76uprzrHI8cfvM55PfGm/K3O233vuO+638e9H5ko/ED+UPPR+mPHp9BP9z7nfP78L/eE8/sl0p8zAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAKdSURBVHjarJbLS9RRFMe/+lOL0sySIsFeoBGItAh10YNoE1TQY1GbiBZBEFGrNtHjL6iw1ZCBLrJF+KJFDNKDLJAiQomKFmKFIoVEClbjOJ82x7hz5/ebGXUOHJg559z7mXsec68AeboRaAGqQnz5aWdn2vdipctBSf2SHkl6LGmvCiAu5ICkB5LqJVVLajbY8UJBtkm6J6nC81dIape0Z6mQKkmtkmoiYsol3bHTLRpyQtLuHHGNkg4tNV2JPGKrFp0voAmYJLvcB9YBwQL0fwsLqADeRWz+HTgHLFsgIPDnZFpST8gh/0g6JemupGQhWrjPYK5MS3pbyGEckhT3fKuXOh9u4ee1CZj1ajIIVC+iHhmFd7UtpPjtQEkhIfXA1xBQK1BaKEgAnI1o59Ycm9YBV4Gj+UACoCMC1AastJgGYKd9LgVeWkyS2dk+uro2kUhkhay3ovvyGVgDbAd+AXPAPltzOyO2v7+BZDISEgBbgTfOohRw2Hy9XgeuAGqAjx7oE7FYbTZIANQ6G/aY7VjICS+Z73SGZ2oqlgsSAMuBy0AjsAr4YKe6BVwD/gITwGZr9biHeZ0PxNUbtnAEqDTboNMUAdAMTDmQ3oVAGoCftnAYWGv2p2b7Dew3202zfSEWa1wI5KHz6947fzfPHfsrS+8GoJuOjh3ZWtjXI0DS2WzY3mUB8MyrwQUgYHy8ONcwuloJDHkbTdqsVNrsuPKNnp4t+Uy8q1cipv8HMBbqSaViDAxEviB9qZN0MeyGkDQg6UnorVlUdEbV1buUSmXcJ/5JyuwBESZjTgsPR8S8IB4vj0rX/N3RkuMFcx047zVEuoyOnmRmRiXeQecklVoKJiR1Syqz9PjXdpN9jtu6tIRJSiqRGJGkfwMAZCKs/XtLAVIAAAAASUVORK5CYII="

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAYCAYAAAAGXva8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAKTWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167+3t+9f7vOec5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQyDwdHAoLC+0lYqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHiNLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv/mPQCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5+ASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw+S3FDrFiOJMCaIkUqSUEko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC/pdLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7OUndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1+rTfaetq+2mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS+Kc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw+lXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00umxvJXcM970H08PdY4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+Hvqa+It89viN+1n6Zfgf8nvs7+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww+FUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrORZ+2e9jvGPqYy5O9tqtnJ2Z6xqbFJsY+ybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWYEpeyP+WDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT1IreZEZkrkj801WRNberM/ZcdktOZSclJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/PbFWyFTNGjtFKuUA4WTC+oK3hbGFt4uEi9SFrUM99m/ur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk626s91m/r0q9akHV0IbwDa0b8Y3lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e+2Sba1r/dd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+yCW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9+mfHvjUOihzsPcw83fmX+39QjrSHkr0jq/dawto22gPaG97+iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8mWtdUV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1tv62X3y+1XPK509E3rO9Hv03/6asDVc9f41y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r/y+2v3qB/oP6n+0/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJHzEfVI0YjjY+dHx8bDRq98mTOk+GnsqcTz8p+Vv9563Or59/94vtLz1j82PAL+YvPv655qfNy76uprzrHI8cfvM55PfGm/K3O233vuO+638e9H5ko/ED+UPPR+mPHp9BP9z7nfP78L/eE8/sl0p8zAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAMESURBVHjatJY/iFRXFMa/mfd32VUsFHajrihkbYyLmsJKtNRCNLCEaKtFYogKVqYQQjQ2soWNTQoRlYgIKmoh2GgqmwUJQRH/RRBXXceZNzO+Pzu/FN5kZ97cNztb+MFh3jv3vvudb+495x4BsloUCRgFTgDPgRZziI3vDDBOHAeF61isaGAcOA28BKpARidaxhcBr2m19i6E1FU3Dkj6VdISFaMkyZE0KGlQpdKgFoA86VFJxy3zpiVNSYrMeyBpTNKX5t0xZsOsnXR2VnKcPRbClqTjiuPLCoK/OkbieKVgXGG4U1J9IUo//c+12kqzf+2o0Gp9AzjzWpYFPca79rSsZlMaGtotaXkunl9UKl3tK3LHyRYitCzP8yXtyvkfq9m8oM8EV647bA5FO25pYODN3M62ysqy0JzagvDLsVw36/f0bpE0lPM/6kyQ0mr5/k1Jwz3W2iPpRr+kIxYF1RxpWdIik5dF8P5/SpJAvh8X72l/+esY0l54b37Xy/enJE32UvpKEjn/sk7d1Zfy/W8lhZKkMByVdKwtkH+Upo/keZJ00hSNVZKuS7pty9NRS46eJUm8Hrm3BnjTNv+w8X+XW+c+UeR1F/w09YE7uclvaTTW9iBdD7w1c+9Rqy2hWl0GPATeAweBi2b8B7IsR9poCPiJbpwnTd0C0q+Ad0AC7DS+n813VwCHen2DuY1e0GiMdF9ttdoI8NRC/DuVyrCFdAMwC1wDHJJkrE35H4BDtfo1kBrfJLVajvST/N0m8jymgVPABM3mBPAjMAXMAJtIUw841zb/koU0AzYWXeL7gAb94YRRvdV0EnQojaJ1ORE3mJkp7By2AXfnIfybDx+WUq+HwJ+5scfADuA3y3cTxe1KkoRk2XbTsjwwJzIyVgH2G5X7zN7mkRUE+xAIi/qYuUOTJAPE8eIOA4c0/QJ4Yll4ChgDvs81c//hiDtvdfa8RFLSXcvco5JWW76oKI6fKQheFNxKh9x++xoLVkiKcyUUSZsVBE8kLZb00VLrnX8HAPuZ8p2uVylOAAAAAElFTkSuQmCC"

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAaCAYAAABGiCfwAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKTWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167+3t+9f7vOec5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQyDwdHAoLC+0lYqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHiNLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv/mPQCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5+ASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw+S3FDrFiOJMCaIkUqSUEko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC/pdLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7OUndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1+rTfaetq+2mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS+Kc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw+lXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00umxvJXcM970H08PdY4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+Hvqa+It89viN+1n6Zfgf8nvs7+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww+FUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrORZ+2e9jvGPqYy5O9tqtnJ2Z6xqbFJsY+ybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWYEpeyP+WDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT1IreZEZkrkj801WRNberM/ZcdktOZSclJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/PbFWyFTNGjtFKuUA4WTC+oK3hbGFt4uEi9SFrUM99m/ur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk626s91m/r0q9akHV0IbwDa0b8Y3lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e+2Sba1r/dd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+yCW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9+mfHvjUOihzsPcw83fmX+39QjrSHkr0jq/dawto22gPaG97+iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8mWtdUV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1tv62X3y+1XPK509E3rO9Hv03/6asDVc9f41y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r/y+2v3qB/oP6n+0/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJHzEfVI0YjjY+dHx8bDRq98mTOk+GnsqcTz8p+Vv9563Or59/94vtLz1j82PAL+YvPv655qfNy76uprzrHI8cfvM55PfGm/K3O233vuO+638e9H5ko/ED+UPPR+mPHp9BP9z7nfP78L/eE8/sl0p8zAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAKwSURBVHjarJZLSJRRFMf/+vlMeyyazKiNGbXICtxFi9ooFGVgqOFGymUFQpRQZAbVIooWCRHRJnBT0INei9pIBIFJC6MEg6wMRhN1mECdGX8tPDPePnX6HD1wGe45557fd8+ce8/NAiSpRNIaSQktn+RrePiHQqFIUpFjv9WSOiTFJcWWAVQs6YtCoQYlEhF53owWEJALnAZiLI98BHYwNpaMLyAF82wcAUaXCHoKlAIe3d1Z9PQUurA9wF4HuBv4miHoNlAMeITDecAFoNaF1QPfgGYHWA68WwRkGjjnrC8C7pqt0YUdclJ3EcizBeuABwFA40CTA9oIPHfsR/2wEcd4L5UKKASupwF9B6ocUAXQ4/NJCwN4BWxygrQAkz6fDxY86VMN/Jzng/4Lmy3f2WC1wC+zPQE2OLYm4M8Cuw8Ew4Lvd4KGgDIrAM/OZ5sVCBYnnikM++LjDjA5VjkVB3DTqviMAw8E+w1EnXkC6ARqgH3AMaDbsb8BVjgf0hkU9h7YaucuiIwAOy3FN4BK2+GIH5btu0DfSjosqV9SKOCle1VSr6Rbklok3VE4PGj6f8V2FgW6UnfaTN7jAXb10vxrfP6tRKNFlupmN42NwGNgvS1sDZi+YWCbFUqvncNOYBCIMDW1hVisCqhzYeVAiYHO+yopnZy0Ne02v2/zEzZ/yMCAGB1d7W8xucCVRbaR5PU06pR+8vDPSDxe6/azZKcuk1RhBZKuU+dIikg6a/N2e05IShWbl/L2vDZNTLxWQcG426m9DEaDb7cdpq/36S/R3z9vpw461gKffEE/AweAZ3PO4dDQrqXALi/wX44t8I55RF9fRrBKIDJPwBe+6vRLXXYGz7R2SSvn0ZdK2i5p8wLrTmXZI3Uxck3SQUmTPr0naUJSvqTpOQ9WqevvAAY3pvS51p9BAAAAAElFTkSuQmCC"

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTEzNDM0OTM2M0RDMTFFOEFERkRCRDY4REM3NTZEMEYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTEzNDM0OTQ2M0RDMTFFOEFERkRCRDY4REM3NTZEMEYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFMTM0MzQ5MTYzREMxMUU4QURGREJENjhEQzc1NkQwRiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFMTM0MzQ5MjYzREMxMUU4QURGREJENjhEQzc1NkQwRiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Phv3bCEAAABFSURBVHjaYvj//z8DELcB8XMgfgnEvSAxkGDLf0wwhRFI/GFgYGBmQANMUMyATaIfi/g8BqjlU4D4FRC/AeJZIDGAAAMADABF9j+W/ZMAAAAASUVORK5CYII="

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(16)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(1, function() {
			var newContent = __webpack_require__(1);
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = function escape(url) {
    if (typeof url !== 'string') {
        return url
    }
    // If url is already wrapped in quotes, remove them
    if (/^['"].*['"]$/.test(url)) {
        url = url.slice(1, -1);
    }
    // Should url be wrapped?
    // See https://drafts.csswg.org/css-values-3/#urls
    if (/["'() \t\n]/.test(url)) {
        return '"' + url.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"'
    }

    return url
}


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, ".ol-control,.ol-scale-line{position:absolute;padding:2px}.ol-box{box-sizing:border-box;border-radius:2px;border:2px solid #00f}.ol-mouse-position{top:8px;right:8px;position:absolute}.ol-scale-line{background:rgba(0,60,136,.3);border-radius:4px;bottom:8px;left:8px}.ol-scale-line-inner{border:1px solid #eee;border-top:none;color:#eee;font-size:10px;text-align:center;margin:1px;will-change:contents,width}.ol-overlay-container{will-change:left,right,top,bottom}.ol-unsupported{display:none}.ol-viewport .ol-unselectable{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent}.ol-control{background-color:rgba(255,255,255,.4);border-radius:4px}.ol-control:hover{background-color:rgba(255,255,255,.6)}.ol-zoom{top:.5em;left:.5em}.ol-rotate{top:.5em;right:.5em;transition:opacity .25s linear,visibility 0s linear}.ol-rotate.ol-hidden{opacity:0;visibility:hidden;transition:opacity .25s linear,visibility 0s linear .25s}.ol-zoom-extent{top:4.643em;left:.5em}.ol-full-screen{right:.5em;top:.5em}@media print{.ol-control{display:none}}.ol-control button{display:block;margin:1px;padding:0;color:#fff;font-size:1.14em;font-weight:700;text-decoration:none;text-align:center;height:1.375em;width:1.375em;line-height:.4em;background-color:rgba(0,60,136,.5);border:none;border-radius:2px}.ol-control button::-moz-focus-inner{border:none;padding:0}.ol-zoom-extent button{line-height:1.4em}.ol-compass{display:block;font-weight:400;font-size:1.2em;will-change:transform}.ol-touch .ol-control button{font-size:1.5em}.ol-touch .ol-zoom-extent{top:5.5em}.ol-control button:focus,.ol-control button:hover{text-decoration:none;background-color:rgba(0,60,136,.7)}.ol-zoom .ol-zoom-in{border-radius:2px 2px 0 0}.ol-zoom .ol-zoom-out{border-radius:0 0 2px 2px}.ol-attribution{text-align:right;bottom:.5em;right:.5em;max-width:calc(100% - 1.3em)}.ol-attribution ul{margin:0;padding:0 .5em;font-size:.7rem;line-height:1.375em;color:#000;text-shadow:0 0 2px #fff}.ol-attribution li{display:inline;list-style:none;line-height:inherit}.ol-attribution li:not(:last-child):after{content:\" \"}.ol-attribution img{max-height:2em;max-width:inherit;vertical-align:middle}.ol-attribution button,.ol-attribution ul{display:inline-block}.ol-attribution.ol-collapsed ul{display:none}.ol-attribution.ol-logo-only ul{display:block}.ol-attribution:not(.ol-collapsed){background:rgba(255,255,255,.8)}.ol-attribution.ol-uncollapsible{bottom:0;right:0;border-radius:4px 0 0;height:1.1em;line-height:1em}.ol-attribution.ol-logo-only{background:0 0;bottom:.4em;height:1.1em;line-height:1em}.ol-attribution.ol-uncollapsible img{margin-top:-.2em;max-height:1.6em}.ol-attribution.ol-logo-only button,.ol-attribution.ol-uncollapsible button{display:none}.ol-zoomslider{top:4.5em;left:.5em;height:200px}.ol-zoomslider button{position:relative;height:10px}.ol-touch .ol-zoomslider{top:5.5em}.ol-overviewmap{left:.5em;bottom:.5em}.ol-overviewmap.ol-uncollapsible{bottom:0;left:0;border-radius:0 4px 0 0}.ol-overviewmap .ol-overviewmap-map,.ol-overviewmap button{display:inline-block}.ol-overviewmap .ol-overviewmap-map{border:1px solid #7b98bc;height:150px;margin:2px;width:150px}.ol-overviewmap:not(.ol-collapsed) button{bottom:1px;left:2px;position:absolute}.ol-overviewmap.ol-collapsed .ol-overviewmap-map,.ol-overviewmap.ol-uncollapsible button{display:none}.ol-overviewmap:not(.ol-collapsed){background:rgba(255,255,255,.8)}.ol-overviewmap-box{border:2px dotted rgba(0,60,136,.7)}", ""]);

// exports


/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAAEDCAYAAAAcBhlYAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKTWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167+3t+9f7vOec5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQyDwdHAoLC+0lYqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHiNLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv/mPQCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5+ASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw+S3FDrFiOJMCaIkUqSUEko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC/pdLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7OUndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1+rTfaetq+2mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS+Kc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw+lXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00umxvJXcM970H08PdY4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+Hvqa+It89viN+1n6Zfgf8nvs7+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww+FUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrORZ+2e9jvGPqYy5O9tqtnJ2Z6xqbFJsY+ybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWYEpeyP+WDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT1IreZEZkrkj801WRNberM/ZcdktOZSclJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/PbFWyFTNGjtFKuUA4WTC+oK3hbGFt4uEi9SFrUM99m/ur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk626s91m/r0q9akHV0IbwDa0b8Y3lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e+2Sba1r/dd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+yCW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9+mfHvjUOihzsPcw83fmX+39QjrSHkr0jq/dawto22gPaG97+iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8mWtdUV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1tv62X3y+1XPK509E3rO9Hv03/6asDVc9f41y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r/y+2v3qB/oP6n+0/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJHzEfVI0YjjY+dHx8bDRq98mTOk+GnsqcTz8p+Vv9563Or59/94vtLz1j82PAL+YvPv655qfNy76uprzrHI8cfvM55PfGm/K3O233vuO+638e9H5ko/ED+UPPR+mPHp9BP9z7nfP78L/eE8/sl0p8zAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAYuSURBVHja7NtNiBxpGcDx962qnu6emczkazKywiSRzCYmQVg8e3JREdzPgAcxZj1q9CguC5qLm3jxA3NRQeJhQUVEWNebijcPHnTZTDb7cXAXgvORmclM0l09XVWvB7MQFkmuM+Xvd+06PfDnqbeqOn7qh38ND5VSUUxOfydm2SdTU22FEFMAdqEUYl7MpLp+fTy4dynGuPPBL8UjIg+9w0e+u/HW9S+9/+fXJmOWp5jnQofdmHldZ6mp08KTT53ef+JUXq6tvBRirB4VeuzPzb98592b59585af9cn2tV/T6tXHC7lWVw2Lw71vp9IWLz8weX+wMV5e/FWKs4v+8dU8p9ufmX9589+bzS9euzlTDe0V3/8FRappolLB7xSxLo431XjE1NTrzwje3Z44tvlquLb+YH/3cCx++NuvPzV/efOfNc9ev/WSmLgcihz1z/55iMTlZjbe2eutL/8inH1tY7B068tHsQxdl/cNHrmy+c+O569euTtejUuSw11pvmtg9cLAc3l6dfO9Pr/Zjlp18MPS8P/eRy5tv33j2+rWrM1U56HRnD4gc9mjsRa9fx7wIqa62i/ubPO/PzX9/4+2lp5euXd1X75RFzyaHvX9mz/MUYgxZSKnoH56/svHW0tNLv7y6rx6VhU0O7VIUU9NXbt/457mbr/ysW++URXe/yKFtshizU+//5Y+98s563yaHloaemnorLzqp6PVrkUNLQw8hhOCzVvg/CB0QOiB0QOiA0AGhA0IHhA4IHYQOCB0QOiB0QOiA0AGhA0IHoQNCB4QOCB0QOiB0QOiA0EHogNABoQNCB4QOCB0QOiB0QOggdEDogNABoQNCB4QOCB0QOggdEDogdEDogNABoQNCB4QOQgeEDggdEDqwG0JPBgHtDj2FblUOstQ0McRoItDG0LNOZzyz8LG6qcYpJKsdWhl6VQ5/dOyzz/7r0JknBsO15V6MUe3QttDrUfm3FMKPF5/78tb0YwuD0fadiRgzsUObQo9ZFna2Nn/dO3zkF4vnzq93epNVvTPKjQZaFHoIIcQsC6ON2z+fOXri77MnTlbV8F7HaKBlod+31VTjzVh0Cq/boLWhx5hSmgh1nYK3bNDS0GOIIaXYjHfykJLUoZWhpxSyopjNe5OxGg58GgttDD01TVOPRn84+plnVg6dfWJ7uLbSMx5o3Rk9hKoc/mpi38yl0+e/vnbw1NnBcG1Z7NC20GOWhdGdjd9mnYnLHz//tdUDJ88OhrdXur6BhxaF/kDsv8k73e+d+crFWwdPfWJrvL3lvTq0KfQHN3sxNf2D459//nbe7TZNNfaADtoU+gexj+9uv1H0+jvF5HSd6tr9O7Qt9P/WHkMzHvuvOrQ6dEDogNABoQNCB4QOCB0QOggdEDogdEDogNABoQNCB4QOQgeEDggdEDogdEDogNABoQNCB6EDQgeEDggdEDogdEDogNBB6IDQAaEDQgeEDggdEDogdBA6IHRA6IDQAaEDQgeEDggdhG4EIHRA6IDQAaEDQgeEDggdEDoIHRA6IHRA6IDQAaEDQgeEDkIHhA4IHRA6IHRA6IDQAaGD0AGhA0IHhA4IHRA6IHRA6IDQQeiA0AGhA0IHhA4IHRA6IHQQOiB0QOiA0AGhA0IHhA4IHYQOCB0QOiB0QOiA0AGhA0IHhA5CB4QOCB0QOiB0QOiA0AGhg9ABoQNCB4QOCB0QOiB0QOggdEDogNABoQNCB4QOCB0QOiB0EDogdEDogNABoQNCB4QOCB2EDggdEDogdEDogNABoQNCB6EDQgeEDggdEDogdEDogNABoYPQAaEDQgeEDggdEDogdEDoIHRA6MBekuo6hpSEDm0UsyxV5TBPdRViXuwrjATaF/loY73XPzQ3WPj0F8rUNDdtdGhh5MXU1Oj0hW9s73/8zO+qwd0XH7rRY4whpRTH25sT43t3i7zbq4wSdq+qHBb9Q0funb5wcXv2+OJrw9Xlb4cYq+IRB/ki5vnU/sfP7tSj4TjrTDRGCbtTqussNfXOwpNPlTPHTvx+uLr8UoixCiGEh4Zej8om7/ZunfziV98IMTYhJdOE3Zt6iHkxk+r69eHayqV4P/IQQvjPANGr13lh76MVAAAAAElFTkSuQmCC"

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(17);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 17 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/openlayers/dist/ol.js
var ol = __webpack_require__(0);
var ol_default = /*#__PURE__*/__webpack_require__.n(ol);

// CONCATENATED MODULE: ./src/view/renderMap.js

/**
 * 创建地图对象
 * @param domId
 * @param opts
 * @returns {ol.Map}
 */
const getMap = (domId, opts) => {
    const params = {
        LAYERS: opts.tileLayer,
        tiled: true,
        SRS: 'EPSG:3857',
        TRANSPARENT: false
    };
    const rasterLayer = new ol_default.a.layer.Tile({
        visiable: true,
        source: new ol_default.a.source.TileWMS({
            url: opts.mapUrl,
            params: params,
            wrapX: false
        })
    });
    const OSMLayer = new ol_default.a.layer.Tile({
        source: new ol_default.a.source.OSM({wrapX: false})
    });
    const mapCenter = opts.mapCenter || [97.03125, 29.362721750200926];
    return new ol_default.a.Map({
        layers: [opts.useOSM ? OSMLayer : rasterLayer],
        target: domId,
        view: new ol_default.a.View({
            center: ol_default.a.proj.fromLonLat(mapCenter),
            zoom: opts.zoom || 3,
            minZoom: opts.minZoom || 3,
            maxZoom: opts.maxZoom || 20,
            extent: [-20037508.34, -20037508.34, 20037508.34, 20037508.34]
        }),
        controls: ol_default.a.control.defaults({
            attributionOptions: {
                collapsible: true
            },
            attribution: false
        })
    });
};
/* harmony default export */ var renderMap = (getMap);
// CONCATENATED MODULE: ./src/view/heatLayer.js

/**
 * 创建热力图图层
 * @param data
 * @returns {ol.layer.Heatmap}
 */
const getHeatLayer = (data) => {
    const gpsData = data.map(d => {
        const gps = (d.aggreCount > 1 || !d.gps) ? d.gpsPosition : d.gps;
        return typeof(gps) === 'string' ? JSON.parse(gps) : gps;
    }).filter(d => d[0] > -180 && d[0] < 180 && d[1] > -90 && d[1] < 90);
    const heatFeatures = [];
    for (let i = 0, len = data.length; i < len; i++) {
        heatFeatures.push(new ol_default.a.Feature({
            geometry: new ol_default.a.geom.Point(ol_default.a.proj.fromLonLat(gpsData[i])),
            name: 'heatPoint',
            weight: 0.1 + data[i].aggreCount / data[0].aggreCount * 0.9
        }));
    }

    const source = new ol_default.a.source.Vector({
        wrapX: false,
        features: heatFeatures
    });

    return new ol_default.a.layer.Heatmap({
        source: source,
        blur: 15,
        radius: 18
    });
};
/* harmony default export */ var heatLayer = (getHeatLayer);
// EXTERNAL MODULE: ./src/assets/images/juhe.png
var juhe = __webpack_require__(4);
var juhe_default = /*#__PURE__*/__webpack_require__.n(juhe);

// EXTERNAL MODULE: ./src/assets/images/cr.png
var cr = __webpack_require__(5);
var cr_default = /*#__PURE__*/__webpack_require__.n(cr);

// EXTERNAL MODULE: ./src/assets/images/lu.png
var lu = __webpack_require__(6);
var lu_default = /*#__PURE__*/__webpack_require__.n(lu);

// EXTERNAL MODULE: ./src/assets/images/sms.png
var sms = __webpack_require__(7);
var sms_default = /*#__PURE__*/__webpack_require__.n(sms);

// EXTERNAL MODULE: ./src/assets/images/cr-attention.png
var cr_attention = __webpack_require__(8);
var cr_attention_default = /*#__PURE__*/__webpack_require__.n(cr_attention);

// EXTERNAL MODULE: ./src/assets/images/lu-attention.png
var lu_attention = __webpack_require__(9);
var lu_attention_default = /*#__PURE__*/__webpack_require__.n(lu_attention);

// EXTERNAL MODULE: ./src/assets/images/sms-attention.png
var sms_attention = __webpack_require__(10);
var sms_attention_default = /*#__PURE__*/__webpack_require__.n(sms_attention);

// EXTERNAL MODULE: ./src/assets/images/circle.png
var circle = __webpack_require__(11);
var circle_default = /*#__PURE__*/__webpack_require__.n(circle);

// CONCATENATED MODULE: ./src/common/utils.js










/**
 * 公共方法
 */
const utils = {
    isBigScreen: false,
    styleFunction: (feature, isHover) => {
        const name = feature.get('name');
        switch (name) {
            case 'point':
                const count = feature.get('aggreCount'),
                    type = feature.get('type'),
                    type_ope = feature.get('type_ope');
                if (count > 1) {
                    return utils.setJuheIconStyle(count, isHover);
                } else {
                    return utils.setSingleIconStyle(type, type_ope, isHover);
                }
                break;
            case 'line':
                return utils.getLineStyle(feature.get('label'), isHover);
        }
    },
    /**
     * 聚合点样式
     * len 聚合个数
     * isHover
     */
    setJuheIconStyle: (len, isHover) => {
        return new ol_default.a.style.Style({
            image: new ol_default.a.style.Icon(({
                color: isHover ? '#3da6f5' : '#F54336',
                src: juhe_default.a,
                anchor: [0.5, 1]
            })),
            text: new ol_default.a.style.Text({
                text: len && len.toString(),
                fill: new ol_default.a.style.Fill({
                    color: '#fff'
                }),
                offsetY: -16,
                scale: 0.9
            })
        });
    },

    /**
     * 单点样式
     * type: cr听音 sms短信 lu位置
     * opType: unOperate未操作 operated已操作 attention预警  today 24小时
     * isHover
     */
    setSingleIconStyle: (type, opType, isHover) => {
        let src,
            color = '#f00',
            isAttention = opType === 'attention';
        if (isHover) {
            color = '#0096ff';
        } else if (opType === 'operated') {
            color = '#9fa2bd';
        } else if (opType === 'unOperate') {
            color = '#3db94c';
        } else if (opType === 'attention') {
            color = '#f00';
        }

        if (type === 'cr') {
            src = isAttention ? cr_attention_default.a : cr_default.a;
        } else if (type === 'lu') {
            src = isAttention ? lu_attention_default.a : lu_default.a;
        } else if (type === 'sms') {
            src = isAttention ? sms_attention_default.a : sms_default.a;
        }

        if (opType.indexOf('today') > -1 || !type || !opType) {
            return new ol_default.a.style.Style({
                image: new ol_default.a.style.Icon(({
                    color: color,
                    src: circle_default.a,
                    anchor: [0.5, 0.5]
                }))
            })
        } else {
            return new ol_default.a.style.Style({
                image: new ol_default.a.style.Icon(({
                    color: color,
                    src: src,
                    anchor: [0.5, 1]
                }))
            })
        }
    },

    /**
     * 区域样式
     * @param type
     * @param isHover
     */
    getAreaStyle: (type, isHover) => {
        const isBigscreen = type && type.toLowerCase() === 'bigscreen';
        return new ol_default.a.style.Style({
            stroke: new ol_default.a.style.Stroke({
                color: isBigscreen ? '#EF8F8F' : '#00B7EE',
                width: isBigscreen && !isHover ? 1 : 2,
                lineDash: isBigscreen ? [10, 10] : [0, 0]
            }),
            fill: new ol_default.a.style.Fill({
                color: isHover ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0)'
            })
        })
    },

    /**
     * 线样式
     * @param text
     * @param isHover
     */
    getLineStyle: (text, isHover) => {
        return new ol_default.a.style.Style({
            text: new ol_default.a.style.Text({
                text: text,
                font: '16px arial,sans-serif',
                padding: [10, 10, 10, 10],
                stroke: new ol_default.a.style.Stroke({   // 不加半透明stroke的话，点击文字背景不会选中
                    color: 'rgba(255,255,255,.1)',
                    width: 8
                }),
                fill: new ol_default.a.style.Fill({
                    color: isHover ? '#0096ff' : '#000'
                }),
                placement: 'line',
                textBaseline: 'bottom',
                offsetY: -2
            }),
            stroke: new ol_default.a.style.Stroke({
                color: isHover ? '#0096ff' : '#3db94c',
                width: 1
            })
        });
    },

    /**
     * arrow style
     * @param text
     * @param isHover
     */
    getArrowStyle: (isHover) => {
        return new ol_default.a.style.Style({
            stroke: new ol_default.a.style.Stroke({
                color: isHover ? '#0096ff' : '#3db94c',
                width: 2
            }),
            fill: new ol_default.a.style.Fill({
                color: isHover ? '#0096ff' : '#3db94c'
            })
        });
    },

    /**
     * 获取当前地图视口左上角和右下角的坐标
     * @param map
     */
    getViewGps: (map) => {
        let extent = map.getView().calculateExtent(map.getSize()),
            //上左的坐标
            getTopLeft = ol_default.a.proj.transform(ol_default.a.extent.getTopLeft(extent), 'EPSG:3857', 'EPSG:4326'),
            //下右的坐标
            getBottomRight = ol_default.a.proj.transform(ol_default.a.extent.getBottomRight(extent), 'EPSG:3857', 'EPSG:4326');
        return [getTopLeft, getBottomRight];
    },

    /**
     * 格式化区域的data
     * @param data
     */
    formatAreaData: (data) => {
        return data.map(item => {
            if (item.areaType === '2' || item.areaType === 2) {
                let center = item.center.split(',').map(str => parseFloat(str));
                center = ol_default.a.proj.fromLonLat(center);
                const location = {
                    center: center,
                    radius: item.radius * 1000
                };
                return Object.assign({}, item, {areaLocation: location});
            } else {
                const gpsList = item.areaLocation.split(',').map(str => parseFloat(str));
                const location = utils.getCoordinates(gpsList).map(d => ol_default.a.proj.fromLonLat(d));
                return Object.assign({}, item, {areaLocation: location});
            }
        })
    },

    /**
     * 将坐标集合格式从 number[] 转换为 [number, number][]
     * @param data  坐标集合  number[]
     * @returns {Array}
     */
    getCoordinates: (data) => {
        let coordinates = [];
        let len = data.length;
        // 矩形区域有时在项目中保存的只有左上角和右下角的坐标，兼容性考虑
        if (len === 4) {
            const [x1, y1, x2, y2] = data;
            coordinates = [[x1, y1], [x1, y2], [x2, y2], [x2, y1], [x1, y1]];
        } else {
            // 如果 data 中的坐标数据不是闭合的（终点不等于起点）, 将其闭合
            if (data[0] !== data[len - 2] || data[1] !== data[len - 1]) {
                data.push(data[0]);
                data.push(data[1]);
                len = data.length;
            }
            for (let i = 0; i < len / 2; i++) {
                coordinates[i] = [data[i * 2], data[i * 2 + 1]]
            }
        }

        return coordinates;
    },

    /**
     * coordinate转换为经纬度，经度可以大于180或小于-180 （toLonLat 会把不合法的经纬度换成合法的，画区超过地图边界时需要不合法坐标）
     * @param coordinate
     */
    toGps: (coordinate) => {
        let gps = ol_default.a.proj.toLonLat(coordinate);
        if (coordinate[0] > 20037508.342789244) {
            gps[0] = gps[0] + 360;
        } else if (coordinate[0] < -20037508.342789244) {
            gps[0] = gps[0] - 360;
        }
        return gps;
    },

    /**
     * 获取地图中心点坐标，经纬度坐标或者投影坐标
     * @param map
     * @param type 'coordinate' 或 不填
     * @returns {ol.Coordinate}
     */
    getCenter: (map, type) => {
        const center = map.getView().getCenter();
        if (type === 'coordinate') {
            return center;
        } else {
            return ol_default.a.proj.toLonLat(center);
        }
    },

    /**
     * 设置地图中心点
     * @param map
     * @param gps
     */
    setCenter: (map, gps) => {
        const center = ol_default.a.proj.fromLonLat([parseFloat(gps[0]), parseFloat(gps[1])]);
        map.getView().setCenter(center);
    },

    /**
     * 生成箭头
     * @param rPoint 参照节点的位置（用于确定箭头的方向）
     * @param endPoint 箭头的头的位置
     * @param arrowHeight 箭头的高度
     * @returns {ol.geom.Polygon}
     */
    getArrow: (rPoint, endPoint, arrowHeight) => {
        //箭头底和高的交点位置
        const mPoint = [];
        //头与交点的位移差
        let diffX, diffY;
        //头与参照点的位移差
        let rdiffX, rdiffY;

        rdiffX = endPoint[0] - rPoint[0];
        rdiffY = endPoint[1] - rPoint[1];
        //头与参照点的距离
        const rlength = Math.sqrt(rdiffX * rdiffX + rdiffY * rdiffY);
        //头与交点的位移差
        diffX = rdiffX * arrowHeight / rlength;
        diffY = rdiffY * arrowHeight / rlength;

        mPoint[0] = endPoint[0] - diffX;
        mPoint[1] = endPoint[1] - diffY;
        // 三角形箭头的底的一半长度
        const halfBottomLen = arrowHeight / 3;
        // 箭头的另外两个顶点
        const point1 = [],
            point2 = [];
        const _x = halfBottomLen * Math.abs(diffY / arrowHeight);
        const _y = halfBottomLen * Math.abs(diffX / arrowHeight);
        if (diffY === 0) {
            point1[0] = mPoint[0];
            point1[1] = mPoint[1] - halfBottomLen;

            point2[0] = mPoint[0];
            point2[1] = mPoint[1] + halfBottomLen;
        } else if (diffX === 0) {
            point1[0] = mPoint[0] - halfBottomLen;
            point1[1] = mPoint[1];

            point2[0] = mPoint[0] + halfBottomLen;
            point2[1] = mPoint[1];
        } else if (diffX > 0 && diffY > 0 || diffX < 0 && diffY < 0) {
            point1[0] = mPoint[0] + _x;
            point1[1] = mPoint[1] - _y;

            point2[0] = mPoint[0] - _x;
            point2[1] = mPoint[1] + _y;
        } else if (diffX < 0 && diffY > 0 || diffX > 0 && diffY < 0) {
            point1[0] = mPoint[0] - _x;
            point1[1] = mPoint[1] - _y;

            point2[0] = mPoint[0] + _x;
            point2[1] = mPoint[1] + _y;
        }
        return new ol_default.a.geom.Polygon([
            [endPoint, point1, point2, endPoint]
        ]);
    }
};
/* harmony default export */ var common_utils = (utils);
// CONCATENATED MODULE: ./src/view/areaLayer.js



/**
 * 创建 area 右上角的按钮 overlay
 * @param position  [[number,number],[number,number]]
 * @param index  string
 * @param showCancelBtn   boolean
 * @param showSearchBtn   boolean
 * @returns {ol.Overlay}
 */
const getBtnOverlay = (position, index, showCancelBtn, showSearchBtn) => {
    const div = document.createElement('div');
    div.innerHTML =
        `<span id="${index}" class="overlay-btn-ct">
            <span class="overlay-btn overlay-cancel ${!!showCancelBtn}"  data-id="${index}">X</span>
            <span class="overlay-btn overlay-search ${!!showSearchBtn}"  data-id="${index}">⊙</span>
        </span>`;
    document.body.appendChild(div);

    return new ol_default.a.Overlay({
        position: position,
        element: document.getElementById(index),
        autoPan: true,
        positioning: 'top-left',
        offset: [0, -3],
        stopEvent: false
    });
};

const getInfoOverlay = (pos, index, areaData, overlayType) => {
    let type = overlayType || '';
    type = type.toLowerCase() === 'bigscreen' ? 'bigscreen' : 'normal';
    const div = document.createElement('div');
    div.innerHTML =
        `<div id="${index}" class="ol-${type}-tooltip">
            <div style="margin-top: 10px">Title:  ${areaData.areaName}</div>
            <div style="margin-top: 10px">Description:  ${areaData.areaDetail}</div>
        </div>`;
    document.body.appendChild(div);

    return new ol_default.a.Overlay({
        position: pos,
        element: document.getElementById(index),
        autoPan: false,
        positioning: 'top-left',
        offset: [0, -3],
        stopEvent: false
    });
};

/**
 * 获取圆形layer
 * @param options
 * @param geometryData
 * @param index
 * @param areaData
 * @returns {ol.layer.Vector}
 */
const getCircleLayer = (options, geometryData, index, areaData) => {
    let dataOverlay;
    const feature = new ol_default.a.Feature({
        name: 'area',
        geometry: new ol_default.a.geom.Circle(geometryData.center, geometryData.radius)
    });
    const source = new ol_default.a.source.Vector({
        features: [feature],
        wrapX: false
    });
    const areaLayer = new ol_default.a.layer.Vector({
        id: index,
        source: source,
        style: function () {
            return common_utils.getAreaStyle(options.area.type);
        }
    });
    if (areaData) {
        dataOverlay = getInfoOverlay(geometryData.center, index, areaData, options.area.type);
        dataOverlay.setOffset([15, 15]);
        dataOverlay.targetFeature = feature;
    }
    areaLayer.dataOverlay = feature.dataOverlay = dataOverlay;
    return areaLayer;
};

/**
 * 获取多边形layer (包括矩形)
 * @param options
 * @param geometryData  顶点坐标的集合  number[]
 * @param index
 * @param areaData  可选
 * @returns {ol.layer.Vector}
 */
const getLinesLayer = (options, geometryData, index, areaData) => {
    let btnOverlay, dataOverlay;
    const topRight = geometryData[3] || geometryData[0];
    const areaOption = options.area;

    const geojsonObject = {
        'type': 'FeatureCollection',
        'crs': { 'type': 'name', 'properties': { 'name': 'EPSG:3857' } },
        'features': [{
            'type': 'Feature',
            'geometry': {
                'type': 'Polygon',
                'coordinates': [geometryData]
            }
        }]
    };
    const features = (new ol_default.a.format.GeoJSON()).readFeatures(geojsonObject);
    features.forEach(feature => feature.set('name', 'area'));
    const vectorSource = new ol_default.a.source.Vector({
        features: features,
        wrapX: false
    });

    // 若显示取消和搜索按钮，添加overlay
    if (areaOption.showCancelBtn || areaOption.showSearchBtn) {
        btnOverlay = getBtnOverlay(topRight, index, areaOption.showCancelBtn, areaOption.showSearchBtn);
    }
    // 若hover时显示详情框，添加overlay
    if (areaData) {
        dataOverlay = getInfoOverlay(topRight, index, areaData, areaOption.type);
        dataOverlay.setOffset([15, 15]);
        dataOverlay.targetFeature = features[0];
    }

    const areaLayer = new ol_default.a.layer.Vector({
        id: index,
        source: vectorSource,
        style: function () {
            return common_utils.getAreaStyle(areaOption.type);
        }
    });

    areaLayer.dataOverlay = features[0].dataOverlay = dataOverlay;
    areaLayer.btnOverlay = btnOverlay;
    return areaLayer;
};

/**
 * 创建选区图层
 * @param options
 * @param geometryData  图形数据
 * @param index    string
 * @param areaData object  可选(手动画区后的展示不传此项)
 * @returns {ol.layer.Vector}
 */
const getAreaLayer = (options, geometryData, index, areaData) => {
    let layer;
    // 圆形
    if (geometryData.radius) {
        layer = getCircleLayer(options, geometryData, index, areaData);
        layer.featureType = 'circle';
    } else {
        layer = getLinesLayer(options, geometryData, index, areaData);
        layer.featureType = 'polygon';
    }
    return layer;
};
/* harmony default export */ var view_areaLayer = (getAreaLayer);
// CONCATENATED MODULE: ./src/action/draw.js




let draw_areaLayer,
    drawNum = 0;

/**
 * 创建矩形 draw 时需要定义geometryFunction
 * @param coordinates
 * @param geometry
 * @returns {*}
 */
function geometryFunction(coordinates, geometry) {
    if (!geometry) {
        geometry = new ol_default.a.geom.Polygon(null);
    }
    let minX = Math.min(coordinates[0][0], coordinates[1][0]),
        maxX = Math.max(coordinates[0][0], coordinates[1][0]),
        minY = Math.min(coordinates[0][1], coordinates[1][1]),
        maxY = Math.max(coordinates[0][1], coordinates[1][1]);
    // 设置左上角为第一个点
    geometry.setCoordinates([
        [[minX, maxY], [minX, minY], [maxX, minY], [maxX, maxY], [minX, maxY]]
    ]);
    return geometry;
}

/**
 * 获取 draw 出的图形的顶点坐标集合
 * @param feature
 * @returns [] | {}
 */
function getGeomData(feature) {
    const geometry = feature.getGeometry();
    // 圆形
    if (geometry.getType() === 'Circle') {
        const center = geometry.getCenter(),
            radius = geometry.getRadius();
        return { center: center, radius: radius };
    } else {
        return geometry.getCoordinates()[0];
    }
}

/**
 * 创建 Draw 对象
 * @param type
 * @param options
 * @param map
 * @param eventsHandler
 * @returns {ol.interaction.Draw}
 */
const getDraw = (type, options, map, eventsHandler) => {
    const drawOption = options.draw;
    let draw;

    if (!drawOption.showMultiArea && draw_areaLayer) {
        map.removeLayer(draw_areaLayer);
        draw_areaLayer.btnOverlay && map.removeOverlay(draw_areaLayer.btnOverlay);
    }

    switch (type) {
    case 'circle':
        draw = new ol_default.a.interaction.Draw({ type: 'Circle' });
        break;
    case 'polygon':
        draw = new ol_default.a.interaction.Draw({ type: 'Polygon' });
        break;
    default:
        draw = new ol_default.a.interaction.Draw({
            type: ('LineString'),
            geometryFunction: geometryFunction,
            maxPoints: 2
        });
        break;
    }
    draw.type = type;

    draw.on('drawstart', () => {
        eventsHandler.ondrawstart();
    });
    draw.on('drawend', (ev) => {
        let emitData;         // ondrawend 事件的参数
        const geometryData = getGeomData(ev.feature);     // 图形的数据
        draw.isDrawing = false;
        map.removeInteraction(draw);

        if (type === 'box') {
            // 左上角和右下角坐标
            emitData = [common_utils.toGps(geometryData[0]), common_utils.toGps(geometryData[2])];
        } else if (type === 'circle') {
            // 中心点和半径（单位千米）
            emitData = {
                center: common_utils.toGps(geometryData.center),
                radius: geometryData.radius / 1000
            }
        } else {
            // 所有坐标
            emitData = geometryData.map(coordinate => common_utils.toGps(coordinate));
        }

        eventsHandler.ondrawend(emitData);

        // 框选完成后是否显示选框
        if (drawOption.showArea) {
            draw_areaLayer = view_areaLayer(options, geometryData, 'draw' + drawNum);
            draw_areaLayer.gpsData = emitData;
            map.addLayer(draw_areaLayer);
            if (draw_areaLayer.btnOverlay) {
                map.addOverlay(draw_areaLayer.btnOverlay);
            }
            drawNum++;
        }
    });
    return draw;
};
/* harmony default export */ var action_draw = (getDraw);
// CONCATENATED MODULE: ./src/view/pointLayer.js


/**
 * 点图层
 * @param options
 * @returns {ol.layer.Vector}
 */
const getPointLayer = (options) => {
    const pointFeatures = [];
    const data = options.data;
    const len = data.length;
    for (let i = 0; i < len; i++) {
        const item = data[i];
        let GPS = (item.aggreCount > 1 || !item.gps) ? item.gpsPosition : item.gps;
        GPS = typeof(GPS) === 'string' ? JSON.parse(GPS) : GPS;
        if (GPS[0] < -180 || GPS[0] > 180 || GPS[1] < -90 || GPS[1] > 90) {
            continue;
        }
        const feature = new ol_default.a.Feature({
            name: 'point',
            id: item.prop_crId || item.id, // 话单id
            aggreGPS: GPS, //原始的坐标
            aggreCount: item.aggreCount,
            type: item.prop_dataType,
            type_ope: item.type,
            pointGPS: ol_default.a.proj.fromLonLat(GPS),
            geometry: new ol_default.a.geom.Point(ol_default.a.proj.fromLonLat(GPS))
        });
        feature.setStyle(common_utils.styleFunction(feature));
        pointFeatures.push(feature);
    }

    const source = new ol_default.a.source.Vector({
        features: pointFeatures,
        wrapX: false
    });

    return new ol_default.a.layer.Vector({
        source: source,
        wrapX: false,
        zIndex: 9
    });
};

/* harmony default export */ var pointLayer = (getPointLayer);
// CONCATENATED MODULE: ./src/action/arc.js
/**
 * v0.1.0
 */



var D2R = Math.PI / 180;
var R2D = 180 / Math.PI;

var Coord = function (lon, lat) {
    this.lon = lon;
    this.lat = lat;
    this.x = D2R * lon;
    this.y = D2R * lat;
};

Coord.prototype.view = function () {
    return String(this.lon).slice(0, 4) + ',' + String(this.lat).slice(0, 4);
};

Coord.prototype.antipode = function () {
    var anti_lat = -1 * this.lat;
    var anti_lon = (this.lon < 0) ? 180 + this.lon : (180 - this.lon) * -1;
    return new Coord(anti_lon, anti_lat);
};

var LineString = function () {
    this.coords = [];
    this.length = 0;
};

LineString.prototype.move_to = function (coord) {
    this.length++;
    this.coords.push(coord);
};

var Arc = function (properties) {
    this.properties = properties || {};
    this.geometries = [];
};

Arc.prototype.json = function () {
    if (this.geometries.length <= 0) {
        return {
            'geometry': {'type': 'LineString', 'coordinates': null},
            'type': 'Feature', 'properties': this.properties
        };
    } else if (this.geometries.length == 1) {
        return {
            'geometry': {'type': 'LineString', 'coordinates': this.geometries[0].coords},
            'type': 'Feature', 'properties': this.properties
        };
    } else {
        var multiline = [];
        for (var i = 0; i < this.geometries.length; i++) {
            multiline.push(this.geometries[i].coords);
        }
        return {
            'geometry': {'type': 'MultiLineString', 'coordinates': multiline},
            'type': 'Feature', 'properties': this.properties
        };
    }
};

// TODO - output proper multilinestring
Arc.prototype.wkt = function () {
    var wkt_string = '';
    var wkt = 'LINESTRING(';
    var collect = function (c) {
        wkt += c[0] + ' ' + c[1] + ',';
    };
    for (var i = 0; i < this.geometries.length; i++) {
        if (this.geometries[i].coords.length === 0) {
            return 'LINESTRING(empty)';
        } else {
            var coords = this.geometries[i].coords;
            coords.forEach(collect);
            wkt_string += wkt.substring(0, wkt.length - 1) + ')';
        }
    }
    return wkt_string;
};

/*
 * http://en.wikipedia.org/wiki/Great-circle_distance
 *
 */
var GreatCircle = function (start, end, properties) {
    if (!start || start.x === undefined || start.y === undefined) {
        throw new Error("GreatCircle constructor expects two args: start and end objects with x and y properties");
    }
    if (!end || end.x === undefined || end.y === undefined) {
        throw new Error("GreatCircle constructor expects two args: start and end objects with x and y properties");
    }
    this.start = new Coord(start.x, start.y);
    this.end = new Coord(end.x, end.y);
    this.properties = properties || {};

    var w = this.start.x - this.end.x;
    var h = this.start.y - this.end.y;
    var z = Math.pow(Math.sin(h / 2.0), 2) +
        Math.cos(this.start.y) *
        Math.cos(this.end.y) *
        Math.pow(Math.sin(w / 2.0), 2);
    this.g = 2.0 * Math.asin(Math.sqrt(z));

    if (this.g == Math.PI) {
        throw new Error('it appears ' + start.view() + ' and ' + end.view() + " are 'antipodal', e.g diametrically opposite, thus there is no single route but rather infinite");
    } else if (isNaN(this.g)) {
        throw new Error('could not calculate great circle between ' + start + ' and ' + end);
    }
};

/*
 * http://williams.best.vwh.net/avform.htm#Intermediate
 */
GreatCircle.prototype.interpolate = function (f) {
    var A = Math.sin((1 - f) * this.g) / Math.sin(this.g);
    var B = Math.sin(f * this.g) / Math.sin(this.g);
    var x = A * Math.cos(this.start.y) * Math.cos(this.start.x) + B * Math.cos(this.end.y) * Math.cos(this.end.x);
    var y = A * Math.cos(this.start.y) * Math.sin(this.start.x) + B * Math.cos(this.end.y) * Math.sin(this.end.x);
    var z = A * Math.sin(this.start.y) + B * Math.sin(this.end.y);
    var lat = R2D * Math.atan2(z, Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)));
    var lon = R2D * Math.atan2(y, x);
    return [lon, lat];
};


/*
 * Generate points along the great circle
 */
GreatCircle.prototype.Arc = function (npoints, options) {
    var first_pass = [];
    if (!npoints || npoints <= 2) {
        first_pass.push([this.start.lon, this.start.lat]);
        first_pass.push([this.end.lon, this.end.lat]);
    } else {
        var delta = 1.0 / (npoints - 1);
        for (var i = 0; i < npoints; ++i) {
            var step = delta * i;
            var pair = this.interpolate(step);
            first_pass.push(pair);
        }
    }
    /* partial port of dateline handling from:
     gdal/ogr/ogrgeometryfactory.cpp

     TODO - does not handle all wrapping scenarios yet
     */
    var bHasBigDiff = false;
    var dfMaxSmallDiffLong = 0;
    // from http://www.gdal.org/ogr2ogr.html
    // -datelineoffset:
    // (starting with GDAL 1.10) offset from dateline in degrees (default long. = +/- 10deg, geometries within 170deg to -170deg will be splited)
    var dfDateLineOffset = options && options.offset ? options.offset : 10;
    var dfLeftBorderX = 180 - dfDateLineOffset;
    var dfRightBorderX = -180 + dfDateLineOffset;
    var dfDiffSpace = 360 - dfDateLineOffset;

    // https://github.com/OSGeo/gdal/blob/7bfb9c452a59aac958bff0c8386b891edf8154ca/gdal/ogr/ogrgeometryfactory.cpp#L2342
    for (var j = 1; j < first_pass.length; ++j) {
        var dfPrevX = first_pass[j - 1][0];
        var dfX = first_pass[j][0];
        var dfDiffLong = Math.abs(dfX - dfPrevX);
        if (dfDiffLong > dfDiffSpace &&
            ((dfX > dfLeftBorderX && dfPrevX < dfRightBorderX) || (dfPrevX > dfLeftBorderX && dfX < dfRightBorderX))) {
            bHasBigDiff = true;
        } else if (dfDiffLong > dfMaxSmallDiffLong) {
            dfMaxSmallDiffLong = dfDiffLong;
        }
    }

    var poMulti = [];
    if (bHasBigDiff && dfMaxSmallDiffLong < dfDateLineOffset) {
        var poNewLS = [];
        poMulti.push(poNewLS);
        for (var k = 0; k < first_pass.length; ++k) {
            var dfX0 = parseFloat(first_pass[k][0]);
            if (k > 0 && Math.abs(dfX0 - first_pass[k - 1][0]) > dfDiffSpace) {
                var dfX1 = parseFloat(first_pass[k - 1][0]);
                var dfY1 = parseFloat(first_pass[k - 1][1]);
                var dfX2 = parseFloat(first_pass[k][0]);
                var dfY2 = parseFloat(first_pass[k][1]);
                if (dfX1 > -180 && dfX1 < dfRightBorderX && dfX2 == 180 &&
                    k + 1 < first_pass.length &&
                    first_pass[k - 1][0] > -180 && first_pass[k - 1][0] < dfRightBorderX) {
                    poNewLS.push([-180, first_pass[k][1]]);
                    k++;
                    poNewLS.push([first_pass[k][0], first_pass[k][1]]);
                    continue;
                } else if (dfX1 > dfLeftBorderX && dfX1 < 180 && dfX2 == -180 &&
                    k + 1 < first_pass.length &&
                    first_pass[k - 1][0] > dfLeftBorderX && first_pass[k - 1][0] < 180) {
                    poNewLS.push([180, first_pass[k][1]]);
                    k++;
                    poNewLS.push([first_pass[k][0], first_pass[k][1]]);
                    continue;
                }

                if (dfX1 < dfRightBorderX && dfX2 > dfLeftBorderX) {
                    // swap dfX1, dfX2
                    var tmpX = dfX1;
                    dfX1 = dfX2;
                    dfX2 = tmpX;
                    // swap dfY1, dfY2
                    var tmpY = dfY1;
                    dfY1 = dfY2;
                    dfY2 = tmpY;
                }
                if (dfX1 > dfLeftBorderX && dfX2 < dfRightBorderX) {
                    dfX2 += 360;
                }

                if (dfX1 <= 180 && dfX2 >= 180 && dfX1 < dfX2) {
                    var dfRatio = (180 - dfX1) / (dfX2 - dfX1);
                    var dfY = dfRatio * dfY2 + (1 - dfRatio) * dfY1;
                    poNewLS.push([first_pass[k - 1][0] > dfLeftBorderX ? 180 : -180, dfY]);
                    poNewLS = [];
                    poNewLS.push([first_pass[k - 1][0] > dfLeftBorderX ? -180 : 180, dfY]);
                    poMulti.push(poNewLS);
                }
                else {
                    poNewLS = [];
                    poMulti.push(poNewLS);
                }
                poNewLS.push([dfX0, first_pass[k][1]]);
            } else {
                poNewLS.push([first_pass[k][0], first_pass[k][1]]);
            }
        }
    } else {
        // add normally
        var poNewLS0 = [];
        poMulti.push(poNewLS0);
        for (var l = 0; l < first_pass.length; ++l) {
            poNewLS0.push([first_pass[l][0], first_pass[l][1]]);
        }
    }

    var arc = new Arc(this.properties);
    for (var m = 0; m < poMulti.length; ++m) {
        var line = new LineString();
        arc.geometries.push(line);
        var points = poMulti[m];
        for (var j0 = 0; j0 < points.length; ++j0) {
            line.move_to(points[j0]);
        }
    }
    return arc;
};

var arc = {};
arc.Coord = Coord;
arc.Arc = Arc;
arc.GreatCircle = GreatCircle;

/* harmony default export */ var action_arc = (arc);
// CONCATENATED MODULE: ./src/action/trail.js




const TrailStatus = {
    START: 'start',
    STOPED: 'stoped'
};
const GLOBAL = {
    BACK_LIST: [],
    NUM: 1,         // 多个终端时，终端的index
    ZOOM: 3.0,
    MIN_TIME: 0,
    MAX_TIME: 0
};
let globalNum = 0,      // 轨迹的index
    timer = null,
    _timer = null,
    $THIS = null;

const TrailStatusParam = function () {
    let status = TrailStatus.START;
    this.getStatus = function () {
        return status;
    };
    this.setStatus = function (st) {
        status = st;
    };
    let time = null;
    this.getTime = function () {
        return time;
    };
    this.setTime = function (st) {
        time = st;
    };
};

const PlayTrail = function (opt_options) {
    const _options = opt_options;
    this.lineStyle = _options.lineStyle || new ol_default.a.style.Style({
        stroke: new ol_default.a.style.Stroke({
            color: '#0000FF',
            width: 2
        }),
        fill: new ol_default.a.style.Fill({
            color: '#0000FF'
        }),
    });
    this.markStyle = _options.markStyle || new ol_default.a.style.Style({
        image: new ol_default.a.style.Circle({
            radius: 7,
            snapToPixel: false,
            fill: new ol_default.a.style.Fill({
                color: 'red'
            }),
            stroke: new ol_default.a.style.Stroke({
                color: 'white',
                width: 2
            })
        })
    });
    this.duration = _options.duration;
    this.flag = _options.flag;
    this.pointsPerMs = 100.0 / this.duration;
    this.pointsFeatureStore = [];
    this.onPlayFinished = _options.onPlayFinished;
    this.lineFeatures = [];
    this.trailStatus = new TrailStatusParam();
    this.pointsFeatureStore = _options.pointFeatures || {};
    this.map = _options.map;
    this._animatePoint = null;
    $THIS = this;
};

/**
 * 轨迹渲染
 * @param event
 */
PlayTrail.prototype.animateTrail = function (event) {
    const vectorContext = event.vectorContext;
    const frameState = event.frameState;
    vectorContext.setStyle($THIS.lineStyle);

    const features = $THIS.lineFeatures;
    const zoom = $THIS.map.getView().getZoom();
    // 箭头的高度
    const unitDistance = 10000 * Math.pow(2, 5 - zoom);
    const arrowHeight = 5 * unitDistance;
    let lineLength = 0;

    //轨迹暂停的时候所有播放的轨迹都
    for (let i = 0; i < features.length; i++) {
        for (let j = 0; j < features[i].length; j++) {
            const feature = features[i][j];
            if ($THIS.trailStatus.getStatus() === TrailStatus.STOPED) {
                feature.set('start', feature.get('start') + (frameState.time - $THIS.trailStatus.getTime()));
            }
        }
        lineLength += features[i].length;
    }

    for (let j = 0; j < features.length; j++) {
        for (let i = 0; i < features[j].length; i++) {
            const feature = features[j][i];
            if (!feature.get('finished')) {
                if (!feature.get('started')) {
                    continue;
                }
                const coords = feature.getGeometry().getCoordinates();
                if ($THIS.trailStatus.getStatus() === TrailStatus.STOPED) {
                    $THIS.trailStatus.setTime(frameState.time);
                }

                const elapsedTime = frameState.time - feature.get('start');
                const elapsedPoints = elapsedTime * $THIS.pointsPerMs;

                const maxIndex = Math.min(elapsedPoints, coords.length);
                const currentLine = new ol_default.a.geom.LineString(coords.slice(0, maxIndex));
                vectorContext.drawGeometry(currentLine);

                // 画箭头
                const endIndex = Math.floor(Math.min(elapsedPoints, coords.length - 1));
                if (endIndex > 2) {
                    let mIndex = Math.max(0, endIndex - 1);
                    mIndex = Math.floor(mIndex);
                    if (endIndex > mIndex) {
                        const arrow = common_utils.getArrow(coords[mIndex], coords[endIndex], arrowHeight);
                        vectorContext.drawGeometry(arrow);
                    }
                }
                if (elapsedPoints >= coords.length) {
                    feature.set('finished', true);
                    globalNum++;
                    if (feature.secondLine) {
                        const nextLineFeature = feature.secondLine;
                        nextLineFeature.set('started', true);
                        nextLineFeature.set('start', new Date().getTime());
                    } else {
                        const targetPoint = feature.get('targetPoint');
                        targetPoint.trailStatus = TrailStatus.STOPED;
                        const nextLineFeature = targetPoint.get('line');
                        if (nextLineFeature) {
                            nextLineFeature.set('started', true);
                            nextLineFeature.set('start', new Date().getTime());
                            const nextPoint = nextLineFeature.get('targetPoint');
                            nextPoint.trailStatus = TrailStatus.START;
                            $THIS.animatePoint(nextPoint, $THIS.duration + 500);
                        } else {
                            // 轨迹播放结束
                            if (globalNum >= lineLength) {
                                // 轨迹播放结束
                                $THIS.onPlayFinished && $THIS.onPlayFinished({ pointCount: globalNum + 1 });
                                globalNum = 0;
                                clearInterval(timer);
                                timer = null;
                                $THIS.status = 'finished';
                                break;
                            }
                        }
                    }
                }
            } else {
                const coors = feature.getGeometry().getCoordinates();
                vectorContext.drawGeometry(new ol_default.a.geom.LineString(coors));
                // 画箭头
                const targetPoint = feature.get('targetPoint');
                // const radius = targetPoint.getStyle().getImage().getRadius();
                const radius = 7;
                const distance = radius * unitDistance / 2;
                const targetCoords = targetPoint.getGeometry().getCoordinates();
                const halfLen = coors.length / 2;
                let _index = coors.length - 1;
                let _line;
                for (_index = coors.length - 1; _index >= 0; --_index) {
                    _line = new ol_default.a.geom.LineString([coors[_index], targetCoords]);
                    if (distance < _line.getLength()) {
                        break;
                    }
                }
                if (_index < halfLen) {
                    _index = halfLen;
                }
                if (feature.secondLine) continue;
                // 画箭头
                if (distance < _line.getLength()) {
                    const rIdx = Math.max(0, _index - 1);
                    const ratio = distance / _line.getLength();
                    const arrowHead = [];
                    arrowHead[0] = targetCoords[0] - (targetCoords[0] - coors[rIdx][0]) * ratio;
                    arrowHead[1] = targetCoords[1] - (targetCoords[1] - coors[rIdx][1]) * ratio;
                    const arrow = common_utils.getArrow(coors[rIdx], arrowHead, arrowHeight);
                    vectorContext.drawGeometry(arrow);
                } else {
                    const arrowIdx = Math.max(0, _index);
                    const rIdx = Math.max(0, arrowIdx - 1);
                    if (arrowIdx > rIdx) {
                        const arrow = common_utils.getArrow(coors[rIdx], coors[arrowIdx],
                            arrowHeight);
                        vectorContext.drawGeometry(arrow);
                    }
                }
            }
        }
    }
    clearInterval(_timer);
    _timer = setTimeout(function () {
        $THIS.map.render();
    }, 20);
};

/**
 * 使点闪光
 * @param pointFeature 点
 * @param animateDuaration 单次时长
 */
PlayTrail.prototype.animatePoint = function (pointFeature, animateDuaration) {
    let start = new Date().getTime();
    let listenerKey;
    $THIS.map.un('postcompose', $THIS._animatePoint);
    $THIS._animatePoint = function (event) {
        if (pointFeature.trailStatus === TrailStatus.STOPED) {
            ol_default.a.Observable.unByKey(listenerKey);
            return;
        }
        const vectorContext = event.vectorContext;
        const frameState = event.frameState;
        const flashGeom = pointFeature.getGeometry().clone();
        flashGeom.A = ol_default.a.proj.transform(pointFeature.coordinates, 'EPSG:4326', 'EPSG:3857');
        const elapsed = frameState.time - start;
        const elapsedRatio = elapsed / animateDuaration;
        const radius = ol_default.a.easing.easeOut(elapsedRatio) * 25 + 3;
        const opacity = ol_default.a.easing.easeOut(1 - elapsedRatio);

        const style = new ol_default.a.style.Style({
            image: new ol_default.a.style.Circle({
                radius: radius,
                snapToPixel: false,
                stroke: new ol_default.a.style.Stroke({
                    color: 'rgba(255,0,0,' + opacity + ')',
                    width: 0.25 + opacity
                })
            })
        });
        vectorContext.setStyle(style);
        vectorContext.drawGeometry(flashGeom);
        if (elapsed > animateDuaration) {
            if ($THIS.trailStatus.getStatus() === TrailStatus.STOPED) {
                // 如果是暂停状态则继续动画
                start = new Date().getTime();
            }
        }
    };
    listenerKey = $THIS.map.on('postcompose', $THIS._animatePoint);
};

/**
 * 播放轨迹
 */
PlayTrail.prototype.doPlayTrail = function () {
    $THIS.status = 'started';
    const pointStore = $THIS.pointsFeatureStore;
    for (let k = 0; k < pointStore.length; k++) {
        if (pointStore[k].length < 2) {
            pointStore.splice(k, 1);
            k--;
        }
    }
    if (pointStore.length === 0) return;
    for (let k = 0; k < pointStore.length; k++) {
        // 初始点
        let startPoint = pointStore[k][0].coordinates,
            endPoint;
        if (pointStore[k].length > 1) {
            const _lines = [];
            for (let i = 1; i < pointStore[k].length; i++) {
                endPoint = pointStore[k][i].coordinates;
                const arcGenerator = new action_arc.GreatCircle(
                    {x: startPoint[0], y: startPoint[1]},
                    {x: endPoint[0], y: endPoint[1]}
                );
                // 把点往后移z
                startPoint = endPoint;

                const arcLine = arcGenerator.Arc(100, {
                    offset: 20
                });
                arcLine.geometries.forEach(function (geometry, _idx) {
                    const line = new ol_default.a.geom.LineString(geometry.coords);
                    line.transform(ol_default.a.proj.get('EPSG:4326'), ol_default.a.proj.get('EPSG:3857'));
                    const lineFeature = new ol_default.a.Feature({
                        geometry: line,
                        finished: false,
                        started: false,
                        targetPoint: pointStore[k][i]
                    });
                    if (_idx == 0) {
                        if ('move' == $THIS.flag) {
                            if (i == 1) {
                                lineFeature.set('start', new Date().getTime());
                                lineFeature.set('started', true);
                                pointStore[k][i].trailStatus = TrailStatus.START;
                                $THIS.animatePoint(pointStore[k][i],
                                    $THIS.duration);
                            }
                        } else {
                            if (i == 1 && k == 0) {
                                lineFeature.set('start', new Date().getTime());
                                lineFeature.set('started', true);
                                pointStore[k][i].trailStatus = TrailStatus.START;
                                $THIS.animatePoint(pointStore[k][i],
                                    $THIS.duration);
                            }
                        }
                        pointStore[k][i - 1].set('line', lineFeature);
                    } else if (_idx == 1) {
                        _lines[_lines.length - 1].secondLine = lineFeature;
                    }
                    _lines.push(lineFeature);
                });
            }
            $THIS.lineFeatures.push(_lines);
        }
    }
    $THIS.map.on('postcompose', $THIS.animateTrail);
    $THIS.map.render();

    // 多个轨迹时逐个播放
    GLOBAL.NUM = 1;
    if (timer === null) {
        timer = setInterval(function () {
            if (GLOBAL.NUM <= $THIS.lineFeatures.length - 1) {
                if (GLOBAL.NUM <= $THIS.lineFeatures.length - 1) {
                    if ($THIS.lineFeatures[GLOBAL.NUM].length > 0) {
                        const feature = $THIS.lineFeatures[GLOBAL.NUM][0];
                        feature.set('start', new Date().getTime());
                        feature.set('started', true);
                    }
                    GLOBAL.NUM += 1;
                }
            }
        }, 2000);
    }
};

/**
 * 清除播放轨迹
 */
PlayTrail.prototype.cleanTrailLines = function (num) {
    const pointLength = $THIS.pointsFeatureStore.length;
    $THIS.trailStatus.setStatus(TrailStatus.START);
    let length = 0;
    for (let i = pointLength - num; i < pointLength; i++) {
        $THIS.pointsFeatureStore[i].trailStatus = TrailStatus.STOPED;
        length += $THIS.pointsFeatureStore[i].length - 1;
    }
    $THIS.lineFeatures.splice(length, $THIS.lineFeatures.length);
    $THIS.map.un('postcompose', $THIS.animateTrail);
    $THIS.map.un('postcompose', $THIS._animatePoint);
    $THIS.status = null;
};

/**
 * 暂停播放
 */
PlayTrail.prototype.stopTrail = function () {
    clearInterval(timer);
    if ($THIS.trailStatus.getStatus() !== TrailStatus.STOPED) {
        $THIS.trailStatus.setStatus(TrailStatus.STOPED);
        $THIS.trailStatus.setTime(new Date().getTime());
    }
    $THIS.status = 'stopped';
};

/**
 * 继续播放
 */
PlayTrail.prototype.continueTrail = function () {
    $THIS.trailStatus.setStatus(TrailStatus.START);
    timer = setInterval(function () {
        if (GLOBAL.NUM <= $THIS.lineFeatures.length - 1) {
            if ($THIS.lineFeatures[GLOBAL.NUM].length > 0) {
                const feature = $THIS.lineFeatures[GLOBAL.NUM][0];
                feature.set('start', new Date().getTime());
                feature.set('started', true);
            }
            GLOBAL.NUM += 1;
        }
    }, 2000);
    $THIS.status = 'started';
};

/**
 * 回放
 */
PlayTrail.prototype.backTrail = function (time) {
    const backTime = GLOBAL.MAX_TIME - parseInt(time);
    for (let i = 0; i < $THIS.lineFeatures.length; i++) {
        if ($THIS.lineFeatures[i].T.start > backTime) {
            GLOBAL.BACK_LIST.push($THIS.lineFeatures[i]);
            $THIS.lineFeatures.splice(i, 1);
            i--;
        }
    }
    $THIS.trailStatus.setStatus(TrailStatus.STOPED);
    $THIS.trailStatus.setTime(new Date().getTime());
};

/**z
 * 回放
 */
PlayTrail.prototype.runTrail = function (time) {
    const backTime = GLOBAL.MIN_TIME - parseInt(time);
    for (let i = 0; i < GLOBAL.BACK_LIST.length; i++) {
        if (GLOBAL.BACK_LIST[i].T.start < backTime) {
            $THIS.lineFeatures.push(GLOBAL.BACK_LIST[i]);
        }
    }
    $THIS.trailStatus.setStatus(TrailStatus.STOPED);
    $THIS.trailStatus.setTime(new Date().getTime());
};

/**
 * 格式化后台数据
 * @param data 轨迹播放后台数据
 */
const formatData = (data) => {
    const terminalArr = [];
    const trailData = [];
    const format = new ol_default.a.format.GeoJSON();
    for (let i = 0, len = data.length; i < len; i++) {
        const terminalId = data[i].prop_terminalId;
        let terminalIndex = terminalArr.indexOf(terminalId);
        if (terminalIndex < 0) {
            terminalArr.push(terminalId);
            terminalIndex = terminalArr.length - 1;
            trailData[terminalIndex] = [];
        }
        let gps = data[i].gps;
        gps = typeof (gps) === 'string' ? JSON.parse(gps) : gps;
        const point = format.readFeature({
            coordinates: gps,
            type: 'Point'
        }, {
            featureProjection: 'EPSG:3857'
        });
        point.type = 'point';
        point.trailStatus = TrailStatus.STOPED;
        point.coordinates = gps;
        point.coordinate = ol_default.a.proj.fromLonLat(gps);

        trailData[terminalIndex].push(point);
    }
    return trailData;
};

/**
 * 创建 trail 对象
 * @param map
 * @param data
 * @param eventsHandler
 * @returns {PlayTrail}
 */
/* harmony default export */ var trail = ((map, data, eventsHandler) => {
    return new PlayTrail({
        pointFeatures: formatData(data),
        map: map,
        duration: 1000,
        flag: 'init',
        onPlayFinished: eventsHandler.ontrailend
    });
});

// CONCATENATED MODULE: ./src/view/pointModal.js


// 创建地图点弹框覆盖物
const getPointModal = (domId, options) => {
    const id = domId || 'popup';
    return new ol_default.a.Overlay({
        element: document.getElementById(id),
        autoPan: options.pointModal.autoPan,
        autoPanAnimation: {
            duration: 250
        },
        offset: [0, 0]
    });
};
/* harmony default export */ var view_pointModal = (getPointModal);
// CONCATENATED MODULE: ./node_modules/@turf/helpers/main.es.js
/**
 * Earth Radius used with the Harvesine formula and approximates using a spherical (non-ellipsoid) Earth.
 */
var earthRadius = 6371008.8;

/**
 * Unit of measurement factors using a spherical (non-ellipsoid) earth radius.
 */
var factors = {
    meters: earthRadius,
    metres: earthRadius,
    millimeters: earthRadius * 1000,
    millimetres: earthRadius * 1000,
    centimeters: earthRadius * 100,
    centimetres: earthRadius * 100,
    kilometers: earthRadius / 1000,
    kilometres: earthRadius / 1000,
    miles: earthRadius / 1609.344,
    nauticalmiles: earthRadius / 1852,
    inches: earthRadius * 39.370,
    yards: earthRadius / 1.0936,
    feet: earthRadius * 3.28084,
    radians: 1,
    degrees: earthRadius / 111325,
};

/**
 * Units of measurement factors based on 1 meter.
 */
var unitsFactors = {
    meters: 1,
    metres: 1,
    millimeters: 1000,
    millimetres: 1000,
    centimeters: 100,
    centimetres: 100,
    kilometers: 1 / 1000,
    kilometres: 1 / 1000,
    miles: 1 / 1609.344,
    nauticalmiles: 1 / 1852,
    inches: 39.370,
    yards: 1 / 1.0936,
    feet: 3.28084,
    radians: 1 / earthRadius,
    degrees: 1 / 111325,
};

/**
 * Area of measurement factors based on 1 square meter.
 */
var areaFactors = {
    meters: 1,
    metres: 1,
    millimeters: 1000000,
    millimetres: 1000000,
    centimeters: 10000,
    centimetres: 10000,
    kilometers: 0.000001,
    kilometres: 0.000001,
    acres: 0.000247105,
    miles: 3.86e-7,
    yards: 1.195990046,
    feet: 10.763910417,
    inches: 1550.003100006
};

/**
 * Wraps a GeoJSON {@link Geometry} in a GeoJSON {@link Feature}.
 *
 * @name feature
 * @param {Geometry} geometry input geometry
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature} a GeoJSON Feature
 * @example
 * var geometry = {
 *   "type": "Point",
 *   "coordinates": [110, 50]
 * };
 *
 * var feature = turf.feature(geometry);
 *
 * //=feature
 */
function main_es_feature(geometry, properties, options) {
    // Optional Parameters
    options = options || {};
    if (!isObject(options)) throw new Error('options is invalid');
    var bbox = options.bbox;
    var id = options.id;

    // Validation
    if (geometry === undefined) throw new Error('geometry is required');
    if (properties && properties.constructor !== Object) throw new Error('properties must be an Object');
    if (bbox) validateBBox(bbox);
    if (id) validateId(id);

    // Main
    var feat = {type: 'Feature'};
    if (id) feat.id = id;
    if (bbox) feat.bbox = bbox;
    feat.properties = properties || {};
    feat.geometry = geometry;
    return feat;
}

/**
 * Creates a GeoJSON {@link Geometry} from a Geometry string type & coordinates.
 * For GeometryCollection type use `helpers.geometryCollection`
 *
 * @name geometry
 * @param {string} type Geometry Type
 * @param {Array<number>} coordinates Coordinates
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Geometry
 * @returns {Geometry} a GeoJSON Geometry
 * @example
 * var type = 'Point';
 * var coordinates = [110, 50];
 *
 * var geometry = turf.geometry(type, coordinates);
 *
 * //=geometry
 */
function main_es_geometry(type, coordinates, options) {
    // Optional Parameters
    options = options || {};
    if (!isObject(options)) throw new Error('options is invalid');
    var bbox = options.bbox;

    // Validation
    if (!type) throw new Error('type is required');
    if (!coordinates) throw new Error('coordinates is required');
    if (!Array.isArray(coordinates)) throw new Error('coordinates must be an Array');
    if (bbox) validateBBox(bbox);

    // Main
    var geom;
    switch (type) {
    case 'Point': geom = main_es_point(coordinates).geometry; break;
    case 'LineString': geom = lineString(coordinates).geometry; break;
    case 'Polygon': geom = polygon(coordinates).geometry; break;
    case 'MultiPoint': geom = multiPoint(coordinates).geometry; break;
    case 'MultiLineString': geom = multiLineString(coordinates).geometry; break;
    case 'MultiPolygon': geom = multiPolygon(coordinates).geometry; break;
    default: throw new Error(type + ' is invalid');
    }
    if (bbox) geom.bbox = bbox;
    return geom;
}

/**
 * Creates a {@link Point} {@link Feature} from a Position.
 *
 * @name point
 * @param {Array<number>} coordinates longitude, latitude position (each in decimal degrees)
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<Point>} a Point feature
 * @example
 * var point = turf.point([-75.343, 39.984]);
 *
 * //=point
 */
function main_es_point(coordinates, properties, options) {
    if (!coordinates) throw new Error('coordinates is required');
    if (!Array.isArray(coordinates)) throw new Error('coordinates must be an Array');
    if (coordinates.length < 2) throw new Error('coordinates must be at least 2 numbers long');
    if (!isNumber(coordinates[0]) || !isNumber(coordinates[1])) throw new Error('coordinates must contain numbers');

    return main_es_feature({
        type: 'Point',
        coordinates: coordinates
    }, properties, options);
}

/**
 * Creates a {@link Point} {@link FeatureCollection} from an Array of Point coordinates.
 *
 * @name points
 * @param {Array<Array<number>>} coordinates an array of Points
 * @param {Object} [properties={}] Translate these properties to each Feature
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the FeatureCollection
 * @param {string|number} [options.id] Identifier associated with the FeatureCollection
 * @returns {FeatureCollection<Point>} Point Feature
 * @example
 * var points = turf.points([
 *   [-75, 39],
 *   [-80, 45],
 *   [-78, 50]
 * ]);
 *
 * //=points
 */
function points(coordinates, properties, options) {
    if (!coordinates) throw new Error('coordinates is required');
    if (!Array.isArray(coordinates)) throw new Error('coordinates must be an Array');

    return featureCollection(coordinates.map(function (coords) {
        return main_es_point(coords, properties);
    }), options);
}

/**
 * Creates a {@link Polygon} {@link Feature} from an Array of LinearRings.
 *
 * @name polygon
 * @param {Array<Array<Array<number>>>} coordinates an array of LinearRings
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<Polygon>} Polygon Feature
 * @example
 * var polygon = turf.polygon([[[-5, 52], [-4, 56], [-2, 51], [-7, 54], [-5, 52]]], { name: 'poly1' });
 *
 * //=polygon
 */
function polygon(coordinates, properties, options) {
    if (!coordinates) throw new Error('coordinates is required');

    for (var i = 0; i < coordinates.length; i++) {
        var ring = coordinates[i];
        if (ring.length < 4) {
            throw new Error('Each LinearRing of a Polygon must have 4 or more Positions.');
        }
        for (var j = 0; j < ring[ring.length - 1].length; j++) {
            // Check if first point of Polygon contains two numbers
            if (i === 0 && j === 0 && !isNumber(ring[0][0]) || !isNumber(ring[0][1])) throw new Error('coordinates must contain numbers');
            if (ring[ring.length - 1][j] !== ring[0][j]) {
                throw new Error('First and last Position are not equivalent.');
            }
        }
    }

    return main_es_feature({
        type: 'Polygon',
        coordinates: coordinates
    }, properties, options);
}

/**
 * Creates a {@link Polygon} {@link FeatureCollection} from an Array of Polygon coordinates.
 *
 * @name polygons
 * @param {Array<Array<Array<Array<number>>>>} coordinates an array of Polygon coordinates
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the FeatureCollection
 * @returns {FeatureCollection<Polygon>} Polygon FeatureCollection
 * @example
 * var polygons = turf.polygons([
 *   [[[-5, 52], [-4, 56], [-2, 51], [-7, 54], [-5, 52]]],
 *   [[[-15, 42], [-14, 46], [-12, 41], [-17, 44], [-15, 42]]],
 * ]);
 *
 * //=polygons
 */
function polygons(coordinates, properties, options) {
    if (!coordinates) throw new Error('coordinates is required');
    if (!Array.isArray(coordinates)) throw new Error('coordinates must be an Array');

    return featureCollection(coordinates.map(function (coords) {
        return polygon(coords, properties);
    }), options);
}

/**
 * Creates a {@link LineString} {@link Feature} from an Array of Positions.
 *
 * @name lineString
 * @param {Array<Array<number>>} coordinates an array of Positions
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<LineString>} LineString Feature
 * @example
 * var linestring1 = turf.lineString([[-24, 63], [-23, 60], [-25, 65], [-20, 69]], {name: 'line 1'});
 * var linestring2 = turf.lineString([[-14, 43], [-13, 40], [-15, 45], [-10, 49]], {name: 'line 2'});
 *
 * //=linestring1
 * //=linestring2
 */
function lineString(coordinates, properties, options) {
    if (!coordinates) throw new Error('coordinates is required');
    if (coordinates.length < 2) throw new Error('coordinates must be an array of two or more positions');
    // Check if first point of LineString contains two numbers
    if (!isNumber(coordinates[0][1]) || !isNumber(coordinates[0][1])) throw new Error('coordinates must contain numbers');

    return main_es_feature({
        type: 'LineString',
        coordinates: coordinates
    }, properties, options);
}

/**
 * Creates a {@link LineString} {@link FeatureCollection} from an Array of LineString coordinates.
 *
 * @name lineStrings
 * @param {Array<Array<number>>} coordinates an array of LinearRings
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the FeatureCollection
 * @param {string|number} [options.id] Identifier associated with the FeatureCollection
 * @returns {FeatureCollection<LineString>} LineString FeatureCollection
 * @example
 * var linestrings = turf.lineStrings([
 *   [[-24, 63], [-23, 60], [-25, 65], [-20, 69]],
 *   [[-14, 43], [-13, 40], [-15, 45], [-10, 49]]
 * ]);
 *
 * //=linestrings
 */
function lineStrings(coordinates, properties, options) {
    if (!coordinates) throw new Error('coordinates is required');
    if (!Array.isArray(coordinates)) throw new Error('coordinates must be an Array');

    return featureCollection(coordinates.map(function (coords) {
        return lineString(coords, properties);
    }), options);
}

/**
 * Takes one or more {@link Feature|Features} and creates a {@link FeatureCollection}.
 *
 * @name featureCollection
 * @param {Feature[]} features input features
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {FeatureCollection} FeatureCollection of Features
 * @example
 * var locationA = turf.point([-75.343, 39.984], {name: 'Location A'});
 * var locationB = turf.point([-75.833, 39.284], {name: 'Location B'});
 * var locationC = turf.point([-75.534, 39.123], {name: 'Location C'});
 *
 * var collection = turf.featureCollection([
 *   locationA,
 *   locationB,
 *   locationC
 * ]);
 *
 * //=collection
 */
function featureCollection(features, options) {
    // Optional Parameters
    options = options || {};
    if (!isObject(options)) throw new Error('options is invalid');
    var bbox = options.bbox;
    var id = options.id;

    // Validation
    if (!features) throw new Error('No features passed');
    if (!Array.isArray(features)) throw new Error('features must be an Array');
    if (bbox) validateBBox(bbox);
    if (id) validateId(id);

    // Main
    var fc = {type: 'FeatureCollection'};
    if (id) fc.id = id;
    if (bbox) fc.bbox = bbox;
    fc.features = features;
    return fc;
}

/**
 * Creates a {@link Feature<MultiLineString>} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name multiLineString
 * @param {Array<Array<Array<number>>>} coordinates an array of LineStrings
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<MultiLineString>} a MultiLineString feature
 * @throws {Error} if no coordinates are passed
 * @example
 * var multiLine = turf.multiLineString([[[0,0],[10,10]]]);
 *
 * //=multiLine
 */
function multiLineString(coordinates, properties, options) {
    if (!coordinates) throw new Error('coordinates is required');

    return main_es_feature({
        type: 'MultiLineString',
        coordinates: coordinates
    }, properties, options);
}

/**
 * Creates a {@link Feature<MultiPoint>} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name multiPoint
 * @param {Array<Array<number>>} coordinates an array of Positions
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<MultiPoint>} a MultiPoint feature
 * @throws {Error} if no coordinates are passed
 * @example
 * var multiPt = turf.multiPoint([[0,0],[10,10]]);
 *
 * //=multiPt
 */
function multiPoint(coordinates, properties, options) {
    if (!coordinates) throw new Error('coordinates is required');

    return main_es_feature({
        type: 'MultiPoint',
        coordinates: coordinates
    }, properties, options);
}

/**
 * Creates a {@link Feature<MultiPolygon>} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name multiPolygon
 * @param {Array<Array<Array<Array<number>>>>} coordinates an array of Polygons
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<MultiPolygon>} a multipolygon feature
 * @throws {Error} if no coordinates are passed
 * @example
 * var multiPoly = turf.multiPolygon([[[[0,0],[0,10],[10,10],[10,0],[0,0]]]]);
 *
 * //=multiPoly
 *
 */
function multiPolygon(coordinates, properties, options) {
    if (!coordinates) throw new Error('coordinates is required');

    return main_es_feature({
        type: 'MultiPolygon',
        coordinates: coordinates
    }, properties, options);
}

/**
 * Creates a {@link Feature<GeometryCollection>} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name geometryCollection
 * @param {Array<Geometry>} geometries an array of GeoJSON Geometries
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<GeometryCollection>} a GeoJSON GeometryCollection Feature
 * @example
 * var pt = {
 *     "type": "Point",
 *       "coordinates": [100, 0]
 *     };
 * var line = {
 *     "type": "LineString",
 *     "coordinates": [ [101, 0], [102, 1] ]
 *   };
 * var collection = turf.geometryCollection([pt, line]);
 *
 * //=collection
 */
function geometryCollection(geometries, properties, options) {
    if (!geometries) throw new Error('geometries is required');
    if (!Array.isArray(geometries)) throw new Error('geometries must be an Array');

    return main_es_feature({
        type: 'GeometryCollection',
        geometries: geometries
    }, properties, options);
}

/**
 * Round number to precision
 *
 * @param {number} num Number
 * @param {number} [precision=0] Precision
 * @returns {number} rounded number
 * @example
 * turf.round(120.4321)
 * //=120
 *
 * turf.round(120.4321, 2)
 * //=120.43
 */
function round(num, precision) {
    if (num === undefined || num === null || isNaN(num)) throw new Error('num is required');
    if (precision && !(precision >= 0)) throw new Error('precision must be a positive number');
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(num * multiplier) / multiplier;
}

/**
 * Convert a distance measurement (assuming a spherical Earth) from radians to a more friendly unit.
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
 *
 * @name radiansToLength
 * @param {number} radians in radians across the sphere
 * @param {string} [units='kilometers'] can be degrees, radians, miles, or kilometers inches, yards, metres, meters, kilometres, kilometers.
 * @returns {number} distance
 */
function radiansToLength(radians, units) {
    if (radians === undefined || radians === null) throw new Error('radians is required');

    if (units && typeof units !== 'string') throw new Error('units must be a string');
    var factor = factors[units || 'kilometers'];
    if (!factor) throw new Error(units + ' units is invalid');
    return radians * factor;
}

/**
 * Convert a distance measurement (assuming a spherical Earth) from a real-world unit into radians
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
 *
 * @name lengthToRadians
 * @param {number} distance in real units
 * @param {string} [units='kilometers'] can be degrees, radians, miles, or kilometers inches, yards, metres, meters, kilometres, kilometers.
 * @returns {number} radians
 */
function lengthToRadians(distance, units) {
    if (distance === undefined || distance === null) throw new Error('distance is required');

    if (units && typeof units !== 'string') throw new Error('units must be a string');
    var factor = factors[units || 'kilometers'];
    if (!factor) throw new Error(units + ' units is invalid');
    return distance / factor;
}

/**
 * Convert a distance measurement (assuming a spherical Earth) from a real-world unit into degrees
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, centimeters, kilometres, feet
 *
 * @name lengthToDegrees
 * @param {number} distance in real units
 * @param {string} [units='kilometers'] can be degrees, radians, miles, or kilometers inches, yards, metres, meters, kilometres, kilometers.
 * @returns {number} degrees
 */
function lengthToDegrees(distance, units) {
    return radiansToDegrees(lengthToRadians(distance, units));
}

/**
 * Converts any bearing angle from the north line direction (positive clockwise)
 * and returns an angle between 0-360 degrees (positive clockwise), 0 being the north line
 *
 * @name bearingToAzimuth
 * @param {number} bearing angle, between -180 and +180 degrees
 * @returns {number} angle between 0 and 360 degrees
 */
function bearingToAzimuth(bearing) {
    if (bearing === null || bearing === undefined) throw new Error('bearing is required');

    var angle = bearing % 360;
    if (angle < 0) angle += 360;
    return angle;
}

/**
 * Converts an angle in radians to degrees
 *
 * @name radiansToDegrees
 * @param {number} radians angle in radians
 * @returns {number} degrees between 0 and 360 degrees
 */
function radiansToDegrees(radians) {
    if (radians === null || radians === undefined) throw new Error('radians is required');

    var degrees = radians % (2 * Math.PI);
    return degrees * 180 / Math.PI;
}

/**
 * Converts an angle in degrees to radians
 *
 * @name degreesToRadians
 * @param {number} degrees angle between 0 and 360 degrees
 * @returns {number} angle in radians
 */
function degreesToRadians(degrees) {
    if (degrees === null || degrees === undefined) throw new Error('degrees is required');

    var radians = degrees % 360;
    return radians * Math.PI / 180;
}

/**
 * Converts a length to the requested unit.
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
 *
 * @param {number} length to be converted
 * @param {string} originalUnit of the length
 * @param {string} [finalUnit='kilometers'] returned unit
 * @returns {number} the converted length
 */
function convertLength(length, originalUnit, finalUnit) {
    if (length === null || length === undefined) throw new Error('length is required');
    if (!(length >= 0)) throw new Error('length must be a positive number');

    return radiansToLength(lengthToRadians(length, originalUnit), finalUnit || 'kilometers');
}

/**
 * Converts a area to the requested unit.
 * Valid units: kilometers, kilometres, meters, metres, centimetres, millimeters, acres, miles, yards, feet, inches
 * @param {number} area to be converted
 * @param {string} [originalUnit='meters'] of the distance
 * @param {string} [finalUnit='kilometers'] returned unit
 * @returns {number} the converted distance
 */
function convertArea(area, originalUnit, finalUnit) {
    if (area === null || area === undefined) throw new Error('area is required');
    if (!(area >= 0)) throw new Error('area must be a positive number');

    var startFactor = areaFactors[originalUnit || 'meters'];
    if (!startFactor) throw new Error('invalid original units');

    var finalFactor = areaFactors[finalUnit || 'kilometers'];
    if (!finalFactor) throw new Error('invalid final units');

    return (area / startFactor) * finalFactor;
}

/**
 * isNumber
 *
 * @param {*} num Number to validate
 * @returns {boolean} true/false
 * @example
 * turf.isNumber(123)
 * //=true
 * turf.isNumber('foo')
 * //=false
 */
function isNumber(num) {
    return !isNaN(num) && num !== null && !Array.isArray(num);
}

/**
 * isObject
 *
 * @param {*} input variable to validate
 * @returns {boolean} true/false
 * @example
 * turf.isObject({elevation: 10})
 * //=true
 * turf.isObject('foo')
 * //=false
 */
function isObject(input) {
    return (!!input) && (input.constructor === Object);
}

/**
 * Validate BBox
 *
 * @private
 * @param {Array<number>} bbox BBox to validate
 * @returns {void}
 * @throws Error if BBox is not valid
 * @example
 * validateBBox([-180, -40, 110, 50])
 * //=OK
 * validateBBox([-180, -40])
 * //=Error
 * validateBBox('Foo')
 * //=Error
 * validateBBox(5)
 * //=Error
 * validateBBox(null)
 * //=Error
 * validateBBox(undefined)
 * //=Error
 */
function validateBBox(bbox) {
    if (!bbox) throw new Error('bbox is required');
    if (!Array.isArray(bbox)) throw new Error('bbox must be an Array');
    if (bbox.length !== 4 && bbox.length !== 6) throw new Error('bbox must be an Array of 4 or 6 numbers');
    bbox.forEach(function (num) {
        if (!isNumber(num)) throw new Error('bbox must only contain numbers');
    });
}

/**
 * Validate Id
 *
 * @private
 * @param {string|number} id Id to validate
 * @returns {void}
 * @throws Error if Id is not valid
 * @example
 * validateId([-180, -40, 110, 50])
 * //=Error
 * validateId([-180, -40])
 * //=Error
 * validateId('Foo')
 * //=OK
 * validateId(5)
 * //=OK
 * validateId(null)
 * //=Error
 * validateId(undefined)
 * //=Error
 */
function validateId(id) {
    if (!id) throw new Error('id is required');
    if (['string', 'number'].indexOf(typeof id) === -1) throw new Error('id must be a number or a string');
}

// Deprecated methods
function radians2degrees() {
    throw new Error('method has been renamed to `radiansToDegrees`');
}

function degrees2radians() {
    throw new Error('method has been renamed to `degreesToRadians`');
}

function distanceToDegrees() {
    throw new Error('method has been renamed to `lengthToDegrees`');
}

function distanceToRadians() {
    throw new Error('method has been renamed to `lengthToRadians`');
}

function radiansToDistance() {
    throw new Error('method has been renamed to `radiansToLength`');
}

function bearingToAngle() {
    throw new Error('method has been renamed to `bearingToAzimuth`');
}

function convertDistance() {
    throw new Error('method has been renamed to `convertLength`');
}



// CONCATENATED MODULE: ./node_modules/@turf/invariant/main.es.js


/**
 * Unwrap a coordinate from a Point Feature, Geometry or a single coordinate.
 *
 * @name getCoord
 * @param {Array<number>|Geometry<Point>|Feature<Point>} obj Object
 * @returns {Array<number>} coordinates
 * @example
 * var pt = turf.point([10, 10]);
 *
 * var coord = turf.getCoord(pt);
 * //= [10, 10]
 */
function getCoord(obj) {
    if (!obj) throw new Error('obj is required');

    var coordinates = getCoords(obj);

    // getCoord() must contain at least two numbers (Point)
    if (coordinates.length > 1 && isNumber(coordinates[0]) && isNumber(coordinates[1])) {
        return coordinates;
    } else {
        throw new Error('Coordinate is not a valid Point');
    }
}

/**
 * Unwrap coordinates from a Feature, Geometry Object or an Array of numbers
 *
 * @name getCoords
 * @param {Array<number>|Geometry|Feature} obj Object
 * @returns {Array<number>} coordinates
 * @example
 * var poly = turf.polygon([[[119.32, -8.7], [119.55, -8.69], [119.51, -8.54], [119.32, -8.7]]]);
 *
 * var coord = turf.getCoords(poly);
 * //= [[[119.32, -8.7], [119.55, -8.69], [119.51, -8.54], [119.32, -8.7]]]
 */
function getCoords(obj) {
    if (!obj) throw new Error('obj is required');
    var coordinates;

    // Array of numbers
    if (obj.length) {
        coordinates = obj;

    // Geometry Object
    } else if (obj.coordinates) {
        coordinates = obj.coordinates;

    // Feature
    } else if (obj.geometry && obj.geometry.coordinates) {
        coordinates = obj.geometry.coordinates;
    }
    // Checks if coordinates contains a number
    if (coordinates) {
        containsNumber(coordinates);
        return coordinates;
    }
    throw new Error('No valid coordinates');
}

/**
 * Checks if coordinates contains a number
 *
 * @name containsNumber
 * @param {Array<any>} coordinates GeoJSON Coordinates
 * @returns {boolean} true if Array contains a number
 */
function containsNumber(coordinates) {
    if (coordinates.length > 1 && isNumber(coordinates[0]) && isNumber(coordinates[1])) {
        return true;
    }

    if (Array.isArray(coordinates[0]) && coordinates[0].length) {
        return containsNumber(coordinates[0]);
    }
    throw new Error('coordinates must only contain numbers');
}

/**
 * Enforce expectations about types of GeoJSON objects for Turf.
 *
 * @name geojsonType
 * @param {GeoJSON} value any GeoJSON object
 * @param {string} type expected GeoJSON type
 * @param {string} name name of calling function
 * @throws {Error} if value is not the expected type.
 */
function geojsonType(value, type, name) {
    if (!type || !name) throw new Error('type and name required');

    if (!value || value.type !== type) {
        throw new Error('Invalid input to ' + name + ': must be a ' + type + ', given ' + value.type);
    }
}

/**
 * Enforce expectations about types of {@link Feature} inputs for Turf.
 * Internally this uses {@link geojsonType} to judge geometry types.
 *
 * @name featureOf
 * @param {Feature} feature a feature with an expected geometry type
 * @param {string} type expected GeoJSON type
 * @param {string} name name of calling function
 * @throws {Error} error if value is not the expected type.
 */
function featureOf(feature, type, name) {
    if (!feature) throw new Error('No feature passed');
    if (!name) throw new Error('.featureOf() requires a name');
    if (!feature || feature.type !== 'Feature' || !feature.geometry) {
        throw new Error('Invalid input to ' + name + ', Feature with geometry required');
    }
    if (!feature.geometry || feature.geometry.type !== type) {
        throw new Error('Invalid input to ' + name + ': must be a ' + type + ', given ' + feature.geometry.type);
    }
}

/**
 * Enforce expectations about types of {@link FeatureCollection} inputs for Turf.
 * Internally this uses {@link geojsonType} to judge geometry types.
 *
 * @name collectionOf
 * @param {FeatureCollection} featureCollection a FeatureCollection for which features will be judged
 * @param {string} type expected GeoJSON type
 * @param {string} name name of calling function
 * @throws {Error} if value is not the expected type.
 */
function collectionOf(featureCollection, type, name) {
    if (!featureCollection) throw new Error('No featureCollection passed');
    if (!name) throw new Error('.collectionOf() requires a name');
    if (!featureCollection || featureCollection.type !== 'FeatureCollection') {
        throw new Error('Invalid input to ' + name + ', FeatureCollection required');
    }
    for (var i = 0; i < featureCollection.features.length; i++) {
        var feature = featureCollection.features[i];
        if (!feature || feature.type !== 'Feature' || !feature.geometry) {
            throw new Error('Invalid input to ' + name + ', Feature with geometry required');
        }
        if (!feature.geometry || feature.geometry.type !== type) {
            throw new Error('Invalid input to ' + name + ': must be a ' + type + ', given ' + feature.geometry.type);
        }
    }
}

/**
 * Get Geometry from Feature or Geometry Object
 *
 * @param {Feature|Geometry} geojson GeoJSON Feature or Geometry Object
 * @returns {Geometry|null} GeoJSON Geometry Object
 * @throws {Error} if geojson is not a Feature or Geometry Object
 * @example
 * var point = {
 *   "type": "Feature",
 *   "properties": {},
 *   "geometry": {
 *     "type": "Point",
 *     "coordinates": [110, 40]
 *   }
 * }
 * var geom = turf.getGeom(point)
 * //={"type": "Point", "coordinates": [110, 40]}
 */
function getGeom(geojson) {
    if (!geojson) throw new Error('geojson is required');
    if (geojson.geometry !== undefined) return geojson.geometry;
    if (geojson.coordinates || geojson.geometries) return geojson;
    throw new Error('geojson must be a valid Feature or Geometry Object');
}

/**
 * Get Geometry Type from Feature or Geometry Object
 *
 * @throws {Error} **DEPRECATED** in v5.0.0 in favor of getType
 */
function getGeomType() {
    throw new Error('invariant.getGeomType has been deprecated in v5.0 in favor of invariant.getType');
}

/**
 * Get GeoJSON object's type, Geometry type is prioritize.
 *
 * @param {GeoJSON} geojson GeoJSON object
 * @param {string} [name] name of the variable to display in error message
 * @returns {string} GeoJSON type
 * @example
 * var point = {
 *   "type": "Feature",
 *   "properties": {},
 *   "geometry": {
 *     "type": "Point",
 *     "coordinates": [110, 40]
 *   }
 * }
 * var geom = turf.getType(point)
 * //="Point"
 */
function getType(geojson, name) {
    if (!geojson) throw new Error((name || 'geojson') + ' is required');
    // GeoJSON Feature & GeometryCollection
    if (geojson.geometry && geojson.geometry.type) return geojson.geometry.type;
    // GeoJSON Geometry & FeatureCollection
    if (geojson.type) return geojson.type;
    throw new Error((name || 'geojson') + ' is invalid');
}



// CONCATENATED MODULE: ./node_modules/@turf/bezier-spline/main.es.js



/* eslint-disable */

 /**
   * BezierSpline
   * https://github.com/leszekr/bezier-spline-js
   *
   * @private
   * @copyright
   * Copyright (c) 2013 Leszek Rybicki
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */
var Spline = function (options) {
    this.points = options.points || [];
    this.duration = options.duration || 10000;
    this.sharpness = options.sharpness || 0.85;
    this.centers = [];
    this.controls = [];
    this.stepLength = options.stepLength || 60;
    this.length = this.points.length;
    this.delay = 0;
    // this is to ensure compatibility with the 2d version
    for (var i = 0; i < this.length; i++) this.points[i].z = this.points[i].z || 0;
    for (var i = 0; i < this.length - 1; i++) {
        var p1 = this.points[i];
        var p2 = this.points[i + 1];
        this.centers.push({
            x: (p1.x + p2.x) / 2,
            y: (p1.y + p2.y) / 2,
            z: (p1.z + p2.z) / 2
        });
    }
    this.controls.push([this.points[0], this.points[0]]);
    for (var i = 0; i < this.centers.length - 1; i++) {
        var p1 = this.centers[i];
        var p2 = this.centers[i + 1];
        var dx = this.points[i + 1].x - (this.centers[i].x + this.centers[i + 1].x) / 2;
        var dy = this.points[i + 1].y - (this.centers[i].y + this.centers[i + 1].y) / 2;
        var dz = this.points[i + 1].z - (this.centers[i].y + this.centers[i + 1].z) / 2;
        this.controls.push([{
            x: (1.0 - this.sharpness) * this.points[i + 1].x + this.sharpness * (this.centers[i].x + dx),
            y: (1.0 - this.sharpness) * this.points[i + 1].y + this.sharpness * (this.centers[i].y + dy),
            z: (1.0 - this.sharpness) * this.points[i + 1].z + this.sharpness * (this.centers[i].z + dz)},
            {
                x: (1.0 - this.sharpness) * this.points[i + 1].x + this.sharpness * (this.centers[i + 1].x + dx),
                y: (1.0 - this.sharpness) * this.points[i + 1].y + this.sharpness * (this.centers[i + 1].y + dy),
                z: (1.0 - this.sharpness) * this.points[i + 1].z + this.sharpness * (this.centers[i + 1].z + dz)}]);
    }
    this.controls.push([this.points[this.length - 1], this.points[this.length - 1]]);
    this.steps = this.cacheSteps(this.stepLength);
    return this;
};

  /*
    Caches an array of equidistant (more or less) points on the curve.
  */
Spline.prototype.cacheSteps = function (mindist) {
    var steps = [];
    var laststep = this.pos(0);
    steps.push(0);
    for (var t = 0; t < this.duration; t += 10) {
        var step = this.pos(t);
        var dist = Math.sqrt((step.x - laststep.x) * (step.x - laststep.x) + (step.y - laststep.y) * (step.y - laststep.y) + (step.z - laststep.z) * (step.z - laststep.z));
        if (dist > mindist) {
            steps.push(t);
            laststep = step;
        }
    }
    return steps;
};

  /*
    returns angle and speed in the given point in the curve
  */
Spline.prototype.vector = function (t) {
    var p1 = this.pos(t + 10);
    var p2 = this.pos(t - 10);
    return {
        angle:180 * Math.atan2(p1.y - p2.y, p1.x - p2.x) / 3.14,
        speed:Math.sqrt((p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y) + (p2.z - p1.z) * (p2.z - p1.z))
    };
};

  /*
    Gets the position of the point, given time.

    WARNING: The speed is not constant. The time it takes between control points is constant.

    For constant speed, use Spline.steps[i];
  */
Spline.prototype.pos = function (time) {

    function bezier(t, p1, c1, c2, p2) {
        var B = function (t) {
            var t2 = t * t, t3 = t2 * t;
            return [(t3), (3 * t2 * (1 - t)), (3 * t * (1 - t) * (1 - t)), ((1 - t) * (1 - t) * (1 - t))];
        };
        var b = B(t);
        var pos = {
            x : p2.x * b[0] + c2.x * b[1] + c1.x * b[2] + p1.x * b[3],
            y : p2.y * b[0] + c2.y * b[1] + c1.y * b[2] + p1.y * b[3],
            z : p2.z * b[0] + c2.z * b[1] + c1.z * b[2] + p1.z * b[3]
        };
        return pos;
    }
    var t = time - this.delay;
    if (t < 0) t = 0;
    if (t > this.duration) t = this.duration - 1;
    //t = t-this.delay;
    var t2 = (t) / this.duration;
    if (t2 >= 1) return this.points[this.length - 1];

    var n = Math.floor((this.points.length - 1) * t2);
    var t1 = (this.length - 1) * t2 - n;
    return bezier(t1, this.points[n], this.controls[n][1], this.controls[n + 1][0], this.points[n + 1]);
};

/**
 * Takes a {@link LineString|line} and returns a curved version
 * by applying a [Bezier spline](http://en.wikipedia.org/wiki/B%C3%A9zier_spline)
 * algorithm.
 *
 * The bezier spline implementation is by [Leszek Rybicki](http://leszek.rybicki.cc/).
 *
 * @name bezierSpline
 * @param {Feature<LineString>} line input LineString
 * @param {Object} [options={}] Optional parameters
 * @param {number} [options.resolution=10000] time in milliseconds between points
 * @param {number} [options.sharpness=0.85] a measure of how curvy the path should be between splines
 * @returns {Feature<LineString>} curved line
 * @example
 * var line = turf.lineString([
 *   [-76.091308, 18.427501],
 *   [-76.695556, 18.729501],
 *   [-76.552734, 19.40443],
 *   [-74.61914, 19.134789],
 *   [-73.652343, 20.07657],
 *   [-73.157958, 20.210656]
 * ]);
 *
 * var curved = turf.bezierSpline(line);
 *
 * //addToMap
 * var addToMap = [line, curved]
 * curved.properties = { stroke: '#0F0' };
 */
function bezier(line, options) {
    // Optional params
    options = options || {};
    if (!isObject(options)) throw new Error('options is invalid');
    var resolution = options.resolution || 10000;
    var sharpness = options.sharpness || 0.85;

    // validation
    if (!line) throw new Error('line is required');
    if (!isNumber(resolution)) throw new Error('resolution must be an number');
    if (!isNumber(sharpness)) throw new Error('sharpness must be an number');

    var coords = [];
    var spline = new Spline({
        points: getGeom(line).coordinates.map(function (pt) {
            return {x: pt[0], y: pt[1]};
        }),
        duration: resolution,
        sharpness: sharpness
    });

    for (var i = 0; i < spline.duration; i += 10) {
        var pos = spline.pos(i);
        if (Math.floor(i / 100) % 2 === 0) {
            coords.push([pos.x, pos.y]);
        }
    }

    return lineString(coords, line.properties);
}

/* harmony default export */ var main_es = (bezier);

// CONCATENATED MODULE: ./src/action/effectLine.js




class effectLine_EffectLine {
    constructor(map, option) {
        this.map = map;
        this.data = option.data;
        this.duration = 3000;           // 动画时间
        this.curveness = 0.1;           // 贝塞尔曲线的弯曲程度，0~1，值越大越弯曲
        this.startTime = 0;             // 动画开始的时间
        this.features = [];             // features集合
        this.layer = null;              // 线的图层
        this.animateFun = (ev) => this.animate(ev);    // 渲染的回调（用箭头函数确保animate中的this指向）
    }

    start() {
        this.getLinesAndLayer();
        this.startTime = new Date().getTime();
        this.map.on('postcompose', this.animateFun);
        this.map.render();
    }

    clear() {
        this.map.un('postcompose', this.animateFun);
        this.map.removeLayer(this.layer);
    }

    // 获取line features 和 layer
    getLinesAndLayer() {
        const data = this.data;
        for (let i = 0, l = data.length; i < l; i++) {
            const item = data[i];
            const coords = item.coords;
            const line = this.getBezierLine(ol_default.a.proj.fromLonLat(coords[0]), ol_default.a.proj.fromLonLat(coords[1]));

            const label = String(item.label);
            const feature = new ol_default.a.Feature({
                name: 'line',
                label: label,
                geometry: line,
                originData: item
            });
            const lineStyle = common_utils.getLineStyle(label);
            feature.setStyle(lineStyle);
            this.features.push(feature);
        }
        this.layer = new ol_default.a.layer.Vector({
            source: new ol_default.a.source.Vector({
                features: this.features,
                wrapX: false
            }),
            wrapX: false
        });
        this.map.addLayer(this.layer);
    }

    // 开始动画（箭头和闪光点）
    animate(event) {
        const vectorContext = event.vectorContext;
        const elapsed = event.frameState.time - this.startTime;
        const elapsedRatio = elapsed % this.duration / this.duration;

        // 开始画箭头
        const zoom = this.map.getView().getZoom();
        const unitDistance = 10000 * Math.pow(2, 5 - zoom);
        const arrowHeight = 5 * unitDistance;
        const features = this.features;
        for (let i = 0, l = features.length; i < l; i++) {
            const feature = features[i];
            const isActive = feature.get('isActive');
            const coords = feature.getGeometry().getCoordinates();
            const index = Math.floor((coords.length - 2) * elapsedRatio);
            const start = coords[index];
            const end = coords[index + 1];
            const arrow = common_utils.getArrow(start, end, arrowHeight);
            vectorContext.setStyle(common_utils.getArrowStyle(isActive));
            vectorContext.drawGeometry(arrow);
        }

        // 开始画闪光点
        // const radius = ol.easing.easeOut(elapsedRatio) * 25 + 3;
        // const opacity = ol.easing.easeOut(1 - elapsedRatio);
        // const cirCleStyle = new ol.style.Style({
        //     image: new ol.style.Circle({
        //         radius: radius,
        //         snapToPixel: false,
        //         stroke: new ol.style.Stroke({
        //             color: 'rgba(255,0,0,' + opacity + ')',
        //             width: 0.25 + opacity
        //         })
        //     })
        // });
        // vectorContext.setStyle(cirCleStyle);
        // for (let i = 0, l = features.length; i < l; i++) {
        //     const coords = feature.getGeometry().getCoordinates();
        //     const point = new ol.geom.Point(coords[coords.length - 1]);
        //     vectorContext.drawGeometry(point);
        // }

        // 触发地图重新渲染
        this.map.render();
    }

    // 根据起点和终点获取贝塞尔曲线
    getBezierLine(p1, p2) {
        const middle = [
            (p1[0] + p2[0]) / 2 - (p1[1] - p2[1]) * this.curveness,
            (p1[1] + p2[1]) / 2 - (p2[0] - p1[0]) * this.curveness
        ];
        const geoJson = {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "LineString",
                "coordinates": [p1, middle, p2]
            }
        };
        const curved = main_es(geoJson);
        return new ol_default.a.geom.LineString(curved["geometry"]["coordinates"]);
    }
}

/* harmony default export */ var effectLine = (effectLine_EffectLine);
// CONCATENATED MODULE: ./src/event/events.js



/**
 * 地图事件
 */
 class events_Events {
    constructor(map, options, eventsHandler) {
        this.map = map;
        this.options = options;
        this.eventsHandler = eventsHandler;
        this.lastClick = null;   // 上一次点击的点或线
        this.lastZoom = null;    // 缩放前的层级
        this.lastHover = null;   // 上一次hover的点或线
        this.areaOverlay = null; // ol select 事件
    }

    /**
     * 点击地图
     */
     clickEvent(ev) {
        this.areaBtnClick(ev);
        const feature = ev.map.forEachFeatureAtPixel(ev.pixel, point => point);
        if (!feature) {
            return;
        }
        const name = feature.get('name');
        // reset lastClick
        const lastP = this.lastClick;
        if (lastP && lastP !== feature) {
            if (name === 'point') {
                const opType = lastP.get('type_ope');
                const newOpType = (opType === 'attention' || opType === 'today') ? opType : 'operated';
                lastP.set('type_ope', newOpType);
            }
            lastP.set('isActive', false);
            lastP.setStyle(common_utils.styleFunction(lastP));
        }

        feature.set('isActive', true);
        switch (name) {
            case 'point':
            this.pointClick(feature);
            break;
            case 'area':
            break;
            case 'line':
            this.lineClick(feature);
            break;
        }
    }

    /**
     * 点击地图数据点事件
     */
     pointClick(feature) {
        // 如果点击的是上一次点击的同一个点，则不进行操作
        if (this.lastClick && feature === this.lastClick) {
            return;
        }
        const num = feature.get('aggreCount') || 1,
        type = feature.get('type'),
        type_ope = feature.get('type_ope');
        const style = num === 1 ? common_utils.setSingleIconStyle(type, type_ope, 'hover') : common_utils.setJuheIconStyle(num, 'hover');
        feature.setStyle(style);

        this.lastClick = feature;
        this.eventsHandler.onpointclick(feature);
    }

    /**
     * area 点击选区按钮事件
     */
     areaBtnClick(ev) {
        let target = ev.originalEvent.target;
        let classList = target.classList;
        if (classList.contains('overlay-btn')) {
            let id = target.parentNode.id;
            let layers = this.map.getLayers().a;
            let currentLayer = {};
            layers.some(layer => {
                if (layer.get('id') === id) {
                    currentLayer = layer;
                    return true;
                }
            });
            if (classList.contains('overlay-cancel')) {
                this.map.removeLayer(currentLayer);
                this.map.removeOverlay(currentLayer.btnOverlay);
                this.eventsHandler.onareacancel(currentLayer.gpsData);
            }
            if (classList.contains('overlay-search')) {
                this.eventsHandler.onareasearch(currentLayer.gpsData);
            }
        }
    }

    /**
     * 点击线事件
     */
     lineClick(feature) {
        const coords = feature.getGeometry().getCoordinates();
        const l = coords.length;
        const start = ol_default.a.proj.toLonLat(coords[0]);
        const middle = ol_default.a.proj.toLonLat(coords[Math.floor(l / 2)]);
        const end = ol_default.a.proj.toLonLat(coords[l - 1]);
        const data = {
            coords: [start, middle, end],
            feature: feature
        }
        this.lastClick = feature;
        this.eventsHandler.onlineclick(data);
    }

    /**
     * 移动鼠标时，选区的tooltip也跟随移动
     */
     moveEvent(ev) {
        if (this.areaOverlay) {
            this.areaOverlay.setPosition(ev.coordinate);
        }
    }

    /**
     * 关闭点弹框
     * @param pointModal 弹框对象
     */
     closePointModal(pointModal) {
        if (!pointModal) return;
        pointModal.setPosition(undefined);

        const lastP = this.lastClick;
        if (!lastP) return;

        if (lastP.get('name') === 'point') {
            const type_ope = lastP.get('type_ope');
            const new_type_poe = (type_ope === 'attention' || type_ope === 'today') ? type_ope : 'operated';
            lastP.set('type_ope', new_type_poe);
        }
        lastP.set('isActive', false);
        lastP.setStyle(common_utils.styleFunction(lastP));
        this.eventsHandler.onmodalclose(lastP);

        this.lastClick = null;
    }

    /**
     * 地图点悬浮事件
     */
     getSelectInteraction() {
        const selectInteraction = new ol_default.a.interaction.Select({
            wrapX: false,
            condition: ol_default.a.events.condition.pointerMove,
            filter: function (e) {
                const name = e.get('name');
                return name === 'point' || (name === 'area' && e.dataOverlay) || name === 'line';
            }
        });
        selectInteraction.on('select', (e) => {
            // 移入事件
            if (e.selected.length) {
                const selP = e.selected[0],
                name = selP.get('name'),
                dataOverlay = selP.dataOverlay;

                // reset lastHover
                if (this.lastHover && this.lastHover !== this.lastClick) {
                    this.lastHover.set('isActive', false);
                    this.lastHover.setStyle(common_utils.styleFunction(this.lastHover));
                }

                //移除上一个区域弹框, 解决overlay重叠时不触发移出事件的bug
                if (this.areaOverlay) {
                    this.areaOverlay.targetFeature.setStyle(common_utils.getAreaStyle(this.options.area.type));
                    this.map.removeOverlay(this.areaOverlay);
                }

                // 移入区域
                if (name === 'area' && dataOverlay) {
                    selP.setStyle(common_utils.getAreaStyle(this.options.area.type, true));
                    this.map.addOverlay(dataOverlay);
                    this.areaOverlay = dataOverlay;
                }

                // select point or line
                if (name === 'point' || name === 'line') {
                    selP.set('isActive', true);
                    selP.setStyle(common_utils.styleFunction(selP, true));
                    this.lastHover = selP;
                }

            } else if (e.deselected.length) {
                // 移出事件
                const deSelP = e.deselected[0],
                name = deSelP.get('name'),
                dataOverlay = deSelP.dataOverlay;

                // 移出区域
                if (name === 'area' && dataOverlay) {
                    deSelP.setStyle(common_utils.getAreaStyle(this.options.area.type));
                    this.map.removeOverlay(dataOverlay);
                    this.areaOverlay = null;
                }

                const isNotLastClick = !this.lastClick || deSelP !== this.lastClick;
                // reset point or line
                if (isNotLastClick && (name === 'point' || name === 'line') ) {
                    const count = deSelP.get('aggreCount');
                    deSelP.set('isActive', false);
                    deSelP.setStyle(common_utils.styleFunction(deSelP));
                }
                this.lastHover = null;
            }
        });
        return selectInteraction;
    }

    /**
     * 移动缩放事件
     */
     dragAndMove(e, pointModal) {
        if (e.frameState.animate) {
            return false;
        }
        const modalOption = this.options.pointModal;
        const curZoom = this.map.getView().getZoom();
        const lastZoom = this.lastZoom || this.options.zoom;
        // 当前是拖动还是缩放
        const type = lastZoom === curZoom ? 'move' : 'zoom';
        this.lastZoom = curZoom;

        // 自动关闭点详情弹框
        if (pointModal && modalOption) {
            if ((modalOption.autoClose === type) || (modalOption.autoClose === 'all')) {
                this.closePointModal(pointModal);
            }
        }
        this.eventsHandler.onmoveend({ type: type });
    }
}
// CONCATENATED MODULE: ./src/event/eventsHandler.js

class EventsHandler {
    constructor() {
    }
    ondrawstart(e) {
    }
    ondrawend(e) {
    }
    onareacancel(e) {
    }
    onareasearch(e) {
    }
    ontrailend(e) {
    }
    onmodalclose(e) {
    }
    onpointclick(e) {
    }
    onlineclick(e) {
    }
    onmoveend(e) {
    }
}
// EXTERNAL MODULE: ./src/assets/images/bubble.png
var images_bubble = __webpack_require__(2);
var bubble_default = /*#__PURE__*/__webpack_require__.n(images_bubble);

// EXTERNAL MODULE: ./src/assets/css/index.css
var css = __webpack_require__(12);

// CONCATENATED MODULE: ./src/index.js














class src_OlMap {
    constructor(domId) {
        this.domId = domId;
        this.eventsHandler = new EventsHandler();
        this.ol = ol_default.a;
        this.options = {
            useOSM: false,
            mapUrl: '',
            tileLayer: '',
            mapCenter: [97.03125, 29.362721750200926],
            zoom: 3,
            data: [],
            draw: {},
            pointModal: {
                autoClose: 'zoom'
            }
        };
        this.heatLayer = null;
        this.pointLayer = null;
        this.pointModal = null;
        this.trail = null;
        this.draw = null;
    }

    setOption(opts) {
        this.options = Object.assign(this.options, opts);
        if (!this.map) {
            this.map = renderMap(this.domId, this.options);
            this.events = new events_Events(this.map, this.options, this.eventsHandler);
            this.map.on('click', (ev) => this.events.clickEvent(ev));
            this.map.on('pointermove', (ev) => this.events.moveEvent(ev));
            this.map.on('moveend', (ev) => this.events.dragAndMove(ev, this.pointModal));
            this.map.addInteraction(this.events.getSelectInteraction());
        }
        this.trail && this.trail.cleanTrailLines();
        this.trail = null;
    }

    /**
     * 给组件绑定自定义事件
     * @param eventType  [事件名]
     * @param cb  [回调函数]
     */
    on(eventType, cb) {
        this.eventsHandler['on' + eventType] = cb;
    }

    /**
     * 移除所有feature
     */
    removeAllFeature() {
        this.map.removeLayer(this.heatLayer);
        this.map.removeLayer(this.pointLayer);
        this.trail && this.trail.cleanTrailLines();
        this.effectLine && this.effectLine.clear();
    }

    /**
     * 渲染热力图层
     */
    renderHeatLayer() {
        this.removeAllFeature();
        this.heatLayer = heatLayer(this.options.data);
        this.map.addLayer(this.heatLayer);
    }

    /**
     * 渲染点图层
     */
    renderPoint() {
        this.removeAllFeature();
        this.pointLayer = pointLayer(this.options);
        this.map.addLayer(this.pointLayer);
    }

    /**
     * 打开弹框
     * @param gps
     * @param domId
     */
    renderPointModal(gps, domId) {
        gps = [parseFloat(gps[0]), parseFloat(gps[1])];
        this.pointModal = this.pointModal || view_pointModal(domId, this.options);
        this.pointModal.setPosition(ol_default.a.proj.fromLonLat(gps));
        this.map.addOverlay(this.pointModal);
    }

    /**
     * 关闭弹框
     */
    closePointModal() {
        this.events.closePointModal(this.pointModal);
    }

    /**
     * 开始轨迹播放
     */
    startTrail() {
        if (this.trail) {
            this.trail.cleanTrailLines();
        }
        this.trail = this.trail || trail(this.map, this.options.data, this.eventsHandler);
        this.trail.doPlayTrail();
        if (this.heatLayer) {
            this.map.removeLayer(this.heatLayer);
            this.map.removeLayer(this.pointLayer);
            this.map.addLayer(this.pointLayer);
        }
    }

    /**
     * 暂停轨迹播放
     */
    stopTrail() {
        this.trail && this.trail.stopTrail();
    }

    /**
     * 继续轨迹播放
     */
    continueTrail() {
        this.trail && this.trail.continueTrail();
    }

    /**
     * 开始线动画播放（相当于是不停播放的单轨迹）
     */
    startEffectLine() {
        if (this.effectLine) {
            this.effectLine.clear();
        }
        this.effectLine = new effectLine(this.map ,this.options.effectLine);
        this.effectLine.start();
    }

    /**
     * 开始画区
     * @param type   box,circle,polygon
     */
    startDraw(type) {
        type = type || 'box';
        if (this.draw && this.draw.isDrawing) {
            this.map.removeInteraction(this.draw);
            if (this.draw.type === type) {
                this.draw.isDrawing = false;
                return;
            }
        }
        this.draw = action_draw(type, this.options, this.map, this.eventsHandler);
        this.map.addInteraction(this.draw);
        this.draw.isDrawing = true;
    }

    /**
     * 渲染选区，目前包括圆形，矩形和多边形
     */
    renderArea() {
        const data = common_utils.formatAreaData(this.options.area.data);
        this.removeAllArea();
        data.forEach((item, i) => {
            let areaLayer = view_areaLayer(this.options, item.areaLocation, 'area' + i, item);
            this.map.addLayer(areaLayer);
            areaLayer.btnOverlay && this.map.addOverlay(areaLayer.btnOverlay);
        });
    }

    /**
     * 移除所有选区
     */
    removeAllArea() {
        const layers = this.map.getLayers().a;
        const _layers = [...layers];
        for(let i = 0, l = _layers.length; i < l; i++) {
            let layer = _layers[i];
            if (layer.featureType === 'polygon' || layer.featureType === 'circle') {
                this.map.removeLayer(layer);
                layer.btnOverlay && this.map.removeOverlay(layer.btnOverlay);
                layer.dataOverlay && this.map.removeOverlay(layer.dataOverlay);
            }
        }
    }

    /**
     * 获取当前地图视口左上角和右下角的坐标
     * @returns {[number,number]}
     */
    getViewGps() {
        return common_utils.getViewGps(this.map);
    }

    /**
     * 设置地图中心点
     * @param gps
     */
    setCenter(gps) {
        return common_utils.setCenter(this.map, gps);
    }

    /**
     * 冒泡
     * @param data 冒泡数据
     */
    bubbleOverlay(data) {
        const bubble = [];
        let GPS, div;

        data.map((d, i) => {
            div = document.createElement('div');
            div.className = 'bubble';
            div.innerHTML =
                `<img src="${bubble_default.a}" class="big hiden"/>
                 <img src="${bubble_default.a}" class="small"/>`;
            document.body.appendChild(div);

            bubble[i] = new ol_default.a.Overlay({
                element: div,
                positioning: 'center-center',
                autoPanMargin: 400
            });
            this.map.addOverlay(bubble[i]);
            GPS = d.aggreCount > 1 ? d.gpsPosition : d.gps;
            GPS = typeof(GPS) === 'string' ? JSON.parse(GPS) : GPS;
            bubble[i].setPosition(ol_default.a.proj.fromLonLat(GPS));
        });

        // 3s之后移除冒泡效果
        setTimeout(() => {
            bubble.map((d) => {
                this.map.removeOverlay(d);
            });
        }, 3000);
    }
}
const olMap = {
    init: domId => new src_OlMap(domId)
}
window.olMap = olMap;
/* harmony default export */ var src_0 = __webpack_exports__["default"] = (olMap);


/***/ })
/******/ ]);