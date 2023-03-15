const alertMove = function(msg, path) {
    const script = `
    <script>
        alert('${msg}')
        location.href='${path}'
    </script>
    `
    
    return script
}

module.exports = {
    alertMove
}