var oTypes = System.IO.BACnet.BacnetObjectTypes;
var pTypes = System.IO.BACnet.BacnetPropertyIds;

if (bo.BacnetObjectId.Type == oTypes.OBJECT_ANALOG_INPUT)
{
	var tag = new Moldeo.WebPortCommon.Tag(bo.Name.Replace('.','_').Replace('-','_'), bo.Name + ".present-value");
	tag.Datatype = Moldeo.WebPortCommon.DataType.REAL;
	var props = device.ReadProperty(bo.ID, pTypes.PROP_DESCRIPTION);
	if (props.Count > 0)
		tag.Description = props[0].Value.ToString();
		
	tags.Add(tag);
	
	var larmenable = device.ReadProperty(bo.ID, pTypes.PROP_LIMIT_ENABLE)[0].ToString();
	
	if(larmenable.charAt(0) == '1')
	{
		tag = new Moldeo.WebPortCommon.Tag(bo.Name.Replace('-','_').Replace('_PV','') + "_AHL", bo.Name + ".high-limit");
		tag.Datatype = Moldeo.WebPortCommon.DataType.REAL;
		tag.Description = "Larmgräns hög";
		tags.Add(tag);
		
		tag = new Moldeo.WebPortCommon.Tag(bo.Name.Replace('-','_').Replace('_PV','') + "_HAL", bo.Name + ".event-state=3");
		tag.Datatype = Moldeo.WebPortCommon.DataType.INT;
		tag.Description = "Höglarm";
		tags.Add(tag);
	}

	if (larmenable.charAt(1) == '1')
	{
		tag = new Moldeo.WebPortCommon.Tag(bo.Name.Replace('-','_').Replace('_PV','') + "_ALL" , bo.Name + ".low-limit");
		tag.Datatype = Moldeo.WebPortCommon.DataType.REAL;
		tag.Description = "Larmgräns låg";
		tags.Add(tag);

		tag = new Moldeo.WebPortCommon.Tag(bo.Name.Replace('-','_').Replace('_PV','') + "_LAL", bo.Name + ".event-state=4");
		tag.Datatype = Moldeo.WebPortCommon.DataType.INT;
		tag.Description = "Låglarm";
		tags.Add(tag);

	}
}
else if (bo.BacnetObjectId.Type == oTypes.OBJECT_BINARY_INPUT)
{
	var tag = new Moldeo.WebPortCommon.Tag(bo.Name.Replace('.','_').Replace('-','_'), bo.Name + ".present-value");
	tag.Datatype = Moldeo.WebPortCommon.DataType.DIGITAL;

	var props = device.ReadProperty(bo.ID, pTypes.PROP_DESCRIPTION);
	var description = "";
	if (props.Count > 0)
		description = props[0].Value.ToString();

	tag.Description = description;
	tags.Add(tag);
	
	var larmenable2 = device.ReadProperty(bo.ID, pTypes.PROP_NOTIFY_TYPE)[0].ToString();
	if (larmenable2 == "0" && !bo.Name.EndsWith("_AL"))
	{
		tag = new Moldeo.WebPortCommon.Tag(bo.Name.Replace('-','_').Replace('.','_') + "_AL", bo.Name + ".event-state=1");
		tag.Datatype = Moldeo.WebPortCommon.DataType.INT;
		tag.Description = "Larm " + description;
		tags.Add(tag);
	} 
	
}
else if (bo.BacnetObjectId.Type == oTypes.OBJECT_ANALOG_VALUE)
{
	var tag = new Moldeo.WebPortCommon.Tag(bo.Name.Replace('.','_').Replace('-','_'), bo.Name + ".present-value");
	tag.Datatype = Moldeo.WebPortCommon.DataType.REAL;
	var props = device.ReadProperty(bo.ID, pTypes.PROP_DESCRIPTION);
	if (props.Count > 0)
		tag.Description = props[0].Value.ToString();

	tags.Add(tag);	
}
else if (bo.BacnetObjectId.Type == oTypes.OBJECT_BINARY_OUTPUT)
{
	var tag = new Moldeo.WebPortCommon.Tag(bo.Name.Replace('.','_').Replace('-','_'), bo.Name + ".present-value");
	tag.Datatype = Moldeo.WebPortCommon.DataType.DIGITAL;
	var props = device.ReadProperty(bo.ID, pTypes.PROP_DESCRIPTION);
	if (props.Count > 0)
		tag.Description = props[0].Value.ToString();

	tags.Add(tag);	
}
else if (bo.BacnetObjectId.Type == oTypes.OBJECT_SCHEDULE)
{
	var tag = new Moldeo.WebPortCommon.Tag(bo.Name.Substring(9).Replace('.','_').Replace('-','_') + "_SCH", bo.Name);
	tag.Datatype = Moldeo.WebPortCommon.DataType.SCHEDULE;
	var props = device.ReadProperty(bo.ID, pTypes.PROP_DESCRIPTION);
	if (props.Count > 0)
		tag.Description = props[0].Value.ToString();

	tags.Add(tag);	

	tag = new Moldeo.WebPortCommon.Tag(bo.Name.Substring(9).Replace('.','_').Replace('-','_'), bo.Name + ".present-value");
	tag.Datatype = Moldeo.WebPortCommon.DataType.STRING;
	var props = device.ReadProperty(bo.ID, pTypes.PROP_DESCRIPTION);
	if (props.Count > 0)
		tag.Description = props[0].Value.ToString();

	tags.Add(tag);	
}
