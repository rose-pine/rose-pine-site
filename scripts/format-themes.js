/**
 * format-themes.js
 *
 * Group and format our themes based on their category. Featured items will be
 * at the top.
 */

import fs from 'node:fs'
import path from 'node:path'

const themes = JSON.parse(
	fs.readFileSync(path.join(process.cwd(), 'src/themes.json'), 'utf8')
)

themes.sort((a, b) => {
	if (a.name.toLowerCase() < b.name.toLowerCase()) return -1
	if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
	return 0
})

fs.writeFileSync(
	path.join(process.cwd(), 'src/themes.json'),
	JSON.stringify(themes)
)
