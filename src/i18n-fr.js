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

Globalize.a864203977 = numberFormatterFn(["",,1,0,0,,,,,,"","0","-0","-","",numberRound(),"∞","NaN",{".":",",",":" ","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.a1020850219 = numberFormatterFn(["",,2,0,0,,,,,,"","00","-00","-","",numberRound(),"∞","NaN",{".":",",",":" ","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.a467777095 = numberFormatterFn(["",,1,0,2,,,,3,,"","#,##0.###","-#,##0.###","-","",numberRound(),"∞","NaN",{".":",",",":" ","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.a1694669371 = pluralGeneratorFn(function(n
) {
  return (n >= 0 && n < 2) ? 'one' : 'other';
});
Globalize.a1715990922 = messageFormatterFn((function(  ) {
  return function(d) { return "Mètre d'heure"; }
})(), Globalize("fr").pluralGenerator({}));
Globalize.b887990414 = dateToPartsFormatterFn({"1":Globalize("fr").numberFormatter({"raw":"0"}),"2":Globalize("fr").numberFormatter({"raw":"00"})}, {"pattern":"dd/MM/y HH:mm","timeSeparator":":"});
Globalize.b136708037 = dateFormatterFn(Globalize("fr").dateToPartsFormatter({"datetime":"short"}));

return Globalize;

}));
