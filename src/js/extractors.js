import { CapacitorHttp } from '@capacitor/core';

class cumhuriyet {
    async get_posts(page = 1, last) {
        if (page == 1) {
            let posts = [];
            let elems = [];

            let dom = await fetch("https://www.cumhuriyet.com.tr/gundem")
                .then(res => res.text())
                .then(str => new window.DOMParser().parseFromString(str, "text/html"))
                .catch(err => null);

            // Return if dom is null
            if (!dom) {
                return posts;
            }

            elems.push(...[...dom.querySelectorAll(".slider-manset img[src^='/Archive/2']")].slice(2));
            elems.push(...[...dom.querySelectorAll(".haber img[src^='/Archive/2']")]);

            posts = elems.map(post => ({
                title: post.title,
                author: "Cumhuriyet",
                url: "https://cumhuriyet.com.tr/" + post.attributes.src.value.split("/").slice(-2, -1)[0],
                id: post.attributes.src.value.split("/").slice(-2, -1)[0],
                dt: null,
                image: "https://cumhuriyet.com.tr" + post.attributes.src.value,
                page: "/discover/cumhuriyet/" + post.attributes.src.value.split("/").slice(-2, -1)[0],
                last_idhaber: post.closest(".haber") ? post.closest(".haber").attributes["data-idhaber"].value : null
            }));

            return posts;
        }

        return await fetch(`https://www.cumhuriyet.com.tr/bolum-haberleri/9999/${last.last_idhaber}`, {
            method: "POST",
        })
            .then(res => res.text())
            .then(str => new window.DOMParser().parseFromString(str, "text/html"))
            .then(dom => [...dom.querySelectorAll("img[src^='/Archive/2']")])
            .then(posts => posts.map(post => ({
                title: post.title,
                author: "Cumhuriyet",
                url: "https://cumhuriyet.com.tr/" + post.attributes.src.value.split("/").slice(-2, -1)[0],
                id: post.attributes.src.value.split("/").slice(-2, -1)[0],
                dt: null,
                image: "https://cumhuriyet.com.tr" + post.attributes.src.value,
                page: "/discover/cumhuriyet/" + post.attributes.src.value.split("/").slice(-2, -1)[0],
                last_idhaber: post.closest(".haber") ? post.closest(".haber").attributes["data-idhaber"].value : null
            })))
    }

    async get_post(id) {
        return await fetch(`https://www.cumhuriyet.com.tr/${id}`)
            .then(res => res.text())
            .then(str => new window.DOMParser().parseFromString(str, "text/html"))
            .then(dom => ({
                author: "Cumhuriyet",
                title: dom.head.querySelector("meta[property='og:title']").content,
                url: dom.head.querySelector("meta[property='og:url']").content,
                id: id,
                dt: null,
                image: "/favicon.svg",
                page: "/discover/cumhuriyet/" + id,
            }))
            .catch(err => null);
    }
}

class darknet_diaries {
    async get_posts(page = 1, last) {
        let posts = [];
        let elems = [];

        if (page == 1) {
            let dom = await fetch("https://darknetdiaries.com/episode/")
                .then(res => res.text())
                .then(str => new window.DOMParser().parseFromString(str, "text/html"))
                .catch(err => null);

            // Return if dom is null
            if (!dom) {
                return posts;
            }

            elems.push(...[...dom.querySelectorAll(".post")]);

            posts = elems.map(post => ({
                title: post.querySelector(".post__title").textContent,
                author: "Darknet Diaries",
                url: "https://darknetdiaries.com" + post.querySelector(".post__title>a").pathname,
                id: post.querySelector(".post__title>a").pathname.split("/")[2],
                dt: null,
                points: 0,
                image: "https://darknetdiaries.com" + post.querySelector(".post__image").style.backgroundImage.slice(5, -2),
                page: "/discover/darknet-diaries/" + post.querySelector(".post__title>a").pathname.split("/")[2]
            }))

            return posts;
        }

        let dom = await fetch(`https://darknetdiaries.com/episode/page${page}/`)
            .then(res => res.text())
            .then(str => new window.DOMParser().parseFromString(str, "text/html"))
            .catch(err => null);

        // Return if dom is null
        if (!dom) {
            return posts;
        }

        elems.push(...[...dom.querySelectorAll(".post")]);

        posts = elems.map(post => ({
            title: post.querySelector(".post__title").textContent,
            author: "Darknet Diaries",
            url: "https://darknetdiaries.com" + post.querySelector(".post__title>a").pathname,
            id: post.querySelector(".post__title>a").pathname.split("/")[2],
            dt: null,
            image: "https://darknetdiaries.com" + post.querySelector(".post__image").style.backgroundImage.slice(5, -2),
            page: "/discover/darknet-diaries/" + post.querySelector(".post__title>a").pathname.split("/")[2]
        }))

        return posts;
    }

    async get_post(id) {
        return await fetch(`https://darknetdiaries.com/episode/${id}`)
            .then(res => res.text())
            .then(str => new window.DOMParser().parseFromString(str, "text/html"))
            .then(dom => ({
                author: "Jack Rhysider",
                title: dom.head.querySelector("meta[property='og:title']").content,
                url: dom.head.querySelector("meta[property='og:url']").content,
                id: id,
                dt: null,
                image: "/favicon.svg",
                page: "/discover/darknet-diaries/" + id,
            }))
            .catch(err => null);
    }
}

