var fullname = fdxTag.FullName();

// Kolla om det är en analog ingång
if (fullname.StartsWith("AI.")) {
	var tagnopar = fullname.Substring(3).Replace('.','_').Replace('-','_');
	tagnopar += (tagnopar.EndsWith("_") ? "" : "_");
	
	// Lägg till huvudvärde
	var tag = new Moldeo.WebPortCommon.Tag(tagnopar + "PV", fullname + ".Value");
	tag.Datatype = Moldeo.WebPortCommon.DataType.REAL;
	try { tag.Unit = device.SubValueLookupDictionary[fullname + ".Unit"].GetValue(); } catch (err) {}
	try { tag.Description = device.SubValueLookupDictionary[fullname + ".Text"].GetValue(); } catch (err) {}
	tag.Format = "0.0";
	tags.Add(tag);

    // Lägg till eventuella inställningar
    for (i = 0; i <= 7; i++) {
		try
		{
			var tagsp = new Moldeo.WebPortCommon.Tag(tagnopar + "SP" + (i+1), fullname + ".Limit" + i + ".Value");
			tagsp.Datatype = Moldeo.WebPortCommon.DataType.REAL;
			tagsp.Unit = tag.Unit;
			try { tagsp.Description = device.SubValueLookupDictionary[fullname + ".Limit" + i + ".Text"].GetValue(); } catch (err) {}
			tagsp.Format = "0.0";
			if (tagsp.Description.Length > 0) {
				tags.Add(tagsp);
			}
		} catch (err) {}
    }
}
// Kolla om det är en analog utgång
if (fullname.StartsWith("AO.")) {
	var tagnopar = fullname.Substring(3).Replace('.','_').Replace('-','_');
	tagnopar += (tagnopar.EndsWith("_") ? "" : "_");

	// Lägg till huvudvärde
	var tag = new Moldeo.WebPortCommon.Tag(tagnopar + "OP", fullname + ".ValueAuto");
	tag.Datatype = Moldeo.WebPortCommon.DataType.REAL;
	try { tag.Unit = device.SubValueLookupDictionary[fullname + ".Unit"].GetValue(); } catch (err) {}
	try { tag.Description = device.SubValueLookupDictionary[fullname + ".Text"].GetValue(); } catch (err) {}
	tag.Format = "0";
	tags.Add(tag);

    // Lägg till manuell ut
	var tagopm = new Moldeo.WebPortCommon.Tag(tagnopar + "OPM", fullname + ".Value");
	tagopm.Datatype = Moldeo.WebPortCommon.DataType.REAL;
	tagopm.Unit = tag.Unit;
	tagopm.Description = "Värde handstyrning";
	tagopm.Format = "0";
	tags.Add(tagopm);

    // Lägg till handkörning
	var tagm = new Moldeo.WebPortCommon.Tag(tagnopar + "M", fullname + ".LockState");
	tagm.Datatype = Moldeo.WebPortCommon.DataType.INT;
	tagm.Description = "0 = Auto (fysisk), 1 = Auto (program), 2 = Hand";
	tagm.Format = "0";
	tags.Add(tagm);
}
// Kolla om det är en digital utgång
if (fullname.StartsWith("DO.")) {
	var tagnopar = fullname.Substring(3).Replace('.','_').Replace('-','_');
	tagnopar += (tagnopar.EndsWith("_") ? "" : "_");

	// Lägg till huvudvärde
	var tag = new Moldeo.WebPortCommon.Tag(tagnopar + "CMD", fullname + ".ValueAuto");
	tag.Datatype = Moldeo.WebPortCommon.DataType.INT;
	try { tag.Description = device.SubValueLookupDictionary[fullname + ".Text"].GetValue(); } catch (err) {}
	tag.Format = "0";
	tags.Add(tag);

    // Lägg till manuell ut
	var tagmcmd = new Moldeo.WebPortCommon.Tag(tagnopar + "MCMD", fullname + ".Value");
	tagmcmd.Datatype = Moldeo.WebPortCommon.DataType.INT;
	tagmcmd.Description = "Värde handstyrning";
	tagmcmd.Format = "0";
	tags.Add(tagmcmd);

    // Lägg till handkörning
	var tagm = new Moldeo.WebPortCommon.Tag(tagnopar + "M", fullname + ".LockState");
	tagm.Datatype = Moldeo.WebPortCommon.DataType.INT;
	tagm.Description = "0 = Auto (fysisk), 1 = Auto (program), 2 = Hand";
	tagm.Format = "0";
	tags.Add(tagm);
}
// Kolla om det är en digital ingång
if (fullname.StartsWith("IN.")) {
	var tagnopar = fullname.Substring(3).Replace('.','_').Replace('-','_');
	tagnopar += (tagnopar.EndsWith("_") ? "" : "_");

	// Lägg till huvudvärde
	var tag = new Moldeo.WebPortCommon.Tag(tagnopar + "V", fullname + ".Value");
	tag.Datatype = Moldeo.WebPortCommon.DataType.REAL;
	try { tag.Description = device.SubValueLookupDictionary[fullname + ".Text"].GetValue(); } catch (err) {}
	tag.Format = "0";
	tags.Add(tag);
}

