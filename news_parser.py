# from newsapi import NewsApiClient
import feedparser
#
#
# API_KEY = "e81beb3de13545bbbac6ed390d30bb86"
#
# newsapi = NewsApiClient(api_key='e81beb3de13545bbbac6ed390d30bb86')

# print(newsapi.get_sources(language="ru"))
agent = "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Mobile Safari/537.36"

FeedPaper = feedparser.parse("http://redirect.subscribe.ru/www.kommersant.ru/RSS/corp.xml", agent=agent)
print(FeedPaper.entries)