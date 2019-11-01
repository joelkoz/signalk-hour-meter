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

Globalize.b1148906457 = numberFormatterFn(["",,1,0,0,,,,,,"","0","-0","-","",numberRound(),"∞","NaN",{".":",",",":".","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.b1256031091 = numberFormatterFn(["",,2,0,0,,,,,,"","00","-00","-","",numberRound(),"∞","NaN",{".":",",",":".","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.a128293285 = numberFormatterFn(["",,1,0,2,,,,3,,"","#,##0.###","-#,##0.###","-","",numberRound(),"∞","NaN",{".":",",",":".","%":"%","+":"+","-":"-","E":"E","‰":"‰"},]);
Globalize.a1666963741 = pluralGeneratorFn(function(n
) {
  return (n == 1) ? 'one' : 'other';
});
Globalize.b297119512 = messageFormatterFn((function(  ) {
  return function(d) { return "Contador de horas"; }
})(), Globalize("es").pluralGenerator({}));
Globalize.a423780820 = dateToPartsFormatterFn({"1":Globalize("es").numberFormatter({"raw":"0"}),"2":Globalize("es").numberFormatter({"raw":"00"})}, {"pattern":"d/M/yy H:mm","timeSeparator":":"});
Globalize.a1175063197 = dateFormatterFn(Globalize("es").dateToPartsFormatter({"datetime":"short"}));

return Globalize;

}));
