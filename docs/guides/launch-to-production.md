---
sidebar_position: 1
---
# Launch Process

## Normal
The process listed here will ensure that merge conflicts will be addressed locally. All pull requests should end up clean.

The feature branch is whatever branch with new code you a looking to deploy. Feature branches should start with `feature-` or `hot-fix-`
```mermaid
stateDiagram-v2
    Start --> Local/Main: Pull all
    Local/Main --> Local/Staging : Merge
    Local/Staging --> Local/Feature : Merge
    Local/Feature --> Local/Feature : 1 Update version, recompile and commit
    Local/Feature --> Origin/Feature : 2 Push
    Origin/Feature --> Origin/Staging : Pull request
    Origin/Staging --> Origin/Main : Pull request which triggers a deploy
```

## Hot fix
Not yet documented