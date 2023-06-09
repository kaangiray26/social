const extractor = () => {
    async function get_posts(page = 1, request = null, args = null) {
        return [];
    }

    async function get_post(id, request = null, args = null) {
        return await fetch("https://github.com/" + id)
            .then(res => res.text())
            .then(str => new DOMParser().parseFromString(str, "text/html"))
            .then(dom => ({
                title: dom.querySelector("meta[property='og:title']").content,
                author: null,
                url: "https://github.com/" + id,
                id: id,
                dt: null,
                image: dom.querySelector("meta[property='og:image']").content,
                page: "/discover/github" + id,
            }))
    }

    return {
        get_posts: get_posts,
        get_post: get_post
    }
}