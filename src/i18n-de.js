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

Globalize.b376385760 = numberFormatterFn(["",,2,0,0,,,,,,"","00","-00","-","",numberRound(),"∞","NaN",{".":",",",":".","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.b380932430 = numberFormatterFn(["",,1,0,2,,,,3,,"","#,##0.###","-#,##0.###","-","",numberRound(),"∞","NaN",{".":",",",":".","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.a1625405296 = pluralGeneratorFn(function(n
) {
  var s = String(n).split('.'), v0 = !s[1];
  return (n == 1 && v0) ? 'one' : 'other';
});
Globalize.a978182133 = messageFormatterFn((function(  ) {
  return function(d) { return "Stundenzähler"; }
})(), Globalize("de").pluralGenerator({}));
Globalize.a243954023 = dateToPartsFormatterFn({"2":Globalize("de").numberFormatter({"raw":"00"})}, {"pattern":"dd.MM.yy, HH:mm","timeSeparator":":"});
Globalize.a995236400 = dateFormatterFn(Globalize("de").dateToPartsFormatter({"datetime":"short"}));

return Globalize;

}));
