/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable space-before-function-paren */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */

/* quill WYSIWYG editor
============================================================================================= */
$(document).ready(function () {
    /* get quill and hidden editor elements */
    const quillEditor = $('#__quill_editor');
    const hiddenEditor = $('#__quill_editor_hidden');

    /* if elements are preset on the page */
    if (quillEditor.length && hiddenEditor.length) {
        /* initialize quill */
        const quill = new Quill('#__quill_editor', {
            modules: { toolbar: true },
            theme: 'snow',
        });

        /* paste initial content from the hidden editor to the quill editor */
        quill.clipboard.dangerouslyPasteHTML(hiddenEditor.text());

        /* synchronize content from quill to hidden editor */
        quill.on('text-change', function (delta, oldDelta, source) {
            hiddenEditor.text(quill.container.firstChild.innerHTML);
        });
    }
});
