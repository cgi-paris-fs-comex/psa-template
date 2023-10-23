class Utils {
  static toElement(templateId, data) {
    return $(Utils.toHtml(templateId, data));
  }

  static toHtml(templateId, data) {
    var template = $("#" + templateId).html();
    var html = Mustache.to_html(template, data);
    return html;
  }

  static sendTemplate(template) {
    Utils.sendMessageToActiveTab("template", template);
  }

  static onTemplateReceived(callback) {
    chrome.runtime.onMessage.addListener((message) => {
      if (message.id == "template") {
        callback(message.value);
      }
    });
  }

  static sendMessageToActiveTab(id, value) {
    chrome.tabs.query(
      {
        currentWindow: true,
        active: true,
      },
      (tabs) =>
        tabs.forEach((tab) =>
          chrome.tabs.sendMessage(tab.id, {
            id: id,
            value: value,
          })
        )
    );
  }

  static translate(parent) {
    $("[translate]", parent).each((index, dom) => {
      let element = $(dom);
      if (element.data("translate") == null) {
        element.data("translate", element.text());
      }
      let translationKey = element.data("translate");
      let translation = Utils.getMessage(translationKey);
      element.text(
        translation == ""
          ? translationKey + " (translation not found)"
          : translation
      );
    });
  }

  static getMessage(key) {
    return chrome.i18n.getMessage(key);
  }
}

$.fn.serializeObject = function () {
  let result = {};
  let form = this.serializeArray();

  let explore = (parent, parentKey, path, pathIndex, value) => {
    if (pathIndex == path.length) {
      parent[parentKey] = value;
    } else {
      let key = path[pathIndex];
      let child;
      if (!parent[parentKey]) {
        if (isNaN(key)) {
          parent[parentKey] = {};
        } else {
          parent[parentKey] = [];
        }
      }
      explore(parent[parentKey], key, path, pathIndex + 1, value);
    }
  };

  form.forEach((field) => {
    let path = field.name.split(/\./);
    explore(result, path[0], path, 1, field.value);
  });

  return result;
};
