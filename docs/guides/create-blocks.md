---
sidebar_position: 2
---
# Block Development
Procedures for git code submission and launching to staging and production.

# Directory Tour
wordpress
- composer.json (Add plugins) (Editable)
- plugins
  - tamuc (retiring) (Editable)
  - tamuc-editui (Non-gutenberg editor modifications) (Editable)
  - tamuc-teamwork (All teamwork integrations) (Editable)
  - tamuc-blocks (Future site of all code that compiles)
    - assets (Editable)
    - build (Do not edit)
    - inc (Editable)
    - tamuc-blocks.php (Editable)
- themes
  - tamuc (removing all build scripts) (Editable)

development
- db-upload (temporarily place .sql files for adding to db)
- tamuc-blocks-src (folder to execute "npm run build")
  - src (Editable)
    - blocks (Broken out in different section)
    - settings
      - blockStyles.js (json of block styles)
    - shared
      - js
        - main (holds all theme scripts)
        - filters.js (All block related filters)
        - FrontendUtils.js (Retiring in favor of lit-html)
        - main.js (frontend theme script using main folder)
        - ProgramCard (Retiring in favor of lit-html)
        - UrchinFactory.js (Manages ad history in localstorage for RFIs)
      - components
        - BulkConvertContentParts.js (Used in plugins.js)
        - FormattedContainerIcon.js (Move with formatted container)
        - LetterIcon.js (Truly Shared)
        - MetaRichText.js (Rich Text Component that saves data to meta fields)
        - SectionToggleList.js
      - img (Prefer placing in block folder)
      - css
        - blocks (To be replaced with _blocks.scss, _blocks-desktop.scss, _blocks-print.scss, _blocks-editor.scss, _blocks-logged-in.scss)
        block-library.scss + variants
    - carouselSections.js (Another frontend file)
    - frontend.js (Frontend block scripts)
    - index.js (Gutenberg block scripts)
    - plugin.js (Non-block related gutenberg scripts)

## Finding Files

Template files get edited and output to:
`wordpress/themes/tamuc/**/*`
and `wordpress/plugins/tamuc/**/*`.
Eventually the plugin will be retired and the theme will no longer have a compiler.

Blocks get edited in:
`development/tamuc-blocks-src/**/*`
and output to:
`wordpress/plugins/tamuc-blocks/build/**/*`

To help with searching inside documents make the following adjustments.
- Set included files to `wordpress/plugins/tamuc*,wordpress/themes/tamuc,development/tamuc-blocks-src`
- Set excluded files to `wordpress/plugins/tamuc-blocks/build/**/*`

When looking for a filename, there are too many files for the viewer.
Use `CMD + p` instead. Every block is called block.json.
Search for the folder name instead.

# Design to Delegate
1. Setup a project with 'npm run block-init'
2. Mock initial data and scenarios with mock.json
3. In the render function of the block, stub out the helper functions using static data or mock.json.
4. Place most logic before the template in the render function.
5. Sub functions should be pure (based only on parameters) and have no conditions. Do not pass flags to sub-functions.
7. Sub-templates / Components should use a 3 part structure dropping the early exit part of the 4 part structure.
8. Once the render function and mock.json are written, delegate the remaining tasks:
  - css
  - frontend reactivity (via mock rest_api or data attribute)
  - sub-functions
  - sub-templates
  - rest_apis
  - react components

# Tamuc Blocks Folder Structure and Wiring up a Block
Setup for deletability. Deleting this folder should throw all the errors you need to clean up the artifacts. Nothing should fail silently.

