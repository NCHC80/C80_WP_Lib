var tag = new Moldeo.WebPortCommon.Tag(be.Name.Replace('.','_').Replace('-','_') + "_PV", be.ItemID);
for (var i = 0;i<be.Properties.Length;i++)
{
	if (be.Properties[i].Description.Equals("Item Description"))
	{
		tag.Description = be.Properties[i].Value.ToString();
	}
	else if (be.Properties[i].Description.Equals("Item Canonical Data Type"))
	{
		switch (be.Properties[i].Value.ToString())
		{
			case "VT_BOOL":
				tag.Datatype = Moldeo.WebPortCommon.DataType.DIGITAL;
				break;
			case "VT_I2":
				tag.Datatype = Moldeo.WebPortCommon.DataType.INT;
				break;
			case "VT_I4":
				tag.Datatype = Moldeo.WebPortCommon.DataType.LONG;
				break;
			case "VT_UI1":
				tag.Datatype = Moldeo.WebPortCommon.DataType.BYTE;
				break;
			case "VT_UI2":
				tag.Datatype = Moldeo.WebPortCommon.DataType.UINT;
				break;
			case "VT_UI4":
				tag.Datatype = Moldeo.WebPortCommon.DataType.ULONG;
				break;
			case "VT_R4":
				tag.Datatype = Moldeo.WebPortCommon.DataType.REAL;
				break;
			case "VT_R8":
				tag.Datatype = Moldeo.WebPortCommon.DataType.DOUBLE;
				break;
			case "VT_LPSTR":
				tag.Datatype = Moldeo.WebPortCommon.DataType.STRING;
				break;
			default:
				break;
		}
	}
}
tags.Add(tag);