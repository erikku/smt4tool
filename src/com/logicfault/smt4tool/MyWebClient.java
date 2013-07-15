package com.logicfault.smt4tool;

import android.webkit.MimeTypeMap;
import android.webkit.WebResourceResponse;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MyWebClient extends WebViewClient {

	@Override
	public WebResourceResponse shouldInterceptRequest(WebView view, String url) {
		if(url.substring(0, 24).equals("file:///android_res/raw/")) {
			String path = url.substring(24);
			path = path.replace('-', '_');
			path = path.replace('/', '_');
			path = path.replace('.', '_');
			
			//url = "file:///android_res/raw/" + path;

			//Log.w("smt4tool", "Rewrite: " + path);

			return new WebResourceResponse(getMimeType(url), "UTF-8",
				MainActivity.appContext.getResources().openRawResource(
				MainActivity.appContext.getResources().getIdentifier(
				path, "raw", MainActivity.appContext.getPackageName())));
		}

		return super.shouldInterceptRequest(view, url);
	}
	
	public static String getMimeType(String url)
	{
	    String type = null;
	    String extension = MimeTypeMap.getFileExtensionFromUrl(url);
	    if (extension != null) {
	        MimeTypeMap mime = MimeTypeMap.getSingleton();
	        type = mime.getMimeTypeFromExtension(extension);
	    }
	    return type;
	}
	

}
