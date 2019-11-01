(function( root, factory ) {

	// UMD returnExports
	if ( typeof define === "function" && define.amd ) {

		// AMD
		define( ["globalize-runtime/number","globalize-runtime/plural","globalize-runtime/message","globalize-runtime/date"], factory );
	} else if ( typeof exports === "object" ) {

		// Node, CommonJS
		module.exports = factory( require("globalize/dist/globalize-runtime/number"), require("globalize/dist/globalize-runtime/plural"), require("globalize/dist/globalize-runtime/message"), require("globalize/dist/globalize-runtime/date") );
	} else {

		// Global
		factory( root.Globalize );
	}
}( this, function( Globalize ) {

var validateParameterTypeNumber = Globalize._validateParameterTypeNumber;
var validateParameterPresence = Globalize._validateParameterPresence;
var numberRound = Globalize._numberRound;
var numberFormat = Globalize._numberFormat;
var numberFormatterFn = Globalize._numberFormatterFn;
var pluralGeneratorFn = Globalize._pluralGeneratorFn;
var validateParameterTypeMessageVariables = Globalize._validateParameterTypeMessageVariables;
var messageFormat = Globalize._messageFormat;
var messageFormatterFn = Globalize._messageFormatterFn;
var validateParameterTypeDate = Globalize._validateParameterTypeDate;
var dateToPartsFormat = Globalize._dateToPartsFormat;
var dateToPartsFormatterFn = Globalize._dateToPartsFormatterFn;
var dateFormat = Globalize._dateFormat;
var dateFormatterFn = Globalize._dateFormatterFn;

Globalize.a1119264306 = numberFormatterFn(["",,1,0,0,,,,,,"","0","-0","-","",numberRound(),"∞","epäluku",{".":",",",":" ","%":"%","+":"+","-":"−","E":"E","‰":"‰"},]);
Globalize.a337785826 = numberFormatterFn(["",,2,0,0,,,,,,"","00","-00","-","",numberRound(),"∞","epäluku",{".":",",",":" ","%":"%","+":"+","-":"−","E":"E","‰":"‰"},]);
Globalize.a365931952 = numberFormatterFn(["",,1,0,2,,,,3,,"","#,##0.###","-#,##0.###","-","",numberRound(),"∞","epäluku",{".":",",",":" ","%":"%","+":"+","-":"−","E":"E","‰":"‰"},]);
Globalize.a1686357682 = pluralGeneratorFn(function(n
) {
  var s = String(n).split('.'), v0 = !s[1];
  return (n == 1 && v0) ? 'one' : 'other';
});
Globalize.a1971051251 = messageFormatterFn((function(  ) {
  return function(d) { return "Tuntimittari"; }
})(), Globalize("fi").pluralGenerator({}));
Globalize.a794031145 = dateToPartsFormatterFn({"1":Globalize("fi").numberFormatter({"raw":"0"}),"2":Globalize("fi").numberFormatter({"raw":"00"})}, {"pattern":"d.M.y H.mm","timeSeparator":"."});
Globalize.a1545313522 = dateFormatterFn(Globalize("fi").dateToPartsFormatter({"datetime":"short"}));

return Globalize;

}));
