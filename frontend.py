import streamlit as st
import requests

API_BASE_URL = "http://localhost:5000/api/url"

st.title("🔥 URL Shortener with Tracking")

# Input form for creating short URL
st.header("Shorten a New URL")
long_url = st.text_input("Enter Long URL:")
if st.button("Shorten URL"):
    if long_url:
        response = requests.post(f"{API_BASE_URL}/shorten", json={"longUrl": long_url})
        if response.status_code == 200:
            result = response.json()
            short_url = f"{API_BASE_URL}/{result['shortUrl']}"
            st.success(f"Short URL: [{short_url}]({short_url})")
        else:
            st.error(f"Error: {response.json().get('error')}")

# Input form for resolving short URL
st.header("Resolve Short URL")
short_url = st.text_input("Enter Short URL:")
if st.button("Resolve URL"):
    if short_url:
        try:
            response = requests.get(f"{API_BASE_URL}/{short_url.split('/')[-1]}")
            if response.status_code == 200:
                st.success(f"Redirecting to: {response.url}")
            else:
                st.error(f"Error: {response.json().get('error')}")
        except Exception as e:
            st.error(f"Failed to resolve URL: {e}")

# Input form for URL stats
st.header("Get URL Stats")
short_url_stats = st.text_input("Enter Short URL for Stats:")
if st.button("Get Stats"):
    if short_url_stats:
        short_code = short_url_stats.split("/")[-1]
        response = requests.get(f"{API_BASE_URL}/{short_code}/stats")
        if response.status_code == 200:
            data = response.json()
            st.write("**Long URL:**", data["longUrl"])
            st.write("**Clicks:**", data["clicks"])
            st.write("**Click Data:**")
            for click in data["clickData"]:
                st.write(f"- **IP:** {click['ipAddress']}, **Location:** {click['city']}, {click['region']}, {click['country']}, **Time:** {click['timestamp']}")
        else:
            st.error(f"Error: {response.json().get('error')}")