// Kolla om det är ett larm
if (fullname.StartsWith("AL.")) {
	var tagnopar = fullname.Substring(3).Replace('.','_').Replace('-','_');
	tagnopar += (tagnopar.EndsWith("_") ? "" : "_");

	// Lägg till huvudvärde
	var tag = new Moldeo.WebPortCommon.Tag(tagnopar + "AL", fullname + ".AlarmStatus");
	tag.Datatype = Moldeo.WebPortCommon.DataType.INT;
	try { tag.Description = device.SubValueLookupDictionary[fullname + ".Text"].GetValue(); } catch (err) {}
	tag.Format = "0";
	tags.Add(tag);
}

// Kolla om det är en regulator
if (fullname.StartsWith("CO.")) {
	var tagnopar = fullname.Substring(3).Replace('.','_').Replace('-','_');
	tagnopar += (tagnopar.EndsWith("_") ? "" : "_");

	// Lägg till utsignal
	var tag = new Moldeo.WebPortCommon.Tag(tagnopar + "OP", fullname + ".Stage1Value");
	tag.Datatype = Moldeo.WebPortCommon.DataType.REAL;
	tag.Unit = "%";
	try { tag.Description = device.SubValueLookupDictionary[fullname + ".Stage1Name"].GetValue(); } catch (err) {}
	tag.Format = "0";
	tags.Add(tag);

	// Lägg till börvärde
	var tagsp = new Moldeo.WebPortCommon.Tag(tagnopar + "SP", fullname + ".DaySetValue");
	tagsp.Datatype = Moldeo.WebPortCommon.DataType.REAL;
	tagsp.Unit = "°C";
	tagsp.Description = "Börvärde";
	tagsp.Format = "0.0";
	tags.Add(tagsp);

	// Lägg till P-band
	var tagp = new Moldeo.WebPortCommon.Tag(tagnopar + "P", fullname + ".Stage1PBand");
	tagp.Datatype = Moldeo.WebPortCommon.DataType.REAL;
	tagp.Unit = "°C";
	tagp.Description = "P-band";
	tagp.Format = "0.0";
	tags.Add(tagp);

	// Lägg till I-tid
	var tagi = new Moldeo.WebPortCommon.Tag(tagnopar + "I", fullname + ".ITime");
	tagi.Datatype = Moldeo.WebPortCommon.DataType.REAL;
	tagi.Unit = "sec";
	tagi.Description = "I-tid";
	tagi.Format = "0.0";
	tags.Add(tagi);
	
	// Lägg till manuell ut
	var tagopm = new Moldeo.WebPortCommon.Tag(tagnopar + "OPM", fullname + ".Stage1OffValue");
	tagopm.Datatype = Moldeo.WebPortCommon.DataType.REAL;
	tagopm.Unit = tag.Unit;
	tagopm.Description = "Värde handstyrning";
	tagopm.Format = "0";
	tags.Add(tagopm);

    // Lägg till handkörning
	var tagm = new Moldeo.WebPortCommon.Tag(tagnopar + "M", fullname + ".RunLockState");
	tagm.Datatype = Moldeo.WebPortCommon.DataType.INT;
	tagm.Description = "0 = Auto (fysisk), 1 = Auto (program), 2 = Hand";
	tagm.Format = "0";
	tags.Add(tagm);

/*
    // Lägg till resterande steg
    var cnt = opc.Read(tagnopar + '.StagesUsed');
    for (i = 2; i <= cnt; i++) {
        t.name = tagnnopar + i + '_OP';
        t.type = 'REAL';
        t.unit = ddc;
        t.addr = tagnopar + '.Stage' + i + 'Value';
        t.engUnit = '%';
        t.comment = opc.Read(tagnopar + '.Stage' + i + 'Name');
        t.FixFormat();
        t.AddToDb();

        t.name = tagnnopar + i + '_P';
        t.addr = tagnopar + '.Stage' + i + 'PBand';
        t.comment = 'P-band';
        t.engUnit = '°C';
        t.FixFormat();
        t.AddToDb();

        t.name = tagnnopar + i + '_M';
        t.addr = tagnopar + '.RunLockState';
        t.comment = '0 = Auto (fysisk), 1 = Auto (program), 2 = Hand';
        t.engUnit = '';
        t.format = '#';
        t.FixFormat();
        t.AddToDb();

        t.name = tagnnopar + i + '_OPM';
        t.addr = tagnopar + '.Stage' + i + 'OffValue';
        t.comment = 'Värde handkörning';
        t.engUnit = '%';
        t.FixFormat();
        t.AddToDb();

        t.name = tagnnopar + i + '_SP1';
        t.addr = tagnopar + '.Stage' + i + 'LimitStart';
        t.comment = 'Startgräns reglering';
        t.engUnit = '%';
        t.FixFormat();
        t.AddToDb();

        t.name = tagnnopar + i + '_MIN';
        t.addr = tagnopar + '.Stage' + i + 'OutMin';
        t.comment = 'Minbegränsning';
        t.engUnit = '%';
        t.FixFormat();
        t.AddToDb();

        t.name = tagnnopar + i + '_MAX';
        t.addr = tagnopar + '.Stage' + i + 'OutMax';
        t.comment = 'Maxbegränsning';
        t.engUnit = '%';
        t.FixFormat();
        t.AddToDb();
    }*/
}

