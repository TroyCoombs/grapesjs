require(['config/require-config'], function () {

  require(['grapesjs/main'], function (grapesjs) {

    var editor = grapesjs.init(


      {
        allowScripts: 1,
        showOffsets: 1,
        autorender: 0,
        noticeOnUnload: 0,
        container: '#gjs',
        height: '100%',
        fromElement: true,
        clearOnRender: 0,

        storageManager: {
          autoload: 0,
          storeComponents: 1,
          storeStyles: 1,
        },



        commands: {
          defaults: [{
            id: 'open-github',
            run: function (editor, sender) {
              sender.set('active', false);
              window.open('https://github.com/artf/grapesjs', '_blank');
            }
          }, {
            id: 'undo',
            run: function (editor, sender) {
              sender.set('active', false);
              editor.UndoManager.undo(true);
            }
          }, {
            id: 'redo',
            run: function (editor, sender) {
              sender.set('active', false);
              editor.UndoManager.redo(true);
            }
          }, {
            id: 'clean-all',
            run: function (editor, sender) {
              sender.set('active', false);
              if (confirm('Are you sure to clean the canvas?')) {
                var comps = editor.DomComponents.clear();
              }
            }
          }],
        },





      });



    window.editor = editor;

    var pnm = editor.Panels;
    pnm.addButton('options', [{
      id: 'undo',
      className: 'fa fa-undo icon-undo',
      command: function (editor, sender) {
        sender.set('active', 0);
        editor.UndoManager.undo(1);
      },
      attributes: { title: 'Undo (CTRL/CMD + Z)' }
    }, {
      id: 'redo',
      className: 'fa fa-repeat icon-redo',
      command: function (editor, sender) {
        sender.set('active', 0);
        editor.UndoManager.redo(1);
      },
      attributes: { title: 'Redo (CTRL/CMD + SHIFT + Z)' }
    }, {
      id: 'clean-all',
      className: 'fa fa-trash icon-blank',
      command: function (editor, sender) {
        if (sender) sender.set('active', false);
        if (confirm('Are you sure to clean the canvas?')) {
          var comps = editor.DomComponents.clear();
          localStorage.clear();
        }
      },
      attributes: { title: 'Empty canvas' }
    }]);

    function receiveMessage(event) {
      console.log('recieved event in grapes');
      console.log(event);
      // Do we trust the sender of this message?  (might be
      // different from what we originally opened, for example).
      if (event.origin !== "http://localhost:4200") {
        return;
      }

      if (event.data.event == 'sendTemplate') {
        editor.setComponents(event.data.data.template);
        editor.setStyle(event.data.data.css);
      }
      if (event.data.event == 'returnTemplate') {
        console.log('css');
        console.log(editor.getCss());
        var obj = {
          event: 'applyTemplateChanges',
          data: {template:editor.getHtml(), css: editor.getCss()}
        };
        parent.postMessage(obj, "http://localhost:4200");
      }
      // event.source is popup
      // event.data is "hi there yourself!  the secret response is: rheeeeet!"
    }
    window.addEventListener("message", receiveMessage, false);
    var obj = {
      event: 'requestTemplate',
      data: ''
    };
    parent.postMessage(obj, "http://localhost:4200");

    editor.setComponents('<div><p>O snap it worked!</p></div>');
    editor.render();
  });
});
