//=============================================================================
// MPP_SimpleTouch3.js
//=============================================================================
// Copyright (c) 2018 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc 【ver.3.12】マウスやタッチ操作を変更します。
 * @author 木星ペンギン
 *
 * @help プラグインコマンド:
 *   CancelOff           # 次の[選択肢の表示]でキャンセルSEを鳴らさない
 * 
 * ================================
 *  本プラグインを導入した場合、以下のように機能が変更・追加されます
 * 
 * --------------------------------
 * ●カーソル移動
 *  プラグインパラメータ[Select Type Default]にて、
 *  [カーソル移動]方法を変更できます。
 *  この設定はゲーム内のオプションからでも変更可能です。
 *  
 *  ▽0 (タッチ)
 *   項目をタッチした時点でカーソル移動を行います。
 *   
 *  ▽1 (追従)
 *   常にマウスの位置にカーソルが移動します。
 *  
 * --------------------------------
 * ●決定操作
 *  プラグインパラメータ[Ok Type Default]にて、[決定操作]方法を変更できます。
 *  この設定はゲーム内のオプションからでも変更可能です。
 *  
 *  ▽0 (デフォルト)
 *   カーソルとタッチした項目が一致していれば【決定】、
 *   そうでなければ【カーソル移動】のみとなります。
 *  
 *   ツクールＭＶのデフォルト操作と似ていますが、
 *   【決定】は短くタッチした際に行われ、長押しでは何も行いません。
 *   
 *  ▽1 (シングル)
 *   項目を短くタッチすると【決定】を行います。
 *   長押しでは何も行いません。
 *  
 *  ▽2 (ダブル)
 *   同じ項目で短いタッチを二度行うと【決定】を行います。
 *   長押しでは何も行いません。
 * 
 * --------------------------------
 * ●スクロール
 *  ウィンドウをタッチしたまま上下にスライドすると、スクロールを行います。
 *  フリック操作でしばらく自動でスクロールを行います。
 *  
 *  プラグインパラメータ[Scroll Warp?]を有効にした場合、
 *  最初の項目が表示されている状態で下にスクロールすると最後の項目に、
 *  最後の項目が表示されている状態で上にスクロールすると最初の項目に移動します。
 * 
 * --------------------------------
 * ●キャンセル操作
 *  ▽プラグインパラメータ[Cancel Enabled?]により、
 *    右クリックや二本指タップによるウィンドウのキャンセルを
 *    無効にすることができます。
 *  
 *  ▽プラグインパラメータ[Outside Tap Default]により、
 *    ウィンドウの外側をタップした際に【キャンセル】を行う機能を追加できます。
 *    この設定はゲーム内のオプションからでも変更可能です。
 *  
 * --------------------------------
 * ●ページ切り替え
 *  画面をタッチした後、左右にスワイプすると【ページ切り替え】を行います。
 *  
 *  この操作は【外側タップ】の【キャンセル】操作より優先されているため、
 *  ウィンドウの外側でスワイプしても機能します。
 * 
 * --------------------------------
 * ●その他補足
 *  ステータス画面で画面をタッチすると【キャンセル】を行います。
 * 
 * ================================
 * 制作 : 木星ペンギン
 * URL : http://woodpenguin.blog.fc2.com/
 * 
 * @param Cancel Enabled?
 * @type boolean
 * @desc 右クリックまたは二本指タップによるキャンセルの有効/無効
 * @default true
 * 
 * @param Long Press Time
 * @type number
 * @desc 決定を取り消すまでの長押しの時間 (フレーム数)
 * @default 12
 * 
 * @param Double Tap Interval
 * @type number
 * @desc ダブルタップの間隔
 * @default 30
 * 
 * @param Cursor SE Always?
 * @type boolean
 * @desc タッチした際、常にカーソルSEを鳴らすかどうか
 * @default false
 * 
 * @param Scroll Warp?
 * @type boolean
 * @desc スクロールワープの有効/無効
 * @default false
 * 
 * @param Scroll Warp SE
 * @type struct<SE>
 * @desc スクロールワープ時のSE
 * @default {"Name":"","Volume":"90","Pitch":"100","Pan":"0"}
 *
 *
 * @param === Default ===
 * 
 * @param Select Type Default
 * @type number
 * @max 1
 * @desc [カーソル移動]のデフォルト値
 * (0:タッチ, 1:追従)
 * @default 1
 * @parent === Default ===
 * 
 * @param Ok Type Default
 * @type number
 * @max 0
 * @desc [決定操作]のデフォルト値
 * (0:デフォルト, 1:シングル, 2:ダブル)
 * @default 0
 * @parent === Default ===
 * 
 * @param Outside Tap Default
 * @type number
 * @max 1
 * @desc [外側タップ]のデフォルト値
 * (0:無効, 1:キャンセル)
 * @default 1
 * @parent === Default ===
 * 
 * 
 * @param === Option ===
 * 
 * @param Select Type Name
 * @desc オプション画面に表示する[カーソル移動]の名前
 * (空の場合は表示しない)
 * @default 
 * @parent === Option ===
 * 
 * @param Select Type Status
 * @type string[]
 * @desc オプション画面に表示する[カーソル移動]のステータス名
 * @default ["タッチ","追従"]
 * @parent === Option ===
 * 
 * @param Ok Type Name
 * @desc オプション画面に表示する[決定操作]の名前
 * (空の場合は表示しない)
 * @default 決定操作
 * @parent === Option ===
 * 
 * @param Ok Type Status _v3
 * @type string[]
 * @desc オプション画面に表示する[決定操作]のステータス名
 * (カンマで区切ってください)
 * @default ["デフォルト","シングル","ダブル"]
 * @parent === Option ===
 * 
 * @param Outside Tap Name
 * @desc オプション画面に表示する[外側タップ]の名前
 * (空の場合は表示しない)
 * @default 
 * @parent === Option ===
 * 
 * @param Outside Tap Status _v3
 * @type string[]
 * @desc オプション画面に表示する[外側タップ]のステータス名
 * (カンマで区切ってください)
 * @default ["無効","キャンセル"]
 * @parent === Option ===
 * 
 * @param === Command ===
 * 
 * @param Plugin Commands
 * @type struct<Plugin>
 * @desc プラグインコマンド名
 * @default {"CancelOff":"CancelOff"}
 * @parent === Command ===
 * 
 * 
 * 
 */