// Kolla om det är en tidkanal
if (fullname.StartsWith("TT.")) {
    var tagnopar = fullname.Substring(3).Replace('.', '_').Replace('-', '_');
    tagnopar += (tagnopar.EndsWith("_") ? "" : "_");

    // Lägg till tidkanal
    var tag = new Moldeo.WebPortCommon.Tag(tagnopar + "TCH", fullname);
    tag.Datatype = Moldeo.WebPortCommon.DataType.SCHEDULE;
    tag.Unit = "";
    try { tag.Description = device.SubValueLookupDictionary[fullname + ".Text"].GetValue(); } catch (err) { }
    tag.Format = "";
    tags.Add(tag);

    // Lägg till indikering
    var tagv = new Moldeo.WebPortCommon.Tag(tagnopar + "V", fullname + ".Value");
    tagv.Datatype = Moldeo.WebPortCommon.DataType.INT;
    tagv.Description = tag.Description;
    tagv.Format = "0";
    tags.Add(tagv);

    // Lägg till manuell manöver
    var tagm = new Moldeo.WebPortCommon.Tag(tagnopar + "M", fullname + ".LockState");
    tagm.Datatype = Moldeo.WebPortCommon.DataType.INT;
    tagm.Description = "0 = Auto (fysisk), 1 = Auto (program), 2 = Hand";
    tagm.Format = "0";
    tags.Add(tagm);

    var tagmcmd = new Moldeo.WebPortCommon.Tag(tagnopar + "MCMD", fullname + ".Value");
    tagmcmd.Datatype = Moldeo.WebPortCommon.DataType.INT;
    tagmcmd.Description = "Värde handstyrning";
    tagmcmd.Format = "0";
    tags.Add(tagmcmd);
}

