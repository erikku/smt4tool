package com.logicfault.smt4tool;

import android.webkit.ConsoleMessage;
import android.webkit.WebChromeClient;

public class WebClient extends WebChromeClient {

	@Override
	@Deprecated
	public void onConsoleMessage(String message, int lineNumber, String sourceID) {
		//Log.d("smt4tool", sourceID + ":" + lineNumber + ":  " + message);

		super.onConsoleMessage(message, lineNumber, sourceID);
	}

	@Override
	public boolean onConsoleMessage(ConsoleMessage consoleMessage) {
		//Log.d("smt4tool", consoleMessage.sourceId() + ":" + consoleMessage.lineNumber() +
			//":  " + consoleMessage.message());
		
		return super.onConsoleMessage(consoleMessage);
	}

	
}
