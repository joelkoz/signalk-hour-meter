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

Globalize.a1378886668 = numberFormatterFn(["",,1,0,0,,,,,,"","0","-0","-","",numberRound(),"∞","NaN",{".":".",",":",","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.b203855544 = numberFormatterFn(["",,2,0,0,,,,,,"","00","-00","-","",numberRound(),"∞","NaN",{".":".",",":",","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.a71712650 = numberFormatterFn(["",,1,0,2,,,,3,,"","#,##0.###","-#,##0.###","-","",numberRound(),"∞","NaN",{".":".",",":",","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.a1662346136 = pluralGeneratorFn(function(n
) {
  var s = String(n).split('.'), v0 = !s[1];
  return (n == 1 && v0) ? 'one' : 'other';
});
Globalize.b2064293683 = messageFormatterFn((function(  ) {
  return function(d) { return "Hour meter"; }
})(), Globalize("en").pluralGenerator({}));
Globalize.b1505074289 = dateToPartsFormatterFn({"1":Globalize("en").numberFormatter({"raw":"0"}),"2":Globalize("en").numberFormatter({"raw":"00"})}, {"pattern":"M/d/yy, h:mm a","timeSeparator":":","dayPeriods":{"am":"AM","pm":"PM"}});
Globalize.b753791912 = dateFormatterFn(Globalize("en").dateToPartsFormatter({"datetime":"short"}));

return Globalize;

}));