class gaming_on_linux {
    async get_posts(page = 1, last) {
        return await fetch(`https://www.gamingonlinux.com/all-articles/page=${page}`)
            .then(res => res.text())
            .then(str => new window.DOMParser().parseFromString(str, "text/html"))
            .then(dom => [...dom.querySelectorAll(".article")])
            .then(posts => posts.map(post => ({
                title: post.querySelector(".title").textContent,
                author: post.querySelector(".p-author").textContent,
                url: post.querySelector(".u-url").href,
                id: post.querySelector(".u-url").pathname,
                dt: post.querySelector("time").dateTime,
                image: post.querySelector("img").src,
                page: "/discover/gaming-on-linux" + post.querySelector(".u-url").pathname,
            })))
            .catch(err => []);
    }

    async get_post(id) {
        return await fetch(`https://www.gamingonlinux.com/${id}`)
            .then(res => res.text())
            .then(str => new window.DOMParser().parseFromString(str, "text/html"))
            .then(dom => ({
                author: "GamingOnLinux",
                title: dom.head.querySelector("meta[property='og:title']").content,
                url: dom.head.querySelector("meta[property='og:url']").content,
                id: id,
                dt: null,
                image: "/favicon.svg",
                page: "/discover/gaming-on-linux" + id,
            }))
            .catch(err => null);
    }
}

class hacker_news {
    async get_posts(page = 1, last) {
        return await fetch(`https://news.ycombinator.com/news?p=${page}`)
            .then(res => res.text())
            .then(str => new window.DOMParser().parseFromString(str, "text/html"))
            .then(dom => [...dom.querySelectorAll(".athing")])
            .then(posts => posts.map(post => ({
                title: post.querySelector(".titleline>a").innerText,
                author: post.nextSibling.querySelector(".hnuser") ? post.nextSibling.querySelector(".hnuser").innerText : null,
                url: post.querySelector(".titleline>a").href,
                id: post.id,
                dt: post.nextSibling.querySelector(".age").title,
                points: post.nextSibling.querySelector(".score") ? post.nextSibling.querySelector(".score").innerText.split(" ")[0] : null,
                image: "/favicon.svg",
                page: "/discover/hacker-news/" + post.id
            })))
            .catch(err => []);
    }

    async get_post(id) {
        return await fetch(`https://news.ycombinator.com/item?id=${id}`)
            .then(res => res.text())
            .then(str => new window.DOMParser().parseFromString(str, "text/html"))
            .then(dom => ({
                title: dom.querySelector(".titleline > a").innerText,
                author: dom.querySelector(".hnuser").innerText,
                url: dom.querySelector(".titleline > a").href,
                id: id,
                dt: dom.querySelector(".age").title,
                image: "/favicon.svg",
                page: "/discover/hacker-news/" + id
            }))
    }
}

class slashdot {
    async get_posts(page = 0, last) {
        return await fetch(`https://slashdot.org/?desktop=1&page=${page}`)
            .then(res => res.text())
            .then(str => new window.DOMParser().parseFromString(str, "text/html"))
            .then(dom => [...dom.querySelectorAll("article[id^='firehose']")])
            .then(posts => posts.map(post => ({
                title: post.querySelector(".story-title>a").textContent,
                author: "Slashdot",
                url: post.querySelector(".story-sourcelnk") ? post.querySelector(".story-sourcelnk").href : post.querySelector(".story-title>a").href,
                id: post.querySelector(".story-title>a").pathname.split("/").slice(0, -1).join("/"),
                dt: post.querySelector("time").dateTime,
                points: 0,
                image: "/favicon.svg",
                page: "/discover/slashdot" + post.querySelector(".story-title>a").pathname.split("/").slice(0, -1).join("/")
            })))
            .catch(err => []);
    }

    async get_post(id) {
        return await fetch(`https://slashdot.org/api/v1/${id}.json?api_key=MdotSLEDY7Ss2nEy7Op9lkKJctCqbGjWUBAUsatNKsQ`)
            .then(res => res.json())
            .then(data => ({
                author: data.nickname,
                title: data.title,
                url: data.canonical_url,
                id: id,
                dt: data.time,
                image: "/favicon.svg",
                page: "/discover/slashdot/" + id,
            }))
            .catch(err => null);
    }
}

class wikipedia {
    async get_posts(page = 1, last) {
        return await CapacitorHttp.get({
            url: "https://en.wikipedia.org/w/api.php?action=query&list=random&rnnamespace=0&rnlimit=12&format=json"
        })
            .then(res => res.data)
            .then(data => data.query.random)
            .then(posts => posts.map(post => ({
                title: post.title,
                author: "Wikipedia",
                url: `https://en.m.wikipedia.org/?curid=${post.id}`,
                id: post.id,
                dt: null,
                image: "/favicon.svg",
                page: "/discover/wikipedia/" + post.id,
            })))
            .catch(err => []);
    }

    async get_post(id) {
        return await CapacitorHttp.get({
            url: `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=info&pageids=${id}`
        })
            .then(res => res.data)
            .then(data => data.query.pages[String(id)])
            .then(post => ({
                author: "Wikipedia",
                title: post.title,
                url: "https://en.wikipedia.org/?curid=" + id,
                id: id,
                dt: null,
                image: "/favicon.svg",
                page: "/discover/wikipedia/" + id,
            }))
            .catch(err => null);
    }
}

const extractors = {
    "cumhuriyet": new cumhuriyet(),
    "darknet-diaries": new darknet_diaries(),
    "gaming-on-linux": new gaming_on_linux(),
    "hacker-news": new hacker_news(),
    "slashdot": new slashdot(),
    "wikipedia": new wikipedia(),
}

export { extractors }