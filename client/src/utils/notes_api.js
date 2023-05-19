export function updateNote(id, content) {
    return fetch(`/api/notes/${id}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { content } )
    })
    .then(res => res.json())
}

export function deleteNote(id) {
    return fetch(`/api/notes/${id}`, {
        method: 'delete'
    })
}

export function addNewNote(content) {
    return fetch(`/api/notes/`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { content } )
    })
    .then(res => res.json())
}