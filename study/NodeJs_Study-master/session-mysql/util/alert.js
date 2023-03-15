function alertMove(msg, path) {
    let script =`
    <script type="text/javascript">
        alert("${msg}")
        location.href="${path}"
    </script>
    `
    return script
}

module.exports = {
    alertMove
}