Blocks folder (Showing complete setup)
- block-name (must match block name in tamuc-blocks.php)
  - block.json // Connects to ./block.js and wordpress internals
  - mock.json // Connects to ./block.js, ./class-block-name.php and ./frontend.js
  - editor.js // (not used if acf block) Connects to index.js
  - frontend.js // (optional) Connects to frontend.js
  - block.php // Connects to tamuc-blocks.php
  - _block.scss // Connects to _blocks.scss
  - _block-desktop.scss // Connects to _blocks-desktop.scss
  - _block-print.scss // (optional) Connects to _blocks-print.scss
  - _block-editor.scss // (optional) Connects to _blocks-editor.scss
  - _block-logged-in.scss // (optional) Connects to _block-logged-in.scss
  - assets // (optional) Move by compiler so be sure your url is correct in you php.
  - inc // (optional) Connects to ./class-block-name.php
  - frontend-js // (optional) Connects to frontend.js
  - editor-js // (optional) Connects to ./editor.js

# Minimum Viable Product Examples
## Block.json with attributes and supports
[Wordpress Documentation](https://developer.wordpress.org/block-editor/getting-started/fundamentals/block-json/)

Example from formatted container
```json
{
  "$schema": "https://schemas.wp.org/trunk/block.json",
  "apiVersion": 2,
  "name": "tamuc-blocks/formatted-container",
  "title": "Content Area",
  "category": "tamuc",
  "icon": "star-filled",
  "description": "Container that is meant to be used as the main block that holds all other blocks on a page.",
  "keywords": [
    "header", "container", "section", "content"
  ],
  "version": "1.0.0",
  "textdomain": "tamuc-plugin",
  "attributes": {
    "anchor": {
      "type": "string",
      "default": ""
    },
    "usePaddingTop": {
      "type": "boolean",
      "default": true
    },
  },
  "supports": {
    "anchor": true
  }
}
```

Add this acf attribute to tell acf that this is an acf block. ACF's new validation is buggy so we disable it.
```json
"acf": {
    "mode": "preview",
    "validate": false
}
```
## mock.json
:::warning
Remember that single quotes cannot be used for strings in json. Also, all object keys must use string syntax.
:::

Example from formatted container.
```json
{
  "scenarioLoggedInOnly": {
    "attributes": {
      "anchor": "contact-us",
      "isOnlyLoggedIn": true,
      "isOnlyLandingPage": false,
    },
    "content": "<p>Hello</p>",
    "block": {"context": {}}
  },
  "scenarioLandingPageOnly": {
    "attributes": {
      "anchor": "contact-us",
      "isOnlyLoggedIn": false,
      "isOnlyLandingPage": true,
    },
    "content": "<p>Hello</p>",
    "block": {"context": {}}
  }
}
```

## PHP Template with mocks (mock.json)
Use the mocking library to mock out your data from mock.json.

```php
<?php

use ETAMU\TemplateHelpers\AttrBuilder;
use function ETAMU\TemplateHelpers\{prop_as_option, to_attr_string, is_empty};
require_once(TAMUC_BLOCKS_PLUGIN_PATH . '/inc/class-tamuc-block-base.php');

class Block_Best extends Tamuc_Block_Base
{
  function render($attributes, $content, $block)
  {
    [$mock_attributes, $mock_content, $mock_block] = json_decode(file_get_contents('./mock.json'));
    // Early exit
    if(isset($mock_attributes["isLoggedInOnly"]) && !$mock_attributes["isLoggedInOnly"] && !is_user_logged_in()) {
      return
    }

    // State
    $is_logged_in_only = prop_as_option("isLoggedInOnly", $mock_attributes)->unwrap_or(false);


    // Template Variables
    $classes = new AttrBuilder('tamuc-best-block');
    $classes->add_if($is_logged_in_only, 'logged-in-only');

    $block_id = prop_as_option('anchor', $mock_attributes)
      ->reject(is_empty(...))
      ->map(to_attr_string('id'))->unwrap_or('');

    $wrapper = get_block_wrapper_attributes(['class' => $classes->build_inner_class_string()]);
    ?>
      <section <?= $block_id ?> <?= $wrapper ?>>
        <p>This is the best block</p>
        <div>
          <?= $content ?>
        </div>
      </section>
    <?php
  }
}

```
### Constructor function
- Usually you won't have a constructor because you use the one provided by the parent class.
- Place hooks in the constructor and pass parameters onto the parent.

#### Actions
Make actions available to other parts of the system.
```php
class Block_Best extends Tamuc_Block_Base {
  function __construct($block_manager, $block_name)
    { 
    add_action('tamuc_people_echo_grid', [$this, 'echo_person_as_grid_item'], 10, 1);
    // ...
    parent::__construct($block_manager, $block_name);
  }
}
```

#### Register REST APIs

This is a two step process.
```php
class Block_Best extends Tamuc_Block_Base {
    public function __construct($block_manager, $block_name)
  {
    add_action("rest_api_init", [$this, 'register_endpoints']);
    parent::__construct($block_manager, $block_name);
  }

  public function register_endpoints()
  {
      register_rest_route("tamuc-blocks/v1", "/directory/", [
      "methods" => WP_REST_SERVER::READABLE,
      "callback" => [$this, "rest_post_type_fields"],
      "permission_callback" => "__return_true",
      ]);
  }

  function rest_post_type_fields($requestObj)
  {
    $search_term = isset($_GET['search_text']) ? sanitize_text_field($_GET['search_text']) : ''; // Get the searched term
    // Find data based on search term
    $data = [
        'people' => $people,
        'allPeople' =>  $all_people, // Use js naming convention
        'department' => $department_data,
        'departments' => !!$requestObj['department'],
        'singleDepartment' => !!$requestObj['department'] // Use js naming convention
    ];
    return $data; // This return gets json encoded and sent back to the user with appropriate Content-Type headers.
  }
}
```

### Render function
Native render receives params of $attributes, $content, $block
- $attributes is an array that holds user defined data.
- $content is a string that holds the inner content
- $block is an object that holds context information

[ACF render](https://www.advancedcustomfields.com/resources/acf-blocks-key-concepts/#block-variables-or-parameters-for-callbacks-in-php) receives params of $block, $content, $is_preview, $post_id, $wp_block, $context

#### Organize your render function into 4 sections.
##### 1. Guards
Anything you need to early exit from should be tested here.
```php
// Early exit
if(isset($attributes["isLoggedInOnly"]) && !$attributes["isLoggedInOnly"] && !is_user_logged_in()) {
  return
}
```
##### 2. State
Extract and clean your primary sources of data. Group by data rather than logic. Prepare each piece of data fully even if that mean repeating conditional statements.
```php
<?php
// Allowable. Unfamiliar paradigm in php.
// Can handle multiple processing steps in a compact space and with only 1 assignment.
// Handling multiple steps is more important in the derived state are than in the primary state area.
// Tabs Container is a poor example of grouping data rather than logic.
// Has more verbs for communication, but also more verbs to learn.
$columns = get_field_as_option('number_of_columns)
  ->reject(fn($val) => $val === 0)
  ->unwrap_or(2);

// -- OR --
// Allowable. Ok here but if a variable needs more than 1 processing step it can be large and hard to follow. 
$columns = get_field('number_of_columns');
if(!isset($columns) || $columns === 0))
{
  $columns = 2;
}

// -- OR --
// Dense and verbose. Uses lots of negatives. Ands (&&) are harder to think about.
$columns = !isset(get_field('number_of_columns')) && !($column === 0) ? get_field('number_of_columns') : 2;

// -- OR --
// Super shorthand. What does this do?
$columns = get_field('number_of_columns') ?: 2;
```

##### 3. Derived State / Template Variables
Prepare the tags that will appear in the template including escaping html and attributes. Derived states should not need to clean data.
```php
$expanded_attr = to_attr_string('aria-expanded', $mode === 'open' ? 'true' : 'false'); // To be used in aria-expanded attribute
```
- Prepare each template variable all at once even if that means repeating conditional statements.
- Save complex conditions to variables. `$is_tabs_context`
- Prefer helper functions or `isset($val)` over `array_key_exists()` and `empty()`
- Prefer helper functions or `isset($val)` over ternary and similar operators `$is_sad ? 'sad' : 'happy'`, `$possibly_empty ?: 'default'`, `$possibly_null ?? 'default'`. Are you going to remember that `?:` tests for empty and `??` tests for null?
- Boolean variables should be affirmative. Prefer **$is_hidden** over $is_not_visible.
- Prefer [$result = match(){};](https://www.php.net/manual/en/control-structures.match.php) {} over switch or elseif. Conditionals should only manage data or output, but not both in the same conditional. Preferring match helps reinforce that.

```PHP
// development/tamuc-blocks-src/src/blocks/accordion/class-block-accordion.php
$classes = new AttrBuilder('tamuc-accordion');
$classes->add_option($alignment);
$classes->add_if_or($mode === 'open', 'tamuc-accordion-open', 'tamuc-accordion-closed');
$classes->add_if($is_tabs_context, "{$breakpoint}none");
```

##### 4. Template
Output the template with echo shorthands. `<?= $var_with_string =>`.

This means you need to escape your tags before getting to the template. Again, since all data prep happens in a single place for each data item.

You can easily double check that everything is escaped in one place rather than throughout the template.
`\ETAMU\TemplateHelpers\to_attr_string($attr, $val)` is a big help here because it escapes the $val for you.

Focus on not having conditionals in this area. If you do have a conditional only use it to call a component.
```php
<?php if($show_filters){$this->Filters()} ?><!-- Notice the php tag rather than shorthand for components -->
```

## Stub Functions and sub-templates
Separate complex calculations into functions.
The first version should return static data and a real implementation should be delegated.
```php
function get_person_data($id) {
  if($id != 1234) {
    throw new Exception('Not Implemented Error: The only accepted use is get_person_data(1234)');
  } 
  return [
    'id' => 1234,
    'name' => 'Bob Hope',
    ...
  ];
}
```

## editor.js and components
```js
import blockOptions from "./block.json";
import { registerBlockType } from "@wordpress/blocks";
import { InspectorControls, InnerBlocks, useBlockProps} from "@wordpress/block-editor";
import Controls from "./backend-js/Controls";

class Best {
  constructor() {
    registerBlockType(blockOptions.name, {
      edit: this.edit.bind(this),
      save: this.save.bind(this),
      // This is also where you add block transformations, icons and other weird stuff
    });
  }
  edit({ attributes, setAttributes, context, clientId }) {
    attributes
    const blockProps = useBlockProps({ className: "etamu-best" });

    return (
      <>
        <InspectorControls>
          <Controls attributes={attributes} setAttributes={setAttributes} />
        </InspectorControls>
        <section {...blockProps}>
          <div>
            <InnerBlocks /> // Or other inputs like RichText
          </div>
        </section>
      </>
    );
  }

  save() {
    return <InnerBlocks.Content />; // or null if no inner blocks
  }
}
```

## frontend.js + carouselSections.js
Do whatever you need in these. Only export your initializer if you need a dependency injected into your instance. Shared data stores are a good example.
```js
// Example Injection
export default RFI;

class RFI {
  constructor(trackerStore) {
    this.trackerStore = trackerStore;
    this.init()
  }

  init() {
    const blocks = document.querySelectorAll('.block-css-selector');
    for (const block of blocks) {
      this.setupBlock(block);
    }
  }

  setupBlock(block) {
    // Your code here.
    // Don't forget this.callback.bind(this) to ensure the proper this context for event listeners
  }
}
// If not exporting then run
// new RFI();
```

# Special Topics
## React hooks
- [useState](https://react.dev/reference/react/useState) is a react hook that let's you persist state during a certain session. This will not save anywhere and will disappear on reload. Use for things like opening and closing accordions on the backend.
- [setAttributes](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-attributes/) is a function given to you. Calling this function will call set the specific attribute and **will** be saved to the content of the document.
- [useBlockProps](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/) is used to manage the attributes of your blocks. Users can add class, anchors and styles to your top most block. Use block props allows for that functionality.
:::note
For dynamic blocks you must pass the same calculated classes and styles with the php function get_block_wrapper_attributes as you do with use block props. Only the user defined items are saved with useBlockProps.

For blocks saved with the save() function use useBlockProps.save(...) to save these attributes. Again you will need to recalculate your blocks props and pass them into the save function.
:::

### WP/Data (Redux)
WP has several hooks for reacting with system data or document data. To reference or save other documents like images, or find document wide info like title and taxonomy terms use these and other methods in [WP/Data](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-data/).
- [useSelect](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-data/#useselect) is used to query data and update your block once it's available
- [useDispatch](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-data/#usedispatch) is used to save data in other docs or this doc

## Helpful namespaces and abstract classes

### Block base, ACF base, and Ologie base
```PHP
abstract class Tamuc_Block_Base {

  // $block_name must match name of block folder.
  public function __construct( $block_manager, $block_name);

  public function render_wrap($attributes, $content, $block);

  protected abstract function render( $attributes, $content, $block );
}

abstract class Tamuc_ACF_Block_Base extends Tamuc_Block_Base {
  
  // $block_name must match name of block folder.
  public function __construct($block_manager, $block_name);

  public abstract function render($block, $content='', $is_preview = false, $post_id=0, $wp_block = false, $context = false);
  
  // For blocks with no preview echo a basic placeholder.
  protected function Preview($block_title='');

  // Merge all block acf field with defaults. Should be moved to namespace ETAMU\TemplateHelpers
  protected function get_fields_or_defaults($wpObj, $defaults);
  
}

abstract class Tamuc_Ologie_Block_Base extends Tamuc_ACF_Block_Base {
  
	protected function get_module_fields($module_fields);

  protected function get_field_value($arr, $index, $default);

	protected function var_exists($arr, $index, $comp = 'or');

  protected function get_section_margins($margins);
}
```
### Template Helpers
```php
namespace \ETAMU\TemplateHelpers;

/**
 * Uses isset($a) to check if a key exists in an array or object.
 * In other words it not only checks if the key is set, but also if the value is not null.
 * @param string $key
 * @param array|object $array
 * @return \ETAMU\Option\Option|callable(array|object): \ETAMU\Option\Option
 */
function prop_as_option($key, $array = null); // $arr = ["val" => [4]]; prop_as_option("val", $arr) will return some([4])

/**
 * Uses isset($a) to check if a key exists in an array or object.
 * In other words it not only checks if the key is set, but also if the value is not null.
 * @param array $path
 * @param array|object $array
 * @return \ETAMU\Option\Option
 */
function path_as_option(array $path, $array); // $arr = ["val" => [4]]; path_as_option(["val", 0], $arr) will return some(4)

/**
 * Wrapper around the empty function which cannot be used as a callback.
 * @param mixed $val
 * @return bool
 */
function is_empty($val); // some('')->reject(is_empty(...)) will give a none.

/**
 * Outputs an html attribute string with the contents escaped.
 * If $val is a bool then the attr will or won't be present. Like checked or hidden or disabled.
 * @param string $attr
 * @param string|bool $val
 * @return string|callable(string|bool):string
 */
function to_attr_string($attr, $val=null); // <?= to_attr_string('id', $some_id) ?> or <?= to_attr_string('checked', true) ?>

// Filters image tags less stringently than traditional wp. Should be moved to namespace ETAMU\TemplateHelpers
function kses_image( $img ); // html string -> string of img tag with approved attributes

class AttrBuilder {
  public function __construct(string $str = null); // $classes = new AttrBuilder();
  public function add(string $str); // $classes->add("color:var(--some-color)")
  public function add_if(bool $condition, string $str); // $classes->add_if($has_border, "block-name--border");
  public function add_if_or(bool $condition, string $str, string $default); // $classes->add_if_or($is_open, "open", "closed");
  public function add_option($option); // if option is some then add it's value. Otherwise, do nothing. $classes->add_option(some('block-name--border'));
  public function build_class_attr_string(); // class="some-class another-class" classes are run through esc_attr()
  public function build_style_attr_string(); // style="color:var(--some-color);padding: 0;" styles are run through esc_attr()
  public function build_inner_class_string(); // some-class another-class
  public function build_inner_style_string(); // color:var(--some-color);padding: 0;
}
```

### Option Type
```php
namespace \ETAMU\Option;
function some(); // Creates a some option container
function none(); // Creates a none option container
  
abstract class Option {
  abstract public function is_some(); // bool
  abstract public function is_none(); // bool
  abstract public function unwrap(); // Returns inner value or throws an error
  abstract public function unwrap_or($default); // Returns inner value or $default
  abstract public function unwrap_or_else(callable $f); // Returns inner value or runs f and returns its result
  abstract public function and($option_b); // If option a is true then return option b else return none
  abstract public function and_then(callable $f); // If some<a> return some<f(a)>; f must return an option; Bypassed if none
  abstract public function map(callable $f); // transform option<a> to option<b>; f(a) does not need to return an option; Bypassed if none
  abstract public function expect($msg); // If none then throw an error containing the message; Use as an assert
  abstract public function filter(callable $predicate); // Test the value with the given function. If true return some<t> else return none; Bypassed if none
  abstract public function reject(callable $predicate); // Test the value with the given function. If true return none else return the original option, Bypass if none
  abstract public function flatten(); // Turn option<option<a>> into option<a>
  abstract public function inspect(callable $f); // If some run f(a) and return original option. Similar to forEach for arrays
  abstract public function iter(); // Returns and iterator over the value
  abstract public function or($option_b); // Recovers a none; Return some<a> if some or some<b> if none
  abstract public function or_else(callable $f); // Recovers a none; Return f() if none. F must return an option
}
```
### Result Type
```php
namespace ETAMU\Result
function ok($val); // returns Ok<val>
function err($val); // returns Err<val>

abstract class Result {
  abstract public function is_ok(); // bool
  abstract public function is_err(); // bool
  abstract public function unwrap_ok(); // Returns Val or throws error
  abstract public function unwrap_err(); // Returns error object or throws error
  abstract public function unwrap_or($default); // Returns val or the default
}
```

## Resources
[ACF Fields](https://www.advancedcustomfields.com/resources/)
[RichText](https://developer.wordpress.org/block-editor/reference-guides/richtext/)
[Other Components](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-core-data/)
[Native Block Implementations](https://github.com/WordPress/gutenberg/tree/trunk/packages/block-library/src)
### Creative things to do with [InnerBlocks](https://github.com/WordPress/gutenberg/blob/594d834cb390dae77b3541ee71567e38c992caf4/packages/block-editor/src/components/inner-blocks/README.md)
- Use instead of ACF repeater (Audience Card)
- Can have a starting template (Intro with page links) (Plan of Study)
- Can be fully or partially locked (Intro with page links)
- Can specify which blocks are allowed
- Can specify a default block other than paragraph (Audience Card)
- Can suggest preferred blocks at the top of the list
- Can be managed by parent block with useDispatch and useSelect (Page Links)
- Parents can be registered as wrapper that can transform 1 or more blocks into the parent (Supporting Header Section)
- Can be manipulated at run time (Tabs Container)
- Use block templates to have more than 1 InnerBlock area.
### Creative things to dow with Query Loop blocks
- Register your own blocks or patters to be listed in the available templates
- For full site editing the query block can inherit the document default query.
- Filter by
  - Post Type
  - Taxonomies (Public Queryable)
  - Authors
  - Page parents
  - Can only get data about the linked documents.