/*~struct~SE:
 * @param Name
 * @desc ファイル名
 * @default
 * @require 1
 * @dir audio/se
 * @type file
 *
 * @param Volume
 * @type number
 * @max 100
 * @desc 音量
 * @default 90
 *
 * @param Pitch
 * @type number
 * @min 50
 * @max 150
 * @desc ピッチ
 * @default 100
 *
 * @param Pan
 * @type number
 * @min -100
 * @max 100
 * @desc 位相
 * @default 0
 *
 */

/*~struct~Plugin:
 * @param CancelOff
 * @desc 次の[選択肢の表示]でキャンセルSEを鳴らさない
 * @default CancelOff
 *
 */

//=============================================================================
// Main
//=============================================================================

(function() {

var MPPlugin = {};

(function() {
    
    var parameters = PluginManager.parameters('MPP_SimpleTouch3');
    
    MPPlugin.CancelEnabled = !!eval(parameters['Cancel Enabled?']);
    MPPlugin.LongPressTime = Number(parameters['Long Press Time'] || 15);
    MPPlugin.DoubleTapInterval = Number(parameters['Double Tap Interval'] || 30);
    MPPlugin.CursorSeAlways = !!eval(parameters['Cursor SE Always?']);
    MPPlugin.ScrollWarp = !!eval(parameters['Scroll Warp?']);
    var param = JSON.parse(parameters['Scroll Warp SE']);
    MPPlugin.ScrollWarpSE = {
        name:param.Name || "",
        volume:Number(param.Volume || 90),
        pitch:Number(param.Pitch || 100),
        pan:Number(param.Pan || 0)
    };
    
    // === Default ===
    MPPlugin.SelectTypeDefault = Number(parameters['Select Type Default'] || 1);
    MPPlugin.OkTypeDefault = Number(parameters['Ok Type Default'] || 0);
    MPPlugin.OutsideTapDefault = Number(parameters['Outside Tap Default'] || 1);
    
    // === Option ===
    MPPlugin.SelectTypeName = parameters['Select Type Name'] || "";
    MPPlugin.SelectTypeStatus = JSON.parse(parameters['Select Type Status'] || "[]");
    MPPlugin.OkTypeName = parameters['Ok Type Name'] || '';
    MPPlugin.OkTypeStatus = JSON.parse(parameters['Ok Type Status _v3'] || "[]");
    MPPlugin.OutsideTapName = parameters['Outside Tap Name'] || '';
    MPPlugin.OutsideTapStatus = JSON.parse(parameters['Outside Tap Status _v3'] || "[]");
    
    // === Command ===
    MPPlugin.PluginCommands = JSON.parse(parameters['Plugin Commands']);
    
})();

var Alias = {};

//=============================================================================
// Option
//=============================================================================

//-----------------------------------------------------------------------------
// ConfigManager

ConfigManager.mppSelectType = MPPlugin.SelectTypeDefault;
ConfigManager.mppOkType = MPPlugin.OkTypeDefault;
ConfigManager.mppOutsideTap = MPPlugin.OutsideTapDefault;

ConfigManager.mppParams = ConfigManager.mppParams || [];
ConfigManager.mppParams.push({
    symbol:'mppSelectType',
    name:  MPPlugin.SelectTypeName,
    status:MPPlugin.SelectTypeStatus
},{
    symbol:'mppOkType',
    name:  MPPlugin.OkTypeName,
    status:MPPlugin.OkTypeStatus
},{
    symbol:'mppOutsideTap',
    name:  MPPlugin.OutsideTapName,
    status:MPPlugin.OutsideTapStatus
});

// ConfigManager.MppOption2
if (!ConfigManager.MppOption2) {

    //71
    Alias.CoMa_makeData = ConfigManager.makeData;
    ConfigManager.makeData = function() {
        var config = Alias.CoMa_makeData.call(this);
        var params = this.mppParams;
        for (var i = 0; i < params.length; i++) {
            var symbol = params[i].symbol;
            config[symbol] = this[symbol];
        }
        return config;
    };

    //82
    Alias.CoMa_applyData = ConfigManager.applyData;
    ConfigManager.applyData = function(config) {
        Alias.CoMa_applyData.call(this, config);
        var params = this.mppParams;
        for (var i = 0; i < params.length; i++) {
            var symbol = params[i].symbol;
            if (typeof config[symbol] === 'number')
                this[symbol] = config[symbol];
        }
    };

    //-----------------------------------------------------------------------------
    // Window_Options

    //31
    Alias.WiOp_makeCommandList = Window_Options.prototype.makeCommandList;
    Window_Options.prototype.makeCommandList = function() {
        var params = ConfigManager.mppParams;
        for (var i = 0; i < params.length; i++) {
            var param = params[i];
            if (param.name)
                this.addCommand(param.name, param.symbol);
        }
        Alias.WiOp_makeCommandList.call(this);
    };

    Window_Options.prototype.isMppSymbol2 = function(symbol) {
        return ConfigManager.mppParams.some(function(param) {
            return param.symbol === symbol;
        });
    };

    Window_Options.prototype.getMppStatus2 = function(symbol) {
        var params = ConfigManager.mppParams;
        for (var i = 0; i < params.length; i++) {
            if (params[i].symbol === symbol)
                return params[i].status;
        }
        return [];
    };

    //62
    Alias.WiOp_statusText = Window_Options.prototype.statusText;
    Window_Options.prototype.statusText = function(index) {
        var symbol = this.commandSymbol(index);
        if (this.isMppSymbol2(symbol)) {
            var status = this.getMppStatus2(symbol);
            var value = this.getConfigValue(symbol);
            return status[value];
        } else {
            return Alias.WiOp_statusText.call(this, index);
        }
    };

    //84
    Alias.WiOp_processOk = Window_Options.prototype.processOk;
    Window_Options.prototype.processOk = function() {
        var index = this.index();
        var symbol = this.commandSymbol(index);
        if (this.isMppSymbol2(symbol)) {
            var status = this.getMppStatus2(symbol);
            var value = this.getConfigValue(symbol);
            value++;
            if (value >= status.length) value = 0;
            value = value.clamp(0, status.length - 1);
            this.changeValue(symbol, value);
        } else {
            Alias.WiOp_processOk.call(this);
        }
    };

    //100
    Alias.WiOp_cursorRight = Window_Options.prototype.cursorRight;
    Window_Options.prototype.cursorRight = function(wrap) {
        var index = this.index();
        var symbol = this.commandSymbol(index);
        if (this.isMppSymbol2(symbol)) {
            var status = this.getMppStatus2(symbol);
            var value = this.getConfigValue(symbol);
            value++;
            value = value.clamp(0, status.length - 1);
            this.changeValue(symbol, value);
        } else {
            Alias.WiOp_cursorRight.call(this, wrap);
        }
    };

    //113
    Alias.WiOp_cursorLeft = Window_Options.prototype.cursorLeft;
    Window_Options.prototype.cursorLeft = function(wrap) {
        var index = this.index();
        var symbol = this.commandSymbol(index);
        if (this.isMppSymbol2(symbol)) {
            var status = this.getMppStatus2(symbol);
            var value = this.getConfigValue(symbol);
            value--;
            value = value.clamp(0, status.length - 1);
            this.changeValue(symbol, value);
        } else {
            Alias.WiOp_cursorLeft.call(this, wrap);
        }
    };

    ConfigManager.MppOption2 = true;
}

//=============================================================================
// Main
//=============================================================================

//-----------------------------------------------------------------------------
// Window

//6718
Window.prototype._refreshCursor = function() {
    var w = this._cursorRect.width;
    var h = this._cursorRect.height;
    var m = 4;
    var bitmap = new Bitmap(w, h);

    this._windowCursorSprite.bitmap = bitmap;

    if (w > 0 && h > 0 && this._windowskin) {
        var skin = this._windowskin;
        var p = 96;
        var q = 48;
        bitmap.blt(skin, p+m, p+m, q-m*2, q-m*2, m, m, w-m*2, h-m*2);
        bitmap.blt(skin, p+m, p+0, q-m*2, m, m, 0, w-m*2, m);
        bitmap.blt(skin, p+m, p+q-m, q-m*2, m, m, h-m, w-m*2, m);
        bitmap.blt(skin, p+0, p+m, m, q-m*2, 0, m, m, h-m*2);
        bitmap.blt(skin, p+q-m, p+m, m, q-m*2, w-m, m, m, h-m*2);
        bitmap.blt(skin, p+0, p+0, m, m, 0, 0, m, m);
        bitmap.blt(skin, p+q-m, p+0, m, m, w-m, 0, m, m);
        bitmap.blt(skin, p+0, p+q-m, m, m, 0, h-m, m, m);
        bitmap.blt(skin, p+q-m, p+q-m, m, m, w-m, h-m, m, m);
    }
    this._updateCursorPos();
};

//6804
Alias.Wi_updateCursor = Window.prototype._updateCursor;
Window.prototype._updateCursor = function() {
    Alias.Wi_updateCursor.call(this);
    this._updateCursorPos();
};

Window.prototype._updateCursorPos = function() {
    var pad = this._padding;
    var x = this._cursorRect.x + pad - this.origin.x;
    var y = this._cursorRect.y + pad - this.origin.y;
    var w = this._cursorRect.width;
    var h = this._cursorRect.height;
    var x2 = Math.max(x, pad);
    var y2 = Math.max(y, pad);
    var ox = x2 - x;
    var oy = y2 - y;
    var w2 = Math.min(w, this._width - pad - x2);
    var h2 = Math.min(h, this._height - pad - y2);
    
    this._windowCursorSprite.setFrame(ox, oy, w2, h2);
    this._windowCursorSprite.move(x2, y2);
};

//-----------------------------------------------------------------------------
// TouchInput

//3481
Alias.ToIn_clear = TouchInput.clear;
TouchInput.clear = function() {
    Alias.ToIn_clear.call(this);
    this.mppStartX = 0;
    this.mppStartY = 0;
    this._mppLeftSwipe = false;
    this._mppRightSwipe = false;
    this._mppOk = false;
    this._mppDoubleTap = false;
    this._mppInterval = -1;
};

//3509
Alias.ToIn_update = TouchInput.update;
TouchInput.update = function() {
    Alias.ToIn_update.call(this);
    if (this.isReleased()) {
        if (this._pressedTime >= 6) {
            var sx = (this._x - this.mppStartX) / this._pressedTime;
            this._mppLeftSwipe = sx < -6;
            this._mppRightSwipe = sx > 6;
        } else {
            this._mppLeftSwipe = false;
            this._mppRightSwipe = false;
        }
        if (!this._mppLeftSwipe && !this._mppRightSwipe &&
                this._pressedTime <= MPPlugin.LongPressTime) {
            this._mppOk = true;
            var i = this._mppInterval;
            this._mppDoubleTap = (i >= 0 && i < MPPlugin.DoubleTapInterval);
            this._mppInterval = 0;
        } else {
            this._mppOk = false;
            this._mppDoubleTap = false;
            this._mppInterval = -1;
        }
    } else {
        this._mppLeftSwipe = false;
        this._mppRightSwipe = false;
        this._mppOk = false;
        this._mppDoubleTap = false;
        if (this._mppInterval >= 0) this._mppInterval++;
    }
};

TouchInput.isMppLeftSwipe = function() {
    return this._mppLeftSwipe;
};

TouchInput.isMppRightSwipe = function() {
    return this._mppRightSwipe;
};

TouchInput.isMppOk = function() {
    return this._mppOk;
};

TouchInput.isMppDoubleTap = function() {
    return this._mppDoubleTap;
};

//3759
Alias.ToIn__onMouseMove = TouchInput._onMouseMove;
TouchInput._onMouseMove = function(event) {
    var lastMousePressed = this._mousePressed;
    this._mousePressed = (this._mousePressed || ConfigManager.mppSelectType === 1);
    Alias.ToIn__onMouseMove.apply(this, arguments);
    this._mousePressed = lastMousePressed;
};

//3885
Alias.ToIn__onTrigger = TouchInput._onTrigger;
TouchInput._onTrigger = function(x, y) {
    Alias.ToIn__onTrigger.apply(this, arguments);;
    this.mppStartX = x;
    this.mppStartY = y;
};

TouchInput.clearMppInterval = function() {
    this._mppInterval = -1;
};

//-----------------------------------------------------------------------------
// SoundManager

//37
Alias.SoMa_playCancel = SoundManager.playCancel;
SoundManager.playCancel = function() {
    if (!$gameMessage.cancelOff) Alias.SoMa_playCancel.call(this);
};

//-----------------------------------------------------------------------------
// Game_Message

//15
Alias.GaMe_clear = Game_Message.prototype.clear;
Game_Message.prototype.clear = function() {
    Alias.GaMe_clear.call(this);
    this.cancelOff = false;
};

//-----------------------------------------------------------------------------
// Game_Interpreter

//1739
Alias.GaIn_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    Alias.GaIn_pluginCommand.call(this, command, args);
    switch (command) {
        case MPPlugin.PluginCommands.CancelOff:
        case 'CancelOff':
            $gameMessage.cancelOff = true;
    }
};

//-----------------------------------------------------------------------------
// Window_Selectable

//13
Alias.WiSe_initialize = Window_Selectable.prototype.initialize;
Window_Selectable.prototype.initialize = function(x, y, width, height) {
    Alias.WiSe_initialize.call(this, x, y, width, height);
    this._originYSpeed = [];
};

//
if (Window_Selectable.prototype.hasOwnProperty('contentsHeight')) {
    Alias.WiSe_contentsHeight = Window_Selectable.prototype.contentsHeight;
}
Window_Selectable.prototype.contentsHeight = function() {
    if (Alias.WiSe_contentsHeight) {
        return Alias.WiSe_contentsHeight.call(this) + this.itemHeight();
    } else {
        return Window_Base.prototype.contentsHeight.call(this) + this.itemHeight();
    }
};

//119
Alias.WiSe_resetScroll = Window_Selectable.prototype.resetScroll;
Window_Selectable.prototype.resetScroll = function() {
    Alias.WiSe_resetScroll.call(this);
    this.resetOy();
};

Window_Selectable.prototype.resetOy = function() {
    this.origin.y = 0;
    this._originYSpeed = [];
};

Window_Selectable.prototype.gainOy = function(amount) {
    var oy = Math.floor(this.origin.y + amount);
    var sr = Math.floor(oy / this.itemHeight());
    var topRow = this.topRow();
    if (sr !== 0) this.setTopRow(topRow + sr);
    if ((topRow <= 0 && oy < 0) || 
            (this.topRow() >= this.maxTopRow() && oy > 0)) {
        this.resetOy();
        //this.setTopRow(this.topRow());
    } else {
        this.origin.y = oy.mod(this.itemHeight());
    }
};

//280
Alias.WiSe_updateArrows = Window_Selectable.prototype.updateArrows;
Window_Selectable.prototype.updateArrows = function() {
    Alias.WiSe_updateArrows.call(this);
    this.upArrowVisible = (this.upArrowVisible || this.origin.y > 0);
};

//340
Window_Selectable.prototype.processTouch = function() {
    if (this.isOpenAndActive()) {
        if (TouchInput.isTriggered()) {
            this._touching = true;
            this._selecting = true;
            this._touchLastY = TouchInput.y;
            this._touchInsided = this.isTouchedInsideFrame();
            this._touchWarpUp = false;
            this._touchWarpDown = false;
            if (MPPlugin.ScrollWarp && this._touchInsided &&
                    this.origin.y === 0 && this.maxRows() > this.maxPageRows()) {
                this._touchWarpUp = this.topRow() === 0;
                this._touchWarpDown = this.topRow() === this.maxTopRow();
            }
            this._originYSpeed = [];
        } else if (TouchInput.isCancelled()) {
            if (MPPlugin.CancelEnabled && this.isCancelEnabled()) {
                this.processCancel();
            }
        }
        if (this._touching) {
            if (TouchInput.isTriggered()) {
                this.onTouch(false);
            } else if (TouchInput.isPressed()) {
                if (this.touchScroll()) {
                    this._selecting = false;
                }
            } else {
                this.touchSwipe();
                if (this._selecting && TouchInput.isMppOk()) {
                    this.onTouch(true);
                } else {
                    TouchInput.clearMppInterval();
                }
                this._touching = false;
                this._selecting = false;
            }
        } else if (ConfigManager.mppSelectType === 1) {
            this.onTouch(false);
        }
        if (!this._touching && this._originYSpeed.length > 0) {
            this.addOriginYSpeed(this._originYSpeed[0] * 0.9);
            if (Math.abs(this.originYSpeed()) < 2) this._originYSpeed = [];
        }
        this.updateTouchScroll();
    } else {
        this._touching = false;
        this._selecting = false;
        this._touchInside = false;
        this._touchWarpUp = false;
        this._touchWarpDown = false;
    }
};

Window_Selectable.prototype.addOriginYSpeed = function(speed) {
    this._originYSpeed.push(speed);
    if (this._originYSpeed.length > 3) {
        this._originYSpeed.shift();
    }
};

Window_Selectable.prototype.originYSpeed = function() {
    if (this._touching) {
        return this._originYSpeed[this._originYSpeed.length - 1] || 0;
    }
    var speed = 0;
    for (var i = 0; i < this._originYSpeed.length; i++) {
        speed += this._originYSpeed[i];
    }
    return speed / (this._originYSpeed.length || 1);
};

Window_Selectable.prototype.touchScroll = function() {
    if (this._touchInsided) {
        this.addOriginYSpeed(this._touchLastY - TouchInput.y);
        this._touchLastY = TouchInput.y;
        return (Math.abs(TouchInput.y - TouchInput.mppStartY) > 16);
    }
    return false;
};

Window_Selectable.prototype.touchSwipe = function() {
    if (TouchInput.isMppLeftSwipe()) {
        if (this.isHandled('pageup')) this.processPageup();
    } else if (TouchInput.isMppRightSwipe()) {
        if (this.isHandled('pagedown')) this.processPagedown();
    }
};

Window_Selectable.prototype.updateTouchScroll = function() {
    if (this._touchWarpUp || this._touchWarpDown) {
        var height = this.itemHeight();
        if (TouchInput.mppStartY - TouchInput.y < -height) {
            if (this._touchWarpUp) {
                AudioManager.playStaticSe(MPPlugin.ScrollWarpSE);
                this.setTopRow(this.maxTopRow());
                this.origin.y = 0;
                this._touching = false;
                this._originYSpeed = [];
            }
            this._touchWarpUp = false;
            this._touchWarpDown = false;
        } else if (TouchInput.mppStartY - TouchInput.y > height) {
            if (this._touchWarpDown) {
                AudioManager.playStaticSe(MPPlugin.ScrollWarpSE);
                this.setTopRow(0);
                this.origin.y = 0;
                this._touching = false;
                this._originYSpeed = [];
            }
            this._touchWarpUp = false;
            this._touchWarpDown = false;
        }
    }
    if (this._touchInsided && this._originYSpeed.length > 0) {
        this.gainOy(this.originYSpeed());
    }
};

//368
Alias.WiSe_onTouch = Window_Selectable.prototype.onTouch;
Window_Selectable.prototype.onTouch = function(triggered) {
    if (triggered) {
        if (ConfigManager.mppOutsideTap === 1 &&
                !this._touchInsided && !this.isTouchedInsideFrame()) {
            if (this.isCancelEnabled())     this.processCancel();
        } else if (ConfigManager.mppOkType < 2 || TouchInput.isMppDoubleTap()) {
            TouchInput.clearMppInterval();
            this._stayCount = 0;
            Alias.WiSe_onTouch.call(this, triggered);
        }
    } else {
        var lastIndex = this.index();
        this._stayCount = 0;
        Alias.WiSe_onTouch.call(this, triggered);
        if (this.index() !== lastIndex) {
            TouchInput.clearMppInterval();
            if (ConfigManager.mppOkType === 0) {
                this._selecting = false;
            }
        } else if (MPPlugin.CursorSeAlways) {
            var x = this.canvasToLocalX(TouchInput.x);
            var y = this.canvasToLocalY(TouchInput.y);
            if (this.isContentsArea(x, y)) {
                SoundManager.playCursor();
            }
        }
    }
};

//393
Window_Selectable.prototype.hitTest = function(x, y) {
    if (this.isContentsArea(x, y)) {
        var cx = x - this.padding;
        var cy = y - this.padding + this.origin.y;
        var topIndex = this.topIndex();
        var maxPageItems = this.maxPageItems() + this.maxCols();
        for (var i = 0; i < maxPageItems; i++) {
            var index = topIndex + i;
            if (index < this.maxItems()) {
                var rect = this.itemRect(index);
                var right = rect.x + rect.width;
                var bottom = rect.y + rect.height;
                if (cx >= rect.x && cy >= rect.y && cx < right && cy < bottom) {
                    return index;
                }
            }
        }
    }
    return -1;
};

//494
Alias.WiSe_updateCursor = Window_Selectable.prototype.updateCursor;
Window_Selectable.prototype.updateCursor = function() {
    Alias.WiSe_updateCursor.call(this);
    if (this._cursorAll) this.resetOy();
};

//507
Window_Selectable.prototype.isCursorVisible = function() {
    var row = this.row();
    return row >= this.topRow() && row <= this.bottomRow() + 1;
};

//512
Alias.WiSe_ensureCursorVisible = Window_Selectable.prototype.ensureCursorVisible;
Window_Selectable.prototype.ensureCursorVisible = function() {
    var row = this.row();
    if (row <= this.topRow() || row > this.bottomRow()) this.resetOy();
    Alias.WiSe_ensureCursorVisible.call(this);
};

//541
Alias.WiSe_drawAllItems = Window_Selectable.prototype.drawAllItems;
Window_Selectable.prototype.drawAllItems = function() {
    Alias.WiSe_drawAllItems.call(this);
    var topIndex = this.topIndex() + this.maxPageItems();
    for (var i = 0; i < this.maxCols(); i++) {
        var index = topIndex + i;
        if (index < this.maxItems()) {
            this.drawItem(index);
        }
    }
};

//-----------------------------------------------------------------------------
// Window_ChoiceList

//99
Alias.WiChLi_contentsHeight = Window_ChoiceList.prototype.contentsHeight;
Window_ChoiceList.prototype.contentsHeight = function() {
    return Alias.WiChLi_contentsHeight.call(this) + this.itemHeight();
};

//
if (Window_ChoiceList.prototype.hasOwnProperty('processCancel')) {
    Alias.WiChLi_processCancel = Window_ChoiceList.prototype.processCancel;
}
Window_ChoiceList.prototype.processCancel = function() {
    SoundManager.cancelOff = $gameMessage.cancelOff;
    if (Alias.WiChLi_processCancel) {
        Alias.WiChLi_processCancel.call(this);
    } else {
        Window_Command.prototype.processCancel.call(this);
    }
    SoundManager.cancelOff = false;
};

//-----------------------------------------------------------------------------
// Window_Status

Window_Status.prototype.isTouchedInsideFrame = function() {
    return false;
};

//-----------------------------------------------------------------------------
// Window_ShopStatus

//48
Alias.WiShSt_changePage = Window_ShopStatus.prototype.changePage;
Window_ShopStatus.prototype.changePage = function() {
    Alias.WiShSt_changePage.call(this);
    Input.update();
    TouchInput.update();
};

})();

