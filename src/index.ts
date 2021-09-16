// CSSセレクタを使ってDOMツリー中のh2要素を取得する
const heading = document.querySelector("h2")
// h2要素に含まれるテキストコンテンツを取得する
const headingText = heading?.textContent

// button要素を作成する
const button = document.createElement("button")
button.textContent = "Push Me"
// body要素の子要素としてbuttonを挿入する
document.body.appendChild(button)


function fetchUserInfo(): void {
  const userId = getUserId()
  fetch(`https://api.github.com/users/${encodeURIComponent(userId)}`)
  .then((response: Response) => {
    if (!response.ok) {
      console.error("エラーレスポンス", response)
    } else {
      return response.json().then((userInfo: any) => {
        // HTMLの組み立て
        const view = escapeHTML`
            <h4>${userInfo.name} (@${userInfo.login})</h4>
            <img src="${userInfo.avatar_url}" alt="${userInfo.login}" height="100">
            <dl>
                <dt>Location</dt>
                <dd>${userInfo.location}</dd>
                <dt>Repositories</dt>
                <dd>${userInfo.public_repos}</dd>
            </dl>
            `
        // HTMLの挿入
        const result = document.getElementById("result")
        if (result) {
          result.innerHTML = view
        }
      })
    }
  })
  .catch((error) => {
    console.error(error)
  })
}

function escapeHTML(
  strings: TemplateStringsArray,
  ...values: ReadonlyArray<string>
) {
  return strings.reduce((result: string, str: string, i: number) => {
    const value = values[i - 1]
    if (typeof value === "string") {
      return result + escapeSpecialChars(value) + str
    } else {
      return result + String(value) + str
    }
  })
}

function escapeSpecialChars(str: string): string {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
function getUserId(): string {
  const element: HTMLInputElement = 
    document.getElementById("userId") as HTMLInputElement
  return element.value
}